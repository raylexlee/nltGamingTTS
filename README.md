# nltGamingTTS

An open-source, non-invasive Text-to-Speech (TTS) accessibility mod layer for visual novels and role-playing games built on the RPG Maker MV/MZ engines—specifically optimized for NLT Media titles (including *Lust Epidemic*, *Treasure of Nadia*, and *The Genesis Order*).

This project aims to completely transform and enhance the gaming experience for low-vision, blind, or immersion-focused players by injecting context-aware, character-distinct voice synthesis dynamically into the browser runtime—**without modifying a single line of the original game source code.**

---

## ⚠️ Disclaimer & Content Advisory

* **Strictly for Legitimate Owners:** This repository provides **addon runtime scripts only**. It does not contain, host, distribute, or pirate any game files, images, code, or assets belonging to NLT Media or any other developer. It is intended solely for players who already legally own desktop copies of these games.
* **Adult Content Warning:** Some games targeted by this mod contain **explicit adult content (18+)**. This open-source accessibility framework is strictly intended for mature, legitimate gamers who have already chosen to play these titles and require or desire text-to-speech modifications.
* **No Endorsement or Promotion:** The authors of this project do not promote, market, or advertise adult games. The project exists entirely as an independent technical solution focused purely on software accessibility and programmatic modding boundaries.
* **No Association:** This project is completely unofficial. It has **no association, affiliation, authorization, or endorsement** with NLT Media, Yanfly, or any of their developers.

---

## ✨ Features

* **Zero Source Invasiveness (Monkey Patching):** Implements smart JavaScript method interception. The original game core engine files remain completely pristine, making game updates seamless and update-proof.
* **Universal RPG Maker Adaptability:** While pre-configured for NLT games, the underlying architecture (Menu tracking, regular expression font cleaning, and JIT voice binding) provides a robust blueprint for **any end-product game made by RPG Maker MV/MZ** to achieve full TTS capability.
* **Dynamic Environment Constraint (Anti-Collision):** Uses a high-security isolated global namespace (`window.raylex_currentSpeakers`) to dynamically track active scene assets via `Bitmap.prototype.decode`, ensuring **0% voice variable collision** with native game scripts or third-party plugins (e.g., Yanfly, Lovense).
* **Cross-Platform Dual-Track Binding:** Automatically detects the execution environment. It dynamically loads Cloud Voices (e.g., Microsoft Edge Neural) when running online, and seamlessly falls back to Local System Voices (e.g., SAPI5 Windows Desktop Voices) during offline Steam gameplay.
* **Industrial-Grade Performance Optimization:** 
  * Reuses a single global `SpeechSynthesisUtterance` to prevent garbage collection spikes and system freeze.
  * Implements a **3-Time Counter Retry Hook** to completely bypass browser cloud voice handshake latency during cold boot.
* **Full-Spectrum Accessibility Coverage:** Masterfully intercepting dialogue sequences, multi-page letter reading, artifact text descriptions, and interactive menu scrolling selections (`Window_Selectable`).

---

## 🛠️ System Architecture & Workflow

Rather than utilizing messy, brittle game level modifications (`MapXXX.json`), **nltGamingTTS** maps game states natively:

1. **Acoustic Profiling:** The tool chain splits your platform's available voices into discrete binary pools (`male.txt`/`female.txt`), dynamically pairing them with the game's character metadata (`nadiaGender.txt`) using mathematical pitch and rate offsets to generate unlimited distinct character profiles.
2. **The "Check-in" System:** As scenes load, `Bitmap.prototype.decode` captures rendering snapshots, instantly adding current actors to the secure `raylex_` namespace buffer.
3. **The Voice Pipeline:** When dialogue updates, `Game_Variables.setValue` intercepts the master prefix (e.g., `JaAlOp`), runs a string fingerprint analysis, validates it against the active check-in list, and locks the gender-accurate voice allocation.
4. **The Absolute Vocalization:** Ultimately, `Window_Message.startMessage` acts as the definitive executioner. It triggers a 350ms buffer, feeds the unfragmented string pool into a universal filter regex, and outputs clean, high-fidelity speech.

---

## 🚀 Getting Started

### 1. File Structure Layout
To maintain an organized workspace and prevent mixing files with the native plug-in folders, all mod elements are housed within a dedicated `addon/` folder inside the game's root web directory:

```text
YourGame/
└── www/
    ├── index.html
    └── addon/
        ├── genderTTS_Accessibility.js   <-- Core Playback Engine
        ├── epidemicVOICEwin.json        <-- For "Lust Epidemic" 
        ├── nadiaVOICEwin.json           <-- For "Treasure of Nadia" 
        ├── orderVOICEwin.json           <-- For "The Genesis Order" 
        └── serpentVOICEwin.json         <-- For "Symphony of the Serpent Demo" 
```

### 2a. Script Injection Stack for epidemic,nadia and order
Open your game's root `www/index.html` file in any text editor. Scroll to the bottom of the script stack and inject the addon scripts **sequentially, right after the core engine setup**:

```html
<!-- Native Game Core Engines -->
<script type="text/javascript" src="js/rpg_core.js"></script>

<!-- ================================================== -->
<!-- Injected nltGamingTTS Addon Modules                -->
<!-- ================================================== -->
<script type="text/javascript" src="addon/genderTTS_Accessibility.js"></script>
<!-- ================================================== -->

<!-- Remaining native scripts continue below unchanged -->
<script type="text/javascript" src="js/rpg_managers.js"></script>
<script type="text/javascript" src="js/rpg_objects.js"></script>
```

### 2b. Script Injection for serpent (Symphony of the Serpent)
index.html resides in the game's root directory. Use an editor to open js/main.js and locate const scriptUrls = at the very top, Insert ,"addon/genderTTS_Accessibility.js" after "js/plugins.js" . Save the file and exit.
Use the editor to opne js/plugins.js, locate a line like {"name":"SavesInUserDir","status":true,"description":"...", "parameters":{...}}
Replace "status":true by "status":false .  Save and exit. 
You have to click at the very start of game to avoid the audio error.
---

## 📋 Generating Your Custom Voice Matrix Maps

The framework relies on plain whitespace-separated data files to handle voice assignments effortlessly. You can use the included server-side deployment tool **`makeNLTpair.sh`** to instantly generate localized voice structures across different operating systems.

```bash
# Make the automated compiler executable
chmod +x makeNLTpair.sh

# Generate your matrices via cross-product mapping passes
./makeNLTpair.sh nadia win    # Generates nadiaPAIRwin.txt
./makeNLTpair.sh nadia edge   # Generates nadiaPAIRedge.txt
```

### Output Layout Format (`nadiaPAIRedge.txt`):
```text
// CharacterName  voiceName        pitch   rate
Hero             Ryan             1.00    1.00
Janet            Aria             1.05    0.95
Emily            Emma             1.00    1.00
Demon            Connor           0.60    0.85
```
*Tip: To inspect and clean your local Edge TTS engine profiles via CLI to feed into your voice lists, execute: `edge-tts -l | grep -E '^en-(US|GB|AU|CA|IE)'`.*

---

## 🤝 Contributing & Extension

This repository is built with **adaptability** in mind. If you are a legitimate gamer looking to bring full text-to-speech support to other RPG Maker games, you can easily repurpose the `cleanText` regex engine and `Window_Selectable` handlers. 

Feel free to fork the repository, optimize character mappings for different language packs, add hardware accessibility hotkeys, and open a Pull Request!

---

## 📝 License

This project is open-source and shared under the terms of the **MIT License**. See the `LICENSE` file for more details.

# nltGamingTTS
