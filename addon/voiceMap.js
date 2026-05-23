// ==================================================
// 📂 nltGamingTTS - voiceMap.js (女主第一優先黏滯版)
// ==================================================
window.nltPerson = {};
window.defaultSystemVoice = null;
window.nlt_isDatabaseLoaded = false;
window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

async function initNTLperson(gametag) {
    try {
        console.log(`🎙️ [raylex_TTS] 正在非同步載入 [${gametag}] 的語音對應表...`);
        const [localRes, cloudRes] = await Promise.all([
            fetch(`addon/${gametag}PAIRwin.txt`),
            fetch(`addon/${gametag}PAIRedge.txt`)
        ]);
        if (!localRes.ok || !cloudRes.ok) throw new Error("讀取對應表檔案失敗！");

        const localText = await localRes.text();
        const cloudText = await cloudRes.text();

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
            window.nltPerson[charName].cloud = { name: voiceName, voice: null, pitch: parseFloat(pitch) || 1.0, rate: parseFloat(rate) || 1.0 };
        });

        const allVoices = speechSynthesis.getVoices();
        window.defaultSystemVoice = allVoices.find(v => v.name.includes('Aria') || v.name.includes('Zira') || v.name.includes('Hazel')) || allVoices;
        window.nlt_isDatabaseLoaded = true;
        console.log(`✅ [raylex_TTS] 混合資料庫建置完成！共載入 ${Object.keys(window.nltPerson).length} 個角色。`);
        return true;
    } catch (error) {
        console.error("❌ [raylex_TTS] initNTLperson 發生錯誤:", error);
        return false;
    }
}

// 核心大招：多維名單約束過濾器 
function findSpeakerFromRegistry(prefix, fullPrefix) {
    if (!prefix || prefix.length < 2) return "";
    window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

    // 執行你的雙重 Filter 篩選演算法 (精準捕獲在場名單)
    const matchedNames = window.raylex_currentSpeakers
        .filter(v => v === prefix)
        .filter(v => v.includes(prefix.substring(1)));

    if (matchedNames.length > 0) {
        return matchedNames; 
    }
    
    // 💡 你的天才級策略：名單未就緒前，退回執行你精心安排、女主絕對優先的靜態字典！
    const getBaseCharFromShort = nadiaResolveCharacterName; 
    return getBaseCharFromShort(fullPrefix); 
}

// 👑 【你的完全偏好版字典】：去粗取精，犧牲邊緣男配，無條件捍衛三大女主音軌！
function nadiaResolveCharacterName(fullPrefix) {
    if (!fullPrefix || typeof fullPrefix !== 'string' || fullPrefix.length < 2) return "";
    
    let shortHand = fullPrefix.substring(0, 2).toLowerCase();

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
        
        // 🚨 【Alia 與 Albert 權重逆轉】Albert 遭無情犧牲，完美保全 Alia 少女音！
        case 'al': return "Alia";
            
        // 🚨 【Evie 與 Evil 權重逆轉】Evil 遭無情犧牲，完美保全 Evie 少女音！
        case 'ev': return "Evie";
            
        // 🚨 【Madalyn 與 Maddy 權重逆轉】Maddy 遭無情犧牲，完美保全 Madalyn 女聲！
        case 'ma': return "Madalyn";
            
        // 🚨 【Kaley 與 Kat 權重逆轉】Kat 遭無情犧牲，完美保全 Kaley 少女音！
        case 'ka': return "Kaley";
            
        default:
            return ""; // 找不到一律返回空字串，將音軌黏滯權留給上一句
    }
}

function getJustInTimeVoice(charName) {
    const speaker = window.nltPerson[charName];
    if (!speaker) return null;
    const allVoices = speechSynthesis.getVoices();
    const isBrowserMode = allVoices.some(v => !v.localService);
    const target = isBrowserMode ? speaker.cloud : speaker.local;
    if (!target.voice && target.name) {
        target.voice = allVoices.find(v => v.name.split(' ') === target.name) || null;
    }
    return target;
}

function runNadiaSafeInit() {
    if (window.nlt_isDatabaseLoaded) return;
    const gametag = document.title.split(' ').at(-1).toLowerCase();
    initNTLperson(gametag); 
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runNadiaSafeInit();
} else {
    window.addEventListener('DOMContentLoaded', runNadiaSafeInit);
}

