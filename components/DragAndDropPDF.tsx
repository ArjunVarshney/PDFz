"use client";
import { useState } from "react";

type pdfType = {
  setPdfs: Function;
  pdfs: (File | Blob)[];
  className?: string;
};

const DragAndDropPDF = ({ setPdfs, pdfs, className = "" }: pdfType) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const appendFileList = (files: FileList | null | undefined) => {
    if (!files) return;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file.type === "application/pdf") {
        setPdfs((prev: File[]) => {
          return [...prev, file];
        });
      } else {
        console.log("type not supported!");
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    appendFileList(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    appendFileList(files);
  };

  return (
    <div
      className={`${className} min-h-[230px] h-[100%] w-full flex items-center justify-center border-[4px] border-dashed border-accent/75 shadow-md rounded-box bg-base-100`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver ? (
        <p>Drop the PDF file(s) here...</p>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileInput}
            hidden
            multiple
          />
          <label htmlFor="fileInput" className="btn btn-lg btn-primary">
            Add File
          </label>
          <p className="text-2xl font-semibold max-w-[30%] text-center">
            Drag and drop or Select PDF file(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default DragAndDropPDF;
