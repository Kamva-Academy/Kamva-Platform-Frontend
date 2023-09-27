import StudentDashboardItems from './modes/DashboardItems';
import ProgramAppBarItems from './modes/ProgramItems';
import GeneralPagesAppbarItems from './modes/GeneralPagesAppbarItems';
import FSMAppBarItems from './modes/FSMAppBarItems';
import MentorFSMAppBar from './modes/MentorFSMAppBar';

const AppBarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  FSM: FSMAppBarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralPagesAppbarItems,
  ARTICLE: GeneralPagesAppbarItems,
};

export default AppBarModes;
