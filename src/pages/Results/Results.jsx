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
    default:
      throw new Error("Unknown");
  }
}

function Results() {
  const { user } = useAuth();
  const [{ mistakes, comments, nextWork, grade, isLoading }, dispatch] =
    useReducer(reducer, initialState);

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
      }
    },
    [currentRecord]
  );

  useEffect(
    function () {
      async function getResultsData() {
        dispatch({ type: "setIsLoading", payload: true });
        let data;
        data = (
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
            nextWork: data.work,
            grade: data.grade,
          },
        });
      }
      if (
        taskId &&
        recordId &&
        recordsData?.rule &&
        (!Array.isArray(mistakes) ? typeof mistakes !== "string" : true)
      )
        getResultsData();
      else if (typeof currentRecord?.work === "string") {
        dispatch({ type: "setIsLoading", payload: false });
      }
    },
    [taskId, recordId, currentRecord?.work, recordsData?.rule, mistakes]
  );

  async function handleResults() {
    setIsLoadingEntirePage(true);
    const newWork = Array.isArray(nextWork)
      ? nextWork.filter((el) => el.checked === true).map((el) => el.id)
      : nextWork;
    const newMistakes = Array.isArray(mistakes)
      ? mistakes.filter((el) => el.checked === true).map((el) => el.id)
      : mistakes;
    const newRecordsData = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-or-create-record/${taskId}/${recordId}`,
      {
        grade: grade,
        result: newMistakes,
        comment: comments,
        nextWork: newWork,
      }
    );
    setRecordsData(newRecordsData.data);
    setIsLoadingEntirePage(false);
    navigate(`/course/${taskId}`);
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
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Results</TableCell>
                    <TableCell>
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
                  <TableRow>
                    <TableCell>Comments</TableCell>
                    <TableCell>
                      <TextResults
                        value={comments}
                        dispatch={dispatch}
                        type="comments"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.labelCell}>Grades</TableCell>
                    <TableCell colSpan={2} className={styles.valueCell}>
                      <SelectOption grade={grade} dispatch={dispatch} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Work for Tomorrow</TableCell>
                    <TableCell>
                      <NextWork nextWork={nextWork} dispatch={dispatch} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box className="btn-container">
                <Button className="btn results-btn" onClick={handleResults}>
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default Results;
