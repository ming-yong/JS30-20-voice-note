# JS30-20-voice-note

![image: demonstration of voice note](https://github.com/ming-yong/JS30-20-voice-note/blob/master/voiceNote.gif)

Note with speech recognition. Built with vanilla JS and based on [JavaScript 30 by WesBos](https://github.com/wesbos/JavaScript30).

## Running this project

### Live version
[https://ming-yong.github.io/JS30-20-voice-note/](https://ming-yong.github.io/JS30-20-voice-note/)

## User stories

- **User story #1:** I can generate notes by speaking.
- **User story #2:** I can generate new paragraph after I stopped.
- **User story #3:** I can reset my notes by saying "reset notes".

## Notes
### Connect the mic and the browser

As previous tutorial, we need a server for connection this time. As I have no idea how server works, I followed the instruction of including the `package.json` file and type `npm install` to start it. I received a message for fixing errors in my shell(Git Bash) after typing `npm install`, I followed the error instruction, typed `npm install` again and it worked.

Unlike the tutorial, my voice note works just fine in Chrome.

```js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; //only work in firefox

//create instance of SpeechRecognition
const recognition = new SpeechRecognition();
//populate result simultaneously(as user talk)
recognition.interimResults = true;
```

### "Write" with voice

Every `p` will be store inside a `<div class="div_notes" contenteditable></div>` using `appendChild`. We will put the result we get into the `p` and generate a new one if user stop talking, make sure to restart the `recognition` every time it ends.

We can also detected what user said and take action, in this build we reset our notes.

```js
let p = document.createElement("p"); //create new p every time
const words = document.querySelector(".div_notes");
words.appendChild(p);

recognition.addEventListener("result", e => {
 const transcript = Array.from(e.results)
  //map to the transcripts and join all of those together
  .map(result => result[0])
  .map(result => result.transcript)
  .join("");

 p.textContent = transcript; //place what user said in p
 //create a new p whenever user stop
 if (e.results[0].isFinal) {
  p = document.createElement("p");
  words.appendChild(p);
 }

 if (transcript.includes("reset notes")) {
  words.innerHTML = "";
 }
});

recognition.addEventListener("end", recognition.start); // start again when it ends
recognition.start();
```
