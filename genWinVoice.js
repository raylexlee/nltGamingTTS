synth.getVoices().filter(v => v.localService && v.lang.startsWith('en')).forEach(v => { console.log(v.name.split(' ')[1],'Male')})
