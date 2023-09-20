import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

const Rating = ({ rate, id }) => {
  let rating = rate;
  //   console.log(rating);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        if (index + 1 <= rating.toFixed()) {
          return (
            <i key={index} className="text-warning pe-1">
              <BsStarFill />
            </i>
          );
        } else {
          return (
            <i key={index} className="text-warning p-1">
              <BsStar />
            </i>
          );
        }
      })}
    </div>
  );
};

export default Rating;
