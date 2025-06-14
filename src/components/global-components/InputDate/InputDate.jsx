import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./InputDate.module.css";
import dayjs from "dayjs";

function InputDate({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} color="inherit">
      <DatePicker
        className={styles.inputDate}
        label="Enter date"
        value={dayjs(date)}
        onChange={(newValue) => {
          if (newValue) {
            const date = dayjs(newValue).toDate();
            setDate(date);
          } else {
            setDate(null);
          }
        }}
      />
    </LocalizationProvider>
  );
}

export default InputDate;
