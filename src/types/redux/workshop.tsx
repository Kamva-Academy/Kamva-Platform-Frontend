import {
    State,
    WorkshopEdge,
    Team,
    Workshop,
    Widget,
    Answer,
    Player
} 
from '../models'

export type InitialStateType = {
    currentState: CurrentState,
    isFetching: boolean,
    allStates: State[],
    allWorkshopEdges: WorkshopEdge[],
    fetchedTeamsObjects: Team[],
    requestedTeams: Team[],
    getWorkshopsLoading: boolean,
    registrableWorkshops: Workshop[],
    workshop: Workshop,
    answers: Answer[],
    allWorkshops: Workshop[],
    players: Player,
  };

type CurrentState = {
    widgets: Widget[]
}