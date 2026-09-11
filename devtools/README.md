# devtools

A collection of developer tools and scripts for nltGamingTTS. This repository allows you to generate and inject custom scripts directly into the browser's developer tools console, enabling TTS and gender features for online versions of the games.

## Supported Games
Click a link below to go directly to the raw script for easy copying:
* **Symphony of the Serpent** — [serpent.js Raw Code](https://githubusercontent.com)
* **Lust Epidemic** — [epidemic.js Raw Code](https://raw.githubusercontent.com/raylexlee/nltGamingTTS/refs/heads/main/devtools/epidemic.js)
* **Treasure of Nadia** — [nadia.js Raw Code](https://raw.githubusercontent.com/raylexlee/nltGamingTTS/refs/heads/main/devtools/nadia.js)
* **The Genesis Order** — [order.js Raw Code](https://raw.githubusercontent.com/raylexlee/nltGamingTTS/refs/heads/main/devtools/order.js)

## Requirements & Compatibility

⚠️ **Important Browser Restriction:** 
This script is specifically designed to leverage the extensive library of high-quality, natural male and female voices available in **Microsoft Edge**. It will not function correctly on other browsers.

Currently, it is verified to work exclusively on:
* **Microsoft Edge v149**
* **Microsoft Edge v151**

### Required Edge Settings
To ensure the text-to-speech engine and game run smoothly without audio stuttering or performance drops, you must adjust the following settings in Edge:
1. Go to **Settings > System and performance**.
2. Turn **OFF** *Continue running background extensions and apps when Microsoft Edge is closed*.
3. Turn **OFF** *Use graphics acceleration when available*.
4. Restart your browser.

## Why Use the DevTools Method?

Using the DevTools console injection method offers several advantages over downloading the game ZIP file:
* **No Local Setup:** Avoids the hassle of downloading, extracting, and configuring a local web server (like Nginx or Apache) to run the game locally.
* **Keep Your Saves:** Running the script directly on the official Patreon online game page ensures your browser cookies and local storage remain intact, maintaining all your save files automatically.

## Quick Start Guide

Follow these steps to get the script and inject it into your game.

### Option A: Use Pre-Compiled Raw Links (Easiest)
1. Click on one of the **Raw Code** links in the [Supported Games](#supported-games) list above.
2. Press `Ctrl + A` (or `Cmd + A` on Mac) to select all the text, then `Ctrl + C` (`Cmd + C`) to copy it.
3. Skip directly to [Step 2: Inject into the Online Game](#step-2-inject-into-the-online-game).

### Option B: Generate the Script Locally
If you want to compile the script yourself from the JSON configurations:
Run the built-in shell script providing the prefix name of your game (e.g., `serpent` for `serpentVOICEwin.json`):
```bash
./devtoolMake.sh serpent
```
This will compile and output the executable JavaScript file (e.g., `serpent.js`). Open the generated file and copy its contents.

### Step 2: Inject into the Online Game
1. Open your game on the **Patreon online game platform** using a compatible version of **Microsoft Edge**.
2. Wait for the **Game Start Screen** to fully load. 
   * *Note: If you encounter a blank screen on startup, press `Ctrl + F5` to force clear the old browser cache.*
3. Open the Edge Developer Tools Console:
   * **Windows/Linux:** Press `F12` or `Ctrl + Shift + J`
   * **Mac:** Press `Cmd + Option + J`
4. Paste the copied code directly into the console.
5. Press `Enter` to execute.

Once executed, the script will hook into the game engine and function exactly like the standard `nltGamingTTS/addon/genderTTS_*.js` plugins, fully utilizing Edge's natural voices.

## Contributing

Feel free to submit pull requests or open issues if you find bugs or want to contribute new JSON configurations for other games.

