import React from 'react';

import BoardIntersection from './BoardIntersection';

export default function BoardView({ board, onPlay }) {
  const intersections = [];

  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      const boardIntersection = BoardIntersection({
        board,
        row: i,
        col: j,
        onPlay,
        gridSize: board.gridSize,
        color: board.board[i][j],
      });

      intersections.push(boardIntersection);
    }
  }

  const totalBoardSize = board.size * board.gridSize;
  const style = { width: totalBoardSize, height: totalBoardSize };

  return (
    <div style={style} id="board">
      {intersections}
    </div>
  );
}
