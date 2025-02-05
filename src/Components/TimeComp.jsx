import { useEffect, useState } from "react";
const TimeComp = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); //update current time with date object
    }, 1000); //callbacks after every 1 second

    return () => clearInterval(interval); //clears the interval when chaged
  }, []); //empty dependency ensure it runs once after change

  return (
    <>
      <h2 className="text-xs font-normal text-gray-500">
        {/* display time as hh:mm:ss  */}
        {time.toLocaleTimeString()}
      </h2>
    </>
  );
};
export default TimeComp;
