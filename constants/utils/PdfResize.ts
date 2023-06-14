// @ts-ignore
import { PdfResizer } from "pdf-ops";
import { changePdfs, processRange } from "../PdfOperations";

export const PdfResize = {
  name: "Pdf Page Resize",
  functions: [
    {
      name: "Resize to A4",
      icon: `<path d="M844.5 300.2 595.2 71.7s-6.2-7.5-14.2-7.5H218.5c-23.6 0-42.9 19.2-42.9 42.9v809.3c0 23.6 19.2 42.9 42.9 42.9h588.2c23.6 0 42.9-19.2 42.9-42.9V311.7c0-5.6-3.1-9.7-5.1-11.5zM596.7 115.5 793.6 296l-146.1-.1c-28 0-50.8-22.9-50.8-50.9V115.5zm221.5 800.9c0 6.4-5.2 11.5-11.5 11.5H218.4c-6.4 0-11.5-5.2-11.5-11.5V107.1c0-6.4 5.2-11.5 11.5-11.5h346.9V245c0 45.3 36.8 82.2 82.1 82.2l170.8.2v589z" />
    <path d="M527.3 693.6h-33.8l-24.2-64.9h-98.7l-22.8 64.9H314l90.3-237H437l90.3 237zM459.8 602 424 503.5c-1.1-3.2-2.3-8.7-3.7-16.5h-.8c-1.1 7.1-2.4 12.6-3.8 16.5L380.2 602h79.6zm213.4-145.4v156.5h35.5v24.8h-35.5v55.7h-29.1v-55.7H533.5v-23.4c19.7-22.1 39.5-47.6 59.4-76.5s36.3-56 49.3-81.4h31zm-106 156.5h76.9V500.2c-10.6 19.1-22 37.6-34.1 55.5-12.1 17.9-26.4 37-42.8 57.4z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        const resizer = new PdfResizer();
        let resized = [];
        for (const pdf of pdfs) {
          await resizer.resize(pdf);
          const pdfBuffer = await resizer.getPdfBuffer();
          if (pdfBuffer) resized.push(pdfBuffer);
          await resizer.clearDoc();
        }
        changePdfs(pdfs, setPdfs, resized, 0, true);
      },
    },
    {
      name: "Resize All",
      icon: `<path d="M288 288v448h448V288H288zm0-32h448a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H288a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM128 128.032V304H96V96.032h208v32H128zM128 720v175.968h176v32H96V720h32zm768-416V128.032H720v-32h208V304h-32zm0 416h32v207.968H720v-32h176V720z" />`,
      inputRequired: {
        fields: [
          {
            name: "size",
            placeholder: "size",
            type: "select",
            select: [
              "do-not-change",
              "Custom",
              "4A0",
              "2A0",
              "A0",
              "A1",
              "A2",
              "A3",
              "A4",
              "A5",
              "A6",
              "A7",
              "A8",
              "A9",
              "A10",
              "B0",
              "B1",
              "B2",
              "B3",
              "B4",
              "B5",
              "B6",
              "B7",
              "B8",
              "B9",
              "B10",
              "C0",
              "C1",
              "C2",
              "C3",
              "C4",
              "C5",
              "C6",
              "C7",
              "C8",
              "C9",
              "C10",
              "RA0",
              "RA1",
              "RA2",
              "RA3",
              "RA4",
              "SRA0",
              "SRA1",
              "SRA2",
              "SRA3",
              "SRA4",
              "Executive",
              "Folio",
              "Legal",
              "Letter",
              "Tabloid",
            ],
            default: "do-not-change",
          },
          {
            name: "height",
            placeholder: "height(mm)",
            type: "number",
            default: "",
          },
          {
            name: "width",
            placeholder: "width(mm)",
            type: "number",
            default: "",
          },
          {
            name: "orientation",
            placeholder: "orientation",
            type: "select",
            select: ["portrait", "landscape"],
            default: "portrait",
          },
          {
            name: "mode",
            placeholder: "mode",
            type: "select",
            select: ["shrink-to-fit", "fit-to-page", "crop"],
            default: "shrink-to-fit",
          },
          {
            name: "position",
            placeholder: "position",
            type: "select",
            select: [
              "center",
              "top-left",
              "top-right",
              "bottom-right",
              "bottom-left",
              "center-left",
              "center-right",
              "center-top",
              "center-bottom",
            ],
            default: "center",
          },
          {
            name: "newPdf",
            placeholder: "Make new Pdf at the last position",
            type: "checkbox",
            default: false,
          },
        ],
      },
      function: async (
        pdfs: (File | Blob)[],
        setPdfs: Function,
        inputs: any
      ) => {
        let { height, width, size, newPdf, position, mode, orientation } =
          inputs;
        if (size.startsWith("Custom") && height && width) {
          height = parseInt(height.trim());
          width = parseInt(width.trim());
          size = [width, height];
        }
        const options = {
          size,
          orientation,
          mode,
          position,
        };
        const resizer = new PdfResizer();
        let resized = [];
        for (const pdf of pdfs) {
          await resizer.resize(pdf, options);
          const pdfBuffer = await resizer.getPdfBuffer();
          if (pdfBuffer) resized.push(pdfBuffer);
          await resizer.clearDoc();
        }
        changePdfs(pdfs, setPdfs, resized, 0, !newPdf);
      },
    },
    {
      name: "Resize Selected",
      icon: `<path d="M288 288v448h448V288H288zm0-32h448a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H288a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM128 128.032V304H96V96.032h208v32H128zM128 720v175.968h176v32H96V720h32zm768-416V128.032H720v-32h208V304h-32zm0 416h32v207.968H720v-32h176V720z" />`,
      inputRequired: {
        fields: [
          {
            name: "index",
            placeholder: "Pdf number",
            type: "number",
            default: "",
          },
          {
            name: "range",
            placeholder: "Pages | eg: 1,3-6,9-end...",
            type: "text",
            default: "",
            helper: 'Write "start-end" for selecting all the pages of the pdf',
          },
          {
            name: "size",
            placeholder: "size",
            type: "select",
            select: [
              "do-not-change",
              "Custom",
              "4A0",
              "2A0",
              "A0",
              "A1",
              "A2",
              "A3",
              "A4",
              "A5",
              "A6",
              "A7",
              "A8",
              "A9",
              "A10",
              "B0",
              "B1",
              "B2",
              "B3",
              "B4",
              "B5",
              "B6",
              "B7",
              "B8",
              "B9",
              "B10",
              "C0",
              "C1",
              "C2",
              "C3",
              "C4",
              "C5",
              "C6",
              "C7",
              "C8",
              "C9",
              "C10",
              "RA0",
              "RA1",
              "RA2",
              "RA3",
              "RA4",
              "SRA0",
              "SRA1",
              "SRA2",
              "SRA3",
              "SRA4",
              "Executive",
              "Folio",
              "Legal",
              "Letter",
              "Tabloid",
            ],
            default: "do-not-change",
          },
          {
            name: "height",
            placeholder: "height(mm)",
            type: "number",
            default: "",
          },
          {
            name: "width",
            placeholder: "width(mm)",
            type: "number",
            default: "",
          },
          {
            name: "orientation",
            placeholder: "orientation",
            type: "select",
            select: ["portrait", "landscape"],
            default: "portrait",
          },
          {
            name: "mode",
            placeholder: "mode",
            type: "select",
            select: ["shrink-to-fit", "fit-to-page", "crop"],
            default: "shrink-to-fit",
          },
          {
            name: "position",
            placeholder: "position",
            type: "select",
            select: [
              "center",
              "top-left",
              "top-right",
              "bottom-right",
              "bottom-left",
              "center-left",
              "center-right",
              "center-top",
              "center-bottom",
            ],
            default: "center",
          },
          {
            name: "newPdf",
            type: "checkbox",
            placeholder: "Make new Pdf at the last position",
            default: false,
          },
          {
            name: "rest",
            type: "checkbox",
            placeholder: "Include pages out of the given range",
            default: true,
          },
        ],
      },
      function: async (
        pdfs: (File | Blob)[],
        setPdfs: Function,
        inputs: any
      ) => {
        let {
          index,
          range,
          height,
          width,
          size,
          newPdf,
          position,
          mode,
          orientation,
          rest,
        } = inputs;

        index = parseInt(index) - 1;
        const pdf: File | Blob = pdfs[index];
        let actualRange = processRange(range);
        if (size.startsWith("Custom") && height && width) {
          height = parseInt(height.trim());
          width = parseInt(width.trim());
          size = [width, height];
        }
        let options = {
          size,
          orientation,
          mode,
          position,
        };
        rest = rest ? "include" : "exclude";

        const resizer = new PdfResizer();

        // @ts-ignore
        await resizer.resizeWithRange([
          {
            file: pdf,
            range: actualRange,
            options,
            rest,
          },
        ]);

        const pdfBuffer = await resizer.getPdfBuffer();
        if (pdfBuffer) changePdfs(pdfs, setPdfs, pdfBuffer, index, !newPdf);
      },
    },
  ],
};
