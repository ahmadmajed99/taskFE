import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function NoLoggedIn() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return <Outlet />;
}
