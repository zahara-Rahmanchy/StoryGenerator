const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
const axios = require("axios");
const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_TOKEN);
app.use(express.json());
// const {Configuration, OpenAIApi} = require("openai");
// // console.log(process.env.OPEN_AI_KEY);

// const config = new Configuration({
//   apiKey: "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",
// });

// const openai = new OpenAIApi(config);

//---------------------- api endpoint to get the generated story
app.post("/chat", async (req, res) => {
  const request = req.body;
  console.log(request);

  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/generate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: process.env.Authorize,
    },
    data: {
      max_tokens: 1000,
      truncate: "END",
      return_likelihoods: "NONE",
      prompt: `Write a short story based on ${request}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const generatedText = response.data.generations[0].text;
      console.log(response.data.generations[0].text);
      res.send(generatedText);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error generating story");
    });
});

app.get("/", (req, res) => {
  res.send("Hello from StoryBook");
});

app.listen(port, () => {
  console.log("port", port);
});
