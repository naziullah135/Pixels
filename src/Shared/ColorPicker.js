import { SketchPicker } from "@hello-pangea/color-picker";
import React from "react";
import CustomModal from "./CustomModal";
import { useState } from "react";

const ColorPicker = ({
  setProductColor,
  productColor,
  setIsOpen,
  modalIsOpen,
}) => {
  const [color, setColor] = useState("#fff");

  const handleColorPicker = () => {
    setIsOpen(false);
    setProductColor([...productColor, color])
  };


  return (
    <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
      <div className={`w-full `} style={{ background: color }}>
        <SketchPicker onChangeComplete={({ hex }) => setColor(hex)} />
      </div>
      <span
        onClick={handleColorPicker}
        className="btn btn-sm bg-primary hover:btn-primary text-white shadow-md rounded-md mt-5"
      >
        Save Product Color
      </span>
    </CustomModal>
  );
};

export default ColorPicker;
