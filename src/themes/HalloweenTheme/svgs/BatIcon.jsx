import { Box, SvgIcon } from "@mui/material";

function BatIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 90 36">
      <Box component="g" fill="#2b2a4d">
        <Box
          component="path"
          d="M45 14
         c3-6 10-10 18-12 9-3 18-3 26-1
         -7 3 -12 6 -15 10
         8 2 15 5 21 10
         -14-1 -26 0 -34 3
         -5 7 -10 10 -16 10
         s-11-3 -16-10
         c-8-3 -20-4 -34-3
         6-5 13-8 21-10
         -3-4 -8-7 -15-10
         8-2 17-2 26 1
         8 2 15 6 18 12z"
        />
        <Box component="path" d="M38 12 l4-7 3 7z" />
        <Box component="path" d="M48 12 l3-7 4 7z" />
      </Box>
    </SvgIcon>
  );
}
export default BatIcon;
