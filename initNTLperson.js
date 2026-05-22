async initNTLperson(gametag) {i // 'nadia' or 'order'
  const localData = await fetch(`${gametag}PAIRwin`) 
  const cloudData = await fetch(`${gametag}PAIRwin`) 
  const lVoice = {name : '', voice : null, pitch : 1, rate : 1 }
  const cVoice = {name : '', voice : null, pitch : 1, rate : 1 }
  nltPerson = {}
// nltPerson['myName'} = { local : lVoice, cloud : cVoice }
// on demand just-in-time  fill in nltPerson['myName].cloud.voice or .local.voice
