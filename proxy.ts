import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authourize",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/overview/:path*",
    "/design-system/:path*",
  ],
};

