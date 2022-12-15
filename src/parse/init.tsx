import Parse from 'parse';
import { LIVE_QUERY_SERVER_URL, PARSE_SERVER_URL } from '../configs/Constants';

export const initParseServer = () => {
  Parse.initialize('asdfEWFkej2l3kj2lfjasfjasdf9', 'AKjdfkebfj323k238s9dfsdf');
  Parse.serverURL = PARSE_SERVER_URL;
  Parse.liveQueryServerURL = LIVE_QUERY_SERVER_URL;
};
