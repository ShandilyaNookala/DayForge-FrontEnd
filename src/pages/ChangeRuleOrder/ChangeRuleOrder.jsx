import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import styles from "./ChangeRuleOrder.module.css";
import { baseUrl } from "../../utils/config.js";
import { sendAPI } from "../../utils/helpers.js";
import Header from "../../components/global-components/Header/Header.jsx";
import BackButton from "../../components/global-components/BackButton/BackButton.jsx";

function ChangeRuleOrder() {
  const { id } = useParams();

  const [ruleInputs, setRuleInputs] = useState([]);
  const [hasDragged, setHasDragged] = useState(false);
  const [droppedItemId, setDroppedItemId] = useState(null);

  useEffect(() => {
    async function fetchRule() {
      const response = await sendAPI("GET", `${baseUrl}/rules/get-rule/${id}`);
      setRuleInputs(response.data.ruleInputs);
    }
    if (id) fetchRule();
  }, [id]);

  function handleSetList(newList) {
    setRuleInputs(newList);
  }

  async function handleSave() {
    await sendAPI("PATCH", `${baseUrl}/rules/${id}/change-rule-input-order`, {
      newRuleInputs: ruleInputs,
    });
  }

  function handleDragEnd(e) {
    setHasDragged(true);
    setDroppedItemId(e.clone.dataset.id);
  }

  return (
    <>
      <Header />
      <Container>
        <Box className={styles.pageRow}>
          <Box className={styles.side}>
            <BackButton url={-1} />
          </Box>
          <Box className={styles.container}>
            <ReactSortable
              list={ruleInputs}
              onEnd={handleDragEnd}
              setList={handleSetList}
              className={styles.sortableGrid}
              animation={150}
              scroll={true}
              scrollSensitivity={60}
              scrollSpeed={12}
            >
              {ruleInputs.map((ruleInput, i) => {
                return (
                  <Box
                    key={ruleInput._id}
                    data-id={ruleInput._id}
                    className={`${styles.draggable} ${
                      ruleInput._id === droppedItemId ? styles.dropped : ""
                    }`}
                  >
                    {i + 1}. {ruleInput.name}
                  </Box>
                );
              })}
            </ReactSortable>
            {hasDragged && (
              <Button
                variant="contained"
                onClick={handleSave}
                className={styles.saveButton}
              >
                Save Order
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ChangeRuleOrder;
