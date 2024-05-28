import React from "react";

const RatingReview = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <div className="rating rating-xs ">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-gray-300"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-gray-300"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star-2 bg-gray-300"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-gray-300"
        />
        <input
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-gray-300"
          defaultChecked
        />
      </div>
      <p className="text-gray-500 text-xs mt-1">{`(5 Reviews)`}</p>
    </div>
  );
};

export default RatingReview;
