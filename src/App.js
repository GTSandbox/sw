import { useState } from 'react';
import './App.css';
import StopWatch from './StopWatch';

export default function App() {
  const [stopwatch, setStopWatch] = useState([]);

  return (
    <div>
      <header>
        <div className='createmenu'>
          <button
            onClick={() => {
              const newStopWatch = {
                id: Date.now(),
              };
              setStopWatch([...stopwatch, newStopWatch]);
            }}
            className='create'
          >New</button>
        </div>
      </header>
      <div>
        {stopwatch.map((item) => (
          <StopWatch
            key={item.id}
            id={item.id}
            onDelete={(id) => setStopWatch(stopwatch.filter((item) => item.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}