import ArticleAppBarItems from './ArticleAppBarItems';
import LandingAppBarItems from './LandingAppBarItems';
import MathHouseProblemDayItems from './MathHouseProblemDayLanding'
import WorkshopAppBarItems from './WorkshopAppBarItems';

const AppbarModes = {
  LANDING: LandingAppBarItems,
  WORKSHOP: WorkshopAppBarItems,
  ARTICLE: ArticleAppBarItems,
  PROBLEMDAY: MathHouseProblemDayItems,
};

export default AppbarModes;
