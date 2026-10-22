
const fieldNames = [
  "fullName",
  "dateOfBirth",
  "documentNumber",
  "height",
  "eyeColor",
  "hairColor",
  "address",
  "city",
  "state",
  "postalCode"
];

export async function pasteFormData() {
  try {
    const text = await navigator.clipboard.readText();

    const values = text.split(",").map(value => value.trim());

    if (values.length !== fieldNames.length) {
      throw new Error(
        "Please provide exactly 10 comma-separated values."
      );
    }

    fieldNames.forEach((name, index) => {
      const field = document.getElementById(name);

      if (field) field.value = values[index];
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message ||
        "Clipboard access failed. Please paste manually."
    };
  }
}
