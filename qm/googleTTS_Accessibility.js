(function() {
    // ... [Configuration and Variables maintained from original]
    const synth = window.speechSynthesis;
    let ttsMode = 'male', currentGender = 'male', initVoice = 3;
    let currentAuditionVoiceIndex = 0, isUserSkippingVoice = false;

    // --- Keypress monitoring (Added 'v' for Audition) ---
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        if (key === 'm' || key === 'f') { ttsMode = key === 'm' ? 'male' : 'female'; currentGender = ttsMode; }
        else if (key === 'a') {
            if (ttsMode !== 'audition') ttsMode = 'alternate';
            else { isUserSkippingVoice = true; synth.cancel(); }
        } else if (key === 'v') { ttsMode = 'audition'; console.log("🎙️ Audition Mode Activated! Press 'A' to skip."); }
    });

    // --- Promisified Awaitable Speech Function (Fixes #1) ---
    const speakAsync = function(text, voiceOverride = null) {
        return new Promise((resolve) => {
            if (!text || text.trim().length === 0) return resolve();
            synth.cancel();
            const activeUtterance = new SpeechSynthesisUtterance(text);
            window.activeSpeechObject = activeUtterance; // Prevent GC
            activeUtterance.onend = () => resolve();
            activeUtterance.onerror = () => resolve();
            // ... [Voice mapping logic, including audition override]
            activeUtterance.voice = voiceOverride || (currentGender === 'female' ? fVoice : mVoice);
            synth.speak(activeUtterance);
        });
    };

    // --- Unified Dialogue Pipeline Hooks (Fixes #2) ---
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage.call(this);
        setTimeout(async () => {
            const speech = cleanText($gameMessage.allText());
            if (!speech) return;
            if (ttsMode !== 'audition') {
                await speakAsync(speech);
                if (ttsMode === 'alternate') currentGender = (currentGender === 'male') ? 'female' : 'male';
            } else {
                // AUDITION RUNTIME LOOP
                const availableVoices = synth.getVoices();
                for (let voice of availableVoices) {
                    if (ttsMode !== 'audition') break;
                    isUserSkippingVoice = false;
                    await speakAsync(`Testing: ${voice.name}. Text: ${speech}`, voice);
                    if (!isUserSkippingVoice) await new Promise(r => setTimeout(r, 400));
                }
            }
        }, 350);
    };

    // ... [Init, JIT, and Event Listeners remain largely the same]
})();

