import React from 'react';
import { connect } from 'react-redux';

import {
  updateBlank,
  updateBlankSituation,
} from '../../../redux/actions/blankGame';
import BlankGameContainer from './BlankGameContainer';
import {
  secondAnswers,
  secondData,
  secondHelps,
} from './components/secondData';

const answerOptions = ['size', '0', 'is', 'empty', 'domain', 'table', 'full'];

const SecondBlankGame = (props) => {
  return (
    <BlankGameContainer
      gameIndex={1}
      updateBlank={props.updateBlank}
      updateBlankSituation={props.updateBlankSituation}
      code={secondData}
      blanks={props.blanks}
      answers={secondAnswers}
      helps={secondHelps}
      answerOptions={answerOptions}
      situations={props.situtations}
    />
  );
};

const mapStateToProps = (state) => ({
  blanks: state.blankGame.blanks[1],
  situtations: state.blankGame.blanksSituation[1],
});

export default connect(mapStateToProps, {
  updateBlank,
  updateBlankSituation,
})(SecondBlankGame);
