
// import { renderDataInput } from "./components/DataInput.js";
// import { renderTemplateSelector } from "./components/TemplateSelector.js";
// import { renderImageUpload } from "./components/ImageUpload.js";
// import { renderPreviewPanel } from "./components/PreviewPanel.js";

// import { pasteFormData } from "./utils/clipboard.js";
// import { setupImageUpload } from "./utils/imageProcessor.js";
// import { validateForm } from "./utils/validation.js";
// import { downloadSamplePdf } from "./services/pdfGenerator.js";

// import "./style.css";

// document.querySelector("#app").innerHTML = `
//   <header class="app-header">
//     <h1>Sample Document Manager</h1>
//     <p>Data entry, image preview and PDF export</p>
//   </header>

//   <main>
//     ${renderDataInput()}
//     ${renderTemplateSelector()}
//     ${renderImageUpload()}
//     ${renderPreviewPanel()}
//   </main>
// `;

// const form = document.getElementById("dataForm");

// function getFormData() {
//   return Object.fromEntries(new FormData(form).entries());
// }

// function updatePreview() {
//   const data = getFormData();
//   const errors = validateForm(data);

//   if (errors.length) {
//     alert(errors.join("\n"));
//     return false;
//   }

//   const templateSelect = document.getElementById("templateSelect");
//   const selectedOption =
//     templateSelect.options[templateSelect.selectedIndex];

//   document.getElementById("previewTemplate").textContent =
//     selectedOption.text;

//   const fields = [
//     ["Full Name", data.fullName],
//     ["Date of Birth", data.dateOfBirth],
//     ["Demo Reference", data.documentNumber],
//     ["Height", data.height],
//     ["Eye Color", data.eyeColor],
//     ["Hair Color", data.hairColor],
//     ["Address", data.address],
//     ["City", data.city],
//     ["State / Region", data.state],
//     ["Postal Code", data.postalCode]
//   ];

//   const dl = document.getElementById("previewFields");
//   dl.replaceChildren();

//   for (const [label, value] of fields) {
//     const dt = document.createElement("dt");
//     const dd = document.createElement("dd");

//     dt.textContent = label;
//     dd.textContent = value || "Not provided";

//     dl.append(dt, dd);
//   }

//   document.getElementById("documentPreview")
//     .style.setProperty(
//       "--accent",
//       ({
//         classic: "#1d4ed8",
//         modern: "#047857",
//         minimal: "#6d28d9"
//       })[templateSelect.value]
//     );

//   return true;
// }

// form.addEventListener("submit", event => {
//   event.preventDefault();
//   updatePreview();
// });

// document.getElementById("pasteData")
//   .addEventListener("click", async () => {
//     const result = await pasteFormData();

//     if (!result.success) {
//       alert(result.message);
//       return;
//     }

//     updatePreview();
//   });

// form.addEventListener("reset", () => {
//   setTimeout(() => {
//     document.getElementById("previewFields").replaceChildren();
//   }, 0);
// });

// document.getElementById("templateSelect")
//   .addEventListener("change", updatePreview);

// setupImageUpload("frontImage", "frontPreview");
// setupImageUpload("backImage", "backPreview");

// document.getElementById("downloadPdf")
//   .addEventListener("click", () => {
//     if (!updatePreview()) return;

//     const template = document.getElementById("templateSelect");
//     const name = template.options[template.selectedIndex].text;

//     downloadSamplePdf(getFormData(), name);
//   });



import { renderDataInput } from "./components/DataInput.js";
import { renderTemplateSelector } from "./components/TemplateSelector.js";
import { renderImageUpload } from "./components/ImageUpload.js";
import { renderPreviewPanel } from "./components/PreviewPanel.js";

import { pasteFormData } from "./utils/clipboard.js";
import { setupImageUpload } from "./utils/imageProcessor.js";
import { generateDemoReference } from "./utils/licenseNumber.js";
import { validateForm } from "./utils/validation.js";

import {
  exportSideAsPng
} from "./services/exportService.js";

import {
  downloadSamplePdf,
  downloadDemoBackPdf
} from "./services/pdfGenerator.js";

import "./style.css";

