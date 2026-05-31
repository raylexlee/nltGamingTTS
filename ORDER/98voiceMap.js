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
const dev = (navigator.platform === 'win32') ? 'win' : 'osx'
        const [localRes, cloudRes, actorRes] = await Promise.all([
            fetch(`addon/${gametag}PAIR${dev}.txt`),
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
        window.defaultSystemVoice = allVoices.find(v => v.name.includes('Aria') || v.name.includes('Zira') || v.name.includes('Karen')) || allVoices[0];
        
        window.nlt_isDatabaseLoaded = true;
        console.log(`✅ [nltGamingTTS] 混合資料庫建置完成！共載入 ${Object.keys(window.nltPerson).length} 個角色。`);
        return true;
    } catch (error) {
        console.error("❌ [nltGamingTTS] initNTLperson 發生錯誤:", error);
        return false;
    }
}

// ==================================================
// 📂 nltGamingTTS - voiceMap.js (性別全等二分修正版)
// ==================================================

function resolveCharacterName(fullPrefix) {
    console.log('[qming] Raw Prefix', fullPrefix)   
    window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

    let shortHand = fullPrefix.substring(0, 2).toLowerCase();


    // 2. 鋼鐵防線：利用智慧型智慧指紋比對與名單【完全相等比較】進行精準性別分流
    switch (shortHand) {
        case 'he': return "Hero";
        case 'di': return "Diana";
        case 'cr': return "Clare";
        case 'ta': return "Tasha";
        case 'ja': return "Janet";
        case 'em': return "Emily";
        case 'ha': return "Hannah";
        case 'ba': return "Bancroft";
        case 'mi': return "Michael";
        case 'na': return "Naomi";
        case 'pr': return "Pricia";
        case 'sa': return "Sam";
        case 'so': return "Sofia";
        case 'pa': return "Paul";
        case 'sm': return "Smithfield";
        case 'vl': return "Vlad";
        case 'du': return "Duncan";
        case 'co': return "Corn";
        case 'br': return "Brad";
        case 'ji': return "Jim";
        case 'jo': return "Joey";
        case 'ju': return "Judy";
        case 'ml': return "Madalyn";
        
        // 🚨 【Alia 與 Albert 的鋼鐵全等分流】
        case 'al': return "Alia";
            
        // 🚨 【Evie 與 Evil 的鋼鐵全等分流】
        case 'ev': return "Evie";
            
        // 🚨 【Madalyn 與 Maddy 的鋼鐵全等分流】
        case 'ma': return "Madalyn";
            
        // 🚨 【Kaley 與 Kat 的鋼鐵全等分流】
        case 'ka': return "Kaley";
            
        default:
            // 備用 Fallback 兜底
            return "";
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
        target.voice = allVoices.find(v => v.name.split(' ').includes(target.name)) || null;
    }
    return target; // 內含真實 voice, pitch, rate
}

// 4. 安全開機引導
function runNadiaSafeInit() {
    if (window.nlt_isDatabaseLoaded) return;
    const t = document.title.split(' ')
    const tag = (t[0] === 'Lust') ? t[1] : t.at(-1);
    initNTLperson(tag.toLowerCase());
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runNadiaSafeInit();
} else {
    window.addEventListener('DOMContentLoaded', runNadiaSafeInit);
}

