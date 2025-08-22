import { useEffect, useMemo, useReducer } from "react";
import { baseUrl } from "../../utils/config.js";
import { sendAPI } from "../../utils/helpers.js";

import Mistakes from "../../components/pages-components/Results/Mistakes/Mistakes.jsx";
import TextResults from "../../components/pages-components/Results/TextResults/TextResults.jsx";
import SelectOption from "../../components/pages-components/Results/SelectOption/SelectOption.jsx";
import NextWork from "../../components/pages-components/Results/NextWork/NextWork.jsx";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Spinner from "../../components/global-components/Spinner/Spinner.jsx";
import { useNavigate, useParams } from "react-router";
import { useRecords } from "../../contexts/RecordsContext.jsx";
import styles from "./Results.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import NotAuthorized from "../../components/global-components/NotAuthorized/NotAuthorized.jsx";

const initialState = {
  mistakes: null,
  comments: "",
  nextWork: null,
  grade: 5,
  isLoading: true,
  hasChanged: false,
  currentStep: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "setInitial": {
      const newMistakes = Array.isArray(action.payload)
        ? action.payload.map((work) => {
            return {
              checked: false,
              id: work._id,
              name: work.name,
              shouldRepeat: false,
              addMistakes: false,
            };
          })
        : null;

      return { ...state, mistakes: newMistakes };
    }
    case "setNextWorkAndGrade": {
      return {
        ...state,
        nextWork: action.payload.nextWork,
        grade: action.payload.grade,
        isLoading: false,
      };
    }
    case "changeMistake": {
      return {
        ...state,
        mistakes: state.mistakes.map((mistake) =>
          mistake.id === action.payload
            ? {
                ...mistake,
                checked: !mistake.checked,
                shouldRepeat: mistake.checked ? false : true,
              }
            : mistake
        ),
        hasChanged: true,
      };
    }
    case "changeNextWork":
      return {
        ...state,
        nextWork: state.nextWork.map((work, i) =>
          i === action.payload ? { ...work, checked: !work.checked } : work
        ),
      };
    case "toggleShouldRepeat": {
      return {
        ...state,
        mistakes: state.mistakes.map((mistake) =>
          mistake.id === action.payload
            ? { ...mistake, shouldRepeat: !mistake.shouldRepeat }
            : mistake
        ),
        hasChanged: true,
      };
    }
    case "toggleAddMistakes": {
      return {
        ...state,
        mistakes: state.mistakes.map((mistake) =>
          mistake.id === action.payload
            ? { ...mistake, addMistakes: !mistake.addMistakes }
            : mistake
        ),
        hasChanged: true,
      };
    }
    case "fetchTomorrowWork": {
      return {
        ...state,
        hasChanged: false,
      };
    }
    case "resultsValText":
      return { ...state, mistakes: action.payload };
    case "commentsValText":
      return { ...state, comments: action.payload };
    case "nextWorkValText":
      return { ...state, nextWork: action.payload };
    case "setGrade":
      return { ...state, grade: action.payload };
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "nextStep":
      return { ...state, currentStep: state.currentStep + 1 };
    case "previousStep":
      return { ...state, currentStep: state.currentStep - 1 };
    case "setCurrentStep":
      return { ...state, currentStep: action.payload };
    default:
      throw new Error("Unknown");
  }
}

