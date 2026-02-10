const form = document.getElementById("clientEnquiryForm");
const messageEl = document.getElementById("formMessage");

// CHANGE THIS WHEN DEPLOYED TO RENDER
const API_URL = "http://localhost:3000/client-enquiries";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "Submitting...";

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.numberOfStaff = Number(payload.numberOfStaff);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      messageEl.style.color = "green";
      messageEl.textContent = "Thank you! Your requirement has been submitted.";
      form.reset();
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "Error submitting form. Please try again.";
  }
});
