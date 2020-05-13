import React from 'react';
import CodeContextProvider from './components/banner/context/ContextProvider';
import DocContextProvider from './components/docs/context/ContextProvider';

import Banner from './components/banner/Banner/Container';
import Documentation from './components/docs/Documentation/Documentation';
import Structure from './components/codeStructure/Structure/Structure';

function App() {
  return (
    <div className="App">
      <CodeContextProvider>
        <Structure />
        <Banner />
      </CodeContextProvider>

      <DocContextProvider>
        <Documentation />
      </DocContextProvider>
    </div>
  );
}

export default App;