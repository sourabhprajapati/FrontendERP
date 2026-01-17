import Header from "./components/SuperAdmin/Header/Header";
import Sidebar from "./components/SuperAdmin/Header/Sidebar/Sidebar";
import Home from "./components/SuperAdmin/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeConfig } from "./routes";
import LoginPage from "./components/LoginPage/LoginPage";
import SchoolHome from "./Pages/School/Dashboard/SchoolHome";
import SuperAdminLayout from "./components/SuperAdmin/SuperAdminLayout/SuperAdminLayout";
import SchoolLayout from "./components/school/SchoolLayout/SchoolLayout";
import SalesLayout from "./components/Sales/SalesLayout/SalesLayout";
import StudentLayout from "./components/Student/StudentLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route element={<SuperAdminLayout />}>
            {routeConfig.superAdmin.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route element={<SchoolLayout />}>
            {routeConfig.school.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>

          <Route element={<SalesLayout />}>
            {routeConfig.sale.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
            <Route element={<StudentLayout />}>
            {routeConfig.student.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
