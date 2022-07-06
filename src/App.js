import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { publish } from './graphql/mutations';
Amplify.configure(awsconfig);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DoMutation/>
    </div>
  );
}

class DoMutation extends React.Component {
  constructor(props) {
    super(props);
    this.handleRetrieveCurrentSession = this.handleRetrieveCurrentSession.bind(this);
  }
  handleRetrieveCurrentSession(){
    const publishChannel = { name: "My first Channel", data: "{\"hello\":20}" };

    API.graphql(graphqlOperation(publish, {input: publishChannel}))
    .then(data => console.log(data))
    .catch(err => console.log(err));

  }

  render() {
    return (
    <div className="Amplify-component">
      <h4>Do Mutation</h4>
      <button onClick={this.handleRetrieveCurrentSession}>Check Console</button>
    </div>
    );
  }
}

export default App;
