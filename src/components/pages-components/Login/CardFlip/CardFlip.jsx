import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "./CardFlip.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../global-components/Spinner/Spinner";

function CardFlip({ onSubmit, error, isLoading }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onMouseEnter={() => setIsFlipped(true)}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box className={styles.cardFront}>Go</Box>

          <Box
            className={styles.cardBack}
            component="form"
            onSubmit={(e) => onSubmit(e, userName, password)}
          >
            <Box component="h1" className={styles.heading}>
              Login
            </Box>

            <TextField
              type="text"
              label="Username"
              name="username"
              required
              margin="normal"
              className={`default-text-field ${styles.textFieldForLogin}`}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              required
              margin="normal"
              className={`default-text-field ${styles.textFieldForLogin}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" className={styles.login}>
              Login
            </Button>

            <Typography color="red">{error}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CardFlip;
