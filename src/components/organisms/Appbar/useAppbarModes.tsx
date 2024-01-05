import StudentDashboardItems from './modes/DashboardAppbarItems';
import ProgramAppBarItems from './modes/ProgramAppbarItems';
import GeneralAppbarItems from './modes/GeneralAppbarItems';
import FSMAppbarItems from './modes/FSMAppbarItems';
import MentorFSMAppBar from './modes/MentorFSMAppbarItems';

enum AppBarModes {
  STUDENT_DASHBOARD = 'STUDENT_DASHBOARD',
  FSM = 'FSM',
  MENTOR_FSM = 'MENTOR_FSM',
  PROGRAM = 'PROGRAM',
  GENERAL = 'GENERAL',
  ARTICLE = 'ARTICLE',
  None = 'None',
}

export { AppBarModes };

const mode2component = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  FSM: FSMAppbarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralAppbarItems,
  ARTICLE: GeneralAppbarItems,
}

const useAppbarModes = ({ mode, workshop, event, isMentor, mentorId }) => {
  if (mode == AppBarModes.None) return {
    desktopLeftItems: [],
    desktopRightItems: [],
    mobileLeftItems: [],
    mobileRightItems: [],
    mobileMenuListItems: [],
  };
  const appbarComponent = mode2component[mode];
  return appbarComponent({ workshop, event, isMentor, mentorId })
}

export default useAppbarModes;
;
