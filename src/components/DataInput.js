
export function renderDataInput() {
  return `
    <section class="panel">
      <h2>1. Document Information</h2>

      <form id="dataForm">
        <div class="form-grid">

          <label>
            Full Name
            <input name="fullName" id="fullName"
              placeholder="Enter sample name" required />
          </label>

          <label>
            Date of Birth
            <input type="date" name="dateOfBirth"
              id="dateOfBirth" required />
          </label>

          <label>
            Demo Reference Number
            <input name="documentNumber" id="documentNumber"
              placeholder="DEMO-0001" />
          </label>

          <label>
            Height
            <input name="height" id="height"
              placeholder="e.g. 175 cm" />
          </label>

          <label>
            Eye Color
            <select name="eyeColor" id="eyeColor">
              <option value="">Select color</option>
              <option>Brown</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Hazel</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Hair Color
            <select name="hairColor" id="hairColor">
              <option value="">Select color</option>
              <option>Black</option>
              <option>Brown</option>
              <option>Blonde</option>
              <option>Red</option>
              <option>Other</option>
            </select>
          </label>

          <label class="full-width">
            Address
            <textarea name="address" id="address"
              rows="2" placeholder="Enter sample address"></textarea>
          </label>

          <label>
            City
            <input name="city" id="city" placeholder="City" />
          </label>

          <label>
            State / Region
            <input name="state" id="state"
              placeholder="State or region" />
          </label>

          <label>
            Postal Code
            <input name="postalCode" id="postalCode"
              placeholder="Postal code" />
          </label>
        </div>

        <div class="actions">
          <button type="submit">Update Preview</button>
          <button type="button" id="pasteData" class="secondary">
            Paste Form Data
          </button>
          <button type="reset" class="secondary">Clear Form</button>
        </div>

        <p class="hint">
          Paste format: Full Name, Date of Birth, Reference Number,
          Height, Eye Color, Hair Color, Address, City, State, Postal Code.
        </p>
      </form>
    </section>
  `;
}
