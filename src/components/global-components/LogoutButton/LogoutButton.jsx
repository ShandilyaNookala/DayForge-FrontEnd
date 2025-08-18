import { LogoutOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../../contexts/AuthContext";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout } = useAuth();

  async function handleLogout() {
    setIsLoading(true);
    try {
      await logout();
    } catch (err) {
      setError(err.message || "An error occurred during logout.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={handleLogout}>
            <LogoutOutlined />
            Logout
          </Button>
          {error && <Box>{error}</Box>}
        </>
      )}
    </>
  );
}

export default LogoutButton;
