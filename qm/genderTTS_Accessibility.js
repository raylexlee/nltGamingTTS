(function() {
// ==========================================================
// ΘÆêσ»╣ Console µ╝öτñ║τëêτÜäΣ╕ôσ▒₧τë⌐τÉåµùÑσ┐ùΦ░âΦ»òµ¿íσ¥ù (100% Φºúσå│ null µèÑΘöÖ)
// ==========================================================
let debugLog = function(message) { }; 

const isConsoleMode = typeof require !== 'undefined' && typeof process !== 'undefined';

if (isConsoleMode) {
    try {
        const fs = require('fs');
        const path = require('path');

        const baseLogDir = process.cwd();
        const logPath = path.join(baseLogDir, 'tts_debug_log.txt');

        fs.writeFileSync(logPath, '--- [qming] TTS Addon Log Started ---\n', 'utf8');

        debugLog = function(message) {
            try {
                const timestamp = new Date().toISOString();
                const cleanMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
                
                fs.appendFileSync(logPath, `[${timestamp}] ${cleanMessage}\n`, 'utf8');
            } catch (writeErr) {
            }
        };


    } catch (bootErr) {
        console.error('µùÑσ┐ùµ¿íσ¥ùσ╝òσ»╝σñ▒Φ┤Ñ: ', bootErr);
    }
} else {
    debugLog = function(message) {
        if (typeof message === 'object') {
            console.log('[qming] Debug Object:', message);
        } else {
            console.log('[qming] ' + message);
        }
    };
}


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
    currentGener = objPerson.gender.toLowerCase();
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
window.nltPerson = {};
window.nltActor = {};
window.nlt_isDatabaseLoaded = false;
function initNTLperson(gametag) {
try {
//const dev = (navigator.platform === 'win32') ? 'win' : 'osx'
const dev = 'win'
const JSON_FILE_NAME = `${gametag}VOICE${dev}.json`;
    const isConsoleMode = typeof require !== 'undefined' && typeof process !== 'undefined';

    if (isConsoleMode) {
        try {
            const fs = require('fs');
            const path = require('path');
            
            const baseDir = process.cwd();
            
            let jsonPath = path.join(baseDir, 'addon', JSON_FILE_NAME);
            if (!fs.existsSync(jsonPath)) {
                jsonPath = path.join(baseDir, 'www', 'addon', JSON_FILE_NAME);
            }

            if (fs.existsSync(jsonPath)) {
                const rawData = fs.readFileSync(jsonPath, 'utf8');
                const parsedData = JSON.parse(rawData);
                window.nltPerson = parsedData.nltPerson || {};
                window.nltActor = parsedData.nltActor || {};
          //      debugLog(`[qming] Console Load OK: ${JSON_FILE_NAME}`);
       // debugLog(`[nltGamingTTS]  ${Object.keys(window.nltActor).length} records`);

            } else {
                console.error(`[qming] File Missing Error: Looked in ${jsonPath}`);
            }
        } catch (err) {
            console.error('[qming] Console Critical Loading Interrupted:', err);
        }
    } else {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "addon/" + JSON_FILE_NAME, false); 
            xhr.send(null);

            if (xhr.status === 200) {
                const parsedData = JSON.parse(xhr.responseText);
                window.nltPerson = parsedData.nltPerson || {};
                window.nltActor = parsedData.nltActor || {};
                debugLog(`[qming] Browser Load OK: ${JSON_FILE_NAME}`);
            } else {
                console.error(`[qming] Browser XHR Error Status: ${xhr.status}`);
            }
        } catch (err) {
            console.error('[qming] Browser Critical Loading Interrupted:', err);
        }
    }

        
        window.nlt_isDatabaseLoaded = true;
        return true;
    } catch (error) {
        console.error("Γ¥î [nltGamingTTS] initNTLperson τÖ╝τöƒΘî»Φ¬ñ:", error);
        return false;
    }
}



function getJustInTimeVoice(charName) {
    const speaker = window.nltPerson[charName];
    if (!speaker) return null;
    currentGender = speaker.gender.toLowerCase();
    window.allVoices = window.speechSynthesis.getVoices();
    if (window.allVoices.length === 0) return null;
    const isBrowserMode = window.allVoices.some(v => !v.localService);
    const target = isBrowserMode ? speaker.cloud : speaker.local;

    if (!target.voice && target.name) {
        target.voice = allVoices.find(v => v.name.split(' ').includes(target.name)) || null;
    }
    return target; // include voice, pitch, rate
}

function runNadiaSafeInit() {
    if (window.nlt_isDatabaseLoaded) return;
    const t = document.title.split(' ')
    const Tag = {
        "Lust" : "epidemic",
        "Treasure" : "nadia",
        "The" : "order",
        "Symphony" : "serpent"
    };
    const tag = t ?  t[0] : "Symphony";
    initNTLperson(Tag[tag]);
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runNadiaSafeInit();
} else {
    window.addEventListener('DOMContentLoaded', runNadiaSafeInit);
}

// ⚙️ 1. 變數設定攔截器 (只更新音軌指針，不發聲)
// ==================================================
const _original_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    _original_Game_Variables_setValue.apply(this, arguments);
    if ((variableId === 21)  && typeof value === 'string' && value.match(window.raylex_regex)) {
        let charName = window.nltActor[value.slice(0,2)];
 debugLog(`setVariable 21 "${value}" ${charName}`);
        if (charName) {
           currentSpeaker = charName; 
        }
    }
};
})();

