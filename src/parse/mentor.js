import Parse from 'parse';

const RequestMentor = Parse.Object.extend('RequestMentor');

export const requestMentor = async ({ playerId, teamId, fsmId }) => {
  const requestMentor = new RequestMentor();
  requestMentor.set('playerId', playerId);
  requestMentor.set('teamId', teamId);
  requestMentor.set('fsmId', fsmId);
  await requestMentor.save();
};
