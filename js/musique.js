const keyboard = document.getElementById('keyboard');
let tabKeycode = [{ 'keycode': 65, 'nom': 'clap' }, { 'keycode': 90, 'nom': 'hit hat' }, { 'keycode': 69, 'nom': 'kick' }, { 'keycode': 81, 'nom': 'open hat' }, { 'keycode': 83, 'nom': 'boom' }, { 'keycode': 68, 'nom': 'ride' }, { 'keycode': 87, 'nom': 'snare' }, { 'keycode': 88, 'nom': 'tom' }, { 'keycode': 67, 'nom': 'tink' }];


function generateKey(id, key) {
    var key = createElement('button', { 'id': id, 'class': 'key' }, key);
    addEventSound(key);
    keyboard.append(key);
}

function createElement(type, attrs, text) {
    var element = document.createElement(type);
    addAttributes(element, attrs);
    element.innerHTML = text;
    return element;
}

function addAttributes(element, attrs) {
    for (var attr in attrs) {
        element.setAttribute(attr, attrs[attr]);
    }
}

function addEventSound(element) {
    element.addEventListener("click", function () { playSound(element.id) }, false);
}

function allumer(id) {
    addAttributes(document.getElementById(id), { 'class': 'keyPlaying' });
}

function eteindre(id) {
    addAttributes(document.getElementById(id), { 'class': 'key' })
}

function recepKeyCode(keycode) {
    if (verifyContentKeyCode(keycode, tabKeycode)) {
        playSound(indexSound(keycode));
    }
}

function playSound(idSound) {
    var sound = new Audio('src/' + tabKeycode[idSound]['nom'] + '.wav');
    console.log(sound);
    sound.play();
    allumer(idSound);
    sound.addEventListener('ended', function () { eteindre(idSound) });
}

function indexSound(keycode) {
    var keyCodesPossible = tabKeycode.map(x => x['keycode']);
    for (var i = 0; i < keyCodesPossible.length; ++i) {
        if (keycode == keyCodesPossible[i]) {
            return i;
        }
    }
}

function verifyContentKeyCode(keyCode) {
    var keyCodesPossible = tabKeycode.map(x => x['keycode']);
    return keyCodesPossible.includes(keyCode);
}

function generateKeyboard() {
    for (var i = 0; i < tabKeycode.length; ++i) {
        generateKey(i, tabKeycode[i]['nom']);
    }
}

document.addEventListener('keydown', (event) => {
    recepKeyCode(event.keyCode);
})

generateKeyboard();