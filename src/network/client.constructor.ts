
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { InfiniteQueryConfig, MutationConfig, PaginatedResult, QueryConfig } from "./types";
import { DefaultApiResponse } from "./types";
import { useStore } from "@/store";
import { logError } from "@/lib/logger";
import http from "./http.instance";
import { ApiCustomError } from "@/lib/types";
import { apiError } from "@/lib/utils";

const DEFAULT_USE_QUERY_SHOW_ERROR = true;

export function useApiMutation<TVariables = unknown, TData = unknown>(
  config: MutationConfig<TVariables, TData>,
  callBack?: () => void
) {
  const setGeneralMessage = useStore(({ setGeneralMessage }) => setGeneralMessage);

  const queryClient = useQueryClient();

  const showSuccess = (message: string) => {
    if (!config.suppressSuccessMessage) {
      setGeneralMessage({ message, state: "success" });
    }
  };

  const showError = (message: string) => {
    if (!config.suppressErrorMessage) {
      setGeneralMessage({ message, state: "failed" });
    }
  };

  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      const method = config.method || "post";
      const headers = config.getHeaders?.(variables) || {};
      const data = config.transformRequest?.(variables) || variables;

      const endpoint =
        typeof config.endpoint === "function" ? config.endpoint(variables) : config.endpoint;

      try {
        const isDelete = method.toLowerCase() === "delete";
        // For DELETE, do not send a body (axios does not support body for DELETE by default)
        let response;
        if (isDelete) {
          response = await http[method](endpoint, { headers });
        } else {
          response = await http[method](endpoint, data as Record<string, unknown>, { headers });
        }

        return config.transformResponse
          ? config.transformResponse(response?.data)
          : (response?.data as TData);
      } catch (error: unknown) {
        logError(error, config.operationName, config.getContextData?.(variables) || {});
        throw error;
      }
    },
    onSuccess: (data, variables: TVariables) => {
      if (config.onSuccess) {
        config.onSuccess(variables, data);
      }

      const apiResponse = data as DefaultApiResponse;
      const message =
        (typeof config.successMessage === "function"
          ? config.successMessage(data)
          : config.successMessage) ||
        apiResponse?.message ||
        "Operation completed successfully";
      showSuccess(message);

      if (config.invalidateQueries) {
        config.invalidateQueries.forEach((queryKeyArray) => {
          queryClient.invalidateQueries({ queryKey: queryKeyArray });
        });
      }

      callBack?.();
    },
    onError: (error: unknown) => {
      // Check for ApiCustomError first to get the API message
      if (error instanceof ApiCustomError) {
        showError(error.message);
      } else {
        const message = apiError(error);
        showError(message);
      }
    },
  });
}

export function useApiQuery<TParams = unknown, TData = unknown>(
  config: QueryConfig<TParams, TData>,
  params?: TParams,
  options?: Omit<UseQueryOptions<TData, Error, TData>, "queryKey" | "queryFn">,
  shouldShowError: boolean = DEFAULT_USE_QUERY_SHOW_ERROR
) {
  const setGeneralMessage = useStore(({ setGeneralMessage }) => setGeneralMessage);

  const showError = (message: string) => setGeneralMessage({ message, state: "failed" });

  const queryKeyParts = [...config.queryKey]; // e.g., ['basekey']
  if (params) {
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        queryKeyParts.push({ [key]: value });
      });
  }

  const finalQueryKey = queryKeyParts;

  const isEnabled = config.enabled ? config.enabled(params as TParams) : true;

  return useQuery({
    queryKey: finalQueryKey,
    queryFn: async () => {
      try {
        const url =
          typeof config.endpoint === "function"
            ? config.endpoint(params as TParams) // If endpoint is a function, call with params... its advisable to construct url dynamically and send only string here tho
            : config.endpoint;

        const headers = config.getHeaders?.(params as TParams) || {};

        const response = await http.get(url, {
          headers,
          params: typeof config.endpoint === "function" ? undefined : params,
        });

        // Transform the response if a transformer is provided
        const data = config.transformResponse
          ? config.transformResponse(response?.data)
          : response?.data;

        return data as TData;
      } catch (error: unknown) {
        logError(error, config.operationName, config.getContextData?.(params as TParams));
        if (shouldShowError) {
          // Check for ApiCustomError first to get the API message
          if (error instanceof ApiCustomError) {
            showError(error.message);
          } else {
            showError(apiError(error));
          }
        }

        //still throw error incase we need it for any manipulation
        throw error;
      }
    },
    ...options,
    enabled: isEnabled && options?.enabled !== false,
  });
}

