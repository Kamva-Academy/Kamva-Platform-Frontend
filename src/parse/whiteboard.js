import Parse from 'parse';

export const getWhiteboard = async ({ uuid }) => {
  return await Parse.Cloud.run('getWhiteboard', { uuid });
};

export const addWhiteboardNode = async ({ uuid, node }) => {
  return await Parse.Cloud.run('addNode', { uuid, node });
};

export const updateWhiteboardNode = async ({ uuid, nodeId, shape }) => {
  return await Parse.Cloud.run('updateNode', { uuid, nodeId, shape });
};

export const getWhiteboardActionSubscription = async ({ uuid }) => {
  const query = new Parse.Query('WhiteboardAction');
  query.equalTo('uuid', uuid);
  return await query.subscribe();
};
