import { Toolbar, Typography } from "@mui/material";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <Toolbar position="static" className={styles.footer}>
      <Typography variant="body1" align="center">
        &copy; 2023-{new Date().getFullYear()} DayForge. All rights reserved.
      </Typography>
    </Toolbar>
  );
}

export default Footer;