function useInfiniteApiQuery<TParams extends Record<string, unknown>, TData = unknown>(
  config: InfiniteQueryConfig<TParams, TData>,
  params?: TParams,
  options?: Omit<
    UseInfiniteQueryOptions<PaginatedResult<TData>, Error>,
    "queryKey" | "queryFn" | "getNextPageParam"
  >,
  shouldShowError: boolean = DEFAULT_USE_QUERY_SHOW_ERROR
) {
  const setGeneralMessage = useStore(({ setGeneralMessage }) => setGeneralMessage);

  const showError = (message: string) => setGeneralMessage({ message, state: "failed" });

  const pageParamKey: string = config.pageParamKey || "page";
  const dataField: string = config.dataField || "items";

  const queryKeyParts = [...config.queryKey]; // e.g., ['basekey']

  if (params) {
    Object.entries(params)
      .filter(([, value]) => isValidQueryParam(value))
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Sort array for consistent ordering
          queryKeyParts.push({ [key]: [...value].sort() });
        } else {
          queryKeyParts.push({ [key]: value });
        }
      });
  }

  const finalQueryKey = queryKeyParts;

  const isEnabled: boolean = config.enabled ? config.enabled(params as TParams) : true;

  return useInfiniteQuery({
    queryKey: finalQueryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }: { pageParam?: unknown }) => {
      try {
        const url: string =
          typeof config.endpoint === "function"
            ? config.endpoint(params as TParams)
            : config.endpoint;

        const headers: Record<string, string> = config.getHeaders?.(params as TParams) || {};

        const requestParams: Record<string, unknown> = {
          ...(params || {}),
          [pageParamKey]: pageParam,
        };

        // Handle array parameters to create repeated query parameters
        const serializedParams = new URLSearchParams();
        Object.entries(requestParams).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Add each array item as a separate parameter with the same key
            // This creates: currency=ngn&currency=usd
            value.forEach((item) => serializedParams.append(key, item));
          } else {
            serializedParams.append(key, String(value));
          }
        });

        const response = await http.get(url, {
          headers,
          params: serializedParams,
        });

        const responseData: Record<string, unknown> =
          (response?.data as Record<string, unknown>) || {};
        const dataContainer: Record<string, unknown> =
          (responseData.data as Record<string, unknown>) || {};

        const meta: Record<string, unknown> = (dataContainer.meta as Record<string, unknown>) || {};

        const items: TData[] = (dataContainer[dataField] as TData[]) || [];

        const transformedItems: TData[] = Array.isArray(items)
          ? typeof config.transformResponse === "function"
            ? items.map(config.transformResponse)
            : items
          : [];

        return {
          items: transformedItems,
          nextPage: Number(meta.current_page || pageParam) + 1,
          totalPages: (meta.last_page as number) || undefined,
          totalItems: (meta.total_records as number) || undefined,
          currentPage: Number(meta.current_page || pageParam),
          pageSize: (meta.page_size as number) || undefined,
        };
      } catch (error: unknown) {
        logError(error, config.operationName, config.getContextData?.(params as TParams) || {});
        if (shouldShowError) {
          // Check for ApiCustomError first to get the API message
          if (error instanceof ApiCustomError) {
            showError(error.message);
          } else {
            showError(apiError(error));
          }
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.totalPages) return undefined;
      return (lastPage.currentPage ?? 0) < lastPage.totalPages ? lastPage.nextPage : undefined;
    },
    ...options,
    enabled: isEnabled && options?.enabled !== false,
  });
}

/**
 * Creates a reusable API mutation hook with pre-configured settings.
 *
 * This factory function allows you to define mutation configurations once and reuse them
 * throughout your application, ensuring consistency in API interactions.
 *
 * @template TVariables - The type of data being sent to the API
 * @template TData - The type of data returned from the API
 *
 * @param config - Configuration object for the mutation
 * @returns A function that returns a configured mutation hook when called
 *
 * @example
 * // Define a typed mutation hook
 * const useCreateUser = createApiMutation<UserData, UserResponse>({
 *   endpoint: '/api/users',
 *   operationName: 'CreateUser',
 *   successMessage: 'User created successfully'
 * });
 *
 * // Use the hook in a component
 * const { mutate, isLoading } = useCreateUser();
 * mutate({ name: 'John', email: 'john@example.com' });
 */
export function createApiMutation<TVariables = unknown, TData = unknown>(
  config: MutationConfig<TVariables, TData>
) {
  return (callback?: () => void) => {
    const finalConfig: MutationConfig<TVariables, TData> = {
      ...config,
      suppressSuccessMessage: config.suppressSuccessMessage ?? false,
      suppressErrorMessage: config.suppressErrorMessage ?? false,
    };
    return useApiMutation(finalConfig, callback);
  };
}

/**
 * Creates a reusable paginated API query hook with pre-configured settings.
 *
 * This factory function allows you to define paginated query configurations once and reuse them
 * throughout your application, ensuring consistency in API interactions.
 *
 * @template TParams - The type of query search parameters used for the API request
 * @template TData - The type of data returned from the API
 *
 * @param config - Configuration object for the paginated query
 * @returns A function that returns a configured paginated query hook when called with search parameters
 *
 * @param params - Optional search parameters for the API request
 * @param options - Optional query options excluding 'queryKey', 'queryFn', and 'getNextPageParam'
 * @param shouldShowError - Flag to determine if errors should be displayed to the user, defaults to true
 *
 * @example
 * // Define a typed paginated query hook
 * const useGetPaginatedUsers = createPaginatedApiQuery<{ page: number, limit: number }, UserData[]>({
 *   endpoint: '/api/users',
 *   queryKey: ['users'],
 *   operationName: 'GetPaginatedUsers'
 * });
 *
 * Use the hook in a component
 * const { data, isLoading, fetchNextPage } = useGetPaginatedUsers({ page: 1, limit: 10 });
 * The resulting URL would look like: /api/users?page=1&limit=10
 */
