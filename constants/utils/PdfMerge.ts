import { PdfMerger } from "pdf-ops";
import { changePdfs, processRange } from "../PdfOperations";

export const PdfMerge = {
  name: "Pdf Merge",
  functions: [
    {
      name: "Merge All",
      icon: `<path d="M480 96v242.016L375.008 232.96l-46.048 46.08L465.984 416H0v64h1024v-64H557.984l137.024-136.992-46.048-46.048L544 338.016V96h-64zM0 544v64h466.016L328.992 744.992l46.016 46.016L480 685.984V928h64V685.984l104.992 105.024 46.016-46.016L557.984 608H1024v-64H0z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        const merger = new PdfMerger();
        await merger.merge(pdfs);
        const pdf = await merger.getPdfBuffer();
        if (pdf) changePdfs(pdfs, setPdfs, [pdf], 0, true);
      },
    },
    {
      name: "Merge Selected Pdfs",
      icon: `<path d="M480 96v242.016L375.008 232.96l-46.048 46.08L465.984 416H0v64h1024v-64H557.984l137.024-136.992-46.048-46.048L544 338.016V96h-64zM0 544v64h466.016L328.992 744.992l46.016 46.016L480 685.984V928h64V685.984l104.992 105.024 46.016-46.016L557.984 608H1024v-64H0z" />`,
      inputRequired: {
        fields: [
          {
            name: "index",
            type: "text",
            placeholder: "Pdf numbers | eg: 1,2-6...",
            helper: "Note:- start, end are not valid here",
          },
          {
            name: "newPdf",
            type: "checkbox",
            placeholder: "Make new Pdf at the last position",
            default: false,
          },
        ],
      },
      function: async (
        pdfs: (File | Blob)[],
        setPdfs: Function,
        inputs: any
      ) => {
        let { index, newPdf } = inputs;
        index = processRange(index, false);
        const copy = [...pdfs];

        const merger = new PdfMerger();
        let c = 0;
        for (const i of index) {
          await merger.merge([pdfs[i - 1]]);
          copy.splice(i - c - 1, 1);
          c++;
        }

        const pdfBuffer = await merger.getPdfBuffer();
        if (!newPdf && pdfBuffer) {
          copy.splice(
            index[0] - 1,
            0,
            new Blob([pdfBuffer], { type: "application/pdf" })
          );
          setPdfs(copy);
        } else if (pdfBuffer) {
          changePdfs(pdfs, setPdfs, pdfBuffer, 0, false);
        }
      },
    },
  ],
};
