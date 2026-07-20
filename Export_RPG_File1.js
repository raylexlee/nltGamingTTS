(function() {
    const key = 'RPG File1';
    const value = localStorage.getItem(key);
    
    if (!value) {
        console.error(`Key "${key}" not found in LocalStorage.`);
        return;
    }

    // Create the script text that will be pasted into Browser B
    const scriptContent = `// Run this in Browser B Console to import your save\nlocalStorage.setItem('${key}', \`${value}\`);\nlocation.reload();\n`;

    // Automatically trigger a file download
    const blob = new Blob([scriptContent], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'import_game_save.js';
    link.click();
    URL.revokeObjectURL(link.href);
    
    console.log('Script "import_game_save.js" downloaded successfully!');
})();

