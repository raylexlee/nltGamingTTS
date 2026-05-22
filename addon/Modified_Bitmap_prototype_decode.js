// ==================================================
// 📂 nltGamingTTS - Modified_Bitmap_prototype_decode.js
window.raylex_currentSpeakers = window.raylex_currentSpeakers || []; 

const _original_Bitmap_decode_tracker = Bitmap.prototype.decode;
Bitmap.prototype.decode = function() {
    window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];
    
    switch(this._loadingState) {
        case 'requestCompleted': 
        case 'decryptCompleted':
            this._loadingState = 'loaded';
            
            if (this._url in ImageManager.caching) {
                if (this._url.includes('Body') || this._url.includes('Face') || this._url.includes('PEOPLE')) {
                    let nameMatch = this._url.match(/CHR-([A-Za-z0-9_-]+)-(Body|Face)/) || this._url.match(/PEOPLE-([A-Za-z0-9_-]+)/);
                    if (nameMatch && nameMatch[1]) {
                        let detectedChar = nameMatch[1];
                        
                        if (window.nltPerson) {
                            let officialName = Object.keys(window.nltPerson).find(name => detectedChar.toLowerCase().startsWith(name.toLowerCase()));
                            if (officialName) detectedChar = officialName;
                        }

                        if (!window.raylex_currentSpeakers.includes(detectedChar)) {
                            window.raylex_currentSpeakers.push(detectedChar);
                            console.log(`📌 [raylex_TTS] 點名成功: [${detectedChar}] | 當前名單:`, window.raylex_currentSpeakers);
                        }
                    }
                }
            }
            break;
    }
    return _original_Bitmap_decode_tracker.apply(this, arguments);
};
// ==================================================
