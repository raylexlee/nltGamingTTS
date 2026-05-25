// ==================================================
// 📂 nltGamingTTS - Modified_Bitmap_prototype_decode.js (自我重寫突襲版)
// ==================================================
window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

// 1. 備份最原始的原廠解碼原型
const _original_Bitmap_decode_root = Bitmap.prototype.decode;

Bitmap.prototype.decode = function() {
    // 🚨 【全宇宙第一次呼叫觸發】：當原廠引擎第一次踩進這個函數的這一秒...
    console.log("⚙️ [raylex_TTS] 偵測到原廠第一次解碼呼叫！正在記憶體核心發動『就地引爆』終極重寫...");

    // 2. 在記憶體核心內部，立刻將自己永久替換成你完美的異步狀態機版本！
    Bitmap.prototype.decode = function() {
        window.raylex_currentSpeakers = window.raylex_currentSpeakers || [];

        switch(this._loadingState) {
            case 'requestCompleted': 
            case 'decryptCompleted':
                this._loadingState = 'loaded';
                
                if (this._url in ImageManager.caching) {
                    // 核心點名過濾：只鎖定基礎立繪 Body-1.png
                    if (this._url.includes('Body-1.png')) {
                        // 你的極速單字正規表達式
                        let nameMatch = this._url.match(/CHR-([A-Z][a-z]*)/);
                        
                        if (nameMatch && nameMatch[1]) {
                            let detectedChar = nameMatch[1]; // 完美擷取單字

                            if (window.nltPerson) {
                                let officialName = Object.keys(window.nltPerson).find(name => detectedChar.toLowerCase().startsWith(name.toLowerCase()));
                                if (officialName) detectedChar = officialName;
                            }

                            // 塞入你冠名的 raylex_ 專屬隔離防空洞，此時 100% 絕對能成功寫入！
                            if (!window.raylex_currentSpeakers.includes(detectedChar)) {
                                window.raylex_currentSpeakers.push(detectedChar);
                                console.log(`📌 [raylex_TTS 核心點名成功] 角色在場: [${detectedChar}] | 當前名單:`, window.raylex_currentSpeakers);
                            }
                        }
                    }
                    
                    delete ImageManager.caching[this._url];
                }

                if (!this.__canvas) this._createBaseTexture(this._image);
                this._setDirty();
                this._callLoadListeners();
                break;

            case 'requesting': 
            case 'decrypting':
                this._decodeAfterRequest = true;
                if (!this._loader) {
                    this._loader = ResourceHandler.createLoader(this._url, this._requestImage.bind(this, this._url), this._onError.bind(this));
                    this._image.removeEventListener('error', this._errorListener);
                    this._image.addEventListener('error', this._errorListener = this._loader);
                }
                break;

            case 'pending': 
            case 'purged': 
            case 'error':
                this._decodeAfterRequest = true;
                this._requestImage(this._url);
                break;
        }
    };

    console.log("✅ [raylex_TTS] 核心狀態機已成功就地鎖定，全面接管後續所有解碼生命週期！");

    // 3. 完美的第一次放行：讓這第一次呼叫順暢走完原廠流程，保證不破壞原廠的實體化
    return _original_Bitmap_decode_root.apply(this, arguments);
};

console.log("🚀 [raylex_TTS] Modified_Bitmap_prototype_decode.js 突襲鉤子已就位，等待原廠第一次呼叫...");

