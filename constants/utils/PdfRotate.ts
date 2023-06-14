// @ts-ignore
import { PdfRotator } from "pdf-ops";
import { changePdfs, processRange } from "../PdfOperations";

const rotateAll = async (
  pdfs: (File | Blob)[],
  setPdfs: Function,
  angle: number
) => {
  const rotator = new PdfRotator();
  let processed = [];
  for (let i = 0; i < pdfs.length; i++) {
    const pdf = pdfs[i];
    await rotator.rotate(pdf, angle);
    let pdfBuffer = await rotator.getPdfBuffer();
    if (pdfBuffer) processed.push(pdfBuffer);
    await rotator.clearDoc();
  }
  changePdfs(pdfs, setPdfs, processed, 0, true);
};

export const PdfRotate = {
  name: "Pdf Rotate",
  functions: [
    {
      name: "Rotate All Right 90",
      icon: `<path d="M512.7 127.6c-34.4 0-69.4 4.7-104.2 14.4C204.3 199.6 85 413.3 143.3 617.3c48.3 168.7 202 278.5 369 278.5 35.2 0 71-4.9 106.5-15.1C775.1 835.7 880.7 700 895 547.3c1.8-19.3-13.7-34.9-31.8-34.9-2.9 0-5.9.4-8.9 1.3-12.6 3.6-21.8 14.6-23 27.6-11.8 127.3-99.8 240.4-230.1 277.9-29.6 8.5-59.4 12.6-88.8 12.6-139.8 0-268.5-92.4-308.1-234.1-47.6-170.7 51.6-346.6 222.3-394.2 28.7-8 57.7-11.9 86.1-11.9 100 0 194.4 47.3 254.4 126.1 6.2 8.1 15.6 12.6 25.4 12.6 2.9 0 5.9-.4 8.9-1.3 21.6-6.2 30.3-32.2 16.6-50.1-72-94.5-185.2-151.3-305.3-151.3z" />
                <path d="M851.5 162.5h-32c-17.7 0-32 14.3-32 32v96h-95c-17.7 0-32 14.3-32 32v32h159c17.7 0 32-14.3 32-32v-160zm-512.8 390 54.1-6.8c1.4 7.6 3.8 12.9 7.2 16 3.4 3.1 7.5 4.7 12.4 4.7 8.7 0 15.5-4.4 20.4-13.2 3.6-6.5 6.2-20.3 8-41.3-6.5 6.7-13.2 11.6-20 14.7-6.9 3.1-14.8 4.7-23.8 4.7-17.6 0-32.4-6.2-44.4-18.7-12.1-12.5-18.1-28.2-18.1-47.3 0-13 3.1-24.9 9.2-35.5 6.1-10.7 14.6-18.8 25.4-24.3 10.8-5.5 24.3-8.2 40.6-8.2 19.6 0 35.3 3.4 47.2 10.1 11.8 6.7 21.3 17.4 28.4 32.1 7.1 14.7 10.6 34 10.6 58.1 0 35.4-7.4 61.3-22.3 77.7-14.9 16.4-35.5 24.7-61.9 24.7-15.6 0-27.9-1.8-36.9-5.4-9-3.6-16.5-8.9-22.4-15.8-5.9-7.2-10.5-15.9-13.7-26.3zm100.2-87.4c0-10.6-2.7-18.9-8-24.9s-11.8-9-19.5-9c-7.2 0-13.2 2.7-18 8.2-4.8 5.4-7.1 13.6-7.1 24.5 0 11 2.5 19.3 7.4 25.1 4.9 5.8 11.1 8.7 18.5 8.7 7.7 0 14-2.8 19.1-8.4s7.6-13.8 7.6-24.2zm79.9 32.6c0-37.2 6.7-63.3 20.1-78.2 13.4-14.9 33.8-22.3 61.3-22.3 13.2 0 24 1.6 32.5 4.9 8.5 3.3 15.4 7.5 20.7 12.7 5.3 5.2 9.6 10.7 12.6 16.4 3.1 5.7 5.5 12.5 7.4 20.1 3.7 14.6 5.5 29.8 5.5 45.7 0 35.5-6 61.6-18 78-12 16.5-32.7 24.7-62.1 24.7-16.5 0-29.8-2.6-40-7.9-10.2-5.3-18.5-13-25-23.1-4.7-7.2-8.4-17.1-11-29.6-2.7-12.4-4-26.3-4-41.4zm54 .1c0 24.9 2.2 42 6.6 51.1 4.4 9.1 10.8 13.7 19.2 13.7 5.5 0 10.3-1.9 14.4-5.8s7-10 9-18.4c1.9-8.4 2.9-21.4 2.9-39.2 0-26-2.2-43.5-6.6-52.4-4.4-9-11-13.4-19.8-13.4-9 0-15.5 4.6-19.5 13.7-4.2 9.1-6.2 26.1-6.2 50.7zm209.8-62.4c0 10.5-3.7 19.5-11.2 27-7.5 7.5-16.5 11.2-27.1 11.2-10.5 0-19.5-3.7-27-11.2-7.5-7.5-11.2-16.5-11.2-27 0-10.6 3.7-19.6 11.2-27.1 7.5-7.4 16.5-11.2 27-11.2 10.6 0 19.6 3.7 27.1 11.2 7.4 7.5 11.2 16.5 11.2 27.1zm-24.9-.1c0-3.7-1.3-6.9-3.9-9.6-2.6-2.7-5.8-4-9.6-4-3.7 0-6.9 1.3-9.6 4-2.7 2.7-4 5.9-4 9.6 0 3.7 1.3 6.9 4 9.6 2.7 2.6 5.9 3.9 9.6 3.9 3.7 0 6.9-1.3 9.6-3.9 2.6-2.7 3.9-5.9 3.9-9.6z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        await rotateAll(pdfs, setPdfs, 90);
      },
    },
    {
      name: "Rotate All Left 90",
      icon: `<path d="M510.9 127.6c-120.1 0-233.2 56.7-305.3 151.3-13.6 17.9-5 43.9 16.6 50.1 2.9.8 5.9 1.3 8.9 1.3 9.8 0 19.3-4.5 25.4-12.6 60.1-78.8 154.4-126.1 254.4-126.1 28.5 0 57.4 3.8 86.1 11.9C767.8 251.1 867 427 819.4 597.7c-39.5 141.7-168.2 234.1-308.1 234.1-29.3 0-59.2-4.1-88.8-12.6-130.3-37.5-218.2-150.6-230.1-277.9-1.2-13-10.4-24-23-27.6-3-.9-6-1.3-9-1.3-18.1 0-33.6 15.6-31.8 34.9C142.9 700 248.5 835.7 404.8 880.7c35.5 10.2 71.3 15.1 106.5 15.1 167 0 320.7-109.8 369-278.5 58.4-204-60.9-417.8-265.2-475.3-34.7-9.7-69.7-14.4-104.2-14.4z" />
                    <path d="M204.1 162.5h-32v160c0 17.7 14.3 32 32 32h159v-32c0-17.7-14.3-32-32-32h-95v-96c0-17.7-14.3-32-32-32zm119.6 390 54.1-6.8c1.4 7.6 3.8 12.9 7.2 16 3.4 3.1 7.5 4.7 12.4 4.7 8.7 0 15.5-4.4 20.4-13.2 3.6-6.5 6.2-20.3 8-41.3-6.5 6.7-13.2 11.6-20 14.7-6.9 3.1-14.8 4.7-23.8 4.7-17.6 0-32.4-6.2-44.4-18.7-12.1-12.5-18.1-28.2-18.1-47.3 0-13 3.1-24.9 9.2-35.5 6.1-10.7 14.6-18.8 25.4-24.3 10.8-5.5 24.3-8.2 40.6-8.2 19.6 0 35.3 3.4 47.2 10.1 11.8 6.7 21.3 17.4 28.4 32.1 7.1 14.7 10.6 34 10.6 58.1 0 35.4-7.4 61.3-22.3 77.7-14.9 16.4-35.5 24.7-61.9 24.7-15.6 0-27.9-1.8-36.9-5.4-9-3.6-16.5-8.9-22.4-15.8-5.9-7.2-10.5-15.9-13.7-26.3zm100.2-87.4c0-10.6-2.7-18.9-8-24.9s-11.8-9-19.5-9c-7.2 0-13.2 2.7-18 8.2-4.8 5.4-7.1 13.6-7.1 24.5 0 11 2.5 19.3 7.4 25.1 4.9 5.8 11.1 8.7 18.5 8.7 7.7 0 14-2.8 19.1-8.4s7.6-13.8 7.6-24.2zm79.9 32.6c0-37.2 6.7-63.3 20.1-78.2 13.4-14.9 33.8-22.3 61.3-22.3 13.2 0 24 1.6 32.5 4.9 8.5 3.3 15.4 7.5 20.7 12.7 5.3 5.2 9.6 10.7 12.6 16.4 3.1 5.7 5.5 12.5 7.4 20.1 3.7 14.6 5.5 29.8 5.5 45.7 0 35.5-6 61.6-18 78-12 16.5-32.7 24.7-62.1 24.7-16.5 0-29.8-2.6-40-7.9-10.2-5.3-18.5-13-25-23.1-4.7-7.2-8.4-17.1-11-29.6-2.7-12.4-4-26.3-4-41.4zm54 .1c0 24.9 2.2 42 6.6 51.1 4.4 9.1 10.8 13.7 19.2 13.7 5.5 0 10.3-1.9 14.4-5.8s7-10 9-18.4c1.9-8.4 2.9-21.4 2.9-39.2 0-26-2.2-43.5-6.6-52.4-4.4-9-11-13.4-19.8-13.4-9 0-15.5 4.6-19.5 13.7-4.2 9.1-6.2 26.1-6.2 50.7zm209.8-62.4c0 10.5-3.7 19.5-11.2 27-7.5 7.5-16.5 11.2-27.1 11.2-10.5 0-19.5-3.7-27-11.2-7.5-7.5-11.2-16.5-11.2-27 0-10.6 3.7-19.6 11.2-27.1 7.5-7.4 16.5-11.2 27-11.2 10.6 0 19.6 3.7 27.1 11.2 7.4 7.5 11.2 16.5 11.2 27.1zm-24.9-.1c0-3.7-1.3-6.9-3.9-9.6-2.6-2.7-5.8-4-9.6-4-3.7 0-6.9 1.3-9.6 4-2.7 2.7-4 5.9-4 9.6 0 3.7 1.3 6.9 4 9.6 2.7 2.6 5.9 3.9 9.6 3.9 3.7 0 6.9-1.3 9.6-3.9 2.6-2.7 3.9-5.9 3.9-9.6z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        await rotateAll(pdfs, setPdfs, -90);
      },
    },
    {
      name: "Rotate All 180",
      icon: `<path d="M512.7 127.6c-34.4 0-69.4 4.7-104.2 14.4C204.3 199.6 85 413.3 143.3 617.3c48.3 168.7 202 278.5 369 278.5 35.2 0 71-4.9 106.5-15.1C775.1 835.7 880.7 700 895 547.3c1.8-19.3-13.7-34.9-31.8-34.9-2.9 0-5.9.4-8.9 1.3-12.6 3.6-21.8 14.6-23 27.6-11.8 127.3-99.8 240.4-230.1 277.9-29.6 8.5-59.4 12.6-88.8 12.6-139.8 0-268.5-92.4-308.1-234.1-47.6-170.7 51.6-346.6 222.3-394.2 28.7-8 57.7-11.9 86.1-11.9 100 0 194.4 47.3 254.4 126.1 6.2 8.1 15.6 12.6 25.4 12.6 2.9 0 5.9-.4 8.9-1.3 21.6-6.2 30.3-32.2 16.6-50.1-72-94.5-185.2-151.3-305.3-151.3z" />
                    <path d="M851.5 162.5h-32c-17.7 0-32 14.3-32 32v96h-95c-17.7 0-32 14.3-32 32v32h159c17.7 0 32-14.3 32-32v-160zM368.3 397.2v199.2h-55.1V465.9c-8.9 6.8-17.5 12.3-25.9 16.4-8.3 4.2-18.8 8.2-31.3 12v-44.6c18.5-6 32.9-13.1 43.2-21.5 10.2-8.4 18.3-18.7 24.1-31h45zm92 93.9c-8.6-4.5-14.8-9.6-18.7-15.2-5.3-7.7-8-16.5-8-26.5 0-16.4 7.7-29.8 23.1-40.2 12-8 27.9-12 47.7-12 26.2 0 45.5 5 58.1 15 12.5 10 18.8 22.5 18.8 37.7 0 8.8-2.5 17.1-7.5 24.7-3.7 5.7-9.6 11.2-17.6 16.6 10.6 5.1 18.5 11.8 23.7 20.2 5.2 8.4 7.8 17.6 7.8 27.8 0 9.8-2.3 19-6.7 27.5-4.5 8.5-10 15.1-16.6 19.7-6.5 4.6-14.7 8-24.5 10.2-9.8 2.2-20.2 3.3-31.2 3.3-20.8 0-36.6-2.5-47.6-7.3-11-4.9-19.3-12.1-25-21.6-5.7-9.5-8.6-20.2-8.6-31.9 0-11.5 2.7-21.2 8-29.2 5.4-8.2 13.6-14.4 24.8-18.8zm21.5 45.9c0 8.6 2.6 15.7 7.9 21.2 5.3 5.5 11.3 8.2 18 8.2 6.5 0 12.3-2.8 17.5-8.4 5.2-5.6 7.8-12.6 7.8-21.2s-2.6-15.7-7.8-21.2c-5.2-5.5-11.2-8.3-18.1-8.3-6.8 0-12.7 2.7-17.7 8-5.1 5.4-7.6 12.6-7.6 21.7zm2.9-84.3c0 6.8 2.1 12.2 6.3 16.4 4.2 4.1 9.9 6.2 16.9 6.2 6.2 0 11.4-2 15.4-6.1s6-9.4 6-15.9c0-6.8-2.1-12.3-6.3-16.5-4.2-4.2-9.5-6.3-16-6.3-6.6 0-12 2.1-16.1 6.2-4.1 4-6.2 9.4-6.2 16zm125.4 45c0-37.2 6.7-63.3 20.1-78.2 13.4-14.9 33.8-22.3 61.3-22.3 13.2 0 24 1.6 32.5 4.9 8.5 3.3 15.4 7.5 20.7 12.7 5.3 5.2 9.6 10.7 12.6 16.4 3.1 5.7 5.5 12.5 7.4 20.1 3.7 14.6 5.5 29.8 5.5 45.7 0 35.5-6 61.6-18 78-12 16.5-32.7 24.7-62.1 24.7-16.5 0-29.8-2.6-40-7.9-10.2-5.3-18.5-13-25-23.1-4.7-7.2-8.4-17.1-11-29.6-2.7-12.4-4-26.3-4-41.4zm53.9.1c0 24.9 2.2 42 6.6 51.1 4.4 9.1 10.8 13.7 19.2 13.7 5.5 0 10.3-1.9 14.4-5.8s7-10 9-18.4c1.9-8.4 2.9-21.4 2.9-39.2 0-26-2.2-43.5-6.6-52.4-4.4-9-11-13.4-19.8-13.4-9 0-15.5 4.6-19.5 13.7-4.2 9.1-6.2 26.1-6.2 50.7zm209.8-62.4c0 10.5-3.7 19.5-11.2 27-7.5 7.5-16.5 11.2-27.1 11.2-10.5 0-19.5-3.7-27-11.2-7.5-7.5-11.2-16.5-11.2-27 0-10.6 3.7-19.6 11.2-27.1 7.5-7.4 16.5-11.2 27-11.2 10.6 0 19.6 3.7 27.1 11.2 7.5 7.5 11.2 16.5 11.2 27.1zm-24.8-.1c0-3.7-1.3-6.9-3.9-9.6-2.6-2.7-5.8-4-9.6-4-3.7 0-6.9 1.3-9.6 4-2.7 2.7-4 5.9-4 9.6 0 3.7 1.3 6.9 4 9.6 2.7 2.6 5.9 3.9 9.6 3.9 3.7 0 6.9-1.3 9.6-3.9 2.6-2.7 3.9-5.9 3.9-9.6z" />`,
      function: async (pdfs: (File | Blob)[], setPdfs: Function) => {
        await rotateAll(pdfs, setPdfs, 180);
      },
    },
    {
      name: "Rotate Selected",
      icon: `<path d="M281.6 137.813a128 128 0 0 0-128 128v469.334a128 128 0 0 0 128 128h213.333a42.667 42.667 0 1 0 0-85.334H281.6a42.667 42.667 0 0 1-42.667-42.666V265.813a42.667 42.667 0 0 1 42.667-42.666h469.333a42.667 42.667 0 0 1 42.667 42.666v213.334a42.667 42.667 0 1 0 85.333 0V265.813a128 128 0 0 0-128-128H281.6zm294.613 380.544 42.155 365.184a21.333 21.333 0 0 0 38.357 10.24l80.214-108.629 114.048 169.941a42.667 42.667 0 1 0 70.826-47.573L807.765 737.579l124.416-36.694a21.333 21.333 0 0 0 3.499-39.552L606.933 496.811a21.333 21.333 0 0 0-30.72 21.546z" />`,
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
            name: "angle",
            type: "select",
            placeholder: "Angle",
            select: ["90(right)", "-90(left)", "180"],
            default: "90(right)",
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
        if (inputs.index > pdfs.length) return;
        let pdf = pdfs[inputs.index - 1];
        const inputRange = inputs.range;
        let angle = inputs.angle.trim();

        const actualRange = processRange(inputRange);

        if (angle.startsWith("-90")) angle = -90;
        else if (angle.startsWith("90") || angle === "") angle = 90;
        else if (angle.startsWith("180")) angle = 180;
        else return;

        const rotator = new PdfRotator();

        await rotator.rotateWithRange([
          {
            file: pdf,
            // @ts-ignore
            range: actualRange,
            degree: angle,
            rest: inputs.rest ? "include" : "exclude",
          },
        ]);

        const pdfBuffer = await rotator.getPdfBuffer();
        if (pdfBuffer)
          changePdfs(
            pdfs,
            setPdfs,
            pdfBuffer,
            inputs.index - 1,
            !inputs.newPdf
          );
      },
    },
  ],
};
