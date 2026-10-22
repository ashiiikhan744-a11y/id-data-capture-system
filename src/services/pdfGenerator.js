
// import { jsPDF } from "jspdf";

// export function downloadSamplePdf(data, templateName) {
//   const pdf = new jsPDF();

//   pdf.setFontSize(22);
//   pdf.text("SAMPLE DOCUMENT", 20, 25);

//   pdf.setFontSize(12);
//   pdf.text("NOT VALID - FICTIONAL DEMONSTRATION", 20, 35);

//   pdf.setDrawColor(180);
//   pdf.rect(15, 42, 180, 190);

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

//   let y = 55;

//   pdf.setFontSize(11);
//   pdf.text(`Template: ${templateName}`, 20, y);
//   y += 12;

//   for (const [label, value] of fields) {
//     const text = `${label}: ${value || "Not provided"}`;
//     const lines = pdf.splitTextToSize(text, 165);

//     if (y + lines.length * 6 > 220) {
//       pdf.addPage();
//       y = 20;
//     }

//     pdf.text(lines, 20, y);
//     y += lines.length * 6 + 3;
//   }

//   pdf.setTextColor(200, 0, 0);
//   pdf.setFontSize(16);
//   pdf.text("SAMPLE - NOT VALID", 105, 250, {
//     align: "center",
//     angle: 25
//   });

//   pdf.save("sample-document.pdf");
// }




import { jsPDF } from "jspdf";

/**
 * Generate a fictional sample document PDF.
 * This is for demonstration purposes only.
 */
export function downloadSamplePdf(data, templateName) {
  const pdf = new jsPDF();

  // Page background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 210, 297, "F");

  // Document heading
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(29, 78, 216);
  pdf.text("SAMPLE DOCUMENT", 20, 25);

  pdf.setFontSize(12);
  pdf.setTextColor(185, 28, 28);
  pdf.text("NOT VALID - FICTIONAL DEMONSTRATION", 20, 35);

  // Document border
  pdf.setDrawColor(180, 180, 180);
  pdf.rect(15, 42, 180, 220);

  // Data fields
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

  let y = 60;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 41, 59);

  // Template name
  pdf.setFont("helvetica", "bold");
  pdf.text(`Template: ${templateName || "Classic Sample"}`, 20, y);
  y += 12;

  // Render fields with automatic page overflow handling
  for (const [label, value] of fields) {
    pdf.setFont("helvetica", "normal");

    const text = `${label}: ${value || "Not provided"}`;
    const lines = pdf.splitTextToSize(text, 165);
    const lineHeight = 6;

    if (y + lines.length * lineHeight > 245) {
      pdf.addPage();
      y = 25;
    }

    pdf.text(lines, 20, y);
    y += lines.length * lineHeight + 4;
  }

  // Visible watermark on every page
  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(200, 0, 0);

    pdf.text("SAMPLE - NOT VALID", 105, 280, {
      align: "center"
    });

    pdf.setFontSize(9);
    pdf.text("FICTIONAL DEMONSTRATION ONLY", 105, 288, {
      align: "center"
    });
  }

  pdf.save("sample-document.pdf");
}

/**
 * Generate a fictional back-side demonstration PDF.
 * The decorative bars are NOT a real barcode.
 */
export function downloadDemoBackPdf(data) {
  const pdf = new jsPDF();

  // Background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 210, 297, "F");

  // Border
  pdf.setDrawColor(100, 116, 139);
  pdf.rect(12, 12, 186, 273);

  // Heading
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(185, 28, 28);

  pdf.text("SAMPLE - NOT VALID", 105, 28, {
    align: "center"
  });

  pdf.setFontSize(12);
  pdf.setTextColor(30, 41, 59);

  pdf.text(
    "FICTIONAL DEMONSTRATION - BACK SIDE",
    105,
    42,
    { align: "center" }
  );

  // Sample information
  const fields = [
    ["Name", data.fullName],
    ["Date of Birth", data.dateOfBirth],
    ["Demo Reference", data.documentNumber],
    ["City", data.city],
    ["Region", data.state]
  ];

  let y = 65;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  for (const [label, value] of fields) {
    const lines = pdf.splitTextToSize(
      `${label}: ${value || "Not provided"}`,
      160
    );

    // Keep fields clear of the decorative graphic.
    if (y + lines.length * 6 > 150) {
      break;
    }

    pdf.text(lines, 22, y);
    y += lines.length * 6 + 5;
  }

  // Decorative graphic only; not a machine-readable barcode.
  pdf.setFillColor(230, 230, 230);
  pdf.rect(20, 165, 170, 55, "F");

  const xStart = 25;
  const yStart = 175;
  const barHeight = 30;
  const barCount = 80;

  for (let i = 0; i < barCount; i++) {
    const x = xStart + i * 2;

    if (x > 185) break;

    const barWidth = i % 3 === 0 ? 1 : 0.5;
    const barColor = i % 2 === 0 ? 60 : 160;

    pdf.setFillColor(barColor, barColor, barColor);
    pdf.rect(x, yStart, barWidth, barHeight, "F");
  }

  // Explicit warning beneath the graphic
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(185, 28, 28);

  pdf.text("DEMO ONLY - NOT SCANNABLE", 105, 235, {
    align: "center"
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  pdf.text(
    "Fictional sample. Not a government-issued document.",
    105,
    247,
    { align: "center" }
  );

  pdf.save("sample-back-demo.pdf");
}
