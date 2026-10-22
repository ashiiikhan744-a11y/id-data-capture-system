
// export function renderPreviewPanel() {
//   return `
//     <section class="panel">
//       <h2>4. Document Preview</h2>

//       <article id="documentPreview" class="document-preview">
//         <div class="watermark">SAMPLE — NOT VALID</div>
//         <h3 id="previewTemplate">Classic Sample</h3>

//         <dl id="previewFields">
//           <dt>Full Name</dt>
//           <dd>Not entered</dd>
//         </dl>

//         <p class="demo-warning">
//           FICTIONAL DEMONSTRATION DOCUMENT
//         </p>
//       </article>

//       <button type="button" id="downloadPdf">
//         Download Sample PDF
//       </button>
//     </section>
//   `;
// }




export function renderPreviewPanel() {
  return `
    <section class="panel">
      <h2>4. Document Preview</h2>

      <article id="documentPreview" class="document-preview">

        <div class="watermark">
          SAMPLE — NOT VALID
        </div>

        <h3 id="previewTemplate">
          Classic Sample
        </h3>

        <dl id="previewFields">
          <dt>Full Name</dt>
          <dd>Not entered</dd>
        </dl>

        <p class="demo-warning">
          FICTIONAL DEMONSTRATION DOCUMENT
        </p>

      </article>

      <div class="actions">

        <button type="button" id="downloadPdf">
          Download Sample PDF
        </button>

        <button type="button" id="downloadFrontPng">
          Download Front PNG
        </button>

        <button type="button" id="downloadBackPng">
          Download Back PNG
        </button>

        <button type="button" id="downloadBackPdf">
          Download Back Sample PDF
        </button>

      </div>

      <p class="hint">
        All exports are fictional demonstration files.
        They are not valid government-issued identification.
      </p>

    </section>
  `;
}
