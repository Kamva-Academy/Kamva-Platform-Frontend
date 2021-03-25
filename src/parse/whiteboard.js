import Parse from 'parse';

export const getWhiteboard = async ({ uuid }) => {
  return await Parse.Cloud.run('getWhiteboard', { uuid });
};

export const addWhiteboardNode = async ({ uuid, node }) => {
  await Parse.Cloud.run('addNode', { uuid, node });
};

export const updateWhiteboardNode = async ({ uuid, nodeId, shape }) => {
  await Parse.Cloud.run('updateNode', { uuid, nodeId, shape });
};

export const removeWhiteboardNode = async ({ uuid, nodeId }) => {
  await Parse.Cloud.run('removeNode', { uuid, nodeId });
};

export const removeWhiteboardNodes = async ({ uuid }) => {
  await Parse.Cloud.run('removeAllNodes', { uuid });
};

export const getWhiteboardActionSubscription = async ({ uuid }) => {
  const query = new Parse.Query('WhiteboardAction');
  query.equalTo('uuid', uuid);
  return await query.subscribe();
};
