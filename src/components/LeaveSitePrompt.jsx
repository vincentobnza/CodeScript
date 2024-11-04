import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LeaveSitePrompt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this site?";
    };

    const handleRouteChange = () => {
      const confirmLeave = window.confirm(
        "Are you sure you want to leave this page?"
      );
      if (!confirmLeave) {
        navigate(location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [navigate, location.pathname]);

  return null;
};

export default LeaveSitePrompt;
