// WEATHER
fetch("https://api.open-meteo.com/v1/forecast?latitude=21.30&longitude=76.22&current_weather=true")
.then(res=>res.json())
.then(data=>{
document.getElementById("weather").innerHTML =
🌤️ ${data.current_weather.temperature}°C | 💨 ${data.current_weather.windspeed} km/h;
});

// ANNOUNCEMENT
function playAnnouncement(){
let msg = new SpeechSynthesisUtterance(
"Welcome to Burhanpur Railway Station. Have a safe journey."
);
speechSynthesis.speak(msg);
}

// TRAIN STATUS
document.getElementById("trainStatus").innerHTML = `
🚆 Punjab Mail – On Time<br>
🚆 Amritsar Express – Delayed 20 min
`;

// PDF TICKET
document.getElementById("ticketForm").addEventListener("submit",function(e){
e.preventDefault();
const {jsPDF}=window.jspdf;
let pdf=new jsPDF();
pdf.text("Burhanpur Railway Station",20,20);
pdf.text("Ticket Confirmed",20,40);
pdf.save("Ticket.pdf");
});

// CONTACT
function submitContact(e){
e.preventDefault();
alert("Message sent successfully!");
}
