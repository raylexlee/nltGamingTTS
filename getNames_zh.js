speechSynthesis.getVoices().filter(v=>v.lang.startsWith('zh-'))
.map(v=>`${v.name.split(' ')[1]} Male ${v.lang} ${v.localService ? 'local' : 'cloud'}`).join('\n')
