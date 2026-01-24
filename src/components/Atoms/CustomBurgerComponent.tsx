import React from "react";

const CustomBurgerComponent: React.FC<{
  opened: boolean;
  onClick: () => void;
  color: string;
}> = ({ opened, onClick, color }) => {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] mx-3">
      <button
        className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
        onClick={onClick}
      >
        <span
          className={`block h-[2px] w-6 transform transition-all duration-300 ${
            opened ? "rotate-45 translate-y-[9.5px]" : ""
          }`}
          style={{ backgroundColor: color }}
        />
        <span
          className={`block h-[2px] w-6 my-[6px] transform transition-all duration-300 ${
            opened ? "opacity-0" : ""
          }`}
          style={{ backgroundColor: color }}
        />
        <span
          className={`block h-[2px] w-6 transform transition-all duration-300 ${
            opened ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
          style={{ backgroundColor: color }}
        />
      </button>
    </div>
  );
};

export default CustomBurgerComponent;
