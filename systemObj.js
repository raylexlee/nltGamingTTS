const system = {
  get gametag() {  
      const titles = ["Epidemic", "Nadia", "Order"];
      const tag = titles.find(t => document.title.includes(t));
      return tag ? tag.toLowerCase() : "unknown";
  },
  
  get regex() {
     return (this.gametag === 'epidemic')
        ? /^[A-Z][a-z],[a-z][a-z],[a-z]/
        : /^[A-Z][a-z][A-Z][a-z]/;
  },
  
  speaker : {
      local : { name: "Zira", voice: null, pitch: 1.3, rate: 1.0 },
      cloud : { name: "Emma", voice: null, pitch: 1.0, rate: 1.0 }
  },
  
  getTtsVoice(name) {
      const allvoices = this.getVoices();
      if (!allvoices || allvoices.length === 0) return null;
      return allvoices.find(v => {
          const parts = v.name.split(/[\s-]+/);
          return parts.includes(name);
      }) || null;
  },
  
  getSpeakVoice(actorObj) {
      // Create a unified setting object containing the structural options and fallback data
      const targetVoice = this.getTtsVoice(actorObj.cloud.name) || this.getTtsVoice(actorObj.local.name);
      const targetMeta = this.getTtsVoice(actorObj.cloud.name) ? actorObj.cloud : actorObj.local;
      
      return {
          voice: targetVoice, // Actual SpeechSynthesisVoice object
          pitch: targetMeta.pitch ?? 1.0,
          rate: targetMeta.rate ?? 1.0
      };
  },

  init() {
      this.ttsUtterance = typeof SpeechSynthesisUtterance !== 'undefined' 
          ? new SpeechSynthesisUtterance() 
          : null;
      this.tryGetVoicesCount = 3;
      this.allvoices = [];
      
      // Fixed: 'this' scope context error, and assigned via setter safely
      // Wrap initialization safely in case voices aren't loaded yet
      this.refreshDefaultVoice();
  },

  refreshDefaultVoice() {
      this.currentVoice = this.getSpeakVoice(this.speaker);
  },

  getVoices() {
      // If cached and counter expended, stop polling window object
      if (this.tryGetVoicesCount === 0) return this.allvoices;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
          this.allvoices = voices;
          this.tryGetVoicesCount--;
      }
      return this.allvoices;
  },

  // Fixed: A setter must use a different backing property name than the setter name itself
  set currentVoice(v) {
      this._currentVoiceObj = v;
  }, 

  get currentVoice() {
      return this._currentVoiceObj;
  },

  speak(text) {
       // Continuous polling fallback to bind voice instances if init happened before browser populated list
       if ((!this.currentVoice || !this.currentVoice.voice) && this.tryGetVoicesCount > 0) {
           this.refreshDefaultVoice();
       }

       if (this.ttsUtterance && text && this.currentVoice) {
           // Prevent overlaps by canceling current speech stream immediately
           window.speechSynthesis.cancel(); 
           
           this.ttsUtterance.text = text;
           this.ttsUtterance.voice = this.currentVoice.voice; // Bound to native object
           this.ttsUtterance.pitch = this.currentVoice.pitch;
           this.ttsUtterance.rate = this.currentVoice.rate;
           window.speechSynthesis.speak(this.ttsUtterance);
       }
  }
};

// Initialize engine loop
system.init();

