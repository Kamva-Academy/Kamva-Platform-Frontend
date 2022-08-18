import Parse from 'parse';

const TeamState = Parse.Object.extend('TeamState');

export const createTeamState = async (uuid, stateId, currentStateName, teamEnterTimeToState) => {
  await Parse.Cloud.run('createTeamState', {
    stateId,
    uuid,
    currentStateName, 
    teamEnterTimeToState
  });
};

export const changeTeamState = async ({ stateId, uuid, currentStateName, teamEnterTimeToState }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  await Parse.Cloud.run('changeTeamState', {
    stateId,
    uuid,
    currentStateName, 
    teamEnterTimeToState
  });
};

export const getTeamState = async (uuid) => {
  const teamsCurrentState = await Parse.Cloud.run('getTeamState', {
        uuid
  });
  return teamsCurrentState
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
