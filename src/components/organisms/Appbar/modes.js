import StudentDashboardItems from './DashboardItems';
import ProgramAppBarItems from './Program';
import GeneralPagesAppbarItems from './GeneralPagesAppbarItems';
import FSMAppBarItems from './FSMAppBarItems';
import MentorFSMAppBar from './MentorFSMAppBar';

const AppBarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  FSM: FSMAppBarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralPagesAppbarItems,
  ARTICLE: GeneralPagesAppbarItems,
};

export default AppBarModes;
