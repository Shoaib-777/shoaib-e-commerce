export const authConfig = {
    providers:[],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized({ auth, request }) {
        const isLoggedIn = auth?.user;
        const isOnLogin = request.nextUrl.pathname.startsWith("/login");
        if (isOnLogin) {
          if (isLoggedIn) return true;
          return false;
        } else if (isLoggedIn) {
          const baseUrl = 'https://shoaib-e-commerce.vercel.app'
          return Response.redirect(new URL('/profile',baseUrl));
        }
        return true;
      },
    },
  };
