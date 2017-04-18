import _ from 'lodash';

export default function createBoard(size, gridSize) {
  const board = {
    size,
    gridSize,
    lastMovePassed: false,
    inAtari: false,
    attemptedSuicide: false,
    EMPTY: 0,
    BLACK: 1,
    WHITE: 2,
  };

  board.currentColor = board.BLACK;

  // Returns a size x size board with all entries set to this.Empty
  board.board = function() {
    const grid = [];

    for (let i = 0; i < board.size; i ++) {
      grid[i] = [];

      for (let j = 0; j < board.size; j++) {
        grid[i][j] = board.EMPTY;
      }
    }

    return grid;
  }();

  // Switches the current player
  board.switchPlayer = function() {
    this.currentColor = this.currentColor === this.BLACK ? this.WHITE : this.BLACK;
  }

  // Pass ability
  board.pass = function() {
    if (this.lastMovePassed) this.endGame();

    this.lastMovePassed = true;
    this.switchPlayer();
  }

  board.resetGame = function() {
    this.currentColor = this.BLACK;
    this.board = this.createGrid(this.size);
    this.lastMovePassed = false;
    this.inAtari = false;
    this.attemptedSuicide = false;
  }

  // Called when the game ends (both players have passed)
  board.endGame = function() {
    alert("Game Over");

    this.resetGame();
  }

  // Given a board position, returns a list of [i, j] coordinates representing
  // orthagonally adjacent intersections
  board.getAdjacentIntersections = function(i, j) {
    const neighbors = [];

    if (i > 0) neighbors.push([i - 1, j]);

    if (j < this.size - 1) neighbors.push([i, j + 1]);

    if (i < this.size - 1) neighbors.push([i + 1, j]);

    if (j > 0) neighbors.push([i, j - 1]);

    return neighbors;
  }

  board.getGroup = function(i, j) {
    const { board } = this;

    const color = board[i][j];

    if (color === this.EMPTY) return;

    const visited = {};
    const visitedList = [];
    const queue = [[i, j]];
    let count = 0;

    while (queue.length > 0) {
      const stone = queue.pop();

      if (visited[stone]) continue;

      const neighbors = this.getAdjacentIntersections(stone[0], stone[1]);

      // eslint-disable-next-line
      neighbors.forEach(neighbor => {
        const state = board[neighbor[0]][neighbor[1]];

        if (state === this.EMPTY) count ++

        if (state === color) queue.push([neighbor[0], neighbor[1]]);
      });

      visited[stone] = true;
      visitedList.push(stone);
    }

    return {
      liberties: count,
      stones: visitedList,
    }
  }

  // Attempt to place a stone at (i,j). Returns true if the move was legal
  board.play = function(i, j) {
    console.log(`Played at ${i}, ${j}.`);

    this.attemptedSuicide = this.inAtari = false;

    if (this.board[i][j] !== this.empty) return false;

    const color = this.board[i][j] = this.currentColor;
    const captured = [];
    const neighbors = this.getAdjacentIntersections(i, j);
    let atari = false

    neighbors.forEach(neighbor => {
      const state = this.board[neighbor[0]][neighbor[1]];

      if (state !== this.EMPTY && state !== color) {
        const group = this.getGroup(neighbor[0], neighbor[1]);
        const liberties = group.liberties;

        console.log(group);

        if (liberties === 0)  {
          captured.push(group);
        } else if (liberties === 1)  {
          atari = true;
        }
      }
    });

    // detect suicide
    if (_.isEmpty(captured) && this.getGroup(i, j)["liberties"] === 0) {
      this.board[i][j] = this.EMPTY;
      this.attemptedSuicide = true;

      // Look more into this, do we need a bool return here??
      return false;
    }

    captured.forEach(group => {
      group.stones.forEach(stone => this.board[stone[0]][stone[1]] = this.EMPTY);
    });

    if (atari) this.inAtari = true;

    this.lastMovePassed = false;
    this.switchPlayer();

    return true;
  }

  return board;
}
