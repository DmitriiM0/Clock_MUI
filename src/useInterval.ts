import React, { useState, useEffect, useRef } from 'react';

function useIntervalHook() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  function handleDelayChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDelay(Number(e.currentTarget.value));
  }

  function handleIsRunningChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsRunning(e.currentTarget.checked);
  }

}

export default useIntervalHook;

function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
