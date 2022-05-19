// Wait untill window is loaded, then start the game
indow.addEventListener('load', startGame);

function startGame(){
    // Get boundary elements
    const boundaries = document.querySelectorAll('.boundary')
    
    // Get start box  
    const start = document.querySelector('#start')
    
    // Get end Boc
    const end = document.querySelector('#end')

    // Start click event listener
    start.addEventListener('click', startClick)

    // End mouseover event listener
    end.addEventListener('mouseover', endOver)

    // Function called when start box clicked
    function startClick(){

    }

    // Function called when mouse over end box
    function endOver(){

    }
}