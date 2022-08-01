import { 
    Workshop, 
    Team, 
    Article,
    Notification,
    Problem,
    Submission,
    Widget,
} from '../models'


export type InitialState = {
    isFetching: boolean,
    workshops: Workshop[],
    articles: Article[],
    teams: Team[],
    notifications: Notification[],
    problems: Problem[],
    submissions: Submission[],
    submissionsIsLoading: boolean,
    widget: Widget,
}