// WEATHER API
fetch("https://api.open-meteo.com/v1/forecast?latitude=21.30&longitude=76.22&current_weather=true")
.then(res=>res.json())
.then(data=>{
document.getElementById("weather").innerHTML =
`🌤️ Temperature: ${data.current_weather.temperature}°C |
 Wind: ${data.current_weather.windspeed} km/h`;
});

// VOICE ANNOUNCEMENT (FIXED)
function playAnnouncement(){
let msg = new SpeechSynthesisUtterance(
"Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
);
msg.lang="en-IN";
speechSynthesis.speak(msg);
}

// LIVE TRAIN STATUS (DEMO)
setInterval(()=>{
document.getElementById("liveTrain").innerHTML =
"🚆 Tapti Ganga Express is arriving in 10 minutes at Platform No. 2";
},3000);

// PDF TICKET DOWNLOAD
document.getElementById("ticketForm").addEventListener("submit",function(e){
e.preventDefault();
const { jsPDF } = window.jspdf;
let pdf = new jsPDF();

pdf.text("Burhanpur Railway Station",20,20);
pdf.text("Passenger: " + name.value,20,35);
pdf.text("From: " + from.value + " To: " + to.value,20,45);
pdf.text("Coach: " + coach.value,20,55);
pdf.text("Status: Confirmed",20,70);

pdf.save("Railway_Ticket.pdf");
});
