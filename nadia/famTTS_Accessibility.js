(function() {
    // Default voices
    const edgeMale = 'Ryan';
    const edgeFemale = 'Emma';
    const googleMale = 'Male';
    const googleFemale = 'Google US';
    const localMale = 'David';
    const localFemale = 'Zira';
    // Default Mod 'alternate', 'male', 'female'
    let ttsMode = 'alternate'; 
    let currentGender = 'male'; 
    let fVoice, mVoice;
    let initVoice = 3;
    const ttsRate = 1.1;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance('raylexlee');
    // Auto flip gender after speech
    utterance.onend = function() {
        if (ttsMode === 'alternate') {
            currentGender = (currentGender === 'male') ? 'female' : 'male';
        }
    };

    // --- 1. Keypress monitoring (M, F, A) ---
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        
        if (key === 'm') {
            ttsMode = 'male';
            currentGender = 'male';
        } else if (key === 'f') {
            ttsMode = 'female';
            currentGender = 'female';
        } else if (key === 'a') {
            ttsMode = 'alternate';
        }
    });

    // --- 2. Speak execuation and auto flip gender ---
    const speak = function(text) {
        if (!text || text.trim().length === 0) return;
        synth.cancel();
        if (initVoice !== 0) {
            const voices = synth.getVoices();
            const mCloud = voices.find(v => v.name.includes(edgeMale) || v.name.includes(googleMale));
            mVoice = mCloud ? mCloud : voices.find(v => v.name.includes(localMale));
            const fCloud = voices.find(v => v.name.includes(edgeFemale) || v.name.includes(googleFemale));
            fVoice = fCloud ? fCloud : voices.find(v => v.name.includes(localFemale));
        initVoice--;
        }
        utterance.text = text;
//        utterance.lang = 'en-US';
        utterance.rate = ttsRate;

        // Setup voice based on setting
        if (currentGender === 'female') {
            utterance.voice = fVoice || null;
            utterance.pitch = fVoice.localService ? 1.3 : 0.9;
            utterance.rate = fVoice.localService ? 1 : ((fVoice === edgeFemale) ? 1 : 0.9);
        } else {
            utterance.voice = mVoice || null;
            utterance.pitch = 0.9;
            utterance.rate = 1;
        }


        synth.speak(utterance);
    };

    // --- 3. Filter message from trigger
    const cleanText = function(text) {
        if (!text || text.trim().length === 0) return "";
        try {
            let decoded = Window_Base.prototype.convertEscapeCharacters(text);
            return decoded
                .replace(/\x1b[a-z]+(\[[^\]]*\])?/gi, '') 
                .replace(/\x1b[a-z]+(<[^>]*>)?/gi, '')
                .replace(/\x1b[\.!\{\}><\^]/g, '')
                .replace(/\x1b/g, '') 
                .replace(/\\[a-z]\[[^\]]*\]/gi, '') 
                .replace(/\\[a-z]/gi, '') 
                .replace(/<[^>]+>/g, '') 
                .replace(/[^\u0020-\u007e\u4e00-\u9fa5\u3000-\u303f\uff01-\uff5e]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        } catch (e) { return ""; }
    };

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage.call(this);
        setTimeout(() => {
            if (typeof $gameMessage !== 'undefined') {
                const speech = cleanText($gameMessage.allText());
                if (speech) speak(speech);
            }
        }, 350);
    };

    // TTS cater for menu selection
    const _Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function(index) {
        _Window_Selectable_select.call(this, index);
        if (this.active && index >= 0 && index < this.maxItems()) {
            let cmd = "";
            try {
                if (typeof this.commandName === 'function') cmd = this.commandName(index);
                else if (typeof this.item === 'function' && this.item(index)) cmd = this.item(index).name || "";
            } catch (e) {}
            const speech = cleanText(cmd);
            if (speech) speak(speech);
        }
    };
})();

