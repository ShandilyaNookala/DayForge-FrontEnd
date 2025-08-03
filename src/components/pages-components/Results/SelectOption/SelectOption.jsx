import { MenuItem, Select } from "@mui/material";
import styles from "./SelectOption.module.css";

function SelectOption({ grade, dispatch }) {
  return (
    <Select
      value={grade}
      variant="outlined"
      className={styles.select}
      onChange={(e) => dispatch({ type: "setGrade", payload: +e.target.value })}
    >
      <MenuItem value={0}>Birdie</MenuItem>
      <MenuItem value={1}>Obsolete</MenuItem>
      <MenuItem value={2}>Below Avg.</MenuItem>
      <MenuItem value={3}>Average</MenuItem>
      <MenuItem value={4}>Above Avg.</MenuItem>
      <MenuItem value={5}>Excellent</MenuItem>
    </Select>
  );
}

export default SelectOption;
