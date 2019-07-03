const beatSymbols = ["N","L","R","A","a","J","S","V","F","[","!","]","e","j","E","/","f","x","Q","|"]

const beatNames = {"N":"Normal beat",
"L":"Left bundle branch block beat",
"R":"Right bundle branch block beat",
"A":"Atrial premature beat",
"a":"Aberrated atrial premature beat",
"J":"Nodal (junctional) premature beat",
"S":"Supraventricular premature beat",
"V":"Premature ventricular contraction",
"F":"Fusion of ventricular and normal beat",
"[":"Start of ventricular flutter/fibrillation",
"!":"Ventricular flutter wave",
"]":"End of ventricular flutter/fibrillation",
"e":"Atrial escape beat",
"j":"Nodal (junctional) escape beat",
"E":"Ventricular escape beat",
"/":"Paced beat",
"f":"Fusion of paced and normal beat",
"x":"Non-conducted P-wave (blocked APB)",
"Q":"Unclassifiable beat",
"|":"Isolated QRS-like artifact"}

exports.beatNames = beatNames
exports.beatSymbols = beatSymbols
