import { Box } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import styles from "./ChangeRuleOrder.module.css";

function ChangeRuleOrder({ ruleInputs, onChangeOrder }) {
  return (
    <ReactSortable
      list={ruleInputs}
      setList={onChangeOrder}
      className={styles.sortableContainer}
      animation={150}
    >
      {ruleInputs.map((ruleInput) => (
        <Box key={ruleInput._id} className={styles.draggable}>
          {ruleInput.name}
        </Box>
      ))}
    </ReactSortable>
  );
}

export default ChangeRuleOrder;
