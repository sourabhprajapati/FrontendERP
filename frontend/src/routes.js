import Home from "./components/SuperAdmin/Home/Home";
import SchoolHome from "./Pages/School/Dashboard/SchoolHome";
import SchoolInfo from "./components/school/SchoolInfo/SchoolInfo"
import Document from "./components/school/Document/Document"
import BankDetail from "./components/school/BankDetail/BankDetail";
import AddSalesExecutive from './components/SuperAdmin/AddSalesExecutive/AddSalesExecutive';
import MasterUserPage from './components/SuperAdmin/MasterUserPage/MasterUserPage';
import Request from './components/SuperAdmin/Request/Request';

import Newschool from "./components/Sales/Newschool/Newschool";
import Renewal from "./components/Sales/Renewal/Renewal";
import Digital from "./components/Sales/Newschool/Digital/Digital"
import ApproveRequest1 from "./components/Sales/ApproveRequest1/ApproveRequest1";
import Profile from "./components/Sales/Profile/Profile";
import Reject from "./components/Sales/Reject/Reject";
import SalesExecutivePage from './components/SuperAdmin/SalesExecutivePage/SalesExecutivePage';


// Export route configuration without JSX
export const routeConfig = {
  superAdmin: [
    { path: "/superAdminDash", component: Home },
    { path: "/addSalesExecutive", component: AddSalesExecutive }, 
    { path: "/MasterUserPage", component: MasterUserPage },
     { path: "/Request", component: Request },
     { path: "/SalesExecutivePage", component: SalesExecutivePage },
  ],
  school: [
    { path: "/schoolHome", component: SchoolHome },
    { path: '/schoolInfo', component: SchoolInfo },
    { path: '/Document', component:  Document },
     { path: '/BankDetail', component:  BankDetail }
  ],
   sale: [
    { path: "/Newschool", component: Newschool },
    { path: "/Renewal", component: Renewal },
    { path: "/book", component: Digital },
    { path: "/ApproveRequest1", component: ApproveRequest1 },
    { path: "/Profile", component: Profile },
    { path: "/Reject", component: Reject },

  ],
};