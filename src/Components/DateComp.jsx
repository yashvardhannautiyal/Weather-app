import React from "react";

const getDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day},${month},${year}`;
};

const DateComp = () => {
  const currentDate = new Date();
  const DateGot = getDate(currentDate);

  return (
    <div className="text-lg font-medium mb-5 text-gray-400">{DateGot}</div>
  );
};

export default DateComp;
