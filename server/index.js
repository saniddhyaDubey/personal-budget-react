const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 25,
    },
    {
      title: "Rent",
      budget: 275,
    },
    {
      title: "Grocery",
      budget: 110,
    },
  ],
};

app.get("/hello-world", (req, res) => {
  res.json("hello world");
});

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.get("/new-budget-endpoint", (req, res) => {
  fs.readFile("budget.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read budget data" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
