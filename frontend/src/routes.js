import Home from "./components/SuperAdmin/Home/Home";
import SchoolHome from "./Pages/School/Dashboard/SchoolHome";
import StaffAttendance from "./components/school/StaffAttendance/StaffAttendance";
import AllLeaveRequests from "./components/school/AllLeaveRequests/AllLeaveRequests";
import ApplyLeave from "./components/school/ApplyLeave/ApplyLeave";
import AssignClassTeacher from "./components/school/AssignClassTeacher/AssignClassTeacher";
import EditClassTeacher from "./components/school/EditClassTeacher/EditClassTeacher";
import EditEmployee from "./components/school/EditEmployee/EditEmployee";
import InactiveReport from "./components/school/InactiveReport/InactiveReport";
import StaffAnniversary from "./components/school/StaffAnniversary/StaffAnniversary";
import StaffBirthday from "./components/school/StaffBirthday/StaffBirthday";
import ConcessionsForm from "./components/school/ConcessionsForm/ConcessionsForm";
import AdmissionEnquiry  from "./components/school/AdmissionEnquiry/AdmissionEnquiry";
import Staff  from "./components/school/Staff/Staff";
import ComplaintForm  from "./components/school/ComplaintForm/ComplaintForm";
import Visitors  from "./components/school/Visitors/Visitors";
import Enquiry  from "./components/school/Enquiry/Enquiry";















import SchoolInfo from "./components/school/SchoolInfo/SchoolInfo";
import Document from "./components/school/Document/Document";
import BankDetail from "./components/school/BankDetail/BankDetail";
import AddSalesExecutive from "./components/SuperAdmin/AddSalesExecutive/AddSalesExecutive";
import MasterUserPage from "./components/SuperAdmin/MasterUserPage/MasterUserPage";
import Request from "./components/SuperAdmin/Request/Request";
import Newschool from "./components/Sales/Newschool/Newschool";
import Renewal from "./components/Sales/Renewal/Renewal";
import Digital from "./components/Sales/Newschool/Digital/Digital";
import ApproveRequest1 from "./components/Sales/ApproveRequest1/ApproveRequest1";
import Profile from "./components/Sales/Profile/Profile";
import Reject from "./components/Sales/Reject/Reject";
import SalesExecutivePage from "./components/SuperAdmin/SalesExecutivePage/SalesExecutivePage";

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
    { path: "/schoolInfo", component: SchoolInfo },
    { path: "/Document", component: Document },
    { path: "/BankDetail", component: BankDetail },
    { path: "/StaffAttendance", component: StaffAttendance },
    { path: "/AllLeaveRequests", component: AllLeaveRequests },
    { path: "/ApplyLeave", component: ApplyLeave },
    { path: "/AssignClassTeacher", component: AssignClassTeacher },
    { path: "/EditClassTeacher", component: EditClassTeacher },
    { path: "/EditEmployee", component: EditEmployee },
    { path: "/InactiveReport", component: InactiveReport },
    { path: "/StaffAnniversary", component: StaffAnniversary },
    { path: "/StaffBirthday", component: StaffBirthday },
    { path: "/ConcessionsForm", component: ConcessionsForm },
    { path: "/AdmissionEnquiry", component: AdmissionEnquiry },
    { path: "/Staff", component: Staff },
    { path: "/ComplaintForm", component: ComplaintForm },
    { path: "/Visitors", component: Visitors },
    { path: "/Enquiry", component: Enquiry },








       







    

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
