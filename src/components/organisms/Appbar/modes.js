import StudentDashboardItems from './DashboardItems';
import CourseAppBarItems from './Course';
import GeneralPagesAppbarItems from './GeneralPagesAppbarItems';
import FSMAppBarItems from './FSMAppBarItems';
import MentorFSMAppBar from './MentorFSMAppBar';

const AppBarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  FSM: FSMAppBarItems,
  MENTOR_FSM: MentorFSMAppBar,
  COURSE: CourseAppBarItems,
  GENERAL: GeneralPagesAppbarItems,
  ARTICLE: GeneralPagesAppbarItems,
};

export default AppBarModes;
