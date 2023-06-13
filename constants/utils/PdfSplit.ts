// @ts-ignore
import { PdfSplitter } from "pdf-ops";
import { changePdfs, processRange } from "../PdfOperations";

export const PdfSplit = {
  name: "Pdf Split",
  functions: [
    {
      name: "Split All",
      icon: `<path d="M719.462 472.525v246.937H472.474V472.525h246.988m44.544-44.544H427.93v336.025h336.025V427.981h.051z" />
    <path d="M551.475 304.538v246.886H304.59V304.538h246.886m44.595-44.544H259.994v336.025h336.025V259.994h.051zM51.2 102.4h921.6v51.2H51.2v-51.2ZM51.2 870.4h102.4v102.4H51.2V870.4Z" />
    <path d="M51.2 870.4h921.6v51.2H51.2v-51.2Z" />
    <path d="M102.4 51.2h51.2v921.6h-51.2V51.2ZM870.4 51.2h51.2v921.6h-51.2V51.2Z" />
    <path d="M51.2 51.2h102.4v102.4H51.2V51.2ZM460.8 51.2h102.4v102.4H460.8V51.2ZM870.4 51.2h102.4v102.4H870.4V51.2ZM460.8 870.4h102.4v102.4H460.8V870.4ZM870.4 870.4h102.4v102.4H870.4V870.4ZM51.2 460.8h102.4v102.4H51.2V460.8ZM870.4 460.8h102.4v102.4H870.4V460.8Z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        const splitter = new PdfSplitter();
        for (const pdf of pdfs) {
          await splitter.split(pdf);
        }
        const bufferArr = await splitter.getPdfBuffer();
        changePdfs(pdfs, setPdfs, bufferArr, 0, true);
      },
    },
    {
      name: "Split Single Pdf",
      icon: `<path d="M719.462 472.525v246.937H472.474V472.525h246.988m44.544-44.544H427.93v336.025h336.025V427.981h.051z" />
    <path d="M551.475 304.538v246.886H304.59V304.538h246.886m44.595-44.544H259.994v336.025h336.025V259.994h.051zM51.2 102.4h921.6v51.2H51.2v-51.2ZM51.2 870.4h102.4v102.4H51.2V870.4Z" />
    <path d="M51.2 870.4h921.6v51.2H51.2v-51.2Z" />
    <path d="M102.4 51.2h51.2v921.6h-51.2V51.2ZM870.4 51.2h51.2v921.6h-51.2V51.2Z" />
    <path d="M51.2 51.2h102.4v102.4H51.2V51.2ZM460.8 51.2h102.4v102.4H460.8V51.2ZM870.4 51.2h102.4v102.4H870.4V51.2ZM460.8 870.4h102.4v102.4H460.8V870.4ZM870.4 870.4h102.4v102.4H870.4V870.4ZM51.2 460.8h102.4v102.4H51.2V460.8ZM870.4 460.8h102.4v102.4H870.4V460.8Z" />`,
      inputRequired: {
        fields: [
          {
            name: "index",
            type: "number",
            placeholder: "Pdf number",
            default: "",
          },
          {
            name: "newPdf",
            type: "checkbox",
            placeholder: "Make new Pdfs at the last position",
            default: false,
          },
        ],
      },
      function: async (
        pdfs: (File | Blob)[],
        setPdfs: Function,
        inputs: any
      ) => {
        const splitter = new PdfSplitter();
        const index = parseInt(inputs.index) - 1;
        const pdf = pdfs[index];
        await splitter.split(pdf);
        const bufferArr = await splitter.getPdfBuffer();
        if (inputs.newPdf) {
          changePdfs(pdfs, setPdfs, bufferArr, 0, false);
        } else {
          let copy = [...pdfs];
          copy.splice(index, 1);
          let i = 0;
          for (const buffer of bufferArr) {
            copy.splice(
              index + i,
              0,
              new Blob([buffer], { type: "application/pdf" })
            );
            i++;
          }
          setPdfs(copy);
        }
      },
    },
    {
      name: "Split Pdf into Groups",
      icon: `<path d="M719.462 472.525v246.937H472.474V472.525h246.988m44.544-44.544H427.93v336.025h336.025V427.981h.051z" />
    <path d="M551.475 304.538v246.886H304.59V304.538h246.886m44.595-44.544H259.994v336.025h336.025V259.994h.051zM51.2 102.4h921.6v51.2H51.2v-51.2ZM51.2 870.4h102.4v102.4H51.2V870.4Z" />
    <path d="M51.2 870.4h921.6v51.2H51.2v-51.2Z" />
    <path d="M102.4 51.2h51.2v921.6h-51.2V51.2ZM870.4 51.2h51.2v921.6h-51.2V51.2Z" />
    <path d="M51.2 51.2h102.4v102.4H51.2V51.2ZM460.8 51.2h102.4v102.4H460.8V51.2ZM870.4 51.2h102.4v102.4H870.4V51.2ZM460.8 870.4h102.4v102.4H460.8V870.4ZM870.4 870.4h102.4v102.4H870.4V870.4ZM51.2 460.8h102.4v102.4H51.2V460.8ZM870.4 460.8h102.4v102.4H870.4V460.8Z" />`,
      inputRequired: {
        fields: [
          {
            name: "index",
            type: "number",
            placeholder: "Pdf number",
            default: "",
          },
          {
            name: "range",
            placeholder: "Groups | eg: 1,3-6,9-end...",
            type: "text",
            default: "",
            helper: 'Write "start-end" for selecting all the pages of the pdf',
          },
          {
            name: "newPdf",
            type: "checkbox",
            placeholder: "Make new Pdfs at the last position",
            default: false,
          },
        ],
      },
      function: async (
        pdfs: (File | Blob)[],
        setPdfs: Function,
        inputs: any
      ) => {
        const splitter = new PdfSplitter();
        const index = parseInt(inputs.index) - 1;
        const actualRange = processRange(inputs.range);

        const pdf = pdfs[index];
        await splitter.splitWithRange(pdf, actualRange);
        const bufferArr = await splitter.getPdfBuffer();
        if (inputs.newPdf) {
          changePdfs(pdfs, setPdfs, bufferArr, index, false);
        } else {
          let copy = [...pdfs];
          copy.splice(index, 1);
          let i = 0;
          for (const buffer of bufferArr) {
            copy.splice(
              index + i,
              0,
              new Blob([buffer], { type: "application/pdf" })
            );
            i++;
          }
          setPdfs(copy);
        }
      },
    },
  ],
};
