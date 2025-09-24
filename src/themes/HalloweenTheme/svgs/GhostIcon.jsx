import { Box, SvgIcon } from "@mui/material";

function GhostIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 120 90">
      <Box
        component="path"
        fill="#fff"
        d="M60 10c-22 0-36 14-36 34v36l10-6 10 6 10-6 10 6 10-6 10 6V44C84 24 72 10 60 10z"
      />
      <Box component="circle" cx="48" cy="40" r="5" fill="#0d0b1a" />
      <Box component="circle" cx="72" cy="40" r="5" fill="#0d0b1a" />
      <Box
        component="path"
        d="M54 54 q6 6 12 0"
        stroke="#0d0b1a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

export default GhostIcon;
