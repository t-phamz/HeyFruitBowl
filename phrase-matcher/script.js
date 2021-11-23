// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'hey frugtskål',
  '32 bananer'
];

//sentences show on browser
var phrasePara = document.querySelector('.phrase'); //phrase the user say
// var resultPara = document.querySelector('.result'); //right or wrong
var diagnosticPara = document.querySelector('.output'); //input result

var testBtn = document.querySelector('button'); //start button

//finds a random phrase from the phrase array 
// function randomPhrase() {
//   var number = Math.floor(Math.random() * phrases.length);
//   return number;
// }

// window.onload = testSpeech();

// function startsys() {
//   var initial_reg = new SpeechRecognition();
//   var speechResult;
//   initial_reg.start();
//   initial_reg.onresult = function(event) {
//     speechResult = event.results[0][0].transcript.toLowerCase();
//   }
//   while (speechResult == phrases[0]) {
//     testSpeech();
//     console.log("starting...");
//   }
// }

function testSpeech() {
  testBtn.disabled = false;
  testBtn.textContent = 'Test in progress';
  
  var phrase = phrases[0]; //pick a phrase fra array
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase(); 
  phrasePara.textContent = phrase; //shows the picked phrase
  // resultPara.textContent = 'Right or wrong?'; //set resultpara to right or wrong
  // resultPara.style.background = 'rgba(0,0,0,0.2)'; //give color to right or wrong
  // diagnosticPara.textContent = '...diagnostic messages'; //shows the diagnostics (can't see it doe)

  //var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';'; //!!!! her tilføje vores egen sætning
  var recognition = new SpeechRecognition(); // sets makes a new variable recognition into a SpeecRecognition class
  // var speechRecognitionList = new SpeechGrammarList(); //sets makes a new variable recognition into a SpeecRecognition class
  //speechRecognitionList.addFromString(grammar, 1); //!! egen sætning bliver tilføjet til listen 
  //recognition.grammars = speechRecognitionList;
  recognition.lang = 'da-DK'; 
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  var trigger = false;

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';

    if (speechResult.includes("frugtskål")) {
      trigger = true;
      
      //start ny funktion som tæller frugter
    } 
    console.log('trigger on ', trigger);

    console.log(typeof speechResult);
    console.log(speechResult);
    console.log(diagnosticPara);
    console.log('Confidence: ' + event.results[0][0].confidence); //kan brug i en if statement. muligvis noget med hvis confidence er lav skal vi dobbelt tjekke
  }

  recognition.onspeechend = function() {
    recognition.stop();
      testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
       if (trigger == true) {
       testBtn.click();
       console.log("success");
      }
      testBtn.click();
    
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }

}

testBtn.addEventListener('click', testSpeech); //tilføje function til button. 