function Results() {
  const { user } = useAuth();
  const [
    { mistakes, comments, nextWork, grade, isLoading, hasChanged, currentStep },
    dispatch,
  ] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const { taskId, recordId } = useParams();

  const {
    recordsData,
    setRecordsData,
    isLoading: isLoadingEntirePage,
    setIsLoading: setIsLoadingEntirePage,
  } = useRecords();

  const currentRecord = useMemo(
    function () {
      return recordsData?.records?.find((record) => record._id === recordId);
    },
    [recordId, recordsData?.records]
  );

  useEffect(
    function () {
      if (currentRecord) {
        dispatch({
          type: "setInitial",
          payload: currentRecord.work,
        });
        dispatch({ type: "setIsLoading", payload: false });
      }
    },
    [currentRecord]
  );

  async function fetchNextWork() {
    dispatch({ type: "setIsLoading", payload: true });
    try {
      const data = (
        await sendAPI(
          "POST",
          `${baseUrl}/records/get-automatic-data-with-mistakes/${taskId}/${recordId}`,
          {
            mistakes: mistakes?.filter((el) => el.checked === true),
          }
        )
      ).data;

      dispatch({
        type: "setNextWorkAndGrade",
        payload: {
          nextWork: data?.work || [],
          grade: data ? data.grade : 5,
        },
      });

      dispatch({ type: "fetchTomorrowWork" });

      return data;
    } catch (error) {
      dispatch({ type: "setIsLoading", payload: false });
      return null;
    }
  }

  async function handleResults() {
    setIsLoadingEntirePage(true);

    let currentNextWork = nextWork;
    let currentGrade = grade;

    if (
      currentStep === 1 &&
      (hasChanged ||
        !nextWork ||
        (Array.isArray(nextWork) && nextWork.length === 0))
    ) {
      const fetchedData = await fetchNextWork();
      if (fetchedData) {
        currentNextWork = fetchedData.work || [];
        currentGrade = fetchedData.grade || 5;
      }
    }

    const newWork = Array.isArray(currentNextWork)
      ? currentNextWork.filter((el) => el.checked === true).map((el) => el.id)
      : currentNextWork;

    const newMistakes = Array.isArray(mistakes)
      ? mistakes.filter((el) => el.checked === true).map((el) => el.id)
      : mistakes;

    const newRecordsData = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-or-create-record/${taskId}/${recordId}`,
      {
        grade: currentGrade,
        result: newMistakes,
        comment: comments,
        nextWork: newWork,
      }
    );
    setRecordsData(newRecordsData.data);
    navigate(`/course/${taskId}`);
    setIsLoadingEntirePage(false);
  }

  async function handleNextStep() {
    if (currentStep === 1) {
      await fetchNextWork();
      dispatch({ type: "nextStep" });
    } else {
      dispatch({ type: "nextStep" });
    }
  }

  function handlePreviousStep() {
    dispatch({ type: "previousStep" });
  }

  async function fetchNextWorkForNavigation() {
    try {
      const data = (
        await sendAPI(
          "POST",
          `${baseUrl}/records/get-automatic-data-with-mistakes/${taskId}/${recordId}`,
          {
            mistakes: mistakes?.filter((el) => el.checked === true),
          }
        )
      ).data;

      dispatch({
        type: "setNextWorkAndGrade",
        payload: {
          nextWork: data?.work || [],
          grade: data ? data.grade : 5,
        },
      });

      dispatch({ type: "fetchTomorrowWork" });

      return data;
    } catch (error) {
      return null;
    }
  }

  function handleStepClick(stepNumber) {
    if (stepNumber === 1) {
      dispatch({ type: "setCurrentStep", payload: 1 });
    } else if (stepNumber === 2) {
      if (currentStep === 1) {
        fetchNextWorkForNavigation().then(() => {
          dispatch({ type: "setCurrentStep", payload: 2 });
        });
      } else {
        dispatch({ type: "setCurrentStep", payload: 2 });
      }
    } else if (stepNumber === 3) {
      if (currentStep === 1) {
        fetchNextWorkForNavigation().then(() => {
          dispatch({ type: "setCurrentStep", payload: 3 });
        });
      } else {
        dispatch({ type: "setCurrentStep", payload: 3 });
      }
    }
  }

  return (
    <>
      {isLoading || isLoadingEntirePage ? (
        <Spinner />
      ) : (
        <Box className={styles.resultsContainer}>
          {!user.isAdmin ? (
            <NotAuthorized />
          ) : (
            <Box className={styles.resultsBox}>
              <Box className={styles.stepIndicator}>
                <Box
                  className={`${styles.stepDot} ${
                    currentStep === 1 ? styles.active : ""
                  }`}
                  onClick={() => handleStepClick(1)}
                />
                <Box
                  className={`${styles.stepDot} ${
                    currentStep === 2 ? styles.active : styles.accessible
                  }`}
                  onClick={() => handleStepClick(2)}
                />
                <Box
                  className={`${styles.stepDot} ${
                    currentStep === 3 ? styles.active : styles.accessible
                  }`}
                  onClick={() => handleStepClick(3)}
                />
              </Box>

              <Table className={styles.table}>
                <TableBody className={styles.tableBody}>
                  {currentStep === 1 && (
                    <TableRow>
                      <TableCell className={styles.labelCell}>
                        Results
                      </TableCell>
                      <TableCell className={styles.valueCell}>
                        {Array.isArray(mistakes) ? (
                          <>
                            <Mistakes mistakes={mistakes} dispatch={dispatch} />
                          </>
                        ) : (
                          <TextResults
                            value={mistakes}
                            dispatch={dispatch}
                            type="results"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )}

                  {currentStep === 2 && (
                    <>
                      <TableRow>
                        <TableCell className={styles.labelCell}>
                          Comments
                        </TableCell>
                        <TableCell className={styles.valueCell}>
                          <TextResults
                            value={comments}
                            dispatch={dispatch}
                            type="comments"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={styles.labelCell}>
                          Grades
                        </TableCell>
                        <TableCell colSpan={2} className={styles.valueCell}>
                          <SelectOption grade={grade} dispatch={dispatch} />
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  {currentStep === 3 && (
                    <TableRow>
                      <TableCell className={styles.labelCell}>
                        Work for Tomorrow
                      </TableCell>
                      <TableCell className={styles.valueCell}>
                        <NextWork nextWork={nextWork} dispatch={dispatch} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <Box className="btn-container">
                {currentStep === 1 ? (
                  <Box className={styles.buttonGroup}>
                    <Button
                      className="btn results-btn"
                      onClick={handleResults}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    <Button
                      className="btn results-btn"
                      onClick={handleNextStep}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </Box>
                ) : currentStep === 2 ? (
                  <Box className={styles.buttonGroup}>
                    <Button
                      className="btn results-btn"
                      onClick={handlePreviousStep}
                      variant="outlined"
                      color="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      className="btn results-btn"
                      onClick={handleResults}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    <Button
                      className="btn results-btn"
                      onClick={handleNextStep}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.buttonGroup}>
                    <Button
                      className="btn results-btn"
                      onClick={handlePreviousStep}
                      variant="outlined"
                      color="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      className="btn results-btn"
                      onClick={handleResults}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default Results;
