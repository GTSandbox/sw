import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import './StopWatch.css'



export default function StopWatch({id, onDelete}){
    const [time, setTime] = useState(0)
    const [paused, setPaused] = useState(true)

    const start = useRef(0)
    const timer = useRef(0)

    useEffect(() => {

        let animationFrame

        const updateTime = () => {
            timer.current = performance.now() - start.current
            setTime(timer.current)

            if(!paused){
                animationFrame = requestAnimationFrame(updateTime)
            }
        }

        if (!paused){
            start.current = performance.now() - timer.current
            animationFrame = requestAnimationFrame(updateTime)
        }
        return () => cancelAnimationFrame(animationFrame)
    }
    , [paused])

    return(
        (
            <div className="stopwatch-container">
                <p className="timer">{timeToString(time)}</p>
                <div className="actions">
                    <button onClick={() => {
                        if (!paused) {
                            cancelAnimationFrame(timer.current)
                            //clearInterval(timer.current);
                        }
                        setPaused(!paused);
                        
                    }}>
                        {paused ? "Run" : "Pause"}
                    </button>
                    {(!paused || (paused && time!==0)) && <button onClick={() => {
                        setTime(0)
                        timer.current = 0
                        setPaused(true)
                    }}>Stop</button>}
                    <button onClick={() => {
                        onDelete(id)
                    }} className="delete">Delete</button>
                </div>
            </div>
        )
    )
}

const timeToString = (time) => {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    //const DAY = HOUR * 24;

    //let days = Math.floor(time / DAY);
    let hours = lpad(Math.floor(time / HOUR));
    let minutes = lpad(Math.floor((time / MINUTE) % 60));
    let seconds = lpad(Math.floor((time / SECOND) % 60));
    let milliseconds = mspad(time % SECOND);

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return hours + ":" +  minutes + ":" + seconds + "." + milliseconds;
}

const lpad = (num) => {
    return (num < 10 ? "0" : "") + num;
  }

const mspad = (num) => {
    return (num < 100 ? "0" : "") + (num < 10 ? "0" : "") + num;
}  