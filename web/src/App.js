import React from 'react';
import ContextProvider from './context/ContextProvider';

import Banner from './components/banner/Banner/Container';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Banner />
      </ContextProvider>
    </div>
  );
}

export default App;