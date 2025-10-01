import { Box, Button, TextField } from "@mui/material";
import styles from "./AddNewRule.module.css";
import { useState } from "react";
import { sendAPI } from "../../../utils/helpers";
import { baseUrl } from "../../../utils/config";
import { useNavigate } from "react-router";

function AddNewRule() {
  const [newRuleName, setNewRuleName] = useState("");
  const [isAddNewRuleShowing, setIsAddNewRuleShowing] = useState(false);

  const navigate = useNavigate();

  async function handleAddNewRule() {
    if (!newRuleName.trim()) {
      alert("Please enter a rule name.");
      return;
    }

    const response = await sendAPI("POST", `${baseUrl}/rules/create-new-rule`, {
      ruleName: newRuleName,
    });

    setIsAddNewRuleShowing(false);
    navigate(`/rules/see-rule/${response.data._id}`);
  }

  function showAddNewRule() {
    setIsAddNewRuleShowing(true);
  }

  return (
    <>
      {isAddNewRuleShowing ? (
        <Box className={styles.addNewRuleBox}>
          <Box className={styles.addNewRuleContainer}>
            <TextField
              label="New Rule Name"
              className={styles.addNewRuleTextField}
              value={newRuleName}
              onChange={(e) => setNewRuleName(e.target.value)}
            />
            <Button className={styles.addRuleButton} onClick={handleAddNewRule}>
              Add Rule
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          to="add-rule"
          className={`btn ${styles.addRule}`}
          onClick={showAddNewRule}
        >
          Add New Rule
        </Button>
      )}
    </>
  );
}

export default AddNewRule;
