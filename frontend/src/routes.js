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
import AdmissionEnquiry from "./components/school/AdmissionEnquiry/AdmissionEnquiry";
import Staff from "./components/school/Staff/Staff";
import ComplaintForm from "./components/school/ComplaintForm/ComplaintForm";
import Visitors from "./components/school/Visitors/Visitors";
import Enquiry from "./components/school/Enquiry/Enquiry";
// import CollectFees  from "./components/school/CollectFees/CollectFees.jsx";
import PaymentReceipt from "./components/school/PaymentReceipt/PaymentReceipt.jsx";
// import AddStudent  from "./components/school/AddStudent/AddStudent.jsx";
import StudentAdmissionForm from "./components/school/StudentAdmissionForm/StudentAdmissionForm.jsx";
// import ExamSetting from "./components/school/ExamSetting/ExamSetting";
// import AddSemester from "./components/school/AddSemester/AddSemester";
import TeacherTimeTable from "./components/school/TeacherTimeTable/TeacherTimeTable";
import ClassTimeTable from "./components/school/ClassTimeTable/ClassTimeTable";
import Settings from "./components/school/Settings/Settings";
import AdmitCard from "./components/school/AdmitCard/AdmitCard";
import StudentDetails from "./components/school/StudentDetails/StudentDetails";
import StudentView from "./components/school/StudentView/StudentView";
import PreviousFeeRecord from "./components/school/PreviousFeeRecord/PreviousFeeRecord";
import PreviousAttendanceRecord from "./components/school/PreviousAttendanceRecord/PreviousAttendanceRecord";
import StaffCertificate from "./components/school/StaffCertificate/StaffCertificate";
import CollectFee from "./components/school/CollectFee/CollectFee";
import Cheques from "./components/school/Cheques/Cheques";
import StudentCertificate from "./components/school/StudentCertificate/StudentCertificate";
// import StudentAttendance  from "./components/school/StudentAttendance/StudentAttendance";
import StudentLeave from "./components/school/StudentLeave/StudentLeave";
import StaffLogin from "./components/school/StaffLogin/StaffLogin";
import StudentLoginCredential from "./components/school/StudentLoginCredential/StudentLoginCredential";
import MessageSettings from "./components/school/MessageSettings/MessageSettings";
import StudentId from "./components/school/StudentId/StudentId";
import PermissionSetting from "./components/school/PermissionSetting/UserPermission.jsx";
// import AttendanceReport from "./components/school/AttendanceReport/AttendanceReport";
import StaffId from "./components/school/StaffId/StaffId";
// import LoginPage  from "./components/LoginPage/LoginPage.jsx";
import RegistrationExcelUpload from "./components/school/RegistrationExcelUpload/RegistrationExcelUpload.jsx";
import AddClass1 from "./components/school/AddClass/AddClass";
import AddSections from "./components/school/AddSections/AddSections";
import Subjectmaster from "./components/school/Subjectmaster/Subjectmaster";
import LeaveApplication from "./components/school/LeaveApplication/LeaveApplication";
import LeaveBalance from "./components/school/LeaveBalance/LeaveBalance";
import AttendancePage from "./components/school/AttendancePage/AttendancePage";
import ConcessionManagement from "./components/school/ConcessionManagement/ConcessionManagement";
import FeesManagement from "./components/school/FeesManagement/FeesManagement";
import ClassFeeAllocation from "./components/school/ClassFeeAllocation/ClassFeeAllocation";
import AllocateClassFee from "./components/school/ClassFeeAllocation/AllocateClassFee";
import StudentFeeAllocation from "./components/school/StudentFeeAllocation/StudentFeeAllocation";
import LockFeesModification from "./components/school/LockFeesModification/LockFeesModification";
import LateFeeManagement from "./components/school/LateFeeManagement/LateFeeManagement";
import CollectFee1 from "./components/school/CollectFee1/CollectFee1";
import UPIQRCode from "./components/school/UPIQRCode/UPIQRCode";
import AddSemester from "./components/school/AddSemester/AddSemester";
import EditDeleteSemester from "./components/school/EditDeleteSemester/EditDeleteSemester";
import ExamSetting from "./components/school/ExamSetting/ExamSetting";




import StudentPerformance from "./components/school/StudentPerformance/StudentPerformance";
import ClassSectionTransfer from "./components/school/ClassSectionTransfer/ClassSectionTransfer";
import UpdateRollNumber from "./components/school/UpdateRollNumber/UpdateRollNumber";
import StudentBirthday from "./components/school/StudentBirthday/StudentBirthday";
import StudentPromotion from "./components/school/StudentPromotion/StudentPromotion";
import StudentAttendance from "./components/school/StudentAttendance/StudentAttendance";
import SearchEmployee from "./components/school/SearchEmployee/SearchEmployee";



















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

