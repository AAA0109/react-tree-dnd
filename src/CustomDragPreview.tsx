import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const CustomDragPreview = ({ monitorProps }: any) => {
  const data = monitorProps.item?.data;
  console.log(monitorProps);

  return (
    <div className={`tree-node tree-dragging color-0`}>
      <div className={`flex items-center pr-4 h-full w-full tree-node-content`}>
        <div className="w-[24px]">{data?.hasChild && <ArrowRightIcon />}</div>
        <div className={" flex items-center justify-between grow"}>
          <Typography variant="body2">{data?.tag}</Typography>
          {data?.state && (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={data?.state === "On" ? true : false}
              />
              <div className="w-9 h-5 bg-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          )}
        </div>
      </div>
      <div className="tree-move">⋮</div>
    </div>
  );
};
