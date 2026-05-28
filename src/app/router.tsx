import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticatedGuard } from "./guards/AuthenticatedGuard";
import { PendingGuard } from "./guards/PendingGuard";
import { RoleGuard } from "./guards/RoleGuard";
import { SuspendedGuard } from "./guards/SuspendedGuard";
import { routes } from "../constants/routes";
import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { EmploymentLayout } from "../layouts/EmploymentLayout";
import { TeacherLayout } from "../layouts/TeacherLayout";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { EmploymentApplicationsPage } from "../pages/employment/EmploymentApplicationsPage";
import { EmploymentCompaniesPage } from "../pages/employment/EmploymentCompaniesPage";
import { EmploymentContentPage } from "../pages/employment/EmploymentContentPage";
import { EmploymentDashboardPage } from "../pages/employment/EmploymentDashboardPage";
import { EmploymentJobsPage } from "../pages/employment/EmploymentJobsPage";
import { EmploymentNotificationsPage } from "../pages/employment/EmploymentNotificationsPage";
import { EmploymentSchedulesPage } from "../pages/employment/EmploymentSchedulesPage";
import { EmploymentStudentsPage } from "../pages/employment/EmploymentStudentsPage";
import { EmploymentSurveysPage } from "../pages/employment/EmploymentSurveysPage";
import { LoginPage } from "../pages/LoginPage";
import { PendingPage } from "../pages/PendingPage";
import { SuspendedPage } from "../pages/SuspendedPage";
import { StudentContentPage } from "../pages/student/StudentContentPage";
import { StudentHomePage } from "../pages/student/StudentHomePage";
import { StudentJobsPage } from "../pages/student/StudentJobsPage";
import { StudentProfilePage } from "../pages/student/StudentProfilePage";
import { StudentSchedulesPage } from "../pages/student/StudentSchedulesPage";
import { TeacherContentPage } from "../pages/teacher/TeacherContentPage";
import { TeacherDashboardPage } from "../pages/teacher/TeacherDashboardPage";
import { TeacherJobsPage } from "../pages/teacher/TeacherJobsPage";
import { TeacherSchedulesPage } from "../pages/teacher/TeacherSchedulesPage";
import { TeacherStudentsPage } from "../pages/teacher/TeacherStudentsPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: routes.login, element: <LoginPage /> },
      { path: routes.pending, element: <PendingPage /> },
      { path: routes.suspended, element: <SuspendedPage /> },
    ],
  },
  {
    path: routes.student.root,
    element: (
      <AuthenticatedGuard>
        <SuspendedGuard>
          <PendingGuard>
            <RoleGuard allowedRoles={["student"]}>
              <AppLayout />
            </RoleGuard>
          </PendingGuard>
        </SuspendedGuard>
      </AuthenticatedGuard>
    ),
    children: [
      { index: true, element: <StudentHomePage /> },
      { path: "jobs", element: <StudentJobsPage /> },
      { path: "schedules", element: <StudentSchedulesPage /> },
      { path: "content", element: <StudentContentPage /> },
      { path: "profile", element: <StudentProfilePage /> },
    ],
  },
  {
    path: routes.teacher.root,
    element: (
      <AuthenticatedGuard>
        <SuspendedGuard>
          <PendingGuard>
            <RoleGuard allowedRoles={["general_teacher"]}>
              <TeacherLayout />
            </RoleGuard>
          </PendingGuard>
        </SuspendedGuard>
      </AuthenticatedGuard>
    ),
    children: [
      { index: true, element: <TeacherDashboardPage /> },
      { path: "students", element: <TeacherStudentsPage /> },
      { path: "jobs", element: <TeacherJobsPage /> },
      { path: "schedules", element: <TeacherSchedulesPage /> },
      { path: "content", element: <TeacherContentPage /> },
    ],
  },
  {
    path: routes.employment.root,
    element: (
      <AuthenticatedGuard>
        <SuspendedGuard>
          <PendingGuard>
            <RoleGuard allowedRoles={["employment_teacher"]}>
              <EmploymentLayout />
            </RoleGuard>
          </PendingGuard>
        </SuspendedGuard>
      </AuthenticatedGuard>
    ),
    children: [
      { index: true, element: <EmploymentDashboardPage /> },
      { path: "jobs", element: <EmploymentJobsPage /> },
      { path: "companies", element: <EmploymentCompaniesPage /> },
      { path: "applications", element: <EmploymentApplicationsPage /> },
      { path: "students", element: <EmploymentStudentsPage /> },
      { path: "schedules", element: <EmploymentSchedulesPage /> },
      { path: "content", element: <EmploymentContentPage /> },
      { path: "surveys", element: <EmploymentSurveysPage /> },
      { path: "notifications", element: <EmploymentNotificationsPage /> },
    ],
  },
  {
    path: routes.admin.root,
    element: (
      <AuthenticatedGuard>
        <SuspendedGuard>
          <PendingGuard>
            <RoleGuard allowedRoles={["admin"]}>
              <AuthLayout />
            </RoleGuard>
          </PendingGuard>
        </SuspendedGuard>
      </AuthenticatedGuard>
    ),
    children: [{ index: true, element: <AdminHomePage /> }],
  },
  { path: "*", element: <Navigate to={routes.login} replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
