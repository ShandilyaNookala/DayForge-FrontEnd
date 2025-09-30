import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./BackButton.module.css";
import { Box } from "@mui/material";

function BackButton({ url, text = "Back", className = "" }) {
  return (
    <Box>
      <Link to={url} className={`btn ${className}`}>
        <Box className={styles.backButton}>
          <ArrowBackIcon />
          {text}
        </Box>
      </Link>
    </Box>
  );
}

export default BackButton;
