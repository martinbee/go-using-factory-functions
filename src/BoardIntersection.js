import React from 'react';

import Board from './board';

export default function BoardIntersection({
  board,
  row,
  col,
  onPlay,
  gridSize,
  color,
}) {
  const handleClick = () => {
    if (board.play(row, col)) onPlay()
  };

  const style = {
    top: row * gridSize,
    left: col * gridSize,
  };

  const getColor = () => {
    if (color === Board.EMPTY) return '';

    return color === Board.BLACK ? "black" : "white";
  };

  const classes = `intersection ${getColor()}`;
  const key = `${row}/${col}`;

  return <div key={key} onClick={handleClick} className={classes} style={style}></div>;
}
