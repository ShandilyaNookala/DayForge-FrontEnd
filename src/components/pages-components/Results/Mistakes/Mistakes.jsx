import { Box, Checkbox } from "@mui/material";

function Mistakes({ mistakes, dispatch }) {
  if (!mistakes) return null;
  return (
    <>
      {Array.isArray(mistakes) &&
        mistakes.map((mistake, i) => (
          <Box key={mistake.id}>
            <Checkbox
              checked={mistake.checked}
              onChange={(e) =>
                dispatch({
                  type: "changeMistake",
                  payload: mistake.id,
                })
              }
            />
            <Box component="label">{mistake.name}</Box>
          </Box>
        ))}
    </>
  );
}

export default Mistakes;
