import _ from 'lodash';

export default function createBoard(size, gridSize) {
  return {
    currentColor: this.black,
    size,
    board: createGrid(size),
    gridSize,
    lastMovePassed: false,
    inAtari: false,
    attemptedSuicide: false,
    EMPTY: 0,
    BLACK: 1,
    WHITE: 2,

    // Switches the current player
    switchPlayer() {
      this.currentColor = this.currentColor === this.BLACK ? this.WHITE : this.BLACK;
    },

    // Pass ability
    pass() {
      if (this.lastMovePassed) this.endGame();

      this.lastMovePassed = true;
      this.switchPlayer();
    },

    resetGame() {
      this.currentColor = this.BLACK;
      this.board = this.createGrid(this.size);
      this.lastMovePassed = false;
      this.inAtari = false;
      this.attemptedSuicide = false;
    },

    // Called when the game ends (both players have passed)
    endGame() {
      alert("Game Over");

      this.resetGame();
    },

    // Attempt to place a stone at (i,j). Returns true if the move was legal
    play(i, j) {
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
    },

    // Given a board position, returns a list of [i, j] coordinates representing
    // orthagonally adjacent intersections
    getAdjacentIntersections(i, j) {
      const neighbors = [];

      if (i > 0) neighbors.push([i - 1, j]);

      if (j < this.size - 1) neighbors.push([i, j + 1]);

      if (i < this.size - 1) neighbors.push([i + 1, j]);

      if (j > 0) neighbors.push([i, j - 1]);

      return neighbors;
    },

    getGroup(i, j) {
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
    },
  }
};


// Returns a size x size board with all entries set to this.Empty
function createGrid(size) {
  const grid = [];

  for (let i = 0; i < size; i ++) {
    grid[i] = [];

    for (let j = 0; j < size; j++) {
      grid[i][j] = this.EMPTY;
    }
  }

  return grid;
}
