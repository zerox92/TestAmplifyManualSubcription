import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { publish } from './graphql/mutations';
import { subscribe } from './graphql/subscriptions';
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
      <DoSubscription/>
    </div>
  );
}

class DoMutation extends React.Component {
  constructor(props) {
    super(props);
    this.handleMutation = this.handleMutation.bind(this);
  }
  handleMutation(){
    const publishChannel = { name: "My first Channel", data: "{\"hello\":20}" };

    API.graphql(graphqlOperation(publish, publishChannel))
    .then(data => console.log(data))
    .catch(err => console.log(err));

  }

  render() {
    return (
    <div className="Amplify-component">
      <h4>Do Mutation</h4>
      <button onClick={this.handleMutation}>Check Console</button>
    </div>
    );
  }
}

class DoSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscription = this.handleSubscription.bind(this);
  }
  handleSubscription(){
    //const publishChannel = { name: "My first Channel", data: "{\"hello\":20}" };

    // API.graphql(graphqlOperation(publish, publishChannel))
    // .then(data => console.log(data))
    // .catch(err => console.log(err));


    const subscriptionObject = API.graphql(
      graphqlOperation(subscribe)
    ).subscribe({
        next: (todoData) => {
          console.log(todoData);
          // Do something with the data
        }
    });

    console.log(subscriptionObject);

  }

  render() {
    return (
    <div className="Amplify-component">
      <h4>Do Subscription</h4>
      <button onClick={this.handleSubscription}>Check Console</button>
    </div>
    );
  }
}

export default App;
