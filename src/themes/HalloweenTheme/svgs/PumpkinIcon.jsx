import { Box, SvgIcon } from "@mui/material";

function PumpkinIcon() {
  return (
    <SvgIcon viewBox="0 0 72 72">
      <Box component="ellipse" cx="36" cy="42" rx="24" ry="18" fill="#ff7a00" />
      <Box component="ellipse" cx="26" cy="42" rx="14" ry="17" fill="#ff952e" />
      <Box component="ellipse" cx="46" cy="42" rx="14" ry="17" fill="#ff952e" />
      <Box component="ellipse" cx="36" cy="42" rx="9" ry="17" fill="#ffb457" />
      <Box
        component="rect"
        x="33"
        y="18"
        width="6"
        height="10"
        rx="2"
        fill="#2a8a2a"
      />
      <Box component="polygon" points="24,36 32,32 32,40" fill="#1a0f1a" />
      <Box component="polygon" points="48,36 40,32 40,40" fill="#1a0f1a" />
      <Box component="polygon" points="36,41 33,39 39,39" fill="#1a0f1a" />
      <Box
        component="path"
        d="M18 48 L26 50 L28 46 L32 50 L36 46 L40 50 L44 46 L46 50 L54 48
               Q50 58 36 58 Q22 58 18 48Z"
        fill="#1a0f1a"
      />
    </SvgIcon>
  );
}

export default PumpkinIcon;
