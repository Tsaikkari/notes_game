// user clicks learn game or learn bass
//position of keynote-head 
let isPlay = false;
let note;
let isBass = false;

let keyNoteHeadPositions = [
    // treble clef notes
    {
        key: "c",
        initial_position: "0rem",
        final_position: "11rem",
        left: "5%"
    },
    {
        key: "d",
        initial_position: "0rem",
        final_position: "10.15rem",
        left: "20%"
    },
    {
        key: "e",
        initial_position: "0rem",
        final_position: "9.4rem",
        left: "34%"
    },
    {
        key: "f",
        initial_position: "0rem",
        final_position: "8.45rem",
        left: "48%"
    },
    {
        key: "g",
        initial_position: "0rem",
        final_position: "7.6rem",
        left: "62%"
    },
    {
        key: "a",
        initial_position: "0rem",
        final_position: "6.7rem",
        left: "76%"
    },
    {
        key: "b",
        initial_position: "0rem",
        final_position: "5.9rem",
        left: "90%"
    }
]

let bassKeyNoteHeadPositions = [
    // bass clef notes
    {
        key: "c0",
        initial_position: "0rem",
        final_position: "6.7rem",
        left: "5%"
    },
    {
        key: "d0",
        initial_position: "0rem",
        final_position: "5.9rem",
        left: "20%"
    },
    {
        key: "e0",
        initial_position: "0rem",
        final_position: "5.1rem",
        left: "34%"
    },
    {
        key: "f0",
        initial_position: "0rem",
        final_position: "4.3rem",
        left: "48%"
    },
    {
        key: "g0",
        initial_position: "0rem",
        final_position: "3.35rem",
        left: "62%"
    },
    {
        key: "a0",
        initial_position: "0rem",
        final_position: "2.5rem",
        left: "76%"
    },
    {
        key: "b0",
        initial_position: "0rem",
        final_position: "1.65rem",
        left: "90%"
    }
]
/** treble **/
$('#learn-game').off('click')
$('#learn-game').on('click', function () {
    $('.home-screen').css('display', 'none');
    $('.learn-screen').css('display', 'block');
}); 

$("#play-game").on("click", function() {
    $(".home-screen").css("display", "none");
    $(".learn-screen").css("display", "block");
    $("#game-info").text('Play the corresponding keyboard key of the note. If the note doesn\'t move, click on the same key again.');
    isPlay = true;
    getRandomNote();
}); 

$('.key-board-key').off('click');
$('.key-board-key').on('click', function () {
    let pressedKey = $(this).data("note");
    if (isPlay && note) {
        pressedKey !== note.key ? playTone("wrong") : playTone(pressedKey)
        nextRandomNote();
    } else if (isBass && note) {
        clickKeyBass();
    } else {
        hideKeyNoteHeads();
        showKeyNoteHeads(pressedKey);
        playTone(pressedKey); 
    } 
});

/** bass **/
$('#learn-bass').off('click')
$('#learn-bass').on('click', function () {
    $('.home-screen').css('display', 'none');
    $('#ledger-line').css('display', 'none');
    $('.learn-screen').css('display', 'block');
    $('#game-info').text('Learn bass clef notes by clicking on the keyboard keys');
    clickKeyBass();
});

$('#play-bass').on('click', function () {
    $(".home-screen").css("display", "none");
    $(".learn-screen").css("display", "block");
    $('#ledger-line').css('display', 'none');
    $("#game-info").text('Play the corresponding keyboard key of the note. If the note doesn\'t move, click the same key again.');
    isPlay = false;
    isBass = true;
    getBassRandomNote();
    clickKeyBass();
})

function clickKeyBass() {
    $('.key-board-key').off('click');
    $('.key-board-key').on('click', function () {
        let pressedKey = $(this).data("bass-note");
        if (isBass && note) {
            pressedKey !== note.key ? playTone("wrong") : playTone(pressedKey)
            nextRandomNote();
        } else {
            hideKeyNoteHeads();
            showBassKeyNoteHeads(pressedKey);
            playTone(pressedKey); 
        } 
    });
}

/** random-note **/
function getRandomNote() {
    note = generateRandomNote();
    let getElementNote = document.querySelectorAll('[data-notehead-key=c]')[0];
    getElementNote.style.display = 'block';
    getElementNote.style.setProperty("--t", note.initial_position);
    getElementNote.style.setProperty("--t2", note.final_position); 
}

function getBassRandomNote() {
    note = generateBassRandomNote();
    let getBassElementNote = document.querySelectorAll('[data-noteheadbass-key=c0')[0];
    getBassElementNote.style.display = 'block';
    getBassElementNote.style.setProperty("--t", note.initial_position);
    getBassElementNote.style.setProperty("--t2", note.final_position); 
}

function nextRandomNote() {
    $('.key-board-key').on('click', function () {
        if (isPlay && note) {
            getRandomNote();
        } 
        if (isBass && note) {
            getBassRandomNote(); // TODO: should display random bass-note
        }
    });
};
/** note heads **/
function hideKeyNoteHeads(){
    $('.note-head').each(function () {
        $(this).css('display', 'none')
    })
}

function showKeyNoteHeads(note){
    let getElementNote = document.querySelectorAll('[data-notehead-key="' + note + '"]')[0];
    let noteHead = keyNoteHeadPositions.find(noteposition => noteposition.key === note);
    getElementNote.style.display = 'block';
    getElementNote.style.setProperty('--t', noteHead.initial_position);
    getElementNote.style.setProperty("--t2", noteHead.final_position);
    getElementNote.style.setProperty('--l', noteHead.left);
}

function showBassKeyNoteHeads(note) {
    let getBassElementNote = document.querySelectorAll('[data-noteheadbass-key="' + note + '"]')[0];
    let noteHead = bassKeyNoteHeadPositions.find(bassnoteposition => bassnoteposition.key === note);
    getBassElementNote.style.display = 'block';
    getBassElementNote.style.setProperty('--t', noteHead.initial_position);
    getBassElementNote.style.setProperty("--t2", noteHead.final_position);
    getBassElementNote.style.setProperty('--l', noteHead.left);
}

function playTone(note){
    let audio = new Audio("../assets/sounds/"+ note + ".mp3")
 audio.play()
}

function generateRandomNote(){
    let randomNumber = Math.floor(Math.random() * 7); 
    return keyNoteHeadPositions[randomNumber];
}

function generateBassRandomNote(){
    let randomNumber = Math.floor(Math.random() * 7); 
    return bassKeyNoteHeadPositions[randomNumber];
}


// This app is built by me and my teacher Suman Kunwar. 
