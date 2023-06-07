"use client";
import React from "react";

type previewerType = {
  pdfUrl: string;
  order: number;
  removePdf: Function;
  moveLeft: Function;
  moveRight: Function;
  previewPdf: Function;
};

const PdfPreview = ({
  pdfUrl,
  order,
  removePdf,
  moveLeft,
  moveRight,
  previewPdf,
}: previewerType) => {
  return (
    <div className="border border-solid border-neutral/25 min-w-[150px] max-w-[200px] rounded-box bg-base-100 shadow-lg p-[2px] pb-1 shrink flex flex-col items-center justify-center transition-all relative group">
      <iframe
        id={"pdfnumber" + order}
        className="rounded-box rounded-bl-none rounded-br-none border border-solid border-neutral/30"
        src={pdfUrl + "#toolbar=0"}
        width={"100%"}
        height={"100%"}
      />
      <div className="flex items-center justify-between w-full px-2">
        <div className="font-bold btn btn-primary btn-xs hover:bg-primary cursor-text select-text duration-0 no-animation">
          {order}
        </div>
        <div className="flex gap-1">
          <button
            className="btn btn-accent btn-xs btn-outline font-bold"
            onClick={() => moveLeft(order - 1)}
          >
            {"<-"}
          </button>
          <button
            className="btn btn-accent btn-xs btn-outline font-bold"
            onClick={() => moveRight(order - 1)}
          >
            {"->"}
          </button>
        </div>
        <button
          className="btn btn-outline btn-error btn-xs my-1"
          onClick={() => removePdf(order - 1)}
        >
          x
        </button>
        <button
          className="absolute opacity-0 group-hover:opacity-100 top-2 left-2 btn btn-sm bg-neutral/25 hover:bg-neutral/40 border-none py-1 px-2 rounded-box"
          onClick={() => previewPdf(pdfUrl)}
        >
          <svg viewBox="-3.5 0 32 32" width={"1.5rem"}>
            <title>{"view"}</title>
            <path d="M12.406 13.844c1.188 0 2.156.969 2.156 2.156s-.969 2.125-2.156 2.125-2.125-.938-2.125-2.125.938-2.156 2.125-2.156zm0-5.313c7.063 0 12.156 6.625 12.156 6.625.344.438.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625S.25 16.812.25 16.812c-.344-.438-.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zm0 12.813c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344S7.062 13.062 7.062 16s2.406 5.344 5.344 5.344z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PdfPreview;
