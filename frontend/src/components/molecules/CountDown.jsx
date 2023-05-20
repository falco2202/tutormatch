import { useState, useRef, useEffect } from 'react';

//TODO_BETA
const CountDown = (props) => {
  const [timeCountDown, setTimeCountDown] = useState({
    minute: 0,
    second: 0
  });
  const timeCountDownID = useRef();

  useEffect(() => {
    setTimeCountDown({
      minute: props.time.minute,
      second: props.time.second
    });
  }, [props.time]);

  useEffect(() => {
    timeCountDownID.current = setInterval(() => {
      setTimeCountDown((time) => {
        if (time.second > 0) {
          return { minute: time.minute, second: time.second - 1 };
        }
        if (time.minute > 0) {
          return { minute: time.minute - 1, second: 59 };
        }
        clearInterval(timeCountDownID.current);
        props.onFinish();
        return { minute: time.minute, second: time.second };
      });
    }, 1000);

    return () => {
      clearInterval(timeCountDownID.current);
    };
  }, [props.indexQuestion]);

  return (
    <div className="text-xl mb-5 font-medium">
      <div className="text-center">
        {timeCountDown.minute}:{timeCountDown.second}
      </div>
    </div>
  );
};

export default CountDown;
