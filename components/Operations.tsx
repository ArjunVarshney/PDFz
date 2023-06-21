import { operations } from "@/constants/PdfOperations";
import React from "react";
import SubMenu from "./SubMenu";

type OperationsType = {
  pdfs: (File | Blob)[];
  setPdfs: Function;
  loading: boolean;
  setLoading: Function;
};

const Operations = ({ pdfs, setPdfs, loading, setLoading }: OperationsType) => {
  return (
    <div className="flex flex-col h-full w-full p-2 sm:p-4 gap-2">
      {operations.map((operation, index) => {
        return (
          <div
            className="collapse collapse-arrow rounded-box bg-base-200"
            key={index}
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg lg:text-xl font-medium">
              {operation.name}
            </div>
            <div className="collapse-content">
              <ul className="flex flex-col gap-2 pt-2">
                {operation.functions.map((func: any, index) => {
                  if (!func.inputRequired) {
                    return (
                      <button
                        className="btn btn-secondary text-xs lg:text-[0.875rem] capitalize justify-start"
                        key={index}
                        onClick={async () => {
                          setLoading(true);
                          await func.function(pdfs, setPdfs);
                          setLoading(false);
                        }}
                        disabled={loading}
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
                        loading={loading}
                        setLoading={setLoading}
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
