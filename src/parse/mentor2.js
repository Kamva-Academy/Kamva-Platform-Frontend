import Parse from 'parse';

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
