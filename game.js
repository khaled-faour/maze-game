// Wait untill window is loaded, then start the game
window.addEventListener('load', startGame);

function startGame(){
    let win = true;
    let score = 0;

    // Add Score Value to status element
    document.getElementById("status").innerHTML = `
        Begin by moving your mouse over the "S".
        <br> Score: ${score}
        `

    // Get boundary elements
    const boundaries = document.querySelectorAll('.boundary')
    
    // Get start box  
    const start = document.querySelector('#start')
    
    // Get end Boc
    const end = document.querySelector('#end')

    // Start click event listener
    start.addEventListener('click', startClick)


    // Function called when start box clicked
    function startClick(){
        win = true
        document.getElementsByClassName('example')[0].innerHTML = ""
        boundaries.forEach(elm=>elm.classList.remove('youlose'))

        // End mouseover event listener
        end.addEventListener('mouseover', endOver)

        // Add boundaries event listeners
        boundaries.forEach(elm=>elm.addEventListener('mouseover', boundaryOver))
    }

    // Function called when mouse over end box
    function endOver(){
        if(win === true){
            changeScore(5)
            document.getElementsByClassName('example')[0].innerHTML = 'You Win!'
        }else{
            changeScore(-10)
            document.getElementsByClassName('example')[0].innerHTML = 'You Lose!'
        }

        // Remove boundaries event listeners
        boundaries.forEach(elm=>elm.removeEventListener('mouseover', boundaryOver))
        // Remove End mouseover event listener
        end.removeEventListener('mouseover', endOver)
    }

    // Function called when mouse over boundary
    function boundaryOver(){
        win = false;
        boundaries.forEach(elm=>elm.classList.add('youlose'))
        endOver()
    }

    // Function to change score value
    function changeScore(value){
        score += value;
        document.getElementById("status").innerHTML = `
        Begin by moving your mouse over the "S".
        <br> Score: ${score}
        `
    }
}