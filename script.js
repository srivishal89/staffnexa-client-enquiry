const form = document.getElementById("clientEnquiryForm");
const messageEl = document.getElementById("formMessage");
const requirementTypeEl = document.getElementById("requirementType");
const genderField = document.getElementById("genderField");
const otherRoleField = document.getElementById("otherRoleField");
const otherRoleInput = document.getElementById("otherRole");
const phoneInput = document.getElementById("phone");

// Change when deployed
const API_URL = "https://staffnexa-backend.onrender.com/client-enquiries";

/* PHONE VALIDATION */
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
  if (phoneInput.value.length > 10) {
    phoneInput.value = phoneInput.value.slice(0, 10);
  }
});

/* REQUIREMENT TYPE LOGIC */
requirementTypeEl.addEventListener("change", () => {
  const value = requirementTypeEl.value;

  // Show gender only for Housekeeping
  if (value === "Housekeeping") {
    genderField.style.display = "flex";
    genderField.querySelector("select").required = true;
  } else {
    genderField.style.display = "none";
    genderField.querySelector("select").required = false;
  }

  // Show Other textbox
  if (value === "Other") {
    otherRoleField.style.display = "flex";
    otherRoleInput.required = true;
  } else {
    otherRoleField.style.display = "none";
    otherRoleInput.required = false;
  }
});

/* SUBMIT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (phoneInput.value.length !== 10) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  messageEl.textContent = "Submitting...";
  messageEl.style.color = "#333";

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.numberOfStaff = Number(payload.numberOfStaff);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      messageEl.style.color = "green";
      messageEl.textContent =
        "Thank you! Your requirement has been submitted.";
      form.reset();
      genderField.style.display = "none";
      otherRoleField.style.display = "none";
    } else {
      throw new Error(result.message || "Failed");
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent =
      "Submission failed. Please try again.";
  }
});
