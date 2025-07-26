import { Box, Button } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import styles from "./ChangeRuleOrder.module.css";

function ChangeRuleOrder({
  ruleInputs,
  onChangeOrder,
  onSaveRuleInputOrder,
  hasDragged,
  setHasDragged,
}) {
  return (
    <>
      <ReactSortable
        list={ruleInputs}
        onEnd={() => setHasDragged(true)}
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
      {hasDragged && (
        <Button onClick={onSaveRuleInputOrder} className={styles.saveButton}>
          Save Order
        </Button>
      )}
    </>
  );
}

export default ChangeRuleOrder;
