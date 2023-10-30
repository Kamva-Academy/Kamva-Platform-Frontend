import StudentDashboardItems from './modes/DashboardAppbarItems';
import ProgramAppBarItems from './modes/ProgramAppbarItems';
import GeneralAppbarItems from './modes/GeneralAppbarItems';
import FSMAppbarItems from './modes/FSMAppbarItems';
import MentorFSMAppBar from './modes/MentorFSMAppbarItems';

const AppBarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  FSM: FSMAppbarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralAppbarItems,
  ARTICLE: GeneralAppbarItems,
};

export default AppBarModes;