export function createInfiniteApiQuery<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown,
>(config: InfiniteQueryConfig<TParams, TData>) {
  return (
    params?: TParams,
    options?: Omit<
      UseInfiniteQueryOptions<PaginatedResult<TData>, Error>,
      "queryKey" | "queryFn" | "getNextPageParam"
    >,
    shouldShowError: boolean = DEFAULT_USE_QUERY_SHOW_ERROR
  ) => useInfiniteApiQuery(config, params, options, shouldShowError);
}

/**
 * Creates a reusable API query hook with pre-configured settings.
 *
 * This factory function allows you to define query configurations once and reuse them
 * throughout your application, ensuring consistency in API interactions.
 *
 * @template TParams - The type of query search parameters used for the API request
 * @template TData - The type of data returned from the API
 *
 * @param config - Configuration object for the query
 * @param shouldShowError - Flag to determine if errors should be displayed to the user
 * @returns A function that returns a configured query hook when called with search parameters
 *
 * @example
 * // Define a typed query hook
 * const useGetUsers = createApiQuery<{ page: number, limit: number }, UserData[]>({
 *   endpoint: '/api/users',
 *   queryKey: ['users'],
 *   operationName: 'GetUsers'
 * }, true);
 *
 * // Use the hook in a component
 * const { data, isLoading } = useGetUsers({ page: 1, limit: 10 });
 *  The resulting URL would look like: /api/users?page=1&limit=10
 */

export function createApiQuery<TParams = unknown, TData = unknown>(
  config: QueryConfig<TParams, TData>,
  shouldShowError?: boolean,
  options: Omit<UseQueryOptions<TData, Error, TData>, "queryKey" | "queryFn"> = {}
) {
  return (params?: TParams) => useApiQuery(config, params, options, shouldShowError);
}

/**
 * Creates a reusable paginated API query hook with pre-configured settings.
 *
 * This factory function allows you to define query configurations for paginated responses
 * and reuse them throughout your application, ensuring consistency in API interactions.
 *
 * @template TParams - The type of query search parameters used for the API request
 * @template TData - The type of data returned from the API
 *
 * @param config - Configuration object for the query, including endpoint and query key
 * @param shouldShowError - Optional flag to determine if errors should be displayed to the user
 * @returns A function that returns a configured query hook when called with search parameters
 *
 * @example
 * // Define a typed paginated query hook
 * const useGetPaginatedUsers = createPaginatedApiResponse<{ page: number, limit: number }, UserData>({
 *   endpoint: '/api/users',
 *   queryKey: ['users'],
 *   operationName: 'GetPaginatedUsers'
 * }, true);
 *
 * // Use the hook in a component
 * const { data, isLoading } = useGetPaginatedUsers({ page: 1, limit: 10 });
 * // The resulting URL would look like: /api/users?page=1&limit=10
 */

function isValidQueryParam(val: unknown) {
  return val !== undefined && val !== null && val !== "";
}

export function createPaginatedApiResponse<TParams = unknown, TData = unknown>(
  config: QueryConfig<TParams, PaginatedResult<TData>>,
  shouldShowError: boolean = DEFAULT_USE_QUERY_SHOW_ERROR
) {
  return (
    params?: TParams,
    options?: Omit<
      UseQueryOptions<PaginatedResult<TData>, Error, PaginatedResult<TData>>,
      "queryKey" | "queryFn"
    >
  ) =>
    useApiQuery(
      {
        ...config,
        transformResponse: (responseData: unknown) => {
          const dataField = config.dataField || "results";
          const data = responseData as Record<string, unknown>;
          const responseDataContainer = data || {};

          // Extract items from the dataField (default: 'results')
          const items: TData[] = (responseDataContainer[dataField] as TData[]) || [];

          // For DRF-style pagination, meta fields are at the root level
          const currentPage = 1; // DRF does not provide current page by default
          const pageSize =
            typeof responseDataContainer["results"] === "object" &&
            Array.isArray(responseDataContainer["results"])
              ? responseDataContainer["results"].length
              : 0;
          const totalItems = (responseDataContainer["count"] as number) || 0;
          const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;

          // DRF provides 'next' and 'previous' URLs, so we infer nextPage
          const nextUrl = responseDataContainer["next"] as string | null;

          const nextPage = nextUrl != null ? currentPage + 1 : null;

          return {
            items,
            currentPage,
            nextPage,
            totalPages,
            totalItems,
            pageSize,
          } as PaginatedResult<TData>;
        },
      },
      params,
      options,
      shouldShowError
    );
}
