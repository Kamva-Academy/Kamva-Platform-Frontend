import {
  Workshop,
  Team,
  Article,
  Notification,
  Problem,
  Submission,
  Widget,
} from '../models'

export type InitialStateType = {
  hints: object;
  isFetching: boolean,
  workshops: Workshop[],
  articles: Article[],
  teams: Team[],
  notifications: Notification[],
  problems: Problem[],
  submissions: Submission[],
  widgets: object,
}