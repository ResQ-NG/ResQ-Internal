import { createApiMutation } from "@/network/client.constructor";
import { LogoutRequest } from "./types";
import { AuthRoutes } from "./routes";

export const useLogout = createApiMutation<LogoutRequest, void>({
  endpoint: AuthRoutes.Logout,
  operationName: "Logout",
  method: "post",
  suppressSuccessMessage: true,
  suppressErrorMessage: true,
});