import ApplyLeave1 from "./components/Student/ApplyLeave1";
import Attendance from "./components/Student/Attendance";
import St_ClassTimeTable from "./components/Student/St_ClassTimeTable";
import Homework from "./components/Student/Homework";
import Dashboard from "./components/Student/Dashboard";
import FeeDetails from "./components/Student/FeeDetails";
import StudentDetails1 from "./components/Student/st_StudentDetails";
import Subjects from "./components/Student/Subjects";

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
   
    // { path: "/CollectFees", component: CollectFees },
    { path: "/PaymentReceipt", component: PaymentReceipt },
    //  { path: "/AddStudent", component: AddStudent },
    { path: "/StudentAdmissionForm", component: StudentAdmissionForm },
    // { path: "/ExamSetting", component: ExamSetting },
    // { path: "/AddSemester", component: AddSemester },
    { path: "/TeacherTimeTable", component: TeacherTimeTable },
    { path: "/ClassTimeTable", component: ClassTimeTable },
    { path: "/Settings", component: Settings },
    { path: "/AdmitCard", component: AdmitCard },
    { path: "/StudentDetails", component: StudentDetails },
    { path: "/student-view/:id", component: StudentView },
    { path: "/PreviousFeeRecord", component: PreviousFeeRecord },
    { path: "/PreviousAttendanceRecord", component: PreviousAttendanceRecord },
    { path: "/StaffCertificate", component: StaffCertificate },
    { path: "/CollectFee", component: CollectFee },
    { path: "/Cheques", component: Cheques },
    { path: "/StudentCertificate", component: StudentCertificate },
    { path: "/StudentLeave", component: StudentLeave },
    { path: "/StaffLogin", component: StaffLogin },
    { path: "/StudentLoginCredential", component: StudentLoginCredential },
    { path: "/MessageSettings", component: MessageSettings },
    { path: "/StudentId", component: StudentId },
    { path: "/PermissionSetting", component: PermissionSetting },
    // { path: "/AttendanceReport", component: AttendanceReport },
    { path: "/StaffId", component: StaffId },
    { path: "/Studentdetails", component: StudentDetails },
    // { path: "/LoginPage", component: LoginPage},
    { path: "/RegistrationExcelUpload", component: RegistrationExcelUpload },
    { path: "/AddClass1", component: AddClass1 },
    { path: "/AddSections", component: AddSections },
    { path: "/Subjectmaster", component: Subjectmaster },
    { path: "/LeaveApplication", component: LeaveApplication },
    { path: "/LeaveBalance", component: LeaveBalance },

    { path: "/AttendancePage", component: AttendancePage },
    { path: "/ConcessionManagement", component: ConcessionManagement },
    { path: "/FeesManagement", component: FeesManagement },
    { path: "/ClassFeeAllocation", component: ClassFeeAllocation },
    {
      path: "/AllocateClassFee/:className",
      component: AllocateClassFee,
    },
    { path: "/StudentFeeAllocation", component: StudentFeeAllocation },
    { path: "/LockFeesModification", component: LockFeesModification },
    { path: "/LateFeeManagement", component: LateFeeManagement },
    { path: "/CollectFee1", component: CollectFee1 },
    { path: "/UPIQRCode", component: UPIQRCode },
    { path: "/AddSemester", component: AddSemester },
    { path: "/EditDeleteSemester", component: EditDeleteSemester },
    { path: "/ExamSetting", component: ExamSetting },


    { path: "/StudentPerformance", component: StudentPerformance },
    { path: "/ClassSectionTransfer", component: ClassSectionTransfer },
    { path: "/UpdateRollNumber", component: UpdateRollNumber },
    { path: "/StudentBirthday", component: StudentBirthday },
    { path: "/StudentPromotion", component: StudentPromotion },
    { path: "/StudentAttendance", component: StudentAttendance },
    { path: "/SearchEmployee", component: SearchEmployee },








  ],
  sale: [
    { path: "/Newschool", component: Newschool },
    { path: "/Renewal", component: Renewal },
    { path: "/book", component: Digital },
    { path: "/ApproveRequest1", component: ApproveRequest1 },
    { path: "/Profile", component: Profile },
    { path: "/Reject", component: Reject },
  ],
  student: [
    { path: "/dashboard", component: Dashboard },
    { path: "/st_studentdetails", component: StudentDetails1 },
    { path: "/st_classtimetable", component: St_ClassTimeTable },
    { path: "/subjects", component: Subjects },
    { path: "/homework", component: Homework },
    { path: "/attendance", component: Attendance },
    { path: "/leaves", component: ApplyLeave1 },
    { path: "/feedetails", component: FeeDetails },
  ],
};
