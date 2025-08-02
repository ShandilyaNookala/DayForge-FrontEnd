import { Link } from "react-router";
import styles from "./Logo.module.css";
import { Box } from "@mui/material";

function Logo() {
  return (
    <Link to="/">
      <Box component="img" src="/Logo.png" alt="logo" className={styles.logo} />
    </Link>
  );
}
export default Logo;
