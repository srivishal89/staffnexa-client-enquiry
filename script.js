const form = document.getElementById("clientEnquiryForm");
const messageEl = document.getElementById("formMessage");
const requirementTypeEl = document.getElementById("requirementType");
const genderField = document.getElementById("genderField");

// Change when deployed
const API_URL = "http://localhost:3000/client-enquiries";

// Show / hide gender field
requirementTypeEl.addEventListener("change", () => {
  if (requirementTypeEl.value === "Housekeeping") {
    genderField.style.display = "flex";
    genderField.querySelector("select").required = true;
  } else {
    genderField.style.display = "none";
    genderField.querySelector("select").required = false;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
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
      messageEl.textContent = "Thank you! Your requirement has been submitted.";
      form.reset();
      genderField.style.display = "none";
    } else {
      throw new Error(result.message || "Failed");
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "Submission failed. Please try again.";
  }
});
