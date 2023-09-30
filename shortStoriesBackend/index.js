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
//   apiKey: "",
// });

// const openai = new OpenAIApi(config);

//---------------------- api endpoint to get the generated story
// /change to 1000
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
      prompt: `Write a short story based on ${request} and it should be within 1000 letters`,
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

const {MongoClient, ServerApiVersion} = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofsmeh8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("Stories").collection("users");
    const storiesCollection = client.db("Stories").collection("allStories");
    const sharedCollection = client.db("Stories").collection("shared");
    // store users
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = {email: user.email};
      const existingUser = await usersCollection.findOne(query);
      // console.log("user", user);
      // console.log("existingUser:  ", existingUser);
      if (existingUser) {
        return res.send({message: "The User already exits"});
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.post("/stories", async (req, res) => {
      const body = req.body;
      const query = {storyId: body.storyId};
      const existingStory = await storiesCollection.findOne(query);

      if (existingStory) {
        return res.send({message: "The Story is already saved already"});
      }

      const result = await sharedCollection.insertOne(body);
      res.send({status: 200});
    });

    app.post("/shared", async (req, res) => {
      const body = req.body;
      const query = {storyId: body.storyId};
      const existingStory = await sharedCollection.findOne(query);

      if (existingStory) {
        return res.send({message: "The Story is already saved already"});
      }

      const result = await sharedCollection.insertOne(body);
      res.send({status: 200});
    });

    // saved stories
    app.get("/saved/:email", async (req, res) => {
      const email = req.params.email; // Get the email from the route parameters
      console.log(email);
      const result = await storiesCollection.find({email: email}).toArray(); // Fetch classes based on the email
      res.send(result);
    });

    // shared stories
    app.get("/sharedStories", async (req, res) => {
      const result = await sharedCollection.find().toArray(); // Fetch classes based on the email
      res.send(result);
    });

    // sorted according to upvotes

    app.get("/leaderboard", async (req, res) => {
      const sortedStories = await sharedCollection
        .find()
        .sort({upvotes: -1})
        .toArray();
      res.send(sortedStories);
    });

    // upvote
    app.patch("/upvote/:storyId", async (req, res) => {
      const storyId = req.params.storyId;

      try {
        const filter = {storyId: storyId};

        // Check if the 'upvotes' field exists in the document
        const existingStory = await sharedCollection.findOne(filter);

        let update;
        if (existingStory && existingStory.upvotes !== undefined) {
          // If 'upvotes' field exists, increment it by 1
          update = {$inc: {upvotes: 1}};
        } else {
          // If 'upvotes' field doesn't exist, create it with a value of 1
          update = {$set: {upvotes: 1}};
        }

        const result = await sharedCollection.updateOne(filter, update);

        if (result.modifiedCount === 1) {
          // console.log(result);
          res.send("Story upvoted successfully");
        } else {
          res.send("Story Not found");
        }
      } catch (error) {
        console.error("Error upvoting story:", error);
        res.send("Error Upvoting");
      }
    });

    await client.db("admin").command({ping: 1});
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from StoryBook");
});

app.listen(port, () => {
  console.log("port", port);
});
