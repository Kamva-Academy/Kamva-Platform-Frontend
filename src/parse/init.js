import Parse from 'parse';

export const initParseServer = () => {
  const PARSE_SERVER_URL =
    process.env.NODE_ENV === 'development'
      ? 'https://parse.rastaiha.ir/parse_server'
      : 'https://parse.rastaiha.ir/parse_server';

  const liveQueryServerURL =
    process.env.NODE_ENV === 'development'
      ? 'wss://parse.rastaiha.ir/ws/'
      : 'wss://parse.rastaiha.ir/ws/';
  // Parse.initialize('asdfEWFkej2l3kj2lfjasfjasdf9', 'AKjdfkebfj323k238s9dfsdf');
  // Parse.serverURL = PARSE_SERVER_URL;
  // Parse.liveQueryServerURL = liveQueryServerURL;
};
