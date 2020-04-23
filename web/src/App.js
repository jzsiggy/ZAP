import React from 'react';
import ContextProvider from './context/ContextProvider';

import Banner from './components/banner/Banner/Container';
import Documentation from './components/docs/Documentation/Documentation';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Banner />
        <Documentation />
      </ContextProvider>
    </div>
  );
}

export default App;