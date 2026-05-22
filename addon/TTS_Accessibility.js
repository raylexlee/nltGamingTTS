// ==================================================
// 📂 nltGamingTTS - TTS_Accessibility.js (選單加強與全域重用版)
// ==================================================

window.ttsUtterance = typeof SpeechSynthesisUtterance !== 'undefined' ? new SpeechSynthesisUtterance() : null;
window.systemVoiceRetryCounter = 3; 

window.currentActiveVoice = null;
window.currentActivePitch = 1.0;
window.currentActiveRate = 1.0;

// 萬能轉義字元與 NLT 雜質清洗機
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
    } catch (e) { 
        return ""; 
    }
};

// 集中發聲管線 (場上唯一的實體發聲主攻手)
function executeBlindSpeak(processedText) {
    if (!window.ttsUtterance || !processedText) return;

    const allVoices = speechSynthesis.getVoices();

    // 3次計數器動態捕獲雲端預設 UI 女聲
    if (!window.defaultSystemVoice && window.systemVoiceRetryCounter > 0) {
        window.defaultSystemVoice = allVoices.find(v => v.name.includes('Aria') || v.name.includes('Zira') || v.name.includes('Hazel')) || null;
        if (window.defaultSystemVoice) {
            console.log(`🎉 [nltGamingTTS 成功] 雲端系統女聲已成功解鎖並同步: [${window.defaultSystemVoice.name}]`);
        } else {
            window.systemVoiceRetryCounter--;
        }
    }

    speechSynthesis.cancel();

    // 高度黏滯性音軌控制
    let voice = window.currentActiveVoice || window.defaultSystemVoice;
    let pitch = window.currentActivePitch;
    let rate = window.currentActiveRate;

    if (!voice) voice = allVoices[0];

    window.ttsUtterance.text = processedText;
    window.ttsUtterance.voice = voice;
    window.ttsUtterance.pitch = pitch;
    window.ttsUtterance.rate = rate;

    // 遵循你的決策：移除 onend 裡的重置逻辑，優先確保黏滯性與重複對話正確
    window.ttsUtterance.onend = null;
    window.ttsUtterance.onerror = null;

    console.log(`🗣️ [nltGamingTTS] 黏滯發聲 -> 語音: ${voice ? voice.name : 'None'} | 內文: "${processedText}"`);
    
    speechSynthesis.speak(window.ttsUtterance);
}

// ==================================================
// ⚙️ 1. 變數設定攔截器 (只更新音軌指針，不發聲)
// ==================================================
const _original_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    _original_Game_Variables_setValue.apply(this, arguments);

    if (typeof value === 'string' && value.match(/^([A-Z][a-z]){2,3}\./)) {
        let dotIndex = value.indexOf('.');
        let prefix = value.substring(0, dotIndex);

        let charName = typeof resolveCharacterName === 'function' ? resolveCharacterName(prefix) : "Unknown";
        
        if (charName !== "Unknown" && typeof getJustInTimeVoice === 'function') {
            const config = getJustInTimeVoice(charName);
            if (config && config.voice) {
                window.currentActiveVoice = config.voice;
                window.currentActivePitch = config.pitch || 1.0;
                window.currentActiveRate = config.rate || 1.0;
                console.log(`🎯 [音軌鎖定] 角色: ${charName} -> 語音通道: ${config.voice.name}`);
            }
        }
    }
};

// ==================================================
// 🛡️ 2. 對話框啟動攔截器 (唯一對話發聲核心)
// ==================================================
const _original_Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _original_Window_Message_startMessage.call(this);
    
    setTimeout(() => {
        if (typeof $gameMessage !== 'undefined') {
            let rawText = $gameMessage.allText();
            if (!rawText) return;

            const speech = cleanText(rawText);
            if (speech) {
                executeBlindSpeak(speech);
            }
        }
    }, 350); 
};

// ==================================================
// 🎛️ 3. 選單操控攔截器 (接管所有 UI 選項滑動發聲)
// ==================================================
const _original_Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    _original_Window_Selectable_select.call(this, index);
    
    // 當選單處於啟動狀態，且索引合法時
    if (this.active && index >= 0 && index < this.maxItems()) {
        let cmd = "";
        try {
            // 回歸 fam 核心抓取邏輯
            if (typeof this.commandName === 'function') {
                cmd = this.commandName(index);
            } else if (typeof this.item === 'function' && this.item(index)) {
                cmd = this.item(index).name || "";
            }
        } catch (e) {
            console.error("❌ [選單抓取錯誤] :", e);
        }
        
        const speech = cleanText(cmd);
        if (speech) {
            // 選單移動時，使用全域發聲，它會極其順暢地把當前高亮選項唸出來
            executeBlindSpeak(speech);
        }
    }
};

// ==================================================
// 🛡️ 唯一安全換場防線：記錄上一次的地圖 ID
// ==================================================
window.raylex_lastMapId = 0;

const _original_Window_Message_startMessage_mapCheck = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _original_Window_Message_startMessage_mapCheck.apply(this, arguments);

    // 檢查全域地圖物件是否已經就緒
    if (typeof $gameMap !== 'undefined' && typeof $gameMap.mapId === 'function') {
        let currentMapId = $gameMap.mapId();

        // 🎯 鋼鐵防線：只有當玩家「真正換地圖切換場景」時，才允許清空點名冊！
        // 在同一個地圖的連續劇情、選單或翻頁期間，名單只加不減，徹底打破惡魔循環！
        if (currentMapId !== window.raylex_lastMapId) {
            console.log(`🧹 [raylex_TTS] 偵測到玩家切換新地圖 (Map ID: ${window.raylex_lastMapId} -> ${currentMapId})，安全清空在場角色名單。`);
            window.raylex_currentSpeakers = [];
            window.raylex_lastMapId = currentMapId; // 更新地圖 ID 指標
        }
    }
};

console.log("🔥 [nltGamingTTS] 選單發聲模組成功復活！Alia 與 Evie 女主權重已完美修正！");

