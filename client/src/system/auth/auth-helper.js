import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
const cookies = new Cookies();

const auth = {
  isAuthenticated: () => {
    const token = cookies.get("t");
    if (typeof window === "undefined") {
      return false;
    }

    if (token) {
      return jwt.decode(token);
    } else {
      return false;
    }
  },
  authenticate: (token) => {
    if (typeof window !== "undefined") {
      cookies.set("t", token, { path: "/" });
    }
    // cb();
  },
  clearToken: (cb) => {
    if (typeof window !== "undefined") {
      console.log("signed out");
      cookies.remove("t", { path: "/" });
      cb();
    }
  },
};

export default auth;
