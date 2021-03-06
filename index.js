function App() {
    const [displayTime, setDisplayTime] = React.useState(25 * 60);
    const [breakTime, setBreakTime] = React.useState(5 * 60);
    const [sessionTime, setSessionTime] = React.useState(25 * 60);
    const [timerOn, setTimerOn] = React.useState(false);
    const [onBreak, setOnBreak] = React.useState(false);
    const [breakAudio, setBreakAudio] = React.useState(
        new Audio("./breakTime.mp3")
        );
    const playBreakSound = () => {
        breakAudio.currentTime = 0;
        breakAudio.play();
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };
    

    const changeTime = (amount, type) => {
        if (type == "break") {
            if (breakTime <= 60 && amount < 0) {
                return;
            }
            setBreakTime((prev) => prev + amount);
        } else {
            if (sessionTime <= 60 && amount < 0) {
                return;
            }    
            setSessionTime((prev) => prev + amount);
            if (!timerOn){
                setDisplayTime(sessionTime + amount);
            }
        }
    }; 
    const controlTime = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let onBreakVariable = onBreak;
      if (!timerOn){
          let interval = setInterval(() => {
            date = new Date().getTime();
                if (date > nextDate) {
                    setDisplayTime((prev) => {
                        if (prev <= 0 && !onBreakVariable) {
                            playBreakSound();
                            onBreakVariable = true;
                            setOnBreak(true)
                            return breakTime;
                        } else if (prev <= 0 && onBreakVariable){
                            playBreakSound();
                            onBreakVariable = false;
                            setOnBreak(false)
                            return sessionTime;
                        }
                        return prev - 1;
                    });
                nextDate += second;
                }
          }, 30);
          localStorage.clear();
          localStorage.setItem('interval-id', interval)
      }
      if (timerOn) {
          clearInterval(localStorage.getItem("interval-id"));
      }
      setTimerOn(!timerOn)
    };
    const resetTime = () => {
        setDisplayTime(25 * 60);
        setBreakTime(5 * 60);
        setSessionTime(25 * 60);
    };
    return (
        <div className="center-align">
            <h1>Pomodoro Clock</h1>
            <div className="dual-container">
                <div id="break-label">
                    <Length 
                    title={"Break Length"} 
                    changeTime={changeTime} 
                    type={"break"} 
                    time={breakTime}
                    formatTime={formatTime}
                    breakDId={"break-decrement"}
                    id={"break-length"}
                    />
                </div>
                <div id="session-label">
                    <Length 
                    title={"Session Length"} 
                    changeTime={changeTime} 
                    type={"session"} 
                    time={sessionTime}
                    formatTime={formatTime}
                    sessionDId={"session-decrement"}
                    id={"session-length"}
                    />
                </div>
            </div>
            <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
            <h1 id="time-left">{formatTime(displayTime)}</h1>
            <button id="start_stop" className="btn-large light-blue" onClick={controlTime}>
                {timerOn ? (
                    <i className="material-icons">pause_circle_filled</i>
                ): (
                    <i className="material-icons">play_circle_filled</i>
                )}
            </button>
            <button id="reset" className="btn-large light-blue" onClick={resetTime}> 
            <i className="material-icons">autorenew</i>
            </button>
        </div>
    );
}


function Length({title, changeTime, type, time, formatTime, breakDId, sessionDId, id}){
    return (
        <div>
          <h3>{title}</h3>
          <div className="time-sets">
              <button className="btn-small light-blue" id={breakDId}
                onClick={() => changeTime(-60, type)}
              >
                  <i className="material-icons" id={sessionDId}>arrow_downward</i>
              </button>
              
                <h3 id={id}>{formatTime(time)}</h3>
              
              <button className="btn-small light-blue" id="break-increment"
                onClick={() => changeTime(60, type)}
              >
                  <i className="material-icons" id="session-increment">arrow_upward</i>
              </button>
          </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));