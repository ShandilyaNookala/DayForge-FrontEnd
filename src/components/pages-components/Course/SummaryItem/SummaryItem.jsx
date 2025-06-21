import { Box, Typography } from "@mui/material";

function SummaryItem({ label, value }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body1">{label}:</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
}

export default SummaryItem;
