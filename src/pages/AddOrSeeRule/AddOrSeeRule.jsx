import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../../utils/config.js";
import { sendAPI } from "../../utils/helpers.js";

import RuleCategory from "../../components/pages-components/AddOrSeeRule/RuleCategory/RuleCategory.jsx";
import ChangedRuleCategory from "../../components/pages-components/AddOrSeeRule/ChangedRuleCategory/ChangedRuleCategory.jsx";
import Header from "../../components/global-components/Header/Header.jsx";
import Footer from "../../components/global-components/Footer/Footer.jsx";

import styles from "./AddOrSeeRule.module.css";
import { Box, Button, Container, TextField } from "@mui/material";
import InfoCard from "../../components/global-components/InfoCard/InfoCard.jsx";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/global-components/Spinner/Spinner.jsx";
import { useBeforeUnload } from "react-router-dom";
import ChangeRuleOrder from "../../components/pages-components/AddOrSeeRule/ChangeRuleOrder/ChangeRuleOrder.jsx";
import BackButton from "../../components/global-components/BackButton/BackButton.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AddOrSeeRule() {
  const handleClose = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }, []);

  useBeforeUnload(handleClose);

  const { id } = useParams();

  const navigate = useNavigate();

  const [ruleCategoryShowing, setRuleCategoryShowing] = useState(false);
  const [ruleInputs, setRuleInputs] = useState([]);
  const [ruleName, setRuleName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const ruleCategorySet = new Set();
  const ruleCategories = ruleInputs
    .filter((ruleInput) => {
      if (!ruleCategorySet.has(ruleInput.type)) {
        ruleCategorySet.add(ruleInput.type);
        return true;
      }
      return false;
    })
    .map((ruleInput) => ruleInput.type);

  const validRuleInputs = ruleInputs.filter((ruleInput) => ruleInput.name);
  const invalidRuleInputs = ruleInputs.filter((ruleInput) => !ruleInput.name);

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        if (id) {
          const rule = (
            await sendAPI("GET", `${baseUrl}/rules/rule-exists/${id}`)
          ).data;
          if (!rule) return;
          setRuleInputs(
            rule.ruleInputs.map((ruleInput) => {
              return {
                ...ruleInput,
                isAddingRuleInput: false,
              };
            })
          );
          setRuleName(rule.ruleName);
        }
        setIsLoading(false);
      }
      getData();
    },
    [id]
  );

  function handleRuleCategoryShowing() {
    setRuleCategoryShowing(true);
  }

  function handleSaveRuleCategory(inputValue, index) {
    if (!inputValue) return;
    if (index !== -1) {
      setRuleInputs((ruleInputs) =>
        ruleInputs.map((ruleInput) =>
          ruleInput.type === ruleCategories[index]
            ? { ...ruleInput, type: inputValue }
            : ruleInput
        )
      );
    } else {
      setRuleInputs((ruleInputs) => [
        ...ruleInputs,
        { type: inputValue, name: null, points: null },
      ]);
    }
  }

  function handleSaveRuleInput(newRuleInput) {
    const existingRuleInput = ruleInputs.find(
      (ruleInput) => ruleInput._id === newRuleInput._id
    );
    setRuleInputs((ruleInputs) => {
      if (existingRuleInput)
        return ruleInputs.map((ruleInput) =>
          ruleInput._id === newRuleInput._id
            ? { ...newRuleInput, _id: ruleInput._id }
            : ruleInput
        );
      else return [...ruleInputs, newRuleInput];
    });
  }

  function handleChangeOrder(newRuleInputs) {
    setRuleInputs(() => [...newRuleInputs, ...invalidRuleInputs]);
  }

  async function handleSaveAndCloseRules() {
    if (
      ruleCategories.length === 0 ||
      validRuleInputs.length === 0 ||
      ruleName === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      ruleInputs: validRuleInputs.map((ruleInput) => {
        if (ruleInput.isAddingRuleInput) delete ruleInput._id;
        delete ruleInput.isAddingRuleInput;
        return ruleInput;
      }),
      ruleName,
    };
    id
      ? await sendAPI("PATCH", `${baseUrl}/rules/${id}`, requestBody)
      : await sendAPI("POST", `${baseUrl}/rules/create-new-rule`, requestBody);
    navigate(-1);
  }

  if (!user.isAdmin) return <Box>You are not authorized to view this page</Box>;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>{id ? `See rules for ${ruleName}` : "Add Rule"}</Header>
          <Container className={styles.addOrSeeRulesContainer}>
            <BackButton url={-1} />
            <Box>
              {ruleCategories.map((ruleCategory, i) => (
                <RuleCategory
                  ruleCategoryName={ruleCategory}
                  ruleInputs={ruleInputs}
                  onSaveRuleInput={handleSaveRuleInput}
                  onSaveRuleCategory={handleSaveRuleCategory}
                  key={i}
                  index={i}
                />
              ))}
              {ruleCategoryShowing && (
                <ChangedRuleCategory
                  onSaveRuleCategory={handleSaveRuleCategory}
                  defaultRuleCategory=""
                  handleStopRuleCategoryShowing={() =>
                    setRuleCategoryShowing(false)
                  }
                  index={-1}
                />
              )}
              <br />
              <Button onClick={handleRuleCategoryShowing}>
                + Add Rule Category
              </Button>
            </Box>
            <Box>
              <InfoCard>
                <Box>
                  Rule Name:{" "}
                  <TextField
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    className="default-text-field"
                  />
                </Box>
                <Box>
                  <Button
                    className={styles.saveAndCloseButton}
                    onClick={handleSaveAndCloseRules}
                  >
                    Save all rules and close
                  </Button>
                </Box>
              </InfoCard>
            </Box>
            <ChangeRuleOrder
              ruleInputs={validRuleInputs}
              onChangeOrder={handleChangeOrder}
            />
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
