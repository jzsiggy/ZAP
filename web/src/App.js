import React from 'react';
import { Zap } from 'jzap';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      {
        console.log(new Zap('show 5;'))
      }
    </div>
  );
}

export default App;
