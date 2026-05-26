// ==================================================
// 📂 nltGamingTTS - voiceMap.js
// ==================================================
window.nltPerson = {};
window.nltActor = {};
window.defaultSystemVoice = null;
window.nlt_isDatabaseLoaded = false;

// 1. 同時非同步並行載入本地與雲端對應表
async function initNTLperson(gametag) {
    try {
        console.log(`🎙️ [nltGamingTTS] 正在載入 ${gametag} 的語音對應表...`);

        const [localRes, cloudRes, actorRes] = await Promise.all([
            fetch(`addon/${gametag}PAIRwin.txt`),
            fetch(`addon/${gametag}PAIRedge.txt`),
            fetch(`addon/${gametag}_shMATCHactor.txt`)
        ]);

        if (!localRes.ok || !cloudRes.ok || !actorRes.ok) throw new Error("讀取對應表檔案失敗！");

        const localText = await localRes.text();
        const cloudText = await cloudRes.text();
        const actorText = await actorRes.text();

        // 解析本地資料 (win)
        localText.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//')) return;
            const [charName, voiceName, pitch, rate] = trimmed.split(/\s+/);
            if (!charName) return;

            window.nltPerson[charName] = {
                local: { name: voiceName, voice: null, pitch: parseFloat(pitch) || 1.0, rate: parseFloat(rate) || 1.0 },
                cloud: { name: '', voice: null, pitch: 1.0, rate: 1.0 }
            };
        });

        // 解析雲端資料 (edge) 並合併
        cloudText.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//')) return;
            const [charName, voiceName, pitch, rate] = trimmed.split(/\s+/);
            if (!charName) return;

            if (!window.nltPerson[charName]) {
                window.nltPerson[charName] = {
                    local: { name: '', voice: null, pitch: 1.0, rate: 1.0 },
                    cloud: { name: '', voice: null, pitch: 1.0, rate: 1.0 }
                };
            }
            window.nltPerson[charName].cloud = {
                name: voiceName,
                voice: null,
                pitch: parseFloat(pitch) || 1.0,
                rate: parseFloat(rate) || 1.0
            };
        });
        actorText.split('\n').forEach(line => {
            const [sh, charName] = line.split(' ');
            window.nltActor[sh] = charName
        });

        // 初始化 UI 預設女聲
        const allVoices = speechSynthesis.getVoices();
        window.defaultSystemVoice = allVoices.find(v => v.name.includes('Aria') || v.name.includes('Zira') || v.name.includes('Hazel')) || allVoices[0];
        
        window.nlt_isDatabaseLoaded = true;
        console.log(`✅ [nltGamingTTS] 混合資料庫建置完成！共載入 ${Object.keys(window.nltPerson).length} 個角色。`);
        return true;
    } catch (error) {
        console.error("❌ [nltGamingTTS] initNTLperson 發生錯誤:", error);
        return false;
    }
}

// 3. Just-In-Time 語音物件精準比較綁定
function getJustInTimeVoice(charName) {
    const speaker = window.nltPerson[charName];
    // 如果找不到該角色，直接返回 null，後續會自動使用系統預設音效
    if (!speaker) return null;

    const allVoices = speechSynthesis.getVoices();
    const isBrowserMode = allVoices.some(v => !v.localService);
    const target = isBrowserMode ? speaker.cloud : speaker.local;

    // 使用全等比較防範 Sam/Samuel 誤傷
    if (!target.voice && target.name) {
        target.voice = allVoices.find(v => v.name.split(' ')[1] === target.name) || null;
    }
    return target; // 內含真實 voice, pitch, rate
}

// 4. 安全開機引導
function runNadiaSafeInit() {
    if (window.nlt_isDatabaseLoaded) return;
    initNTLperson(document.title.split(' ').at(-1).toLowerCase());
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runNadiaSafeInit();
} else {
    window.addEventListener('DOMContentLoaded', runNadiaSafeInit);
}

