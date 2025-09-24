import { Box, SvgIcon } from "@mui/material";

function MoonIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 160 160">
      <Box component="defs">
        <Box
          component="filter"
          id="noisy"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <Box
            component="feTurbulence"
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="1"
            result="n"
          />
          <Box
            component="feDisplacementMap"
            in="SourceGraphic"
            in2="n"
            scale="2"
          />
        </Box>
      </Box>
      <Box
        component="circle"
        cx="80"
        cy="80"
        r="68"
        fill="#f2e6b3"
        filter="url(#noisy)"
      />
      <Box
        component="path"
        d="M28,80a52,52 0 1,0 104,0a60,60 0 1,1 -104,0Z"
        fill="#2b2548"
        opacity="0.28"
      />
      <Box component="circle" cx="52" cy="62" r="9" fill="#d8cfa2" />
      <Box component="circle" cx="96" cy="54" r="6" fill="#d8cfa2" />
      <Box component="circle" cx="72" cy="96" r="7" fill="#d8cfa2" />
      <Box component="circle" cx="112" cy="92" r="5" fill="#d8cfa2" />
      <Box component="circle" cx="44" cy="102" r="6" fill="#d8cfa2" />
    </SvgIcon>
  );
}

export default MoonIcon;
