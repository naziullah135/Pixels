import React from "react";

const ProductSizePicker = ({ size, sizeIndex, handleSize }) => {
  return (
    <>
      {size?.length >= 1 && (
        <div>
          <h2 className="py-2 text-normal md:text-lg avenir2">Size:</h2>

          <div className="flex mb-5">
            {size?.map((item, index) => (
              <>
                <div
                  key={index}
                  onClick={() => handleSize(index, item)}
                  className={`mx-1 border items-center rounded-md font-bold ${sizeIndex === index
                      ? "bg-[#000] text-white"
                      : "bg-[#fff] text-black"
                    } cursor-pointer flex gap-2 px-2 py-1 `}
                >
                  <span className="text-xs pt-[2px]">{item}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSizePicker;
