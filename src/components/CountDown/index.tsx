import { useState, useEffect } from "react";
import styles from "../CountDown/index.module.scss";

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props;
  let [count, setCount] = useState(time || 60);
  console.log(count);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          onEnd && onEnd();
        }
        return count - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [time, onEnd]);

  return <div>{count}</div>;
};

export default CountDown;
