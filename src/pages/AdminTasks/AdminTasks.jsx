import { Container } from "@mui/material";
import Spinner from "../../components/global-components/Spinner/Spinner";
import Header from "../../components/global-components/Header/Header";
import Footer from "../../components/global-components/Footer/Footer";
import Student from "../../components/pages-components/AdminTasks/Student/Student";
import { usePositions } from "../../contexts/PositionsContext";
import { Link } from "react-router";
import styles from "./AdminTasks.module.css";

export default function AdminTasks() {
  const { data, isLoading } = usePositions();
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>Welcome Admin</Header>
          <Container className={styles.container}>
            <Link
              className={`btn ${styles.manageRuleLink}`}
              to="/rules/manage-rules"
            >
              Manage Rules
            </Link>
            {data.map((student) => (
              <Student student={student} key={student.assignedTo}></Student>
            ))}
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
