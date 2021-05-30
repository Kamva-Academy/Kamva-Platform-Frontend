import ArticleAppBarItems from './ArticleAppBarItems';
import StudentDashboardItems from './DashboardItems';
import LandingAppBarItems from './LandingAppBarItems';
import MathHouseProblemDayItems from './MathHouseProblemDayLanding'
import MentorDashboardItems from './MentorDashboardItems';
import WorkshopAppBarItems from './WorkshopAppBarItems';

const AppbarModes = {
  MENTOR_DASHBOARD: MentorDashboardItems,
  STUDENT_DASHBOARD: StudentDashboardItems,
  LANDING: LandingAppBarItems,
  WORKSHOP: WorkshopAppBarItems,
  ARTICLE: ArticleAppBarItems,
  PROBLEM_DAY: MathHouseProblemDayItems,
};

export default AppbarModes;
