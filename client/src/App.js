import React, { Component } from "react";
import "./App.css";
import { IceTeaWeb3 } from "icetea-web3";
import { TxOp, ecc } from "icetea-common";

const tweb3 = new IceTeaWeb3("ws://localhost:26657/websocket");
const contractAddress = "005_3M76NHiZ4ipvMmTVBVJ1Wj378RLJ";

class App extends Component {
  constructor(props) {
    super(props);

    const privateKey = "CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK";
    const publicKey = ecc.toPublicKey(privateKey);
    const address = ecc.toAddress(publicKey);

    this.state = {
      value: 0,
      input: 0,
      privateKey,
      address
    };
  }

  async updateValue() {
    const value =
      (await tweb3.callReadonlyContractMethod(contractAddress, "getValue"))
        .data || 0;
    this.setState({ value });
  }

  async componentDidMount() {
    return this.updateValue();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "privateKey") {
      this.handleAddress(value);
    }

    this.setState({
      [name]: value
    });
  }

  handleAddress(value) {
    try {
      const publicKey = ecc.toPublicKey(value);
      const address = ecc.toAddress(publicKey);
      this.setState({ address });
    } catch (e) {
      this.setState({ address: "NaN" });
    }
  }

  async handleSubmit() {
    const { privateKey, input } = this.state;
    const data = {
      op: TxOp.CALL_CONTRACT,
      name: "setValue",
      params: [input]
    };
    await tweb3.sendTransactionCommit(
      { to: contractAddress, data },
      privateKey
    );
    return this.updateValue();
  }

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Brittle Box is installed and ready.</p>
        <h2>Simple Store: {this.state.value}</h2>

        <form>
          Private key:
          <br />
          <input
            type="text"
            id="privateKey"
            name="privateKey"
            value={this.state.privateKey}
            onChange={this.handleChange.bind(this)}
            size="60"
          />
          <br />
          Address:
          <br />
          <input type="text" value={this.state.address} size="60" disabled />
          <br />
          Value:
          <br />
          <input
            type="text"
            id="value"
            name="input"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <br />
          <input
            type="button"
            value="Submit"
            onClick={this.handleSubmit.bind(this)}
          />
        </form>
      </div>
    );
  }
}

export default App;
