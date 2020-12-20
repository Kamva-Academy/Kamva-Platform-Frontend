/* eslint-disable no-case-declarations */
import * as blanksSituations from '../../components/MiniGames/BlankGame/components/blanksSituation';
import * as actionTypes from '../actions/actionTypes';

function blankGame(
  state = {
    blanks: [
      new Array(11).fill(''),
      new Array(8).fill(''),
      new Array(25).fill(''),
    ],
    blanksSituation: [
      new Array(11).fill(blanksSituations.NONE),
      new Array(8).fill(blanksSituations.NONE),
      new Array(25).fill(blanksSituations.NONE),
    ],
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_BLANK:
      const newBlanks = state.blanks[action.payload.gameIndex].map(
        (blank, index) => {
          return index === action.payload.blankIndex
            ? action.payload.newText
            : blank;
        }
      );
      const newGameBlanks = state.blanks.map((gameBlanks, index) => {
        return index === action.payload.gameIndex ? newBlanks : gameBlanks;
      });
      return {
        ...state,
        blanks: newGameBlanks,
      };
    case actionTypes.UPDATE_BLANK_SITUATION:
      const newBlanksSitutations = state.blanksSituation[
        action.payload.gameIndex
      ].map((blank, index) => {
        return index === action.payload.blankIndex
          ? action.payload.newSituation
          : blank;
      });
      const newSitutations = state.blanksSituation.map((gameBlanks, index) => {
        return index === action.payload.gameIndex
          ? newBlanksSitutations
          : gameBlanks;
      });
      return {
        ...state,
        blanksSituation: newSitutations,
      };
    default:
      return state;
  }
}

export default blankGame;
