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
