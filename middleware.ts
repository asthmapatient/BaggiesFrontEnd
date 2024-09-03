import { NextRequest, NextResponse } from "next/server";
import { Axios } from "./api/axiosInterceptor";

// Function to decode and validate token
const decodedToken = async (token: string) => {
  try {
    const res = await Axios.get("/owner/isAdmin", {
      withCredentials: true,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    // console.log("Token Data:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error decoding token:", error);
    return null; // Return null in case of error
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const currentPath = request.nextUrl.pathname;

  // console.log(`Token: ${token}`);
  console.log(`Current Path: ${currentPath}`);

  // To prevent infinite loops, check if the user is already on the target path

  // If no token is present
  if (!token) {
    if (currentPath === "/owner" || currentPath === "/user") {
      console.log("No token and path is /owner or /user, allowing access");
      return NextResponse.next();
    }
    console.log("No token, redirecting to /user");
    return NextResponse.redirect(new URL("/user", request.url));
  }

  try {
    const data = await decodedToken(token);

    if (data) {
      const isOwner = data.isAdmin;

      if (isOwner) {
        if (currentPath.startsWith("/user")) {
          console.log(
            "Owner trying to access /user, redirecting to /owner/products"
          );
          return NextResponse.redirect(new URL("/owner/products", request.url));
        }
      } else {
        if (currentPath.startsWith("/owner")) {
          console.log(
            "User trying to access /owner, redirecting to /user/products"
          );
          return NextResponse.redirect(new URL("/user/products", request.url));
        }
      }

      if (
        currentPath === "/user" ||
        currentPath === "/owner" ||
        currentPath === "/"
      ) {
        const targetPath = isOwner ? "/owner/products" : "/user/products";
        console.log(
          `Authenticated as ${
            isOwner ? "Owner" : "User"
          }, redirecting to ${targetPath}`
        );
        return NextResponse.redirect(new URL(targetPath, request.url));
      }

      return NextResponse.next();
    } else {
      // If token decoding fails, redirect to /user
      console.log("Invalid token, redirecting to /user");
      // return NextResponse.redirect(new URL("/user", request.url));
    }
  } catch (error) {
    console.log("Redirecting to /user due to error or invalid token");
    // return NextResponse.redirect(new URL("/user", request.url));
  }
}

export const config = {
  matcher: ["/", "/owner", "/user", "/owner/:path*", "/user/:path*"],
};
