import React from 'react';

export default function PassView({ board }) {
  const handleClick = () => board.pass();

  return (
    <input
      id="pass-btn"
      type="button"
      value="Pass"
      onClick={handleClick}
    />
  );
}
