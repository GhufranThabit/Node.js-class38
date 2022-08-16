import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { msg: "" });
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.city;
  try {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!cityName || !response.ok) {
      res.status(400).render("index", { msg: "City is not found!" });
    } else {
      const temperature = data.main.temp;
      res.status(200).render("index", {
        msg: `the weather in ${cityName} is now ${temperature} degree`,
      });
    }
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});

export default app;
