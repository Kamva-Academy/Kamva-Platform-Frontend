import React from 'react';
import { connect } from 'react-redux';

import {
  updateBlank,
  updateBlankSituation,
} from '../../../redux/actions/blankGame';
import BlankGameContainer from './BlankGameContainer';
import { thirdAnswers, thirdData, thirdHelps } from './components/thirdData';

const answerOptions = [
  'square',
  'Domain',
  'empty',
  'domain',
  '{1,2,3,4,5,6,7,8,9}',
  'is not',
  'row',
  'myCell',
  'table',
  'myCell.column',
  'myCell.row',
  'column',
];

const SecondBlankGame = (props) => {
  return (
    <BlankGameContainer
      gameIndex={2}
      updateBlank={props.updateBlank}
      updateBlankSituation={props.updateBlankSituation}
      code={thirdData}
      blanks={props.blanks}
      answers={thirdAnswers}
      helps={thirdHelps}
      answerOptions={answerOptions}
      situations={props.situtations}
    />
  );
};

const mapStateToProps = (state) => ({
  blanks: state.blankGame.blanks[2],
  situtations: state.blankGame.blanksSituation[2],
});

export default connect(mapStateToProps, {
  updateBlank,
  updateBlankSituation,
})(SecondBlankGame);
