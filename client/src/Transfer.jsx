import { useState, useEffect } from "react";
import server from "./server";
import {ethers, verifyMessage} from "ethers"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install Metamask");
    }
  }, []);

  async function transfer(evt) {
    evt.preventDefault();

    if (typeof window.ethereum !== "undefined") {
      try {


        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // Get the signer after the provider is ready

        const message = `Transfer ${sendAmount} to ${recipient}`;
        const signature = await signer.signMessage(message);
        const verified = verifyMessage(message, signature)
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          signature
        });
        setBalance(balance);
      } catch (ex) {
        if (ex.code === 4001) {
          alert("Transaction rejected by user");
        } else {
          alert(ex.reason || ex.message || "An error occured");
        }
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
