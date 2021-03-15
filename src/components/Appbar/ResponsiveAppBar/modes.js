import ArticleAppBarItems from './ArticleAppBarItems';
import LandingAppBarItems from './LandingAppBarItems';
import MathHouseProblemDayItems from './MathHouseProblemDayLanding'
import WorkshopAppBarItems from './WorkshopAppBarItems';
import DashboardItems from './DashboardItems';

const AppbarModes = {
  DASHBOARD: DashboardItems,
  LANDING: LandingAppBarItems,
  WORKSHOP: WorkshopAppBarItems,
  ARTICLE: ArticleAppBarItems,
  PROBLEM_DAY: MathHouseProblemDayItems,
};

export default AppbarModes;
