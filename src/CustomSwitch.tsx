import React from "react";

export const CustomSwitch = ({ checked, onChange }: any) => {
  return (
    <label className="flex items-center relative w-max cursor-pointer select-none scale-75">
      <input
        type="checkbox"
        className="custom-switch appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full bg-gray-800"
        checked={checked}
        onChange={onChange}
      />
      <span className="absolute font-medium text-xs uppercase right-1 text-white">
        {" "}
        OFF{" "}
      </span>
      <span className="absolute font-medium text-xs uppercase right-8 text-white">
        {" "}
        ON{" "}
      </span>
      <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-600" />
    </label>
  );
};
