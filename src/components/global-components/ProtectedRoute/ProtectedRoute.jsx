import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";

function ProtectedRoute() {
  const { user, checkedAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (checkedAuth && !user) {
      navigate("/login?redirect=" + encodeURIComponent(location.pathname));
    }
  }, [checkedAuth, user, navigate, location.pathname]);

  if (!checkedAuth) return <Spinner />;

  if (!user) return null;

  return <Outlet />;
}

export default ProtectedRoute;
