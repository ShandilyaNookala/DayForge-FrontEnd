import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import sharedStyles from "../shared.module.css";
import styles from "./RuleInput.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";

function RuleInput({
  ruleInput,
  onSaveRuleInput,
  ruleId,
  setRule,
  setIsLoading,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  async function handleEditRuleInput(...params) {
    await onSaveRuleInput(...params);
    setIsEditing(false);
  }

  function handleDeleteRuleInput() {
    setIsDeleteOpen(true);
  }

  async function handleSaveDeleteRuleInput() {
    setIsDeleteOpen(false);
    setIsLoading(true);
    const rule = (
      await sendAPI(
        "DELETE",
        `${baseUrl}/rules/${ruleId}/delete-rule-input/${ruleInput._id}`
      )
    ).data;
    setIsLoading(false);
    setRule(rule);
  }

  return (
    <Box className={styles.container}>
      {isEditing ? (
        <ChangedRuleInput
          ruleInput={ruleInput}
          onSaveRuleInput={handleEditRuleInput}
        />
      ) : (
        <>
          <Typography className={`${sharedStyles.typography} ${styles.text}`}>
            {ruleInput.name} — {ruleInput.points} pts
          </Typography>
          <Button
            size="small"
            className={styles.editBtn}
            onClick={() => setIsEditing(true)}
          >
            <Edit fontSize="small" />
          </Button>
          <Button
            size="small"
            className={styles.deleteBtn}
            onClick={handleDeleteRuleInput}
          >
            <DeleteForeverIcon fontSize="small" />
          </Button>
          <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <DialogTitle>Delete rule input?</DialogTitle>
            <DialogContent>
              <Typography>
                Removing this rule input will also delete all records that use
                it in every task linked to this rule. This action cannot be
                undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button color="error" onClick={handleSaveDeleteRuleInput}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default RuleInput;
