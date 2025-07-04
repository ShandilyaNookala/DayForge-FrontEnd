import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Course from "./pages/Course/Course.jsx";
import Results from "./pages/Results/Results.jsx";
import StudentTimer from "./pages/StudentTimer/StudentTimer.jsx";
import SeeRule from "./pages/SeeRule/SeeRule.jsx";
import { RecordsProvider } from "./contexts/RecordsContext.jsx";
import ManageRules from "./pages/ManageRules/ManageRules.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/global-components/ProtectedRoute/ProtectedRoute.jsx";
import Homepage from "./components/global-components/Homepage/Homepage.jsx";
import ExistingRuleCategories from "./pages/ExistingRuleCategories/ExistingRuleCategories.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Homepage />} />

            <Route
              path="/course/:taskId"
              element={
                <RecordsProvider>
                  <Course />
                </RecordsProvider>
              }
            >
              <Route path="timer/:recordId" element={<StudentTimer />} />
              <Route path="results/:recordId" element={<Results />} />
              <Route
                path="existing-rule-categories"
                element={<ExistingRuleCategories />}
              />
            </Route>

            <Route path="/rules">
              <Route index element={<Navigate replace to="manage-rules" />} />
              <Route path="manage-rules" element={<ManageRules />} />
              <Route path="see-rule/:id" element={<SeeRule />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
