import { TextField } from "@mui/material";

function StandardWork({ manualInputWork, onChangeManualInputWork }) {
  return (
    <TextField
      value={manualInputWork ? manualInputWork : ""}
      onChange={(e) => onChangeManualInputWork(e.target.value)}
      multiline
      className="default-text-field"
    />
  );
}

export default StandardWork;
