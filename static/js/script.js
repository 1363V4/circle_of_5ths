const root = document.documentElement;
const notes = $$(".note");
const scale = $('#scale');

const scale1 = ["C", "F", "A#", "D#", "G#", "C#", "F#", "B", "E", "A", "D", "G"];
const scale2 = ["lydien", "majeur", "myxolidien", "dorien", "mineur", "phrygien", "locrien"];

var notesArray = [11, 0, 1, 2, 3, 4, 5];
var turn = 0;
var scalePointer = 1
const screenMin = Math.min(screen.height, screen.width);
const offset = screenMin * 0.5;

notes.forEach(note => {
    note.style.setProperty(
        'margin-top', `calc(${offset}px * sin(((var(--turn) + ${note.dataset.note}turn - 3turn)/12)))`
    );
    note.style.setProperty(
        'margin-left', `calc(${offset}px * cos(((var(--turn) + ${note.dataset.note}turn - 3turn)/12)))`
    );
    note.style.setProperty(
        'rotate', `calc((var(--turn) + ${note.dataset.note}turn)/12)`
    );
});

function update() {
    notes.forEach(note => {
        if (notesArray.includes(parseInt(note.dataset.note))) {
            note.setAttribute('selected', '');
        } else {
            note.removeAttribute('selected');
        }
    });
    scale.textContent = `${scale1[turn % 12]} ${scale2[scalePointer]}`;
    switch (scalePointer) {
        case 6:
            $('#m-minus').disabled = true;
            break;
        case 0:
            $('#m-plus').disabled = true;
            break;
        default:
            $('#m-minus').disabled = false;
            $('#m-plus').disabled = false;
    }
    root.style.setProperty('--mood', scalePointer);
};

update();

click('#plus', function() {
    turn = turn + 1;
    root.style.setProperty('--turn', turn + "turn");
    notesArray = notesArray.map(note => (note - 1 + 12) % 12);
    update()
});

click('#minus', function() {
    turn = (turn - 1 + 12) % 12;
    root.style.setProperty('--turn', turn + "turn");
    notesArray = notesArray.map(note => (note + 1) % 12);
    update()
});

click('#m-plus', function() {
    scalePointer -= 1;
    notesArray = notesArray.map(note => (note + 1) % 12);
    update()
});

click('#m-minus', function() {
    scalePointer += 1;
    notesArray = notesArray.map(note => (note - 1 + 12) % 12);
    update()
});
