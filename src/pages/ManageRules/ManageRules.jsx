import { Box, Container } from "@mui/material";
import Footer from "../../components/global-components/Footer/Footer";
import Header from "../../components/global-components/Header/Header";
import { useEffect, useMemo, useState } from "react";
import { sendAPI } from "../../utils/helpers";
import { baseUrl } from "../../utils/config";
import { DataGrid } from "@mui/x-data-grid";
import Spinner from "../../components/global-components/Spinner/Spinner";
import styles from "./ManageRules.module.css";
import TasksRow from "../../components/pages-components/ManageRules/TasksRow/TasksRow";
import { Link } from "react-router";
import BackButton from "../../components/global-components/BackButton/BackButton";
import { useAuth } from "../../contexts/AuthContext";

function ManageRules() {
  const [isLoading, setIsLoading] = useState(true);
  const [ruleWithTasksDropdown, setRuleWithTasksDropdown] = useState(null);
  const [data, setData] = useState({});

  const { user } = useAuth();

  const columns = useMemo(
    function () {
      return [
        {
          field: "ruleName",
          headerName: "Rule Name",
          flex: 1,
          renderCell: (params) => (
            <Link
              to={`/rules/see-rule/${params.id}`}
              className={`btn ${styles.ruleLink}`}
            >
              {params.value}
            </Link>
          ),
        },
        {
          field: "tasks",
          headerName: "Tasks Associated with Rule",
          flex: 3,
          renderCell: (params) => (
            <TasksRow
              setData={setData}
              tasksValue={params.value}
              ruleId={params.id}
              tasksWithNoRule={data.tasksWithNoRule}
              ruleWithTasksDropdown={ruleWithTasksDropdown}
              setRuleWithTasksDropdown={setRuleWithTasksDropdown}
            />
          ),
        },
      ];
    },
    [data, ruleWithTasksDropdown]
  );

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      const data = await sendAPI("GET", `${baseUrl}/rules/manage-rules`);
      setData(data.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (!user.isAdmin) return <Box>You are not authorized to view this page</Box>;

  return (
    <>
      {!isLoading ? (
        <>
          <Header>Manage Rules</Header>
          <Container className={`dataGrid ${styles.container}`}>
            <BackButton url="/home" />
            <Link to="/rules/add-rule" className={`btn ${styles.addRule}`}>
              Add New Rule
            </Link>
            <DataGrid
              getRowHeight={() => "auto"}
              columns={columns}
              rows={data.rows}
            />
          </Container>
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ManageRules;
