const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

const doctorDropdown = document.getElementById("doctor");
const timeSlotsDiv = document.getElementById("time-slots");
const timeSlotSelect = document.getElementById("time-slot-select");

doctorDropdown.addEventListener("change", function () {
  const selectedDoctor = doctorDropdown.value;

  // Clear previous time slots
  timeSlotSelect.innerHTML = "";

  // Hide the time slots by default
  timeSlotsDiv.style.display = "none";

  if (selectedDoctor !== "") {
    // Show the time slots for the selected doctor
    timeSlotsDiv.style.display = "block";
    if (selectedDoctor === "doctor_strange") {
      // Add time slots for Doctor Strange
      addTimeSlots([
        "7:00 AM - 8:00 AM",
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
      ]);
    } else if (selectedDoctor === "doctor_tirta") {
      // Add time slots for Doctor Tirta
      addTimeSlots([
        "10:00 AM - 11:00 AM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
      ]);
    } else if (selectedDoctor === "doctor_boyke") {
      // Add time slots for Doctor Boyke
      addTimeSlots([
        "2:00 PM - 3:00 PM",
        "4:00 PM - 5:00 PM",
        "6:00 AM - 7:00 AM",
      ]);
    } else if (selectedDoctor === "doctor_tompi") {
      // Add time slots for Doctor Tompi
      addTimeSlots([
        "10:00 AM - 11:00 AM",
        "12:00 PM - 1:00 PM",
        "8:00 PM - 9:00 PM",
      ]);
    }
  }
});

function addTimeSlots(slots) {
  slots.forEach((slot) => {
    const option = document.createElement("option");
    option.textContent = slot;
    timeSlotSelect.appendChild(option);
  });
}

// Patient Booking Function
const book = document.getElementById("book");

book.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const doctor = document.getElementById("doctor").value;
  const time = document.getElementById("time-slot-select").value;
  console.log (typeof time)


  fetch("http://localhost:3000/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      date: date,
      doctor: doctor,
      appointment_time: time,
    }),
  }).then(response => {
    if(response.ok){
      alert("BOOKING SUCCESS");
    } else{
      alert("BOOKING FAILED");
    }
  })
  .catch((error) => {
    alert(` ERROR: ${error.message}`);
  });
});

//Patient Booking List
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("patient-data");

  // Fetch data from the backend
  fetch("http://localhost:3000/patients")
      .then(response => response.json())
      .then(data => {
          // Iterate through the data and create table rows
          data.forEach(patient => {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${patient.name}</td>
                  <td>${patient.date}</td>
                  <td>${patient.doctor}</td>
                  <td>${patient.appointment_time}</td>
              `;
              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
});



