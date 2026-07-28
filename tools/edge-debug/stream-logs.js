const CDP = require('chrome-remote-interface');
const repl = require('repl'); // 引入 Node.js 內建的互動命令列模組

async function main() {
    let targetTab;

    try {
        // 1. 從 Edge 獲取所有開啟的分頁
        const targets = await CDP.List({ port: 9222, host: '127.0.0.1' });
        
        // 2. 自動匹配 NLT 遊戲（支援 Genesis Order, Lust Epidemic, Nadia 等）
        targetTab = targets.find(t => 
            t.title.includes('The Genesis Order') || 
            t.title.includes('Lust Epidemic') || 
            t.title.includes('Treasure of Nadia') ||
            t.url.includes(':8003') || 
            t.url.includes(':8001') || 
            t.url.includes('127.0.0.2') ||
            t.type === 'page'
        );

        if (!targetTab) {
            console.error('❌ Error: 找不到任何 NLT 遊戲分頁。');
            console.log('當前可用分頁:', targets.map(t => `[${t.title}] -> ${t.url}`));
            process.exit(1);
        }

        console.log(`🎯 已成功連線至分頁: "${targetTab.title}"`);
        console.log(`🌐 網址: ${targetTab.url}\n`);

    } catch (err) {
        console.error('❌ 無法連線至 Edge。請確認 Edge 是否已開啟 --remote-debugging-port=9222？');
        console.error(err.message);
        process.exit(1);
    }

    // 3. 連線至該分頁的 DevTools 協議
    CDP({ target: targetTab, port: 9222, host: '127.0.0.1' }, (client) => {
        const { Console, Runtime, Log } = client;

        // 啟用追蹤領域
        Promise.all([Console.enable(), Runtime.enable(), Log.enable()]).then(() => {
            console.log('🚀 串流日誌中... 互動式命令列已就緒。');
            console.log('💡 提示: 直接輸入 JS 代碼（例如 $gameParty.gold()）並按 Enter 即可執行:\n---');
            
            // 🎬 啟動 Windows CMD 互動式命令列 (REPL)
            const r = repl.start({
                prompt: 'Game-JS> ',
                useColors: true,
                eval: async (cmd, context, filename, callback) => {
                    const code = cmd.trim();
                    // 如果輸入為空，直接返回
                    if (!code) return callback();

                    try {
                        // 將指令透過網頁協議傳給遊戲執行
                        const result = await Runtime.evaluate({ 
                            expression: code, 
                            returnByValue: true 
                        });

                        if (result.exceptionDetails) {
                            console.error('❌ 執行錯誤:', result.exceptionDetails.exception.description);
                        } else {
                            // 成功執行則印出返回值
                            const val = result.result.value;
                            console.log('👉', val !== undefined ? val : result.result);
                        }
                    } catch (e) {
                        console.error('❌ 網路通訊錯誤:', e.message);
                    }
                    callback();
                }
            });

            // 當你在 CMD 輸入 .exit 或按下 Ctrl+C 退出時，安全關閉連線
            r.on('exit', () => {
                client.close();
                process.exit(0);
            });

        }).catch((err) => {
            console.error('無法啟用調試領域:', err);
        });

        // 捕獲標準 console.log（已加入 [qming] 過濾功能）
        Runtime.consoleAPICalled((params) => {
            const type = params.type.toUpperCase();
            const timestamp = new Date(params.timestamp).toLocaleTimeString();
            
            const args = params.args.map(arg => {
                if (arg.value !== undefined) return arg.value;
                if (arg.description) return arg.description;
                return JSON.stringify(arg);
            }).join(' ');

            // 🔍 核心過濾邏輯：只有當文字內容包含 "[qming]" 時才印出
            if (args.includes('[qming]')) {
                // 使用 \r 清除目前正在輸入的 "Game-JS> " 提示字元，避免排版錯亂
                process.stdout.write(`\r[${timestamp}] [${type}] ${args}\nGame-JS> `);
            }
        });

        // 捕獲未捕獲的 JavaScript 崩潰異常
        Runtime.exceptionThrown((params) => {
            const timestamp = new Date(params.timestamp).toLocaleTimeString();
            const desc = params.exceptionDetails.exception.description || params.exceptionDetails.text;
            process.stdout.write(`\r\n🚨 [${timestamp}] [引擎崩潰/異常] ${desc}\n\nGame-JS> `);
        });

        // 捕獲瀏覽器底層錯誤
        Log.entryAdded((params) => {
            if (params.entry.level === 'error') {
                process.stdout.write(`\r[瀏覽器錯誤] ${params.entry.text} (${params.entry.url})\nGame-JS> `);
            }
        });

    }).on('error', (err) => {
        console.error('CDP 客戶端發生錯誤:', err);
    });
}

main();

