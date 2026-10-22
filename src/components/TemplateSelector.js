
// export function renderTemplateSelector() {
//   return `
//     <section class="panel">
//       <h2>2. Sample Template</h2>

//       <label for="templateSelect">Choose Template</label>

//       <select id="templateSelect">
//         <option value="classic">Classic Sample</option>
//         <option value="modern">Modern Sample</option>
//         <option value="minimal">Minimal Sample</option>
//       </select>

//       <p class="hint">
//         These are fictional layouts for testing and demonstration.
//       </p>
//     </section>
//   `;
// }



export function renderTemplateSelector() {
  return `
    <section class="panel">
      <h2>2. Sample Template</h2>

      <label for="templateSelect">
        Choose Template
      </label>

      <select id="templateSelect">
        <option value="classic">Classic Sample</option>
        <option value="modern">Modern Sample</option>
        <option value="minimal">Minimal Sample</option>
      </select>

      <label for="demoRegion" class="field-spacing">
        Choose Demo Region
      </label>

      <select id="demoRegion">
        <option value="demoA">Demo Region A</option>
        <option value="demoB">Demo Region B</option>
        <option value="demoC">Demo Region C</option>
      </select>

      <button
        type="button"
        id="generateReference"
        class="reference-button"
      >
        Generate Demo Reference
      </button>

      <p class="hint">
        Fictional regions and reference numbers only.
        These are not government-issued license numbers.
      </p>
    </section>
  `;
}
