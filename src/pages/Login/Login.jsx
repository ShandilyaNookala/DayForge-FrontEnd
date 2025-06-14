import Footer from "../../components/global-components/Footer/Footer";
import { Container } from "@mui/material";
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
      <Header>About Us</Header>
      <Container className={styles.container}>
        <CardFlip onSubmit={handleSubmit} error={error} isLoading={isLoading} />
      </Container>
      <Footer />
    </>
  );
}
