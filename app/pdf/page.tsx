"use client";
import DragAndDropPDF from "@/components/DragAndDropPDF";
import Layout from "@/components/Layout";
import PdfPreview from "@/components/PdfPreview";
import React, { useState } from "react";
import Operations from "@/components/Operations";

const Tools = () => {
  const [pdfs, setPdfs] = useState<(File | Blob)[]>([]);
  const [preview, setPreview] = useState<File | Blob>(new Blob());

  const changePdfs = (arr: React.SetStateAction<(File | Blob)[]>) => {
    setPdfs(arr);
  };

  const removePdf = (index: number) => {
    const pdfCopy = [...pdfs];
    pdfCopy.splice(index, 1);
    setPdfs(pdfCopy);
  };

  const moveLeft = (index: number) => {
    const pdfCopy = [...pdfs];
    if (index != 0) {
      let temp = pdfCopy[index];
      pdfCopy[index] = pdfCopy[index - 1];
      pdfCopy[index - 1] = temp;
    }
    setPdfs(pdfCopy);
  };

  const moveRight = (index: number) => {
    const pdfCopy = [...pdfs];
    if (index != pdfs.length - 1) {
      let temp = pdfCopy[index];
      pdfCopy[index] = pdfCopy[index + 1];
      pdfCopy[index + 1] = temp;
    }
    setPdfs(pdfCopy);
  };

  const duplicatePdf = (index: number) => {
    const pdfCopy = [...pdfs];
    pdfCopy.splice(index + 1, 0, pdfCopy[index]);
    setPdfs(pdfCopy);
  };

  const previewPdf = (pdf: File | Blob) => {
    setPreview(pdf);
    // @ts-ignore
    window.pdf_modal.showModal();
  };

  return (
    <main>
      <Layout className="mt-24 flex gap-4">
        <dialog
          id="pdf_modal"
          className="rounded-box bg-base-100 w-[85%] h-[90%] z-50 drop-shadow-lg overflow-y-hidden text-right border border-accent/20 border-solid"
        >
          <div className="flex w-full items-center justify-end gap-3 mb-2">
            <div>
              click <kbd className="kbd mx-1">esc</kbd> or
            </div>
            <button
              className="btn btn-sm btn-primary capitalize font-normal border border-solid border-neutral/20 border-b-2"
              onClick={() => {
                const dialog: HTMLDialogElement | null =
                  document.querySelector("dialog#pdf_modal");
                dialog?.close();
              }}
            >
              close
            </button>
          </div>
          <iframe
            src={URL.createObjectURL(preview)}
            className="rounded-box h-[93%] w-full"
          ></iframe>
        </dialog>
        <div
          className="w-[70%] flex flex-col items-center justify-center gap-2"
          style={{
            height: "calc(100vh - 10rem)",
          }}
        >
          <div
            id="pdf-previewer"
            className={`flex flex-wrap gap-4 px-4 ${
              pdfs.length ? "min-h-[210px]" : ""
            } overflow-y-auto rounded-box`}
          >
            {pdfs.map((pdf, index) => {
              console.log(typeof pdf);
              return (
                <PdfPreview
                  pdf={pdf}
                  key={index}
                  order={index + 1}
                  removePdf={removePdf}
                  moveLeft={moveLeft}
                  moveRight={moveRight}
                  previewPdf={previewPdf}
                  duplicatePdf={duplicatePdf}
                />
              );
            })}
          </div>
          {pdfs.length ? (
            <div className="divider my-1 before:bg-accent after:bg-accent"></div>
          ) : (
            ""
          )}
          <DragAndDropPDF setPdfs={setPdfs} pdfs={pdfs} />
        </div>
        <div
          className="w-[30%] flex flex-col gap-4"
          style={{
            height: "calc(100vh - 10rem)",
          }}
        >
          <div className=" w-full h-full rounded-box bg-base-100 shadow-lg grid place-items-center overflow-y-auto">
            <Operations pdfs={pdfs} setPdfs={changePdfs} />
          </div>
          <div>
            <button className="btn btn-lg btn-primary w-full">
              Export To Pdf
            </button>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Tools;
