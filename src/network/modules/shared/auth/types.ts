/** POST body for `/v1/auth/logout`. Omit fields when using Bearer-only logout. */
export interface LogoutRequest {
  refresh_token?: string;
}
