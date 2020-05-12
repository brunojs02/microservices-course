const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, status, postId } = data;
    posts[postId].comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, status, content, postId } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("listening on 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    const { type, data } = event;
    console.log("Processing event: ", type);
    handleEvent(type, data);
  }
});
