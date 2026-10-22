
// import { validateImage } from "./validation.js";

// export function setupImageUpload(inputId, previewId) {
//   const input = document.getElementById(inputId);
//   const preview = document.getElementById(previewId);

//   let currentUrl = null;

//   input.addEventListener("change", () => {
//     const file = input.files?.[0];

//     if (!file) return;

//     const error = validateImage(file);

//     if (error) {
//       alert(error);
//       input.value = "";
//       preview.hidden = true;
//       return;
//     }

//     if (currentUrl) URL.revokeObjectURL(currentUrl);

//     currentUrl = URL.createObjectURL(file);
//     preview.src = currentUrl;
//     preview.hidden = false;
//   });
// }




import { validateImage } from "./validation.js";

/**
 * Set up image upload and preview.
 * Uploaded JPEG/PNG images are converted to PNG in the browser.
 */
export function setupImageUpload(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (!input || !preview) {
    console.error(
      `Image upload elements not found: ${inputId}, ${previewId}`
    );
    return;
  }

  let currentUrl = null;

  input.addEventListener("change", async () => {
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const error = validateImage(file);

    if (error) {
      alert(error);
      input.value = "";
      preview.hidden = true;
      preview.removeAttribute("src");
      input.dataset.converted = "false";
      return;
    }

    input.disabled = true;

    try {
      const pngBlob = await convertImageToPng(file);

      // Release the previous preview URL.
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      currentUrl = URL.createObjectURL(pngBlob);

      preview.src = currentUrl;
      preview.hidden = false;

      // Store conversion status and filename as metadata.
      input.dataset.converted = "true";
      input.dataset.convertedFilename =
        file.name.replace(/\.[^.]+$/, "") + ".png";
    } catch (error) {
      console.error("Image conversion error:", error);

      alert(
        "Image conversion failed. Please choose another JPEG or PNG image."
      );

      input.value = "";
      preview.hidden = true;
      preview.removeAttribute("src");
      input.dataset.converted = "false";
    } finally {
      input.disabled = false;
    }
  });

  // Release preview resources when the page is closed.
  window.addEventListener("beforeunload", () => {
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
  });
}

/**
 * Convert a JPEG or PNG File into a PNG Blob using Canvas.
 */
export async function convertImageToPng(file) {
  const error = validateImage(file);

  if (error) {
    throw new Error(error);
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = new Image();

    await new Promise((resolve, reject) => {
      image.onload = resolve;

      image.onerror = () => {
        reject(new Error("Unable to read the uploaded image."));
      };

      image.src = imageUrl;
    });

    if (!image.naturalWidth || !image.naturalHeight) {
      throw new Error("The uploaded image has invalid dimensions.");
    }

    const canvas = document.createElement("canvas");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas is unavailable in this browser.");
    }

    context.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const pngBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("PNG conversion failed."));
          }
        },
        "image/png"
      );
    });

    return pngBlob;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

/**
 * Download a Blob as a file.
 */
export function downloadBlob(blob, filename) {
  if (!(blob instanceof Blob)) {
    throw new Error("A valid file is required for download.");
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  // Allow the browser time to start the download.
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
