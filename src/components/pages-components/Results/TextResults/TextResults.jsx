import { TextField } from "@mui/material";

function TextResults({ value, dispatch, type }) {
  return (
    <TextField
      multiline
      className="default-text-field"
      value={value || ""}
      onChange={(e) =>
        dispatch({ type: `${type}ValText`, payload: e.target.value })
      }
    />
  );
}

export default TextResults;
