// user clicks learn game
//position of keynote-head 
let isPlay = false;
let note;

let keyNoteHeadPositions = [
    {
        key: "c",
        initial_position: "0rem",
        final_position: "11rem",
        left: "2rem"
    },
    {
        key: "d",
        initial_position: "0rem",
        final_position: "10.15rem",
        left: "7.4rem"
    },
    {
        key: "e",
        initial_position: "0rem",
        final_position: "9.4rem",
        left: "12.5rem"
    },
    {
        key: "f",
        initial_position: "0rem",
        final_position: "8.45rem",
        left: "17.8rem"
    },
    {
        key: "g",
        initial_position: "0rem",
        final_position: "7.6rem",
        left: "23rem"
    },
    {
        key: "a",
        initial_position: "0rem",
        final_position: "6.7rem",
        left: "28.5rem"
    },
    {
        key: "b",
        initial_position: "0rem",
        final_position: "5.9rem",
        left: "33.5rem"
    },
]

$('#learn-game').off('click')
$('#learn-game').on('click', function () {
    $('.home-screen').css('display', 'none')
    $('.learn-screen').css('display', 'block')
}); 

$("#play-game").on("click", function() {
  $(".home-screen").css("display", "none");
  $(".learn-screen").css("display", "block");
  $("#game-info").text('Play Note');
  isPlay = true;
  note = generateRandomNote();
  let getElementNote = document.querySelectorAll('[data-notehead-key=c]')[0];
  getElementNote.style.display = 'block';
  getElementNote.style.setProperty("--t", note.initial_position);
  getElementNote.style.setProperty("--t2", note.final_position);
}); 

$('.key-board-key').off('click');
$('.key-board-key').on('click', function () {
    let pressedKey = $(this).data("note");
    if (isPlay && note) {
        pressedKey !== note.key ? playTone("wrong") : playTone(pressedKey)
        nextRandomNote();
    } else {
      hideKeyNoteHeads();
      showKeyNoteHeads(pressedKey);
      playTone(pressedKey); 
    }
}); 

function nextRandomNote() {
    $('.key-board-key').on('click', function () {
        if (isPlay && note) {
        note = generateRandomNote();
        let getElementNote = document.querySelectorAll('[data-notehead-key=c]')[0];
        getElementNote.style.display = 'block';
        getElementNote.style.setProperty("--t", note.initial_position);
        getElementNote.style.setProperty("--t2", note.final_position);
        }
    });
};

function hideKeyNoteHeads(){
    $('.note-head').each(function () {
        $(this).css('display', 'none')
    })
}

function showKeyNoteHeads(note){
    let getElementNote = document.querySelectorAll('[data-notehead-key="' + note + '"]')[0];
    let noteHead = keyNoteHeadPositions.find(noteposition =>  noteposition.key === note);
    getElementNote.style.display = 'block';
    getElementNote.style.setProperty('--t', noteHead.initial_position);
    getElementNote.style.setProperty("--t2", noteHead.final_position);
    getElementNote.style.setProperty('--l', noteHead.left);
}

function playTone(note){
 let audio = new Audio("../assets/sounds/"+ note + ".mp3")
 audio.play()
}

function generateRandomNote(){
    let randomNumber = Math.floor(Math.random() * 7); 
    return keyNoteHeadPositions[randomNumber];
}
