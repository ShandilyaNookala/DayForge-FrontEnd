import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { useLocation } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";

function Header({ children, className = "" }) {
  const location = useLocation();

  return (
    <AppBar position="static" className={styles.header + " " + className}>
      <Toolbar className={styles.toolbar}>
        <Typography className={styles.brand}>
          <Logo />
        </Typography>
        {children}
        {location.pathname !== "/login" ? <LogoutButton /> : null}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
