import Parse from 'parse';

const TeamState = Parse.Object.extend('TeamState');

// export const createTeamState = async (uuid, stateId, currentStateName, teamEnterTimeToState) => {
//   await Parse.Cloud.run('createTeamState', {
//     stateId,
//     uuid,
//     currentStateName, 
//     teamEnterTimeToState
//   });
// };

// export const changeTeamState = async ({ stateId, uuid, currentStateName, teamEnterTimeToState }) => {
//   if (!uuid) {
//     // todo: fix for supervised workshops
//     return;
//   }
//   await Parse.Cloud.run('changeTeamState', {
//     stateId,
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

export const createTeamState = async (uuid, stateId, currentStateName, teamEnterTimeToState) => {
  return await new TeamState().save({ uuid, stateId, currentStateName, teamEnterTimeToState });
};

export const changeTeamState = async ({ uuid, stateId, currentStateName, teamEnterTimeToState }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  const teamState = await getTeamState(uuid);
  if (!teamState) {
    await createTeamState(uuid, stateId, currentStateName, teamEnterTimeToState);

  } else {
    teamState.set('currentStateName', currentStateName)
    teamState.set('teamEnterTimeToState', teamEnterTimeToState)
    await teamState.save({ stateId });
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
