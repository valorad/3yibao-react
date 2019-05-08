import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

export default class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            3yibao-react
          </p>
  
        </header>
      </div>
    );
  }

}


// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           3yibao-react
//         </p>

//       </header>
//     </div>
//   );
// }

// export default App;
