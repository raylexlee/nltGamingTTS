// ==================================================
// 📂 nltGamingTTS - TTS_Accessibility.js (音軌不侵入保護版)
// ==================================================
window.ttsUtterance = typeof SpeechSynthesisUtterance !== 'undefined' ? new SpeechSynthesisUtterance() : null;
window.systemVoiceRetryCounter = 3; 

window.raylex_pendingPrefix = "";
window.currentActiveVoice = null;
window.currentActivePitch = 1.0;
window.currentActiveRate = 1.0;

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

function executeBlindSpeak(processedText) {
    if (!window.ttsUtterance || !processedText) return;

    const allVoices = speechSynthesis.getVoices();

    if (!window.defaultSystemVoice && window.systemVoiceRetryCounter > 0) {
        window.defaultSystemVoice = allVoices.find(v => v.name.includes('Aria') || v.name.includes('Zira') || v.name.includes('Hazel')) || null;
        if (window.defaultSystemVoice) {
            console.log(`🎉 [raylex_TTS] 雲端系統女聲已成功同步: [${window.defaultSystemVoice.name}]`);
        } else {
            window.systemVoiceRetryCounter--;
        }
    }

    speechSynthesis.cancel();

    // 完美黏滯性：沿用歷史鎖定的變數，如果是選單或看信，沒觸發過更新，就會安分沿用上一個音軌
    let voice = window.currentActiveVoice || window.defaultSystemVoice;
    let pitch = window.currentActivePitch;
    let rate = window.currentActiveRate;

    if (!voice) voice = allVoices;

    window.ttsUtterance.text = processedText;
    window.ttsUtterance.voice = voice;
    window.ttsUtterance.pitch = pitch;
    window.ttsUtterance.rate = rate;

    window.ttsUtterance.onend = null;
    window.ttsUtterance.onerror = null;

    console.log(`🗣️ [raylex_TTS] 盲抓朗讀 -> 語音: ${voice ? voice.name : 'None'} | 內文: "${processedText}"`);
    speechSynthesis.speak(window.ttsUtterance);
}

// ⚔️ 變數設定攔截器：極速過濾
const _original_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    _original_Game_Variables_setValue.apply(this, arguments);

    if (variableId === 21 && typeof value === 'string' && value.match(/^([A-Z][a-z]){2,3}/)) {
        let dotIndex = value.indexOf('.');
        if (dotIndex !== -1) {
            window.raylex_pendingPrefix = value.substring(0, dotIndex);
        }
    }
};

// 🛡️ 對話框啟動攔截器：實體發聲與【空字串不重置防線】
const _original_Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _original_Window_Message_startMessage.call(this);
    
    setTimeout(() => {
        if (typeof $gameMessage !== 'undefined') {
            let rawText = $gameMessage.allText();
            if (!rawText) return;

            if (window.raylex_pendingPrefix) {
                let mainShortPrefix = window.raylex_pendingPrefix.substring(0, 2);
                
                // 獲取解碼過濾後的角色名字
                let detectedCharName = findSpeakerFromRegistry(mainShortPrefix, window.raylex_pendingPrefix);
                
                // 🎯 你的終極核心邏輯：只有當確實找到了合法的角色名字時（不等於空字串 `""`），才去改寫變數！
                // 如果是空字串，我們直接不做任何動作（Do nothing），完美留存上一個說話者的音軌指針！
                if (detectedCharName !== "" && typeof getJustInTimeVoice === 'function') {
                    const config = getJustInTimeVoice(detectedCharName);
                    if (config && config.voice) {
                        window.currentActiveVoice = config.voice;
                        window.currentActivePitch = config.pitch || 1.0;
                        window.currentActiveRate = config.rate || 1.0;
                    }
                }
                window.raylex_pendingPrefix = ""; 
            }

            const speech = cleanText(rawText);
            if (speech) {
                executeBlindSpeak(speech);
            }
        }
    }, 350); 
};

// 選單相容
const _original_Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    _original_Window_Selectable_select.call(this, index);
    if (this.active && index >= 0 && index < this.maxItems()) {
        let cmd = "";
        try {
            if (typeof this.commandName === 'function') cmd = this.commandName(index);
            else if (typeof this.item === 'function' && this.item(index)) cmd = this.item(index).name || "";
        } catch (e) {}
        const speech = cleanText(cmd);
        if (speech) executeBlindSpeak(speech);
    }
};

// 📋 純粹的在場名單足跡記錄 (絕不洗空)
const _original_Game_Interpreter_clear = Game_Interpreter.prototype.clear;
Game_Interpreter.prototype.clear = function() {
    _original_Game_Interpreter_clear.apply(this, arguments);
    if (window.raylex_currentSpeakers && window.raylex_currentSpeakers.length > 0) {
        console.log("📊 [raylex_TTS 觀測日誌] 事件循環更新。當前不滅名單為:", window.raylex_currentSpeakers);
    }
};

