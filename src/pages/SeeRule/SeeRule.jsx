import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../utils/config.js";
import { sendAPI } from "../../utils/helpers.js";

import RuleCategory from "../../components/pages-components/SeeRule/RuleCategory/RuleCategory.jsx";
import Header from "../../components/global-components/Header/Header.jsx";

import styles from "./SeeRule.module.css";
import { Box, Button, Container, TextField } from "@mui/material";
import { useParams } from "react-router";
import Spinner from "../../components/global-components/Spinner/Spinner.jsx";
import BackButton from "../../components/global-components/BackButton/BackButton.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import NotAuthorized from "../../components/global-components/NotAuthorized/NotAuthorized.jsx";
import ChangedRuleCategory from "../../components/pages-components/SeeRule/ChangedRuleCategory/ChangedRuleCategory.jsx";
import { Link } from "react-router-dom";

export default function SeeRule() {
  const [rule, setRule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ruleName, setRuleName] = useState("");
  const [isAddingRuleCategory, setIsAddingRuleCategory] = useState(false);
  const ruleCategoriesRef = useRef(null);

  const { id } = useParams();

  const { user } = useAuth();

  const rulesBaseUrl = `${baseUrl}/rules/${id}`;

  useEffect(
    function () {
      async function fetchRule() {
        setIsLoading(true);
        const response = await sendAPI(
          "GET",
          `${baseUrl}/rules/get-rule/${id}`
        );
        setRule(response.data);
        setRuleName(response.data.ruleName);
        setIsLoading(false);
      }

      if (id) fetchRule();
    },
    [id]
  );

  useEffect(
    function () {
      if (isAddingRuleCategory && ruleCategoriesRef.current) {
        const container = ruleCategoriesRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    [isAddingRuleCategory]
  );

  async function handleSaveRuleName() {
    if (!ruleName) {
      alert("Please enter a rule name.");
      return;
    }

    setIsLoading(true);
    const rule = (
      await sendAPI("PATCH", `${rulesBaseUrl}/update-rule-name`, {
        newRuleName: ruleName,
      })
    ).data;
    setRule(rule);
    setIsLoading(false);
  }

  async function handleSaveRuleCategory(ruleCategoryId, ruleCategoryName) {
    if (!ruleCategoryName) {
      alert("Please enter a rule category name.");
      return;
    }

    const body = { newRuleCategoryName: ruleCategoryName };

    const response = ruleCategoryId
      ? await sendAPI(
          "PATCH",
          `${rulesBaseUrl}/update-rule-category/${ruleCategoryId}`,
          body
        )
      : await sendAPI("PATCH", `${rulesBaseUrl}/add-rule-category`, body);
    setRule(response.data);
    setIsAddingRuleCategory(false);
  }

  async function handleSaveRuleInput(
    ruleInputId,
    ruleInputName,
    ruleInputPoints,
    ruleCategoryId
  ) {
    if (!ruleInputName) {
      alert("Please enter a rule input name.");
      return;
    }

    const body = {
      newRuleInputName: ruleInputName,
      newRuleInputPoints: ruleInputPoints,
      ruleCategoryId,
    };

    const response = ruleInputId
      ? await sendAPI(
          "PATCH",
          `${rulesBaseUrl}/update-rule-input/${ruleInputId}`,
          body
        )
      : await sendAPI("PATCH", `${rulesBaseUrl}/add-rule-input`, body);
    setRule(response.data);
  }


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>
            <Box className={styles.headerBox}>
              See Rule for
              <TextField
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="default-text-field"
              />
              <Button
                disabled={ruleName === rule.ruleName}
                onClick={handleSaveRuleName}
              >
                Save Rule Name
              </Button>
            </Box>
          </Header>
          <Container
            maxWidth={false}
            disableGutters
            className={styles.seeRuleContainer}
          >
            <BackButton url={-1} />
            {!user?.isAdmin ? (
              <NotAuthorized />
            ) : (
              <>
                <Box
                  className={styles.ruleCategoriesBox}
                  ref={ruleCategoriesRef}
                >
                  <>
                    {rule?.ruleCategories.map((ruleCategory) => (
                      <RuleCategory
                        ruleCategory={ruleCategory}
                        defaultStandardPoints={ruleCategory.standardPoints}
                        ruleId={rule._id}
                        ruleInputs={rule?.ruleInputs.filter(
                          (ruleInput) =>
                            ruleInput.ruleCategoryId === ruleCategory._id
                        )}
                        key={ruleCategory._id}
                        onEditRuleCategory={handleSaveRuleCategory}
                        onSaveRuleInput={handleSaveRuleInput}
                        setRule={setRule}
                      />
                    ))}
                    {isAddingRuleCategory && (
                      <ChangedRuleCategory
                        onSaveRuleCategory={handleSaveRuleCategory}
                      />
                    )}
                  </>
                </Box>
                <Box className={styles.reorderAbsolute}>
                  <Link to="reorder" className="btn">
                    Reorder Rule Inputs
                  </Link>
                </Box>
              </>
            )}
            {!isAddingRuleCategory && (
              <Button
                className={`${styles.addCategoryBtn} ${styles.fullRow}`}
                onClick={() => setIsAddingRuleCategory(true)}
              >
                + Add Rule Category
              </Button>
            )}
          </Container>
        </>
      )}
    </>
  );
}
