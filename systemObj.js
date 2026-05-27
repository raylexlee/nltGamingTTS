const system = {
  get gametag() {  
      const title = ["Epidemic", "Nadia", "Order"]
      const tag = title.find(t => document.title.include(t));
      return tag.toLowerCase()
  },
  get regex() {
     return (this.nametag() === 'epidemic')
        ? /^[A-Z][a-z],[a-z][a-z],[a-z]/
        : /^[A-Z][a-z][A-Z][a-z]/ 
  },
  speaker : {
      local : { name : "Zira", voice : null, pitch : 1.3, rate : 1},
      cloud : { name : "Emma", voice : null, pitch : 1.0  rate : 1.0}
  },
  get ttsVoice(name) {
      const allvoices = speechSynthesis.getVoices();
      return allvoices.find(v => v.name.split(' ')[1] === name)
  },
  get speakVoice(actor) {
      const cloudVoice = this.ttsVoice(actor.cloud.name);
      if (cloudVoice) return cloudVoice;
      return this.ttsVoice(actor.local.name)
  },
}
// default system voice = system.speakVoice(system.speaker)
// gametag = system.gametag()
// speaking voice of Diana = system.speakVoice(nltPerson["Diana"])
