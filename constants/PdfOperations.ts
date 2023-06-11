import { PdfResize } from "./utils/PdfResize";
import { PdfRotate } from "./utils/PdfRotate";

export const changePdfs = (
  pdfs: (File | Blob)[],
  setPdfs: Function,
  newDoc: Uint8Array | Uint8Array[],
  index: number,
  replace: boolean = false
) => {
  if (Array.isArray(newDoc) && replace) {
    let copy = [];
    for (const pdf of newDoc) {
      copy.push(new Blob([pdf], { type: "application/pdf" }));
    }
    setPdfs(copy);
  } else if (Array.isArray(newDoc) && !replace) {
    let copy = [...pdfs];
    for (const pdf of newDoc) {
      copy.push(new Blob([pdf], { type: "application/pdf" }));
    }
    setPdfs(copy);
  } else if (newDoc instanceof Uint8Array && replace) {
    let copy = [...pdfs];
    copy[index] = new Blob([newDoc], { type: "application/pdf" });
    setPdfs(copy);
  } else if (newDoc instanceof Uint8Array && !replace) {
    let copy = [...pdfs];
    copy.push(new Blob([newDoc], { type: "application/pdf" }));
    setPdfs(copy);
  }
};

export const processRange = (strRange: string) => {
  const strRanges = strRange.split(",");
  const actualRange = [];
  for (let i = 0; i < strRanges.length; i++) {
    strRanges[i] = strRanges[i].trim();
    if (strRanges[i].includes("-")) {
      const s = strRanges[i].split("-")[0].trim();
      const e = strRanges[i].split("-")[1].trim();
      const start = s === "start" || s === "end" ? s : parseInt(s);
      const end = e === "start" || e === "end" ? e : parseInt(e);
      actualRange.push([start, end]);
    } else {
      let page = parseInt(strRanges[i].trim());
      actualRange.push(page);
    }
  }
  return actualRange;
};

export const operations = [PdfRotate, PdfResize];
