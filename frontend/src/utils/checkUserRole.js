import { jwtDecode } from "jwt-decode";

export const checkUserRole = (token, requiredRole) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role.name === requiredRole;
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
};
