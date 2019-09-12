window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; //only work in firefox

//create instance of SpeechRecognition
const recognition = new SpeechRecognition();
//populate result simultaneously
recognition.interimResults = true;

//create new p every time
let p = document.createElement("p");
const words = document.querySelector(".div_notes");
words.appendChild(p);

recognition.addEventListener("result", e => {
	const transcript = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join("");

	p.textContent = transcript;
	if (e.results[0].isFinal) {
		p = document.createElement("p");
		words.appendChild(p);
	}

	if (transcript.includes("reset notes")) {
		words.innerHTML = "";
	}
});

recognition.addEventListener("end", recognition.start);
recognition.start();
