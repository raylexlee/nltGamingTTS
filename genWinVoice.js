synth.getVoices().filter(v => v.localService && v.lang.startsWith('en')).forEach(v => { console.log(v.name.split(' ')[1],'Male')})
speechSynthesis.getVoices().filter(v => !v.localService && v.lang.startsWith('en') 
&& 'US-GB-CA-IE-AU-NZ'.includes(v.lang.slice(3,5)))
.map(v => `${v.name.split(' ')[1]} Male`).join('\n')
function speakAll() {
  var utterance = new SpeechSynthesisUtterance('raylexlee');
  utterance.onend = function () {
    i++;
    setTimeout(function() {}, 12000);
  }
  var voices = window.speechSynthesis.getVoices();
  var allVoice = [];
  var i, v;
   for (i = 0; i < voices.length; i++) {
      v = voices[i];
      if (v.lang.startsWith('en') 
&& 'US-GB-CA-IE-AU-NZ'.includes(v.lang.slice(3,5))) {
        allVoice.push(v);
      }     
   } 
   i = 0;
   while (i < allVoice.length) {
        v = allVoice[i];
        utterance.text = `${v.name} We are happy to render oure service.`;
        utterance.voice = v;
        window.speechSynthesis.speak(utterance);
   }
}
speakAll();
