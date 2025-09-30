import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ targetDate, onComplete }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      onComplete();
      return <span>Order time expired. It may have been cancelled.</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    }
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};

export default CountdownTimer;