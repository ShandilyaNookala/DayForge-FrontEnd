import { Button, TextField } from "@mui/material";
import { useState } from "react";
import sharedStyles from "../shared.module.css";

function ChangedRuleCategory({ ruleCategory = null, onSaveRuleCategory }) {
  const [newCategoryName, setNewCategoryName] = useState(
    ruleCategory?.name || ""
  );

  async function handleSaveRuleCategory() {
    await onSaveRuleCategory(ruleCategory?._id, newCategoryName);
  }

  return (
    <>
      <TextField
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        className={sharedStyles.ruleTextField}
        label="Rule Category Name"
      />
      <Button onClick={handleSaveRuleCategory}>Save</Button>
    </>
  );
}

export default ChangedRuleCategory;
