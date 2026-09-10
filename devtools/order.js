(function() {
const parsedData = 
{"nltPerson":{"Alia":{"local":{"name":"Zira","voice":null,"pitch":1,"rate":0.95},"cloud":{"name":"Aria","voice":null,"pitch":1,"rate":0.95},"gender":"Female"},"Andrea":{"local":{"name":"David","voice":null,"pitch":1,"rate":0.95},"cloud":{"name":"Libby","voice":null,"pitch":1,"rate":0.95},"gender":"Female"},"Arianna":{"local":{"name":"Zira","voice":null,"pitch":1.05,"rate":0.95},"cloud":{"name":"Ava","voice":null,"pitch":1,"rate":1},"gender":"Female"},"Bancroft":{"local":{"name":"Mark","voice":null,"pitch":1,"rate":1},"cloud":{"name":"Brian","voice":null,"pitch":1,"rate":1},"gender":"Male"},"Bobby":{"local":{"name":"David","voice":null,"pitch":0.95,"rate":0.95},"cloud":{"name":"Connor","voice":null,"pitch":1,"rate":1.05},"gender":"Male"},"Brian":{"local":{"name":"Mark","voice":null,"pitch":0.95,"rate":1},"cloud":{"name":"Brian","voice":null,"pitch":1,"rate":1},"gender":"Male"},"Carol":{"local":{"name":"Zira","voice":null,"pitch":1.1,"rate":0.95},"cloud":{"name":"Clara","voice":null,"pitch":1,"rate":1.05},"gender":"Female"},"Chloe":{"local":{"name":"Zira","voice":null,"pitch":1.15,"rate":0.95},"cloud":{"name":"Emily","voice":null,"pitch":1,"rate":0.95},"gender":"Female"},"Daemalius":{"local":{"name":"David","voice":null,"pitch":0.6,"rate":0.85},"cloud":{"name":"Eric","voice":null,"pitch":0.6,"rate":0.85},"gender":"Male"},"David":{"local":{"name":"David","voice":null,"pitch":1,"rate":1},"cloud":{"name":"Guy","voice":null,"pitch":1,"rate":1},"gender":"Male"},"Demon":{"local":{"name":"Zira","voice":null,"pitch":0.6,"rate":0.85},"cloud":{"name":"Emma","voice":null,"pitch":0.6,"rate":0.85},"gender":"Female"},"Diana":{"local":{"name":"Zira","voice":null,"pitch":1.25,"rate":0.95},"cloud":{"name":"Jenny","voice":null,"pitch":1,"rate":1.05},"gender":"Female"},"Duncan":{"local":{"name":"Mark","voice":null,"pitch":0.9,"rate":1},"cloud":{"name":"Liam","voice":null,"pitch":1,"rate":1.05},"gender":"Male"},"Ella":{"local":{"name":"Zira","voice":null,"pitch":1.3,"rate":0.95},"cloud":{"name":"Libby","voice":null,"pitch":1,"rate":0.95},"gender":"Female"},"Erica":{"local":{"name":"Zira","voice":null,"pitch":1.35,"rate":0.95},"cloud":{"name":"Libby","voice":null,"pitch":1,"rate":1},"gender":"Female"},"Evie":{"local":{"name":"Zira","voice":null,"pitch":1.4,"rate":0.95},"cloud":{"name":"Michelle","voice":null,"pitch":1,"rate":1.05},"gender":"Female"},"Goon":{"local":{"name":"David","voice":null,"pitch":0.85,"rate":0.95},"cloud":{"name":"Roger","voice":null,"pitch":1,"rate":0.95},"gender":"Male"},"Hannah":{"local":{"name":"Zira","voice":null,"pitch":1.45,"rate":0.95},"cloud":{"name":"Natasha","voice":null,"pitch":1,"rate":1},"gender":"Female"},"Heather":{"local":{"name":"Zira","voice":null,"pitch":1.5,"rate":0.95},"cloud":{"name":"Yan","voice":null,"pitch":1,"rate":1},"gender":"Female"},"Henchman":{"local":{"name":"Mark","voice":null,"pitch":0.85,"rate":1},"cloud":{"name":"Ryan","voice":null,"pitch":1,"rate":1},"gender":"Male"},"Henchwoman":{"local":{"name":"Zira","voice":null,"pitch":1.55,"rate":0.95},"cloud":{"name":"Aria","voice":null,"pitch":1.05,"rate":0.95},"gender":"Female"},"Henry":{"local":{"name":"David","voice":null,"pitch":0.8,"rate":0.95},"cloud":{"name":"William","voice":null,"pitch":1,"rate":1.05},"gender":"Male"},"H":{"local":{"name":"Mark","voice":null,"pitch":0.8,"rate":1},"cloud":{"name":"Thomas","voice":null,"pitch":1,"rate":0.95},"gender":"Male"},"Hood":{"local":{"name":"David","voice":null,"pitch":0.75,"rate":0.95},"cloud":{"name":"William","voice":null,"pitch":1,"rate":1},"gender":"Male"},"Jon":{"local":{"name":"Mark","voice":null,"pitch":0.75,"rate":1},"cloud":{"name":"Andrew","voice":null,"pitch":0.95,"rate":0.95},"gender":"Male"},"Judge":{"local":{"name":"Zira","voice":null,"pitch":1.6,"rate":0.95},"cloud":{"name":"Roger","voice":null,"pitch":1.05,"rate":1},"gender":"Male"},"Judy":{"local":{"name":"David","voice":null,"pitch":0.7,"rate":0.95},"cloud":{"name":"Sonia","voice":null,"pitch":0.95,"rate":1},"gender":"Female"},"Kimberly":{"local":{"name":"Zira","voice":null,"pitch":1.65,"rate":0.95},"cloud":{"name":"Molly","voice":null,"pitch":1.05,"rate":1.05},"gender":"Female"},"Larry":{"local":{"name":"Mark","voice":null,"pitch":0.7,"rate":1},"cloud":{"name":"Connor","voice":null,"pitch":0.95,"rate":1.05},"gender":"Male"},"Lawyer":{"local":{"name":"David","voice":null,"pitch":0.65,"rate":0.95},"cloud":{"name":"Eric","voice":null,"pitch":0.95,"rate":0.95},"gender":"Male"},"Lilith":{"local":{"name":"Zira","voice":null,"pitch":1.7,"rate":0.95},"cloud":{"name":"Emily","voice":null,"pitch":1.05,"rate":0.95},"gender":"Female"},"Lillian":{"local":{"name":"Zira","voice":null,"pitch":1.75,"rate":0.95},"cloud":{"name":"Jenny","voice":null,"pitch":1.05,"rate":1},"gender":"Female"},"Lily":{"local":{"name":"Zira","voice":null,"pitch":1.8,"rate":0.95},"cloud":{"name":"Jenny","voice":null,"pitch":1.05,"rate":1.05},"gender":"Female"},"Madalyn":{"local":{"name":"Zira","voice":null,"pitch":1.85,"rate":0.95},"cloud":{"name":"Libby","voice":null,"pitch":1.05,"rate":0.95},"gender":"Female"},"Melissa":{"local":{"name":"Zira","voice":null,"pitch":1.9,"rate":0.95},"cloud":{"name":"Emma","voice":null,"pitch":1.05,"rate":1},"gender":"Female"},"Minion":{"local":{"name":"Mark","voice":null,"pitch":0.65,"rate":1},"cloud":{"name":"Guy","voice":null,"pitch":0.95,"rate":1},"gender":"Male"},"M":{"local":{"name":"David","voice":null,"pitch":0.6,"rate":0.95},"cloud":{"name":"Liam","voice":null,"pitch":0.95,"rate":1.05},"gender":"Male"},"Nellie":{"local":{"name":"Zira","voice":null,"pitch":1.95,"rate":0.95},"cloud":{"name":"Michelle","voice":null,"pitch":1.05,"rate":1.05},"gender":"Female"},"Officer":{"local":{"name":"Mark","voice":null,"pitch":0.6,"rate":1},"cloud":{"name":"Roger","voice":null,"pitch":0.95,"rate":0.95},"gender":"Male"},"Paul":{"local":{"name":"David","voice":null,"pitch":0.55,"rate":0.95},"cloud":{"name":"Ryan","voice":null,"pitch":0.95,"rate":1},"gender":"Male"},"Producer":{"local":{"name":"Mark","voice":null,"pitch":0.55,"rate":1},"cloud":{"name":"William","voice":null,"pitch":0.95,"rate":1.05},"gender":"Male"},"Security":{"local":{"name":"David","voice":null,"pitch":0.5,"rate":0.95},"cloud":{"name":"Thomas","voice":null,"pitch":0.95,"rate":0.95},"gender":"Male"},"Simon":{"local":{"name":"Mark","voice":null,"pitch":0.5,"rate":1},"cloud":{"name":"William","voice":null,"pitch":0.95,"rate":1},"gender":"Male"},"Smithfield":{"local":{"name":"David","voice":null,"pitch":0.45,"rate":0.95},"cloud":{"name":"Andrew","voice":null,"pitch":0.9,"rate":0.95},"gender":"Male"},"Tasha":{"local":{"name":"Zira","voice":null,"pitch":2,"rate":0.95},"cloud":{"name":"Natasha","voice":null,"pitch":1.05,"rate":0.95},"gender":"Female"},"William":{"local":{"name":"Mark","voice":null,"pitch":0.45,"rate":1},"cloud":{"name":"William","voice":null,"pitch":1,"rate":1},"gender":"Male"}},"nltActor":{"Al":"Alia","Ad":"Andrea","Ar":"Arianna","Ba":"Bancroft","Be":"Bobby","Bo":"Bobby","Br":"Brian","Ca":"Carol","Ch":"Chloe","Dm":"Daemalius","Di":"Diana","De":"Demon","Du":"Duncan","Ec":"Evie","El":"Ella","Er":"Erica","Ev":"Evie","Fl":"Simon","Fr":"Demon","Ha":"Hannah","He":"Heather","Hn":"Hannah","Ho":"Hood","Hr":"Henry","Hu":"Henchwoman","Jo":"Jon","Jd":"Judge","Ju":"Judy","Ki":"Kimberly","La":"Larry","Ll":"Lilith","Li":"Lillian","Lw":"Lawyer","Ma":"Madalyn","Ml":"Madalyn","Mc":"M","Me":"Melissa","Ne":"Nellie","Oa":"Officer","Ob":"Security","Pl":"Paul","Sa":"Smithfield","Sm":"Simon","Ta":"Tasha","Se":"Security","Wo":"William"}}
window.nltPerson = {};
window.nltActor = {};
window.nltPerson = parsedData.nltPerson || {};
window.nltActor = parsedData.nltActor || {};
let debugLog = function(message) {
        if (typeof message === 'object') {
            console.log('[qming] Debug Object:', message);
        } else {
            console.log('[qming] ' + message);
        }
};


    window.raylex_regex = /^[A-Z][a-z][A-Z][a-z]/ ; 
    if (document.title && (document.title.slice(0,4) === 'Lust')) { 
        window.raylex_regex = /^[A-Z][a-z],[a-z][a-z],[a-z]/
    } 
    let allVoices, isBrowserMode; 
    const edgeMale = 'Ryan';
    const edgeFemale = 'Emma';
    const googleMale = 'Male';
    const googleFemale = 'Google US';
    const localMale = 'David';
    const localFemale = 'Zira';
    // Default Mod 'alternate', 'male', 'female'
    let ttsMode = 'male'; 
    let currentGender = 'male'; 
    let fVoice, mVoice;
    let currentSpeaker = '';
    let initVoice = 3;
    const ttsVoice = {};
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
          debugLog(`Now we have ${allVoices.length} voices`);
        }
    });

    // --- 2. Speak execuation and auto flip gender ---
    const speak = function(text) {

        if (!text || text.trim().length === 0) return;
        synth.cancel();
        if (initVoice !== 0) {
            allVoices = synth.getVoices();
            isBrowserMode = allVoices.some(v => !v.localService);
            const mCloud = allVoices.find(v => v.name.includes(edgeMale) || v.name.includes(googleMale));
            mVoice = mCloud ? mCloud : allVoices.find(v => v.name.includes(localMale));
            const fCloud = allVoices.find(v => v.name.includes(edgeFemale) || v.name.includes(googleFemale));
            fVoice = fCloud ? fCloud : allVoices.find(v => v.name.includes(localFemale));
        initVoice--;
        }
        utterance.text = text;
        utterance.rate = ttsRate;
if (currentSpeaker) {
    const objPerson = window.nltPerson[currentSpeaker];
    const objVoice = isBrowserMode ? objPerson.cloud : objPerson.local;
    currentGender = objPerson.gender.toLowerCase();
    const name = objVoice.name;
    if (name in ttsVoice) {
       objVoice.voice = ttsVoice[name]
    } else {
        objVoice.voice = allVoices.find(v => v.name.includes(name));
        if (objVoice.voice) ttsVoice[name] = objVoice.voice;     
    }
    const sVoice = objVoice.voice;
    if (objVoice.voice) { 
        utterance.voice = objVoice.voice;
        utterance.pitch = objVoice.pitch;
        utterance.rate = objVoice.rate;
     } else {
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
     } 
   currentSpeaker = '';
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
// ⚙️ 1. 變數設定攔截器 (只更新音軌指針，不發聲)
// ==================================================
const _original_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    _original_Game_Variables_setValue.apply(this, arguments);
    if ((variableId === 21)  && typeof value === 'string') { 
       if (value.match(window.raylex_regex)) {
        let charName = window.nltActor[value.slice(0,2)];
 debugLog(`setVariable 21 "${value}" ${charName}`);
        if (charName) {
           currentSpeaker = charName; 
        }
       } else {
 debugLog(`*** 21 "${value}"`);
         }
    }
};
})();

