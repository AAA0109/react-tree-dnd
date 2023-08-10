import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./CustomNode.module.css";
import { CustomSwitch } from "./CustomSwitch";
export const CustomNode = ({ node, options, changeItemState }: any) => {
  const { droppable, data } = node;
  const { isOpen, depth, hasChild, onToggle } = options;

  const handleToggle = (e: any) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  return (
    <div className={`tree-node ${hasChild ? `color-${depth % 4}` : ""}`}>
      <div
        className={`flex items-center pr-4 h-full w-full ${
          hasChild ? "" : "tree-node-content"
        }`}
      >
        <div
          className={`${styles.expandIconWrapper} ${
            isOpen ? styles.isOpen : ""
          }`}
        >
          {hasChild && (
            <div onClick={handleToggle}>
              <ArrowRightIcon />
            </div>
          )}
        </div>
        <div
          className={
            styles.labelGridItem + " flex items-center justify-between grow"
          }
        >
          <Typography variant="body2">{data?.tag}</Typography>
          {data?.state && (
            <CustomSwitch
              checked={data?.state === "On" ? true : false}
              onChange={() => changeItemState(node.id)}
            />
          )}
        </div>
      </div>
      <div className="tree-move">⋮</div>
    </div>
  );
};
