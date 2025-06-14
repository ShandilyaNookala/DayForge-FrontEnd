import TextResults from "../TextResults/TextResults";
import { Box, Checkbox } from "@mui/material";

function NextWork({ nextWork, dispatch }) {
  return (
    <Box>
      {!Array.isArray(nextWork) ? (
        <TextResults value={nextWork} dispatch={dispatch} type="nextWork" />
      ) : (
        nextWork.map((work, i) => (
          <Box key={work.id}>
            <Checkbox
              checked={work.checked}
              onChange={() => dispatch({ type: "changeNextWork", payload: i })}
            />
            <Box component="label">{work.name}</Box>
          </Box>
        ))
      )}
    </Box>
  );
}

export default NextWork;
