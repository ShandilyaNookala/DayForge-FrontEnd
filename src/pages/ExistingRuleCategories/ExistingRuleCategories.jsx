import { Box, Button, Checkbox } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import NotAuthorized from "../../components/global-components/NotAuthorized/NotAuthorized";
import Spinner from "../../components/global-components/Spinner/Spinner";
import { useRecords } from "../../contexts/RecordsContext";
import { sendAPI } from "../../utils/helpers";
import { baseUrl } from "../../utils/config";
import styles from "./ExistingRuleCategories.module.css";
import { useNavigate } from "react-router";

function ExistingRuleCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [existingRuleCategories, setExistingRuleCategories] = useState([]);

  const navigate = useNavigate();

  const { user } = useAuth();
  const { recordsData, updateSkippedRuleCategories } = useRecords();

  const originalSkippedRuleCategories = useRef(null);

  useEffect(
    function () {
      async function fetchExistingRuleCategories() {
        setIsLoading(true);
        const response = await sendAPI(
          "GET",
          `${baseUrl}/rules/get-existing-rule-categories/${recordsData._id}`,
        );
        setExistingRuleCategories(response.data);
        originalSkippedRuleCategories.current = getSkippedCategoryIds(
          response.data,
        );
        setIsLoading(false);
      }
      if (recordsData?._id) fetchExistingRuleCategories();
    },
    [recordsData?._id],
  );

  const skippedCategoryIds = getSkippedCategoryIds(existingRuleCategories);

  function getSkippedCategoryIds(arr) {
    return arr
      .filter((category) => !category.checked)
      .map((category) => category.id);
  }

  function handleCheckboxChange(id) {
    setExistingRuleCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, checked: !category.checked }
          : category,
      ),
    );
  }

  async function handleSaveSkippedCategories() {
    await updateSkippedRuleCategories(skippedCategoryIds);
    navigate(`/course/${recordsData._id}`);
  }

  return (
    <>
      {!user.isAdmin && !recordsData.rule ? (
        <NotAuthorized />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Box className={styles.existingRuleCategories}>
          <Box className={styles.existingRuleCategoriesColumns}>
            Existing Rule Categories
          </Box>
          <Box className={styles.existingRuleCategoriesColumns}>
            <Box>
              {existingRuleCategories.map((existingRuleCategory) => (
                <Box key={existingRuleCategory.id}>
                  <Checkbox
                    checked={existingRuleCategory.checked}
                    onChange={() =>
                      handleCheckboxChange(existingRuleCategory.id)
                    }
                  />
                  <Box component="label">{existingRuleCategory.label}</Box>
                </Box>
              ))}
            </Box>
            <Box>
              <Button
                disabled={
                  skippedCategoryIds.length ===
                    originalSkippedRuleCategories.current.length &&
                  skippedCategoryIds.every(
                    (value, index) =>
                      value === originalSkippedRuleCategories.current[index],
                  )
                }
                onClick={handleSaveSkippedCategories}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ExistingRuleCategories;
