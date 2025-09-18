let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset_btn");
let newGame = document.querySelector("#new_btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");


let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const enableBox = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("disabled");
    }
}

const disableBox = () => {
    for(box of boxes){
        box.disabled = true;
        box.classList.add("disabled");
    }
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBox();
    msgBox.classList.add("hide");
    reset.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        count += 1;
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Hey, The Winner is: ${winner}😎`;
    msgBox.classList.remove("hide");
    reset.classList.add("hide");
    disableBox();
};

const drawGame = () => {
    msg.innerText = `🤝The Match is draw! Try Agian for a Winner🔄`;
    msgBox.classList.remove("hide");
    reset.classList.add("hide");
    disableBox();
};

const checkWinner = () => {
    let winnerFound = false;

    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    if(!winnerFound && count === 9){
        drawGame();
    }
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);