import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import NotAuthorized from "../../../global-components/NotAuthorized/NotAuthorized.jsx";
import Spinner from "../../../global-components/Spinner/Spinner.jsx";
import { sendAPI } from "../../../../utils/helpers.js";
import { baseUrl } from "../../../../utils/config";
import { useRecords } from "../../../../contexts/RecordsContext";
import styles from "./AddNewRuleForTask.module.css";

function AddNewRuleForTask() {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [allRules, setAllRules] = useState([]);

  const { user } = useAuth();
  const { updateRuleForTask } = useRecords();

  useEffect(
    function () {
      async function fetchAllRules() {
        setIsLoading(true);
        const response = await sendAPI("GET", `${baseUrl}/rules/get-all-rules`);
        console.log(response);
        setAllRules(response.data);
        setIsLoading(false);
      }
      if (isAdding) fetchAllRules();
    },
    [isAdding]
  );

  function handleStopPropagation(e) {
    if (
      e.key === " " ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "Enter"
    ) {
      e.stopPropagation();
    }
  }

  async function handleSaveRuleForTask() {
    if (!selectedRule) return;
    await updateRuleForTask(selectedRule.id);
  }

  return (
    <>
      {user?.isAdmin ? (
        !isAdding ? (
          <Button onClick={() => setIsAdding(true)}>
            Add New Rule For This Task
          </Button>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Box className={styles.autocompleteContainer}>
            <Autocomplete
              value={selectedRule}
              onChange={(_, newSelectedRule) =>
                setSelectedRule(newSelectedRule)
              }
              className={`default-text-field ${styles.autocomplete}`}
              options={allRules || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Rule"
                  onKeyDown={handleStopPropagation}
                />
              )}
            />
            <Button onClick={handleSaveRuleForTask}>Save</Button>
          </Box>
        )
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default AddNewRuleForTask;
