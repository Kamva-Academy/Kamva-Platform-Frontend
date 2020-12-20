import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import AnswerBox from './components/AnswerBox';
import * as blankSituations from './components/blanksSituation';
import CodeLine from './components/CodeLine';

class BlankGame extends Component {
  constructor(props) {
    super(props);

    this.checkAnswers = this.checkAnswers.bind(this);
  }
  state = {
    round: 1,
  };

  checkAnswers() {
    this.props.answers.forEach((answer, index) => {
      if (this.props.blanks[index] !== answer) {
        return false;
      }
    });
    return true;
  }

  showCorrectAnswers() {
    this.props.answers.forEach((answer, index) => {
      if (
        this.props.gameIndex === 2 &&
        index === 5 &&
        this.props.blanks[index] === '{1,2,3,4,5,6,7,8,9}'
      ) {
        this.props.updateBlankSituation(
          blankSituations.CORRECT,
          index,
          this.props.gameIndex
        );
      } else {
        if (this.props.blanks[index] !== answer) {
          this.props.updateBlankSituation(
            blankSituations.WRONG,
            index,
            this.props.gameIndex
          );
        } else {
          this.props.updateBlankSituation(
            blankSituations.CORRECT,
            index,
            this.props.gameIndex
          );
        }
      }
    });
  }

  onButtonClick() {
    if (this.state.round < 3) {
      let check = this.checkAnswers();
      if (this.state.round === 1 && !check) {
        alert('فقط یه فرصت دیگه داری');
      } else {
        this.showCorrectAnswers();
      }

      this.setState({ round: this.state.round + 1 });
    }
  }

  onDrop(newText, blankIndex) {
    this.props.updateBlank(newText, blankIndex, this.props.gameIndex);
  }

  isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = 'ontouchstart' in document.createElement('div');

    if (msTouchEnabled || generalTouchEnabled) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <DndProvider
        backend={this.isTouchSupported() ? TouchBackend : HTML5Backend}>
        <Grid container>
          <Grid item xs={6}>
            {this.props.code.map((line, lineIndex) => (
              <CodeLine
                key={lineIndex}
                blanks={this.props.blanks}
                lineData={line}
                lineIndex={lineIndex}
                onDrop={this.onDrop.bind(this)}
                help={this.props.helps[lineIndex].help}
                situations={this.props.situations}
                answers={this.props.answers}
              />
            ))}
          </Grid>
          <Grid item xs={6}>
            {this.props.code.map((line, lineIndex) => (
              <>
                <CodeLine
                  key={lineIndex}
                  blanks={this.props.blanks}
                  lineData={line}
                  lineIndex={lineIndex}
                  onDrop={this.onDrop.bind(this)}
                  help={this.props.helps[lineIndex].help}
                  situations={this.props.situations}
                  answers={this.props.answers}
                />
                <Button onClick={this.onButtonClick()}>Check Answers</Button>
              </>
            ))}
          </Grid>
          <Grid item xs={6}>
            {this.props.answerOptions.map((option, index) => {
              return <AnswerBox key={index} text={option} />;
            })}
          </Grid>
        </Grid>
      </DndProvider>
    );
  }
}

export default BlankGame;
