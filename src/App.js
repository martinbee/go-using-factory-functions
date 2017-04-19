import React, { Component } from 'react';
import './App.css';

import createBoard from './board.js';
import AlertView from './AlertView';
import PassView from './PassView';
import BoardView from './BoardView';

const size = 19;
const gridSize = 40;
const board = createBoard(size, gridSize);

class App extends Component {
  state = { board };
  onBoardUpdate = () => this.setState({ board });

  render() {
    const { board } = this.state;

    return (
      <div className="App">
        <AlertView board={board} />
        <PassView board={board} />
        <BoardView board={board} onPlay={this.onBoardUpdate} />
      </div>
    );
  }
}

export default App;
