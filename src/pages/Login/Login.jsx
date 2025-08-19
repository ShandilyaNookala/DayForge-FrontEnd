import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CardFlip from "../../components/pages-components/Login/CardFlip/CardFlip";
import Header from "../../components/global-components/Header/Header";
import styles from "./Login.module.css";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../../components/global-components/Spinner/Spinner";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const { user, checkedAuth, login } = useAuth();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirect = searchParams.get("redirect");

  useEffect(
    function () {
      if (checkedAuth && user) {
        navigate(redirect || "/");
      }
    },
    [checkedAuth, user, navigate, redirect]
  );

  const handleSubmit = async (e, userName, password) => {
    e.preventDefault();

    setIsLoading(true);
    const errorMessage = await login(userName, password);

    if (!errorMessage) {
      navigate(redirect || "/");
    } else {
      setIsLoading(false);
      setError(errorMessage);
    }
  };

  if (!checkedAuth || user) return <Spinner />;

  return (
    <>
      <Header>
        <Box>
          <Box>
            <button className="btn" onClick={() => setShowAbout(true)}>
              About Us
            </button>
          </Box>
        </Box>
      </Header>
      <Container className={styles.container}>
        <Box className={styles.form}>
          <CardFlip
            onSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
          />
        </Box>
      </Container>

      <Dialog
        open={showAbout}
        onClose={() => setShowAbout(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>About Us</DialogTitle>
        <DialogContent>
          <Box className={styles.about}>
            <Box className={styles.aboutTitle}>DayForge</Box>
            <Box className={styles.aboutText}>
              A focused workspace for tracking student work, timing tasks,
              grading outcomes, and planning next steps — all in one place.
            </Box>
            <Box className={styles.aboutList}>
              <Box>• Organize tasks and records</Box>
              <Box>• Record timings with start/pause/stop</Box>
              <Box>• Capture comments and compute grades</Box>
              <Box>• Prepare next work automatically</Box>
            </Box>
            <Box className={styles.aboutFooter}>
              Questions? Reach us at shandilya.nookala@gmail.com
            </Box>
          </Box>
          <Box className={styles.dialogActions}>
            <button className="btn" onClick={() => setShowAbout(false)}>
              Close
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
