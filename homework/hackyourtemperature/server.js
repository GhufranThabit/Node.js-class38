import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", (req, res) => {
  const cityName = req.body.name;
  if (!cityName) {
    return res.send({ msg: "Please include the city name " });
  }
  res.send(cityName);
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
