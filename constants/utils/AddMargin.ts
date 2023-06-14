// @ts-ignore
import { PdfMarginManipulator } from "pdf-ops";
import { changePdfs, processRange } from "../PdfOperations";

export const AddMargin = {
  name: "Add Margin",
  functions: [
    {
      name: "Uniform Margin To All",
      icon: `<path d="M30 833c-16.6 0-30-13.4-30-30V221c0-16.6 13.4-30 30-30s30 13.4 30 30v582c0 16.6-13.4 30-30 30zm964 16c-16.6 0-30-13.4-30-30V237c0-16.6 13.4-30 30-30s30 13.4 30 30v582c0 16.6-13.4 30-30 30zM833 30c0 16.6-13.4 30-30 30H221c-16.6 0-30-13.4-30-30s13.4-30 30-30h582c16.6 0 30 13.4 30 30zm0 964c0 16.6-13.4 30-30 30H221c-16.6 0-30-13.4-30-30s13.4-30 30-30h582c16.6 0 30 13.4 30 30zm-50-802H241c-27.6 0-50 22.4-50 50v540c0 27.6 22.4 50 50 50h542c27.6 0 50-22.4 50-50V242c0-27.6-22.4-50-50-50zm-30 560H271V272h482v480z" />`,
      inputRequired: {
        fields: [
          {
            name: "margin",
            type: "number",
            placeholder: "Margin(mm)",
            default: "",
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
        const margin = parseInt(inputs.margin);
        const manipulator = new PdfMarginManipulator();
        let manipulated = [];
        for (const pdf of pdfs) {
          await manipulator.addMargin(pdf, [margin, margin, margin, margin]);
          const pdfBuffer = await manipulator.getPdfBuffer();
          if (pdfBuffer) manipulated.push(pdfBuffer);
          await manipulator.clearDoc();
        }
        changePdfs(pdfs, setPdfs, manipulated, 0, !inputs.newPdf);
      },
    },
    {
      name: "Variable Margin To All",
      icon: `<path d="M354.125 896a21.333 21.333 0 0 0 21.333 21.333h68.267a21.333 21.333 0 1 0 0-42.666h-68.267A21.333 21.333 0 0 0 354.125 896zm-81.067-746.667h68.267a21.333 21.333 0 1 0 0-42.666h-68.267a21.333 21.333 0 1 0 0 42.666zM507.725 896a21.333 21.333 0 0 0 21.333 21.333h68.267a21.333 21.333 0 1 0 0-42.666h-68.267A21.333 21.333 0 0 0 507.725 896zm243.2-21.333h-68.267a21.333 21.333 0 1 0 0 42.666h68.267a21.333 21.333 0 1 0 0-42.666zM580.258 149.333h68.267a21.333 21.333 0 1 0 0-42.666h-68.267a21.333 21.333 0 1 0 0 42.666zM200.525 896a21.333 21.333 0 0 0 21.333 21.333h68.267a21.333 21.333 0 1 0 0-42.666h-68.267A21.333 21.333 0 0 0 200.525 896zm226.133-746.667h68.267a21.333 21.333 0 1 0 0-42.666h-68.267a21.333 21.333 0 1 0 0 42.666zm-307.2 460.8a21.333 21.333 0 0 0 21.333-21.333v-68.267a21.333 21.333 0 1 0-42.666 0V588.8a21.333 21.333 0 0 0 21.333 21.333zm0 153.6a21.333 21.333 0 0 0 21.333-21.333v-68.267a21.333 21.333 0 1 0-42.666 0V742.4a21.333 21.333 0 0 0 21.333 21.333zm0 153.6h17.067a21.333 21.333 0 0 0 4.266-42.24v-47.36a21.333 21.333 0 1 0-42.666 0V896a21.333 21.333 0 0 0 21.333 21.333zm0-768h68.267a21.333 21.333 0 1 0 0-42.666h-68.267a21.333 21.333 0 1 0 0 42.666zm0 153.6a21.333 21.333 0 0 0 21.333-21.333v-68.267a21.333 21.333 0 1 0-42.666 0V281.6a21.333 21.333 0 0 0 21.333 21.333zm0 153.6a21.333 21.333 0 0 0 21.333-21.333v-68.267a21.333 21.333 0 1 0-42.666 0V435.2a21.333 21.333 0 0 0 21.333 21.333z" />
    <path d="M793.591 917.333h102.4A21.333 21.333 0 0 0 917.325 896V128a21.333 21.333 0 0 0-21.334-21.333H733.858a21.333 21.333 0 1 0 0 42.666h38.4V896a21.333 21.333 0 0 0 21.333 21.333z" />`,
      inputRequired: {
        fields: [
          {
            name: "marginTop",
            type: "number",
            placeholder: "Margin Top(mm)",
            default: "",
          },
          {
            name: "marginRight",
            type: "number",
            placeholder: "Margin Right(mm)",
            default: "",
          },
          {
            name: "marginBottom",
            type: "number",
            placeholder: "Margin Bottom(mm)",
            default: "",
          },
          {
            name: "marginLeft",
            type: "number",
            placeholder: "Margin Left(mm)",
            default: "",
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
        let { marginTop, marginRight, marginBottom, marginLeft, newPdf } =
          inputs;
        marginTop = parseInt(marginTop);
        marginRight = parseInt(marginRight);
        marginBottom = parseInt(marginBottom);
        marginLeft = parseInt(marginLeft);
        const manipulator = new PdfMarginManipulator();
        let manipulated = [];
        for (const pdf of pdfs) {
          await manipulator.addMargin(pdf, [
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
          ]);
          const pdfBuffer = await manipulator.getPdfBuffer();
          if (pdfBuffer) manipulated.push(pdfBuffer);
          await manipulator.clearDoc();
        }
        changePdfs(pdfs, setPdfs, manipulated, 0, !newPdf);
      },
    },
    {
      name: "Add Margin To Selected",
      icon: `<path d="M160 160v704h128v-64h-64V224h576v64h64V160H160zm640 192v128h64V352h-64zm0 192v128h64V544h-64zm0 192v64h-64v64h128V736h-64zm-448 64v64h128v-64H352zm192 0v64h128v-64H544z" />`,
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
            name: "marginTop",
            type: "number",
            placeholder: "Margin Top(mm)",
            default: "",
          },
          {
            name: "marginRight",
            type: "number",
            placeholder: "Margin Right(mm)",
            default: "",
          },
          {
            name: "marginBottom",
            type: "number",
            placeholder: "Margin Bottom(mm)",
            default: "",
          },
          {
            name: "marginLeft",
            type: "number",
            placeholder: "Margin Left(mm)",
            default: "",
          },
          {
            name: "newPdf",
            placeholder: "Make new Pdf at the last position",
            type: "checkbox",
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
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          newPdf,
          rest,
        } = inputs;

        marginTop = parseInt(marginTop);
        marginRight = parseInt(marginRight);
        marginBottom = parseInt(marginBottom);
        marginLeft = parseInt(marginLeft);

        if (inputs.index > pdfs.length) return;
        index = parseInt(index) - 1;
        let pdf = pdfs[index];

        const actualRange = processRange(range);

        const manipulator = new PdfMarginManipulator();

        await manipulator.addMarginWithRange([
          {
            file: pdf,
            // @ts-ignore
            range: actualRange,
            margin: [marginTop, marginRight, marginBottom, marginLeft],
            rest: rest ? "include" : "exclude",
          },
        ]);

        const pdfBuffer = await manipulator.getPdfBuffer();
        if (pdfBuffer) changePdfs(pdfs, setPdfs, pdfBuffer, index, !newPdf);
      },
    },
  ],
};
