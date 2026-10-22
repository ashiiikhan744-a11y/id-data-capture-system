
import {
  convertImageToPng,
  downloadBlob
} from "../utils/imageProcessor.js";

export async function exportSideAsPng(inputId, filename) {
  const input = document.getElementById(inputId);
  const file = input?.files?.[0];

  if (!file) {
    throw new Error(`Please upload an image for ${filename}.`);
  }

  const pngBlob = await convertImageToPng(file);
  downloadBlob(pngBlob, filename);
}

export async function exportBothSidesAsPng() {
  await exportSideAsPng("frontImage", "sample-front.png");
  await exportSideAsPng("backImage", "sample-back.png");
}
