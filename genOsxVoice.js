speechSynthesis.getVoices().filter(v => v.localService && v.lang.startsWith('en') 
&& 'US-GB-CA-IE-AU-NZ'.includes(v.lang.slice(3,5)))
.map(v => `${v.name.split(' ')[0]} Male`).join('\n')
