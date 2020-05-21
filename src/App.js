import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './index.css';

class App extends React.Component{
  constructor(props){
    super(props);

    // Sets up the values we will assign from Metamask connection
    this.state = {
      account: null,
      network: null,
    };
    // Allows reference to this.loadBlockChain
    this.loadBlockChain = this.loadBlockChain.bind(this);
  }

  async loadBlockChain() {
    // Load in Web3 Connection
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')

    // Get data from Metamask
    const userNetwork = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts()

    // Update state with Metamask info
    this.setState({network: userNetwork})
    this.setState({account: accounts[0]})

    console.log("Connected to Metamask");
    console.log("Account is: " + this.state.account);
  }

  onClickTransaction = () => {
    // Adventure API address
    const APIaddress =  "http://13.56.163.182:8000/transfer-token";

    console.log("transaction to: " + this.state.account);

    // Access API for transaction

    fetch(APIaddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: "HOTPOTATO",
        amount: 1,
        to: this.state.account,
        hookUrl: "test",
      }),
    })
    .then(function (response){
        console.log(response)
    })
    .catch(function (error){
        console.log(error)
    });
  }

  render(){
    return(
        <div>
          <h1> Get Your Hot Potato Token! </h1>
          <div>
            <img alt="potato" className="potato" src="img/potato.png"/>
            <img alt="logo" className="logo" src="img/adventure-logo.png"/>
          </div>
          <div className="buttons">
            <button id="loginButton" onClick={this.loadBlockChain}>
              Connect to Metamask
            </button>
            <p><br></br><br></br><br></br></p>
            <button id="transactionButton" onClick={this.onClickTransaction}>
                  Get a Hot Potato Coin
            </button>
          </div>
          <div>
            <p>
              Your account: {this.state.account}
              <br></br>
              Network: {this.state.network}
              </p>
          </div>
        </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

export default App;
