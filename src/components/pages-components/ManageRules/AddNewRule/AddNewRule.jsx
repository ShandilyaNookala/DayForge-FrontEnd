import { Box, Button, TextField } from "@mui/material";
import styles from "./AddNewRule.module.css";
import { useState } from "react";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";
import { useNavigate } from "react-router";

function AddNewRule() {
  const [newRuleName, setNewRuleName] = useState("");

  const navigate = useNavigate();

  async function handleAddNewRule() {
    if (!newRuleName.trim()) {
      alert("Please enter a rule name.");
      return;
    }

    const response = await sendAPI("POST", `${baseUrl}/rules/create-new-rule`, {
      ruleName: newRuleName,
    });

    navigate(`/rules/see-rule/${response.data._id}`);
  }

  return (
    <Box className={styles.addNewRuleBox}>
      <Box className={styles.addNewRuleContainer}>
        <TextField
          label="New Rule Name"
          className={styles.addNewRuleTextField}
          value={newRuleName}
          onChange={(e) => setNewRuleName(e.target.value)}
        />
        <Button
          className={styles.addRuleButton}
          variant="contained"
          onClick={handleAddNewRule}
        >
          Add Rule
        </Button>
      </Box>
    </Box>
  );
}

export default AddNewRule;
