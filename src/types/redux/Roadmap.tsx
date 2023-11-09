export type RoadmapInitialStateType = {
  playerTakenPath: Link[];
  FSMRoadmap: FSMRoadmapType;
}

export type FSMRoadmapType = {
  firstStateName: string;
  links: Link[],
}

export type Link = {
  source: string;
  target: string;
}

export type Node = {
  id: string;
  color?: string;
  x?: number;
  y?: number;
};