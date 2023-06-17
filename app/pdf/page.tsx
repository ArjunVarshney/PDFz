"use client";
import DragAndDropPDF from "@/components/DragAndDropPDF";
import Layout from "@/components/Layout";
import PdfPreview from "@/components/PdfPreview";
import React, { useState } from "react";
import Operations from "@/components/Operations";
import { PdfMerger } from "pdf-ops";
import JSZip from "jszip";

const Tools = () => {
  const [pdfs, setPdfs] = useState<(File | Blob)[]>([]);
  const [preview, setPreview] = useState<File | Blob>(new Blob());

  const mergeAndDownload = async () => {
    const merger = new PdfMerger();
    await merger.merge(pdfs);
    const pdfBuffer = await merger.getPdfBuffer();
    const fileName = "pdf";

    const blob = new Blob([pdfBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  const zipDownload = async () => {
    const zip = new JSZip();

    pdfs.forEach((pdf, index) => {
      const pdfName = `pdf${index + 1}.pdf`;
      zip.file(pdfName, pdf);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "pdfz";
    link.click();
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
      <Layout className="mt-24 flex flex-col md:flex-row gap-4">
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
        <div className="w-full md:w-[60%] lg:w-[70%] md:h-[calc(100vh-10rem)] flex flex-col items-center justify-center gap-2">
          <div
            id="pdf-previewer"
            className={`flex w-full max-w-[calc(100vw-3rem)] md:flex-wrap gap-4 px-4 overflow-x-auto ${
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
        <div className="h-fit md:h-[calc(100vh-10rem)] w-full md:w-[40%] lg:w-[30%] flex flex-col gap-4">
          <div className=" w-full h-full rounded-box bg-base-100 shadow-lg grid place-items-center overflow-y-auto">
            <Operations pdfs={pdfs} setPdfs={setPdfs} />
          </div>
          <div>
            <button
              className="btn btn-lg btn-primary w-full"
              onClick={zipDownload}
            >
              Download as ZIP folder
            </button>
          </div>
          <div>
            <button
              className="btn btn-lg btn-primary w-full"
              onClick={mergeAndDownload}
            >
              Merge All and Download
            </button>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Tools;
