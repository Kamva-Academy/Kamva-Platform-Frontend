import StudentDashboardItems from './modes/DashboardAppbarItems';
import ProgramAppBarItems from './modes/ProgramAppbarItems';
import GeneralAppbarItems from './modes/GeneralAppbarItems';
import FSMAppbarItems from './modes/FSMAppbarItems';
import MentorFSMAppBar from './modes/MentorFSMAppbarItems';

const mode2component = {
  DASHBOARD: StudentDashboardItems,
  FSM: FSMAppbarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralAppbarItems,
  ARTICLE: GeneralAppbarItems,
}

const useAppbarModes = ({ mode, workshop, program, isMentor, mentorId }) => {
  const appbarComponent = mode2component[mode];
  return appbarComponent({ workshop, program, isMentor, mentorId })
}

export default useAppbarModes;
;
