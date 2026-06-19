
const fs = require('fs');
const qmData = { 
    "nltPerson" : {},
    "nltActor" : {}
    };
const gametag = process.argv[2];
const dev = 'win';
const output = `./${gametag}VOICE${dev}.json`;
const localText = fs.readFileSync(`./${gametag}PAIR${dev}.txt`, {encoding:'utf8', flag:'r'})
const cloudText = fs.readFileSync(`./${gametag}PAIRedge.txt`, {encoding:'utf8', flag:'r'})
const actorText = fs.readFileSync(`./${gametag}_shMATCHactor.txt`, {encoding:'utf8', flag:'r'})
        localText.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//')) return;
            const [charName, voiceName, pitch, rate] = trimmed.split(/\s+/);
            if (!charName) return;

            qmData.nltPerson[charName] = {
                local: { name: voiceName, voice: null, pitch: parseFloat(pitch) || 1.0, rate: parseFloat(rate) || 1.0 },
                cloud: { name: '', voice: null, pitch: 1.0, rate: 1.0 }
            };
        });

        cloudText.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//')) return;
            const [charName, voiceName, pitch, rate] = trimmed.split(/\s+/);
            if (!charName) return;

            if (!qmData.nltPerson[charName]) {
                qmData.nltPerson[charName] = {
                    local: { name: '', voice: null, pitch: 1.0, rate: 1.0 },
                    cloud: { name: '', voice: null, pitch: 1.0, rate: 1.0 }
                };
            }
            qmData.nltPerson[charName].cloud = {
                name: voiceName,
                voice: null,
                pitch: parseFloat(pitch) || 1.0,
                rate: parseFloat(rate) || 1.0
            };
        });
        actorText.split('\n').forEach(line => {
            const [sh, charName] = line.split(' ');
            qmData.nltActor[sh] = charName
        });
fs.writeFileSync(output, JSON.stringify(qmData));
