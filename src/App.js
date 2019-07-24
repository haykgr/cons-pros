import React from 'react';
import './App.css';
import ProsList from './component/ProsList';
import ConsList from './component/ConsList';

function App() {
  return (
    <div className="App">
      <div className="table-container" role="table" aria-label="Destinations">
        <div className="header" role="cell">
                Should I eat McDonalds?
        </div>
        <div className="flex-table row" role="rowgroup">
            <div className="flex-row first" role="cell">
              <div>PROS</div>
            </div>
            <div className="flex-row" role="cell">
              <div>CONS</div>
            </div>
        </div>

      <div className="flex-table row" role="rowgroup">
        <div className="flex-row first" role="cell"> 
          <ProsList />
        </div>
        <div className="flex-row" role="cell">
          <ConsList />
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
