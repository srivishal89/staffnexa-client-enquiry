const API_URL = "https://staffnexa-backend.onrender.com/client-enquiries";

const form = document.getElementById("clientForm");
const message = document.getElementById("formMessage");
const requirementType = document.getElementById("requirementType");
const otherRoleWrapper = document.getElementById("otherRoleWrapper");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  message.style.color = "black";
  message.textContent = "Submitting...";

  const formData = {
    companyName: document.getElementById("companyName").value.trim(),
    contactPerson: document.getElementById("contactPerson").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    requirementType: requirementType.value === "Other"
      ? document.getElementById("otherRole").value.trim()
      : requirementType.value,
    genderPreference: document.getElementById("genderPreference").value,
    numberOfStaff: parseInt(document.getElementById("numberOfStaff").value),
    location: document.getElementById("location").value.trim(),
    hiringTimeline: document.getElementById("hiringTimeline").value,
    notes: document.getElementById("notes").value.trim()
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    message.style.color = "green";
    message.textContent = "Thank you! Your requirement has been submitted.";

    form.reset();
    otherRoleWrapper.style.display = "none";

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Submission failed. Please try again.";
    console.error("Error:", error);
  }
});

requirementType.addEventListener("change", function () {
  if (this.value === "Other") {
    otherRoleWrapper.style.display = "block";
  } else {
    otherRoleWrapper.style.display = "none";
  }
});
