import {
    Team,
    Widget,
    Article,
    Notification,
    Problem,
    Submission,
} from '../models'

export type ArticleType = {
    id: any;
    name?: string;
    description?: string;
    cover_page?: string;
}

export type ArticlesInitialStateType = {
    isFetching: boolean;
    widgets: Widget[];
    articles: Article[];
    teams: any; // TODO: fix this! because of teams: {} in another file. but I think it must be Array instead of object
    notifications: Notification[];
    problems: Problem[];
    submissions: Submission[];
    articlesCount: number;
    article: Article,
}