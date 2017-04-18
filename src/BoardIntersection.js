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
    if (color === this.EMPTY) return '';

    return color === this.BLACK ? "black" : "white";
  };

  const classes = `intersection ${getColor()}`;
  const key = `${row}/${col}`;

  return <div key={key} onClick={handleClick} className={classes} style={style}></div>;
}
