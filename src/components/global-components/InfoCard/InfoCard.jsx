import { Card, CardContent } from "@mui/material";
import styles from "./InfoCard.module.css";

function InfoCard({ children }) {
  return (
    <Card className={styles.infoCard}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default InfoCard;
