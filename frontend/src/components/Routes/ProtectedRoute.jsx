import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false); 
      return;
    }

    (async () => {
      try {
        const { data } = await API.get("/auth/current-user");
        if (data?.success) {
          dispatch(getCurrentUser(data));
        } else {
          localStorage.clear();
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const token = localStorage.getItem("token");

  
  if (loading) return null;

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
