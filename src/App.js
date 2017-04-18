import React, { Component } from 'react';
import './App.css';

import Board from './board.js';
import AlertView from './AlertView';
import PassView from './PassView';
import BoardView from './BoardView';

const GRID_SIZE = 40;
const board = new Board(19);

class App extends Component {
  constructor() {
    super();
    this.state = { board };
    this.onBoardUpdate = this.onBoardUpdate.bind(this);
  }

  onBoardUpdate() {
    this.setState({ board });
  }

  render() {
    const { board } = this.state;

    return (
      <div className="App">
        <AlertView board={board} />
        <PassView board={board} />
        <BoardView board={board} gridSize={GRID_SIZE} onPlay={this.onBoardUpdate} />
      </div>
    );
  }
}

export default App;
