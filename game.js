// Wait untill window is loaded, then start the game
window.addEventListener('load', startGame);

function startGame(){
    let win = true;
    let score = 0;
    let highScore = localStorage.getItem('maze-highScore') || 0;

    let interval
    let timer_on = false;
    let bestTime = localStorage.getItem('maze-bestTime') || '00:00:0';
    let lastTime = '';
    
    let minutes = 0;
    let minutes_text = '00'
    let seconds = 0;
    let seconds_text = '00'
    let milliseconds = 0;

    // Add Score Value to status element
    document.getElementById("status").innerHTML = `
        Begin by moving your mouse over the "S".
        <br> Score: ${score}
        <br> High Score: ${highScore}
        `
    
    // set best time field
    document.getElementById("best-time").innerHTML = `<h4>Best</h4>`+ bestTime

    // Get boundary elements
    const boundaries = document.querySelectorAll('.boundary')
    
    // Get start box  
    const start = document.querySelector('#start')
    
    // Get end Boc
    const end = document.querySelector('#end')

    // Start click event listener
    start.addEventListener('mouseover', startHover)


    // Function called when start box clicked
    function startHover(){
        win = true

        startTimer()
        start.removeEventListener('mouseover', startHover)
        document.getElementsByClassName('example')[0].innerHTML = ""
        boundaries.forEach(elm=>elm.classList.remove('youlose'))

        // Game div (out of the box) event listener
        document.getElementById('game').addEventListener('mouseleave', boundaryOver)
        
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
        
        // Remove ame div (out of the box) event listener
        document.getElementById('game').removeEventListener('mouseleave', boundaryOver)

        // Add start mouseover eventListiner
        start.addEventListener('mouseover', startHover)

        // set last time
        setLastTime()

        // set best time
        setBestTime()
        
        // Stop Timer 
        clearTimer()

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
        if(score > highScore){
            localStorage.setItem('maze-highScore', score)
            highScore = score    
        }
        document.getElementById("status").innerHTML = `
        Begin by moving your mouse over the "S".
        <br> Score: ${score}
        <br> High Score: ${highScore}
        `
    }

    // Timer Function
    function startTimer(){
        timer_on = true
        const live_time = document.getElementById("live-time")
        interval = setInterval(function(){
            
            if(timer_on === true){
                // Check milliseconds
                if(milliseconds < 9){
                    milliseconds++
                }else{
                    milliseconds = 0;
                    seconds++;
                }
                
                //Check seconds 
                if(seconds === 0 || seconds < 10){
                    seconds_text = '0'+seconds;
                }else if(seconds < 60){
                    seconds_text = seconds;
                }else{
                    seconds = 0;
                    minutes++;
                }

                // Check minutes
                if(minutes === 0 || minutes < 10){
                    minutes_text = '0'+minutes;
                }else if(seconds < 60){
                    minutes_text = minutes;
                }else{
                    minutes = 0;
                }
                
                live_time.innerHTML = `<h4>Live</h4> ${minutes_text}:${seconds_text}:${milliseconds}`
            }
        }, 100)
        
    }

    // Clear Timer Function
    function clearTimer(){
        const live_time = document.getElementById("live-time")
        timer_on = false;
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        live_time.innerHTML = `<h4>Live</h4> 00:00:0`
        clearInterval(interval)
    }

    // Change last time function
    function setLastTime(){
        const last_time = document.getElementById("last-time")
        lastTime = `${minutes_text}:${seconds_text}:${milliseconds}`
        last_time.innerHTML = '<h4>Last</h4>'+lastTime
    }

    function setBestTime(){
        const best_time = document.getElementById("best-time")
        if((bestTime === '00:00:0' || lastTime < bestTime) && win){
            bestTime = lastTime;
            localStorage.setItem('maze-bestTime', bestTime)
            best_time.innerHTML = `<h4>Best</h4>`+bestTime
        }
        
    }
}