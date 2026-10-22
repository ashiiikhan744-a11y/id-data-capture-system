
export function validateForm(data) {
  const errors = [];

  if (!data.fullName?.trim()) {
    errors.push("Full Name is required.");
  }

  if (data.fullName?.length > 120) {
    errors.push("Full Name is too long.");
  }

  if (data.documentNumber?.length > 50) {
    errors.push("Demo reference number is too long.");
  }

  return errors;
}

export function validateImage(file) {
  if (!file) return "Please choose an image.";

  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return "Only JPEG and PNG images are supported.";
  }

  if (file.size > maxSize) {
    return "Image must be 5 MB or smaller.";
  }

  return null;
}
