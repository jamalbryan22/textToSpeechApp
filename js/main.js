// Init Speech API
const synth = window.speechSynthesis;

// DOM ELEMENTS
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  // Loop through voices and create option for each one
  voices.forEach(voice => {
    // Create optional element
    var option = document.createElement("option");
    // Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";
    // Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
let speak = () => {
  // Check if speaking
  if (synth.speaking) {
    alert("Already Speeaking");
  }
  if (textInput.value != "") {
    // Add background animation
    body.style.background = "#141414 url(/img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    // Get speak text
    var speechText = new SpeechSynthesisUtterance(textInput.value);
    // Speak end
    speechText.onend = e => {
      console.log("Done Speaking...");
      // Add background animation
      body.style.background = "#141414";
    };
    // Speech Error
    speechText.onerror = e => {
      console.log("Something went wrong");
    };

    // Selected voice
    var selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices in api
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speechText.voice = voice;
      }
    });

    // Set pitch and rate
    speechText.rate = rate.value;
    speechText.pitch = pitch.value;

    synth.speak(speechText);
  }
};

// EVENT LISTENERS
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// Pitch value change
rate.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// Voice Select Change
voiceSelect.addEventListener("change", e => speak());
