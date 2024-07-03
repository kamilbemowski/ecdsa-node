const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { ethers } = require('ethers')

app.use(cors());
app.use(express.json());

const balances = {
    "0x902C51C16eA0654Bd0A2A63dfbD7d53a6eAE943C": 100,
    "0x98abC859D318685875cb8BC07386188e5e4733F3": 50,
    "0x06bEED3a63270030055B60b48B64C2B5bAc9b04c": 75,
};

app.get("/balance/:address", (req, res) => {
    const {address} = req.params;
    const balance = balances[address] || 0;
    res.send({balance});
});
app.post("/send", (req, res) => {
    const {sender, recipient, amount, signature} = req.body;
    const message = `Transfer ${amount} to ${recipient}`;
    let hashMessage = ethers.hashMessage(message);
    const address = ethers.recoverAddress(hashMessage, signature);
    if (sender !== address) {
        return res.status(400).send({message: "Wrong sender address!"});
    }
    console.log("sender" + Object.values(sender));

    setInitialBalance(address);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({message: "Not enough funds!"});
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({balance: balances[sender]});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}