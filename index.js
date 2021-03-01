function App() {
    const [displayTime, setDisplayTime] = React.useState(25 * 60);
    const [breakTime, setBreakTime] = React.useState(5 * 60);

    const formatTime = (time) => {
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };

    return (
        <div>
            <Length 
            title={"break length"} 
            changeTime={null} 
            type={"break"} 
            time={breakTime}
            formatTime={formatTime}
            />
            <h1>{formatTime(displayTime)}</h1>
        </div>
    );
}

function Length({title, changeTime, type, time, formatTime}){
    return (
        <div>
          <h3>{title}</h3>
          <div className="time-sets">
              <button className="btn-small cyan lighten-1">
                  <i className="material-icons">arrow_downward</i>
              </button>
              <h3>{formatTime(time)}</h3>
              <button className="btn-small cyan lighten-1">
                  <i className="material-icons">arrow_upward</i>
              </button>
          </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));