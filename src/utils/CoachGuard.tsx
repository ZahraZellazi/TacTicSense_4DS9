import { Navigate, Outlet } from "react-router-dom";

export const CoachGuard = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if ((user.role as string).toLowerCase() !== "coach") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
