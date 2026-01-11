// WEATHER (DEMO)
document.getElementById("weather").innerText =
"🌤️ Temperature: 32°C | Wind: 8 km/h";

// FEMALE VOICE ANNOUNCEMENT
function playAnnouncement(){
let msg = new SpeechSynthesisUtterance(
"Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
);
msg.lang="en-IN";
msg.pitch=1.2;
speechSynthesis.speak(msg);
}

// PLATFORM ANNOUNCEMENT
function platformAnnouncement(){
let msg=new SpeechSynthesisUtterance(
"Attention please. Punjab Mail is arriving on platform number one."
);
msg.lang="en-IN";
msg.pitch=1.3;
speechSynthesis.speak(msg);
}

// LIVE TRAIN STATUS
document.getElementById("trainSelect").addEventListener("change",function(){
let r=document.getElementById("trainResult");
if(this.value==="Punjab Mail")
r.innerText="🚆 Punjab Mail | Platform 1 | 10:30 AM";
else if(this.value==="Tapti Ganga")
r.innerText="🚆 Tapti Ganga Express | Platform 2 | 2:15 PM";
else if(this.value==="Narmada")
r.innerText="🚆 Narmada Express | Platform 3 | 6:45 PM";
else r.innerText="";
});

// PDF TICKET
document.getElementById("ticketForm").addEventListener("submit",function(e){
e.preventDefault();
const {jsPDF}=window.jspdf;
let pdf=new jsPDF();
pdf.text("Burhanpur Railway Station",20,20);
pdf.text("Ticket Confirmed",20,35);
pdf.text("Happy Journey!",20,50);
pdf.save("Railway_Ticket.pdf");
});