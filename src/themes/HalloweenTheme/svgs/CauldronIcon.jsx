import { Box, SvgIcon } from "@mui/material";

function CauldronIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 520 460">
      <Box component="defs">
        <Box component="radialGradient" id="backGlow" cx="50%" cy="55%" r="70%">
          <Box
            component="stop"
            offset="0%"
            stopColor="#2cff6a"
            stopOpacity="0.6"
          />
          <Box
            component="stop"
            offset="50%"
            stopColor="#22c555"
            stopOpacity="0.25"
          />
          <Box
            component="stop"
            offset="100%"
            stopColor="#0a1a0f"
            stopOpacity="0"
          />
        </Box>
        <Box
          component="radialGradient"
          id="potionGlow"
          cx="50%"
          cy="50%"
          r="80%"
        >
          <Box
            component="stop"
            offset="0%"
            stopColor="#b6ff73"
            stopOpacity="1"
          />
          <Box
            component="stop"
            offset="70%"
            stopColor="#38a30c"
            stopOpacity="0.7"
          />
          <Box
            component="stop"
            offset="100%"
            stopColor="#0c2d00"
            stopOpacity="0"
          />
        </Box>
        <Box
          component="radialGradient"
          id="potionSurface"
          cx="50%"
          cy="40%"
          r="70%"
        >
          <Box component="stop" offset="0%" stopColor="#d6ffd0" />
          <Box component="stop" offset="100%" stopColor="#1fa33b" />
        </Box>
        <Box component="filter" id="blur15">
          <Box component="feGaussianBlur" stdDeviation="15" />
        </Box>
        <Box component="filter" id="softGlow">
          <Box component="feGaussianBlur" stdDeviation="25" />
        </Box>
      </Box>

      <Box
        component="rect"
        x="0"
        y="0"
        width="520"
        height="460"
        fill="#0b1f0d"
      />
      <Box
        component="rect"
        x="0"
        y="0"
        width="520"
        height="460"
        fill="url(#backGlow)"
        filter="url(#softGlow)"
        opacity="0.85"
      />
      <Box
        component="circle"
        cx="260"
        cy="120"
        r="240"
        fill="url(#potionGlow)"
        filter="url(#blur15)"
        opacity="0.8"
      />

      <Box
        component="path"
        d="M60,200 C60,120 160,80 260,76
       C360,80 460,120 460,200
       C460,340 360,420 260,428
       C160,420 60,340 60,200 Z"
        fill="#0a0a0f"
        stroke="#000"
        strokeWidth="6"
      />

      <Box
        component="rect"
        x="150"
        y="400"
        width="50"
        height="30"
        rx="8"
        fill="#000"
      />
      <Box
        component="rect"
        x="320"
        y="400"
        width="50"
        height="30"
        rx="8"
        fill="#000"
      />

      <Box component="ellipse" cx="260" cy="116" rx="200" ry="50" fill="#000" />
      <Box component="ellipse" cx="260" cy="116" rx="176" ry="36" fill="#111" />

      <Box
        component="ellipse"
        cx="260"
        cy="116"
        rx="176"
        ry="36"
        fill="url(#potionSurface)"
      />

      <Box
        component="path"
        d="M370,116 q10,30 0,60 q-12,-6 -6,-40z"
        fill="url(#potionSurface)"
      />
      <Box
        component="path"
        d="M160,116 q8,28 -2,50 q-10,-6 -4,-36z"
        fill="url(#potionSurface)"
      />

      <Box
        component="circle"
        cx="240"
        cy="112"
        r="12"
        fill="url(#potionSurface)"
      />
      <Box
        component="circle"
        cx="280"
        cy="112"
        r="10"
        fill="url(#potionSurface)"
      />

      <Box component="g" fill="#b6ffdd" opacity="0.9">
        <Box component="circle" cx="260" cy="116" r="14">
          <Box
            component="animate"
            attributeName="cy"
            values="116;20"
            dur="5s"
            repeatCount="indefinite"
          />
          <Box
            component="animate"
            attributeName="opacity"
            values="1;0;1"
            dur="5s"
            repeatCount="indefinite"
          />
        </Box>
        <Box component="circle" cx="290" cy="116" r="12">
          <Box
            component="animate"
            attributeName="cy"
            values="116;40"
            dur="4s"
            begin="1s"
            repeatCount="indefinite"
          />
          <Box
            component="animate"
            attributeName="opacity"
            values="1;0;1"
            dur="4s"
            begin="1s"
            repeatCount="indefinite"
          />
        </Box>
        <Box component="circle" cx="230" cy="116" r="10">
          <Box
            component="animate"
            attributeName="cy"
            values="116;60"
            dur="4.5s"
            begin="0.7s"
            repeatCount="indefinite"
          />
          <Box
            component="animate"
            attributeName="opacity"
            values="1;0;1"
            dur="4.5s"
            begin="0.7s"
            repeatCount="indefinite"
          />
        </Box>
      </Box>
      <Box component="g" opacity="0.95">
        {[
          { x: 180, y: 60, r: 9, c: "#7aff9a", d: "3s" },
          { x: 340, y: 80, r: 11, c: "#a0ffff", d: "4s" },
          { x: 210, y: 90, r: 4, c: "#ff7a00", d: "2.2s" },
          { x: 300, y: 40, r: 5, c: "#f7ff91", d: "2.8s" },
          { x: 380, y: 70, r: 4, c: "#ff78d9", d: "3.1s" },
          { x: 120, y: 80, r: 4, c: "#7aff9a", d: "2.6s" },
          { x: 430, y: 100, r: 3, c: "#ffd166", d: "2.4s" },
          { x: 250, y: 60, r: 4, c: "#64b5ff", d: "2.3s" },
          { x: 160, y: 120, r: 3, c: "#ffd166", d: "2.1s" },
          { x: 400, y: 150, r: 3, c: "#c084ff", d: "2.7s" },
        ].map((s, i) => (
          <Box
            key={i}
            component="circle"
            cx={`${s.x}`}
            cy={`${s.y}`}
            r={`${s.r}`}
            fill={s.c}
          >
            <Box
              component="animate"
              attributeName="opacity"
              values="0.6;1;0.6"
              dur={s.d}
              repeatCount="indefinite"
            />
            <Box
              component="animate"
              attributeName="r"
              values={`${s.r};${s.r + 3};${s.r}`}
              dur={s.d}
              repeatCount="indefinite"
            />
          </Box>
        ))}
        {[
          { x: 240, y: 60 },
          { x: 280, y: 30 },
          { x: 160, y: 45 },
          { x: 400, y: 55 },
          { x: 450, y: 140 },
          { x: 120, y: 140 },
        ].map((t, i) => (
          <Box
            key={`tw-${i}`}
            component="circle"
            cx={`${t.x}`}
            cy={`${t.y}`}
            r="2"
            fill="#ffffff"
          >
            <Box
              component="animate"
              attributeName="opacity"
              values="1;0.2;1"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </Box>
        ))}
      </Box>
    </SvgIcon>
  );
}

export default CauldronIcon;
