import { Box, Button, TextField, Typography } from "@mui/material";
import RuleInput from "../RuleInput/RuleInput";
import { useState } from "react";
import { Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import sharedStyles from "../shared.module.css";
import styles from "./RuleCategory.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import ChangedRuleCategory from "../ChangedRuleCategory/ChangedRuleCategory";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";
import Spinner from "../../../global-components/Spinner/Spinner.jsx";

function RuleCategory({
  ruleCategory,
  ruleInputs,
  onEditRuleCategory,
  onSaveRuleInput,
  ruleId,
  setRule,
  defaultStandardPoints,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingRuleInput, setIsAddingRuleInput] = useState(false);
  const [standardPoints, setStandardPoints] = useState(defaultStandardPoints);
  const [bulkEditPoints, setBulkEditPoints] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkEditHasChanged, setBulkEditHasChanged] = useState(false);
  const [standardPointsHasChanged, setStandardPointsHasChanged] =
    useState(false);

  async function handleEditRuleCategory(...params) {
    await onEditRuleCategory(...params);
    setIsEditing(false);
  }

  async function handleSaveRuleInput(...params) {
    await onSaveRuleInput(...params, ruleCategory._id);
    setIsAddingRuleInput(false);
  }

  async function handleSaveStandardPoints() {
    if (standardPoints < 0) {
      alert("Points cannot be negative.");
      return;
    }
    setIsLoading(true);
    const rule = await sendAPI(
      "PATCH",
      `${baseUrl}/rules/${ruleId}/update-standard-points/${ruleCategory._id}`,
      {
        standardPoints,
      }
    );
    setRule(rule.data);
    setStandardPointsHasChanged(false);
    setIsLoading(false);
  }

  async function handleSaveBulkEditPoints() {
    if (bulkEditPoints < 0) {
      alert("Points cannot be negative.");
      return;
    }
    setIsLoading(true);
    const rule = await sendAPI(
      "PATCH",
      `${baseUrl}/rules/${ruleId}/bulk-edit-points/${ruleCategory._id}`,
      {
        bulkEditPoints,
      }
    );
    setRule(rule.data);
    setBulkEditHasChanged(false);
    setIsLoading(false);
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Box className={styles.container}>
      {!isEditing ? (
        <>
          <Box className={styles.header}>
            <Typography
              variant="h5"
              className={`${sharedStyles.typography} ${styles.title}`}
            >
              {ruleCategory.name}
            </Typography>
            <Button
              size="small"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className={styles.actionBtn}
            >
              {isCollapsed ? (
                <ExpandMore fontSize="small" />
              ) : (
                <ExpandLess fontSize="small" />
              )}
            </Button>
            <Button
              size="small"
              onClick={() => setIsEditing((prev) => !prev)}
              className={styles.actionBtn}
            >
              <Edit fontSize="small" />
            </Button>
          </Box>
          <Box
            className={`${styles.collapseWrapper} ${
              isCollapsed && styles.collapsed
            }`}
          >
            <Box className={styles.fields}>
              <TextField
                label="Standard Points"
                className={`${sharedStyles.ruleTextField} ${styles.textField}`}
                value={standardPoints}
                onChange={(e) => {
                  setStandardPoints(e.target.value);
                  setStandardPointsHasChanged(true);
                }}
              />
              <Button
                onClick={handleSaveStandardPoints}
                className={styles.actionBtn}
                disabled={!standardPointsHasChanged}
              >
                Save Standard Points
              </Button>
              <TextField
                label="Bulk Edit Points"
                className={`${sharedStyles.ruleTextField} ${styles.textField}`}
                value={bulkEditPoints}
                onChange={(e) => {
                  setBulkEditPoints(e.target.value);
                  setBulkEditHasChanged(true);
                }}
              />
              <Button
                onClick={handleSaveBulkEditPoints}
                className={styles.actionBtn}
                disabled={!bulkEditHasChanged}
              >
                Save Bulk Edit Points
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <ChangedRuleCategory
          ruleCategory={ruleCategory}
          onSaveRuleCategory={handleEditRuleCategory}
        />
      )}
      <Box
        className={`${styles.collapseWrapper} ${
          isCollapsed ? styles.collapsed : styles.expanded
        }`}
      >
        <Box className={styles.ruleInputs}>
          {ruleInputs.map((ruleInput) => (
            <RuleInput
              ruleInput={ruleInput}
              onSaveRuleInput={handleSaveRuleInput}
              key={ruleInput._id}
            />
          ))}
        </Box>
        {isAddingRuleInput ? (
          <ChangedRuleInput
            onSaveRuleInput={handleSaveRuleInput}
            standardPoints={standardPoints}
          />
        ) : (
          <Box className={styles.categoryFooter}>
            <Button
              className={styles.actionBtn}
              onClick={() => setIsAddingRuleInput(true)}
            >
              + Add Rule Input
            </Button>
            <Button
              size="small"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className={styles.actionBtn}
            >
              {isCollapsed ? (
                <ExpandMore fontSize="small" />
              ) : (
                <ExpandLess fontSize="small" />
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RuleCategory;
