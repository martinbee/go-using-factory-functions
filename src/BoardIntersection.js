import React from 'react';

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
    if (color === board.EMPTY) return '';

    return color === board.BLACK ? "black" : "white";
  };

  const classes = `intersection ${getColor()}`;
  const key = `${row}/${col}`;

  return <div key={key} onClick={handleClick} className={classes} style={style}></div>;
}
