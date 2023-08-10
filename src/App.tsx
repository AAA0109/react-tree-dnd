import React, { useState } from "react";
import {
  Tree,
  NodeModel,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { parseXmlToJSON } from "./helper/util";
import "./App.css";
import "./assets/main.css";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";

interface IData {
  tag: string;
  state: string;
  hasChild?: boolean;
}

export default function App() {
  const [treeData, setTreeData] = useState<NodeModel<IData>[]>([]);

  const handleDrop = (newTreeData: NodeModel<IData>[]) => {
    updateTreeData(newTreeData);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    const file = selectedFiles?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xmlString = e.target?.result?.toString() || "";
        const presult = parseXmlToJSON(xmlString);
        if (presult.length) {
          updateTreeData(presult);
          console.log("treeData", treeData);
        }
      };

      reader.readAsText(file);
    }
  };

  const changeItemState = (id: number) => {
    const _treeData = [...treeData];
    _treeData.forEach((e) => {
      if (e.id === id) {
        if (e.data) {
          let state = e.data.state;
          e.data.state = state === "On" ? "Off" : "On";
        }
      }
    });
    updateTreeData(_treeData);
  };

  const updateTreeData = (_treeData: NodeModel<IData>[]) => {
    setTreeData(
      _treeData.map((p) => {
        let hasChild = false;
        if (_treeData.findIndex((c) => c.parent === p.id) > -1) {
          hasChild = true;
        }
        p.data = {
          tag: p.data?.tag || "",
          state: p.data?.state || "",
          hasChild,
        };
        return p;
      })
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center w-full mb-2">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click here to upload</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".xml"
            onChange={changeHandler}
          />
        </label>
      </div>
      {treeData.length ? (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <Tree
            tree={treeData}
            rootId={0}
            sort={false}
            insertDroppableFirst={false}
            initialOpen
            onDrop={handleDrop}
            classes={{
              root: "tree-root",
              container: "tree-list",
              draggingSource: "tree-dragging-source",
              dropTarget: "tree-drop-target",
            }}
            canDrop={(tree, { dragSource, dropTargetId }) => {
              if (dragSource?.parent === dropTargetId) {
                return true;
              }
            }}
            render={(node, options) => (
              <CustomNode
                node={node}
                options={options}
                changeItemState={changeItemState}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
          />
        </DndProvider>
      ) : (
        ""
      )}
    </div>
  );
}
