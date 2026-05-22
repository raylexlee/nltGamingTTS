// ==================================================
// 📂 nltGamingTTS - voiceMap.js
// ==================================================
window.nltPerson = {};
window.defaultSystemVoice = null;
window.nlt_isDatabaseLoaded = false;

// 1. 同時非同步並行載入本地與雲端對應表
async function initNTLperson(gametag) {
    try {
        console.log(`🎙️ [nltGamingTTS] 正在載入 ${gametag} 的語音對應表...`);

        const [localRes, cloudRes] = await Promise.all([
            fetch(`addon/${gametag}PAIRwin.txt`),
            fetch(`addon/${gametag}PAIRedge.txt`)
        ]);

        if (!localRes.ok || !cloudRes.ok) throw new Error("讀取對應表檔案失敗！");

        const localText = await localRes.text();
        const cloudText = await cloudRes.text();

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

function resolveCharacterName(fullPrefix) {
    if (!fullPrefix || typeof fullPrefix !== 'string' || fullPrefix.length < 2) return "Unknown";
    
    window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

    // 精準字串裁切，並加上全等安全防護
    let cleanPrefixMatch = fullPrefix.match(/[A-Z][a-z][A-Z][a-z]$/);
    let targetPrefix = (cleanPrefixMatch && cleanPrefixMatch[0]) ? cleanPrefixMatch[0] : fullPrefix;
    let shortHand = targetPrefix.substring(0, 2).toLowerCase();

    const uiNoise = ['fe', 'fl', 'fr', 'hl', 'ml', 'op', 'sh', 'wo', 'am', 'vo'];
    if (uiNoise.includes(shortHand)) return "Unknown";

    // 🚨 萬無一失的專屬隔離名單約束防線
    if (window.raylex_currentSpeakers.length > 0) {
        let listMatch = window.raylex_currentSpeakers.find(name => name.toLowerCase().startsWith(shortHand));
        if (listMatch) {
            return listMatch; 
        }
    }

    // 備用 Fallback 字典
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
        case 'al': return "Alia";  
        case 'ev': return "Evie";  
        default:
            if (window.nltPerson) {
                let dynamicFind = Object.keys(window.nltPerson).find(name => name.toLowerCase().startsWith(shortHand));
                if (dynamicFind) return dynamicFind;
            }
            return "Unknown";
    }
}

// 輔助函數：專職負責將純雙字母縮寫轉回大類名字
function getBaseCharFromShort(shortHand, fullPrefix) {
    let s = shortHand.toLowerCase();
    const uiNoise = ['fe', 'fl', 'fr', 'hl', 'ml', 'op', 'sh', 'wo', 'am', 'vo'];
    if (uiNoise.includes(s)) return "Unknown";

    switch (s) {
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
        case 'al': 
            if (fullPrefix.includes("Bi") || fullPrefix.includes("Li") || fullPrefix.includes("Nu") || fullPrefix.includes("Da")) return "Alia";
            return "Albert";
        case 'ma': 
            if (fullPrefix.includes("Succ") || fullPrefix.includes("St") || fullPrefix.includes("Strip")) return "Maddy";
            return "Madalyn";
        case 'ka': 
            if (fullPrefix.toLowerCase().startsWith("kat")) return "Kat";
            return "Kaley";
        default:
            return "Unknown";
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
    initNTLperson('nadia'); // Lust Epidemic 使用時可改為 'lust'
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runNadiaSafeInit();
} else {
    window.addEventListener('DOMContentLoaded', runNadiaSafeInit);
}

