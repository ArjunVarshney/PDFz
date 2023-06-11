import { operations } from "@/constants/pdfFunctions";
import React, { useState } from "react";
import SubMenu from "./SubMenu";

type OperationsType = {
  pdfs: (File | Blob)[];
  setPdfs: Function;
};

const Operations = ({ pdfs, setPdfs }: OperationsType) => {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-2">
      {operations.map((operation, index) => {
        return (
          <div
            className="collapse collapse-arrow rounded-box bg-base-200"
            key={index}
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {operation.name}
            </div>
            <div className="collapse-content">
              <ul className="flex flex-col gap-2 pt-2">
                {operation.functions.map((func, index) => {
                  if (!func.inputRequired) {
                    return (
                      <button
                        className="btn btn-secondary capitalize justify-start"
                        key={index}
                        onClick={() => func.function(pdfs, setPdfs)}
                      >
                        <svg
                          className="h-6 w-6 fill-secondary-content"
                          viewBox="0 0 1024 1024"
                          dangerouslySetInnerHTML={{ __html: func.icon }}
                        ></svg>
                        {func.name}
                      </button>
                    );
                  } else {
                    return (
                      <SubMenu
                        key={index}
                        pdfs={pdfs}
                        setPdfs={setPdfs}
                        icon={func.icon}
                        name={func.name}
                        operation={func.function}
                        inputs={func.inputRequired}
                      />
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Operations;
