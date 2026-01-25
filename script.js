// ==================== PAGE SAFE LOAD ====================
document.addEventListener("DOMContentLoaded", function () {

  // -------------------- WEATHER (DEMO) --------------------
  const temp = Math.floor(Math.random() * 10) + 22;
  const wind = Math.floor(Math.random() * 6) + 5;
  const icons = ["🌤️", "☀️", "🌥️", "🌦️"];
  const icon = icons[Math.floor(Math.random() * icons.length)];

  document.getElementById("weather").innerText =
    `${icon} Temperature: ${temp}°C | Wind: ${wind} km/h`;

  // -------------------- SPEECH FUNCTION --------------------
  function speak(text, pitch = 1.2) {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported");
      return;
    }
    speechSynthesis.cancel();
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    msg.pitch = pitch;
    msg.rate = 0.95;
    speechSynthesis.speak(msg);
  }

  // -------------------- STATION ANNOUNCEMENT --------------------
  window.playAnnouncement = function () {
    speak(
      "Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
    );
  };

  // -------------------- PLATFORM ANNOUNCEMENT --------------------
  window.platformAnnouncement = function () {
    let train = document.getElementById("trainSelect").value;
    let text = "";

    if (train === "Punjab Mail")
      text = "Attention please. Punjab Mail is arriving on platform number one.";
    else if (train === "Tapti Ganga")
      text = "Attention please. Tapti Ganga Express is arriving on platform number two.";
    else if (train === "Narmada")
      text = "Attention please. Narmada Express is arriving on platform number three.";
    else {
      alert("Please select a train first");
      return;
    }

    speak(text, 1.3);
  };

  // -------------------- LIVE TRAIN STATUS --------------------
  document.getElementById("trainSelect").addEventListener("change", function () {
    let r = document.getElementById("trainResult");

    if (this.value === "Punjab Mail")
      r.innerText = "🚆 Punjab Mail | Platform 1 | 10:30 AM";
    else if (this.value === "Tapti Ganga")
      r.innerText = "🚆 Tapti Ganga Express | Platform 2 | 2:15 PM";
    else if (this.value === "Narmada")
      r.innerText = "🚆 Narmada Express | Platform 3 | 6:45 PM";
    else r.innerText = "";
  });

  // -------------------- PAYMENT METHOD --------------------
  document.getElementById("paymentMethod").addEventListener("change", function () {
    let box = document.getElementById("paymentDetails");

    if (this.value === "UPI") {
      box.style.display = "block";
      box.innerHTML = '<input placeholder="Enter UPI ID" required>';
    } else if (this.value === "Credit Card") {
      box.style.display = "block";
      box.innerHTML =
        '<input placeholder="Card Number" required>' +
        '<input placeholder="Expiry Date" required>' +
        '<input placeholder="CVV" required>';
    } else {
      box.style.display = "none";
      box.innerHTML = "";
    }
  });

  // -------------------- TICKET BOOKING --------------------
  let ticketData = null;

  document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let payment = document.getElementById("paymentMethod").value;
    if (!payment) {
      alert("Please select payment method");
      return;
    }

    ticketData = {
      name: document.getElementById("name").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      date: document.querySelector('input[type="date"]').value,
      payment: payment,
      pnr: "PNR" + Math.floor(Math.random() * 900000 + 100000)
    };

    document.getElementById("previewText").innerHTML =
      "<b>Passenger:</b> " + ticketData.name + "<br>" +
      "<b>From:</b> " + ticketData.from + "<br>" +
      "<b>To:</b> " + ticketData.to + "<br>" +
      "<b>Date:</b> " + ticketData.date + "<br>" +
      "<b>Payment:</b> " + ticketData.payment + "<br>" +
      "<b>PNR:</b> " + ticketData.pnr;

    document.getElementById("ticketModal").style.display = "flex";
  });

  window.closeModal = function () {
    document.getElementById("ticketModal").style.display = "none";
  };

  window.downloadTicket = function () {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF();

    pdf.text("Burhanpur Railway Station", 20, 20);
    pdf.text("E-Ticket", 20, 35);
    pdf.text("PNR: " + ticketData.pnr, 20, 50);
    pdf.text("Passenger: " + ticketData.name, 20, 65);
    pdf.text("From: " + ticketData.from, 20, 75);
    pdf.text("To: " + ticketData.to, 20, 85);
    pdf.text("Date: " + ticketData.date, 20, 95);
    pdf.text("Payment: " + ticketData.payment, 20, 105);
    pdf.text("Status: Confirmed", 20, 120);

    pdf.save("Railway_Ticket.pdf");
    closeModal();
  };

});

// -------------------- CONTACT → GOOGLE SHEET --------------------
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  const data = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    message: document.getElementById("contactMessage").value
  };

  fetch("https://script.google.com/macros/s/AKfycbz_cBBVWdFRV6mRIXvw6WbpMrA_gFD2RDx7JYoMJ0lPpnQe1kOSzo7wvm9bNry3v7oB/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(() => {
    alert("✅ Message sent successfully!");
    document.getElementById("contactForm").reset();
  })
  .catch(() => {
    alert("❌ Message send failed");
  });
});
function showSuccess(){
  setTimeout(() => {
    document.getElementById("successMsg").style.display = "block";
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
  }, 800);
}

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100;

  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});


