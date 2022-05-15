import React from "react";
import CountUp from "react-countup";

function CounterUp() {
  return (
    <div>
      <CountUp end={20000} duration={5} prefix="$" decimals={3} />
    </div>
  );
}

export default CounterUp;
