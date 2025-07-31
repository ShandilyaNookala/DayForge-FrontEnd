import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/config.js";
import { sendAPI } from "../../utils/helpers.js";

import RuleCategory from "../../components/pages-components/SeeRule/RuleCategory/RuleCategory.jsx";
import Header from "../../components/global-components/Header/Header.jsx";
import Footer from "../../components/global-components/Footer/Footer.jsx";

import styles from "./SeeRule.module.css";
import { Box, Button, Container, TextField } from "@mui/material";
import { useParams } from "react-router";
import Spinner from "../../components/global-components/Spinner/Spinner.jsx";
import ChangeRuleOrder from "../../components/pages-components/SeeRule/ChangeRuleOrder/ChangeRuleOrder.jsx";
import BackButton from "../../components/global-components/BackButton/BackButton.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import NotAuthorized from "../../components/global-components/NotAuthorized/NotAuthorized.jsx";
import ChangedRuleCategory from "../../components/pages-components/SeeRule/ChangedRuleCategory/ChangedRuleCategory.jsx";

export default function SeeRule() {
  const [rule, setRule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ruleName, setRuleName] = useState("");
  const [isAddingRuleCategory, setIsAddingRuleCategory] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

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

  async function handleSaveRuleName() {
    if (!ruleName) {
      alert("Please enter a rule name.");
      return;
    }

    setIsLoading(true);
    await sendAPI("PATCH", `${rulesBaseUrl}/update-rule-name`, {
      newRuleName: ruleName,
    });
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

  async function handleChangeOrder(newRuleInputs) {
    setRule((rule) => {
      return { ...rule, ruleInputs: newRuleInputs };
    });
  }

  async function handleSaveRuleInputOrder() {
    setIsLoading(true);
    await sendAPI("PATCH", `${rulesBaseUrl}/change-rule-input-order`, {
      newRuleInputs: rule.ruleInputs,
    });
    setIsLoading(false);
    setHasDragged(false);
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
          <Container className={styles.seeRuleContainer}>
            <BackButton url={-1} />
            {!user?.isAdmin ? (
              <NotAuthorized />
            ) : (
              <>
                <Box className={styles.ruleCategoriesBox}>
                  {hasDragged ? null : (
                    <>
                      {rule?.ruleCategories.map((ruleCategory) => (
                        <RuleCategory
                          ruleCategory={ruleCategory}
                          ruleId={rule._id}
                          ruleInputs={rule?.ruleInputs.filter(
                            (ruleInput) =>
                              ruleInput.ruleCategoryId === ruleCategory._id
                          )}
                          key={ruleCategory._id}
                          onEditRuleCategory={handleSaveRuleCategory}
                          onSaveRuleInput={handleSaveRuleInput}
                          setRule={setRule}
                          setIsLoading={setIsLoading}
                        />
                      ))}
                      {isAddingRuleCategory ? (
                        <ChangedRuleCategory
                          onSaveRuleCategory={handleSaveRuleCategory}
                        />
                      ) : (
                        <Button onClick={() => setIsAddingRuleCategory(true)}>
                          + Add Rule Category
                        </Button>
                      )}
                    </>
                  )}
                </Box>
                <ChangeRuleOrder
                  ruleInputs={rule.ruleInputs}
                  onChangeOrder={handleChangeOrder}
                  onSaveRuleInputOrder={handleSaveRuleInputOrder}
                  hasDragged={hasDragged}
                  setHasDragged={setHasDragged}
                />
              </>
            )}
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
