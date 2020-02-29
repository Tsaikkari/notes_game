// user clicks learn game
//position of keynote-head 
let isPlay = false;
let note ;
let keyHeadNotePositions = [
    {
        key: "c",
        initial_position: "0rem",
        final_position: "1.3rem",
        left: "1.3rem"
    },
    {
        key: "d",
        initial_position: "0rem",
        final_position: "2.9rem",
        left: "3.9rem"
    },
    {
        key: "e",
        initial_position: "0rem",
        final_position: "4.3rem",
        left: "4.3rem"
    },
    {
        key: "f",
        initial_position: "0rem",
        final_position: "5.3rem",
        left: "6.3rem"
    },
    {
        key: "g",
        initial_position: "0rem",
        final_position: "7.3rem",
        left: "8.3rem"
    },
    {
        key: "a",
        initial_position: "0rem",
        final_position: "8.3rem",
        left: "9.3rem"
    },
    {
        key: "b",
        initial_position: "0rem",
        final_position: "6.3rem",
        left: "28.3rem"
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
        pressedKey !== note.key ? playTone("wrong") : playTone(pressedKey);
    } else {
      hideKeyHeadNotes();
      showKeyHeadNotes(pressedKey);
      playTone(pressedKey);
    }
}); 

function hideKeyHeadNotes(){
    $('.note-head').each(function () {
        $(this).css('display', 'none')
    })
}

function showKeyHeadNotes(note){
    let getElementNote = document.querySelectorAll('[data-notehead-key="' + note + '"]')[0];
    let noteHead = keyHeadNotePositions.find(noteposition =>  noteposition.key === note);
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
    return keyHeadNotePositions[randomNumber];
}
