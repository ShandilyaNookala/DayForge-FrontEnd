import { useAuth } from "../../../contexts/AuthContext";
import { PositionsProvider } from "../../../contexts/PositionsContext";
import AdminTasks from "../../../pages/AdminTasks/AdminTasks";
import StudentTasks from "../../../pages/StudentTasks/StudentTasks";

export default function Homepage() {
  const { user } = useAuth();
  if (!user?.isAdmin) return <StudentTasks />;
  else
    return (
      <PositionsProvider>
        <AdminTasks />
      </PositionsProvider>
    );
}
