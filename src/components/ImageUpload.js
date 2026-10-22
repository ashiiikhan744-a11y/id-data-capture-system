
export function renderImageUpload() {
  return `
    <section class="panel">
      <h2>3. Image Upload</h2>

      <div class="form-grid">
        <label>
          Front Sample Image
          <input type="file" id="frontImage"
            accept="image/jpeg,image/png" />
        </label>

        <label>
          Back Sample Image
          <input type="file" id="backImage"
            accept="image/jpeg,image/png" />
        </label>
      </div>

      <div class="image-grid">
        <div>
          <h3>Front Preview</h3>
          <img id="frontPreview" class="upload-preview"
            alt="Front sample preview" hidden />
        </div>

        <div>
          <h3>Back Preview</h3>
          <img id="backPreview" class="upload-preview"
            alt="Back sample preview" hidden />
        </div>
      </div>

      <p class="hint">
        Use fictional sample artwork. Images are processed locally
        in the browser.
      </p>
    </section>
  `;
}
