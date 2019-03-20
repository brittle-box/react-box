import React, { useState, useEffect } from "react";
import "./App.css";
import { IceTeaWeb3 } from "icetea-web3";
import { ecc } from "icetea-common";

const tweb3 = new IceTeaWeb3("ws://localhost:26657/websocket");
const contractAddress = "005_3M76NHiZ4ipvMmTVBVJ1Wj378RLJ";

function App() {
  const [privateKey, setPrivateKey] = useState(
    "CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK"
  );
  const [address, setAddress] = useState("");
  const [input, setInput] = useState(0);
  const [value, setValue] = useState(0);

  async function updateValue() {
    const contract = tweb3.contract(contractAddress);
    const value = (await contract.methods["getValue"].call()).data || 0;
    setValue(value);
  }

  async function handleSubmit() {
    const contract = tweb3.contract(contractAddress, privateKey);
    await contract.methods["setValue"].sendCommit([input]);
    return updateValue();
  }

  useEffect(() => {
    try {
      const publicKey = ecc.toPublicKey(privateKey);
      setAddress(ecc.toAddress(publicKey));
    } catch (e) {
      setAddress("NaN");
    }
  }, [privateKey]);

  useEffect(() => {
    updateValue();
    return () => tweb3.close();
  }, []);

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Brittle Box is installed and ready.</p>
      <h2>Simple Store: {value}</h2>

      <form>
        Private key:
        <br />
        <input
          type="text"
          id="privateKey"
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
          size="60"
        />
        <br />
        Address:
        <br />
        <input type="text" value={address} size="60" disabled />
        <br />
        Value:
        <br />
        <input
          type="text"
          id="value"
          name="input"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <br />
        <br />
        <input type="button" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default App;