// Render application.
document.querySelector("#app").innerHTML = `
  <header class="app-header">
    <h1>Sample Document Manager</h1>
    <p>Fictional data entry, image preview and PDF export</p>
  </header>

  <main>
    ${renderDataInput()}
    ${renderTemplateSelector()}
    ${renderImageUpload()}
    ${renderPreviewPanel()}
  </main>
`;

const form = document.getElementById("dataForm");

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

// Update document preview.
function updatePreview() {
  const data = getFormData();
  const errors = validateForm(data);

  if (errors.length) {
    alert(errors.join("\n"));
    return false;
  }

  const templateSelect =
    document.getElementById("templateSelect");

  const selectedOption =
    templateSelect.options[templateSelect.selectedIndex];

  document.getElementById("previewTemplate").textContent =
    selectedOption.text;

  const fields = [
    ["Full Name", data.fullName],
    ["Date of Birth", data.dateOfBirth],
    ["Demo Reference", data.documentNumber],
    ["Height", data.height],
    ["Eye Color", data.eyeColor],
    ["Hair Color", data.hairColor],
    ["Address", data.address],
    ["City", data.city],
    ["State / Region", data.state],
    ["Postal Code", data.postalCode]
  ];

  const dl = document.getElementById("previewFields");
  dl.replaceChildren();

  for (const [label, value] of fields) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");

    dt.textContent = label;
    dd.textContent = value || "Not provided";

    dl.append(dt, dd);
  }

  const accentColors = {
    classic: "#1d4ed8",
    modern: "#047857",
    minimal: "#6d28d9"
  };

  document.getElementById("documentPreview")
    .style.setProperty(
      "--accent",
      accentColors[templateSelect.value] || accentColors.classic
    );

  return true;
}

// Submit form.
form.addEventListener("submit", event => {
  event.preventDefault();
  updatePreview();
});

// Paste comma-separated form data.
document.getElementById("pasteData")
  .addEventListener("click", async () => {
    const result = await pasteFormData();

    if (!result.success) {
      alert(result.message);
      return;
    }

    updatePreview();
  });

// Clear preview when the form is reset.
form.addEventListener("reset", () => {
  setTimeout(() => {
    document.getElementById("previewFields").replaceChildren();

    document.getElementById("previewFields").innerHTML = `
      <dt>Full Name</dt>
      <dd>Not entered</dd>
    `;

    document.getElementById("previewTemplate").textContent =
      "Classic Sample";

    document.getElementById("documentPreview")
      .style.setProperty("--accent", "#1d4ed8");
  }, 0);
});

// Update preview when template changes.
document.getElementById("templateSelect")
  .addEventListener("change", () => {
    updatePreview();
  });

// Set up front/back image upload.
setupImageUpload("frontImage", "frontPreview");
setupImageUpload("backImage", "backPreview");

// Generate a fictional demo reference.
document.getElementById("generateReference")
  .addEventListener("click", () => {
    try {
      const region =
        document.getElementById("demoRegion").value;

      const reference = generateDemoReference(region);

      document.getElementById("documentNumber").value =
        reference;

      updatePreview();
    } catch (error) {
      alert(error.message || "Could not generate demo reference.");
    }
  });

// Download sample PDF.
document.getElementById("downloadPdf")
  .addEventListener("click", () => {
    if (!updatePreview()) return;

    const template =
      document.getElementById("templateSelect");

    const templateName =
      template.options[template.selectedIndex].text;

    downloadSamplePdf(getFormData(), templateName);
  });

// Download front image as PNG.
document.getElementById("downloadFrontPng")
  .addEventListener("click", async () => {
    try {
      await exportSideAsPng(
        "frontImage",
        "sample-front.png"
      );
    } catch (error) {
      alert(error.message || "Front PNG export failed.");
    }
  });

// Download back image as PNG.
document.getElementById("downloadBackPng")
  .addEventListener("click", async () => {
    try {
      await exportSideAsPng(
        "backImage",
        "sample-back.png"
      );
    } catch (error) {
      alert(error.message || "Back PNG export failed.");
    }
  });

// Download fictional back-side sample PDF.
document.getElementById("downloadBackPdf")
  .addEventListener("click", () => {
    if (!updatePreview()) return;

    downloadDemoBackPdf(getFormData());
  });
