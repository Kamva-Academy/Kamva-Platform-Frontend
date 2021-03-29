import Parse from 'parse';

export const changeTeamState = async ({ stateId, token }) => {
  await Parse.Cloud.run('changeTeamState', { stateId, token });
};

export const getChangeTeamStateSubscription = async ({ uuid }) => {
  const query = new Parse.Query('TeamState');
  query.equalTo('uuid', uuid);
  return await query.subscribe();
};
