import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./BackButton.module.css";
import { Box } from "@mui/material";

function BackButton({ url }) {
  return (
    <Box>
      <Link to={url} className="btn">
        <Box className={styles.backButton}>
          <ArrowBackIcon />
          Back
        </Box>
      </Link>
    </Box>
  );
}

export default BackButton;
