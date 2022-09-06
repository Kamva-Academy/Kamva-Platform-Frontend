import StudentDashboardItems from './DashboardItems';
import EventAppBarItems from './Event';
import GeneralPagesAppbarItems from './GeneralPagesAppbarItems';
import WorkshopAppBarItems from './WorkshopAppBarItems';
import MentorWorkshopAppBar from './MentorWorkshopAppBar';

const AppbarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  WORKSHOP: WorkshopAppBarItems,
  MENTOR_WORKSHOP: MentorWorkshopAppBar,
  EVENT: EventAppBarItems,
  GENERAL: GeneralPagesAppbarItems,
  ARTICLE: GeneralPagesAppbarItems,
};

export default AppbarModes;
