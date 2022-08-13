import Parse from 'parse';

const TeamState = Parse.Object.extend('TeamState');

export const getTeamState = async (uuid) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  const result = await query.first()
  return result;
};

export const createTeamState = async (uuid, stateId, currnetStageName, teamEnterTimeToStage) => {
  return await new TeamState().save({ uuid, stateId, currnetStageName, teamEnterTimeToStage });
};

export const changeTeamState = async ({ uuid, stateId, currnetStageName, teamEnterTimeToStage }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  const teamState = await getTeamState(uuid);
  if (!teamState) {
    await createTeamState(uuid, stateId, currnetStageName, teamEnterTimeToStage);

  } else {
    teamState.set('currnetStageName', currnetStageName)
    teamState.set('teamEnterTimeToStage', teamEnterTimeToStage)
    await teamState.save({ stateId });
  }
};

export const getTeamStateSubscription = async () => {
  const query = new Parse.Query('TeamState');
  return await query.subscribe();
}

/*
this function is for here :D
export const changeTeamState = async ({ stateId, uuid, currnetStageName, teamEnterTimeToStage }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  await Parse.Cloud.run('changeTeamState', {
    stateId,
    uuid,
    currnetStageName, 
    teamEnterTimeToStage
  });
};

and also this function belongs to here too :)
const getTeamState = async (uuid) => {
  const teamsCurrentState = await Parse.Cloud.run('getTeamState', {
        uuid
  });
  return teamsCurrentState
};
*/

/*
put these in cloud server =D
const getTeamState = async (uuid) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  const result = await query.first({ useMasterKey: true })
  return result;
};

const createTeamState = async (uuid, stateId, currnetStageName, teamEnterTimeToStage) => {
  return await new TeamState().save({ uuid, stateId, currnetStageName, teamEnterTimeToStage }, { useMasterKey: true });
};

export const changeTeamState = async ({ uuid, stateId, currnetStageName, teamEnterTimeToStage }) => {
  if (!uuid) {
    // todo: fix for supervised workshops
    return;
  }
  const teamState = await getTeamState(uuid);
  if (!teamState) {
    await createTeamState(uuid, stateId, currnetStageName, teamEnterTimeToStage);

  } else {
    teamState.set('currnetStageName', currnetStageName)
    teamState.set('teamEnterTimeToStage', teamEnterTimeToStage)
    await teamState.save({ stateId }, { useMasterKey: true });
  }
};
*/

export const getChangeTeamStateSubscription = async ({ uuid }) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  return await query.subscribe();
};
