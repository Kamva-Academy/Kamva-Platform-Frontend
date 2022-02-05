import StudentDashboardItems from './DashboardItems';
import EventAppBarItems from './Event';
import GeneralPagesAppbarItems from './GeneralPagesAppbarItems';
import WorkshopAppBarItems from './WorkshopAppBarItems';

const AppbarModes = {
  STUDENT_DASHBOARD: StudentDashboardItems,
  WORKSHOP: WorkshopAppBarItems,
  EVENT: EventAppBarItems,
  GENERAL: GeneralPagesAppbarItems,
};

export default AppbarModes;
