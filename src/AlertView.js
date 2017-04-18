import React from 'react';

export default function AlertView({ board }) {
  const getText = () => {
    if (board.inAtari) {
      return "ATARI!";
    } else if (board.attemptedSuicide) {
      return "SUICIDE!"
    } else {
      return "";
    }
  };

  return <div id="alerts">{getText()}</div>;
}
