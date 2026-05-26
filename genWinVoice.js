synth.getVoices().filter(v => v.localService && v.lang.startsWith('en')).forEach(v => { console.log(v.name.split(' ')[1],'Male')})
synth.getVoices().filter(v => !v.localService && v.lang.startsWith('en')).map(v => `${v.name.split(' ')[1]} Male`)}).filter(v => 'US-GB-CA-IE-AU-NZ'.includes(v.lang.split(' ')[1])).join('\n')
