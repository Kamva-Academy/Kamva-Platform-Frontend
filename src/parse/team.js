import Parse from 'parse';

const TeamState = Parse.Object.extend('TeamState');

// export const createTeamState = async (uuid, paperId, currentStateName, teamEnterTimeToState) => {
//   await Parse.Cloud.run('createTeamState', {
//     paperId,
//     uuid,
//     currentStateName, 
//     teamEnterTimeToState
//   });
// };

// export const changeTeamState = async ({ paperId, uuid, currentStateName, teamEnterTimeToState }) => {
//   if (!uuid) {
//     // todo: fix for supervised workshops
//     return;
//   }
//   await Parse.Cloud.run('changeTeamState', {
//     paperId,
//     uuid,
//     currentStateName, 
//     teamEnterTimeToState
//   });
// };

// export const getTeamState = async (uuid) => {
//   const teamsCurrentState = await Parse.Cloud.run('getTeamState', {
//         uuid
//   });
//   return teamsCurrentState
// };

export const getTeamState = async (uuid) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  const result = await query.first()
  return result;
};

export const createTeamState = async (uuid, paperId, currentStateName, teamEnterTimeToState) => {
  return await new TeamState().save({ uuid, stateId: paperId, currentStateName, teamEnterTimeToState });
};

export const changeTeamState = async ({ uuid, paperId, currentStateName, teamEnterTimeToState }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  const teamState = await getTeamState(uuid);
  if (!teamState) {
    await createTeamState(uuid, paperId, currentStateName, teamEnterTimeToState);

  } else {
    teamState.set('currentStateName', currentStateName)
    teamState.set('teamEnterTimeToState', teamEnterTimeToState)
    teamState.set('stateId', paperId)
    await teamState.save();
  }
};

export const getTeamStateSubscription = async () => {
  const query = new Parse.Query('TeamState');
  return await query.subscribe();
}

export const getChangeTeamStateSubscription = async ({ uuid }) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  return await query.subscribe();
};
