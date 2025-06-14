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
      {ruleInputs
        // .filter((ruleInput) => ruleInput.name)
        .map((ruleInput, index) => (
          <Box
            key={ruleInput._id || ruleInput.id || index}
            className={styles.draggable}
          >
            {ruleInput.name}
          </Box>
        ))}
    </ReactSortable>
  );
}

export default ChangeRuleOrder;
