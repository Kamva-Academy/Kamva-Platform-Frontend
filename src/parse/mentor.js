import Parse from 'parse';

const RequestMentor = Parse.Object.extend('RequestMentor');

export const haveRequest = async({ teamId, fsmId }) =>{
  const query = new Parse.Query('RequestMentor');
  query.equalTo('teamId', teamId);
  query.equalTo('fsmId', fsmId);
  const requests = await query.find();
  return requests.length > 0;
}

export const requestMentor = async ({ playerId, teamId, fsmId }) => {
  // if(await haveRequest({ teamId, fsmId })) return;
  const requestMentor = new RequestMentor();
  requestMentor.set('playerId', playerId);
  requestMentor.set('teamId', teamId);
  requestMentor.set('fsmId', fsmId);
  await requestMentor.save();
};

export const getRequests = async () => {
  const query = new Parse.Query('RequestMentor');
  query.limit(1000)
  return await query.find();
};

export const deleteRequest = async ({ teamId, fsmId }) => {
  const query = new Parse.Query('RequestMentor');
  query.equalTo('teamId', String(teamId));
  query.equalTo('fsmId', +fsmId);
  const requests = await query.find();
  for (let i = 0; i < requests.length; i++) {
    await requests[i].destroy({});
  }
  // await Parse.Object.destroyAll(requests)
  return;
};

export const getRequestSubscription = async () => {
  const query = new Parse.Query('RequestMentor');
  return await query.subscribe();
};

