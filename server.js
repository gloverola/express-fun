// @ts-nocheck
const { log } = require('console');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is post 1',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is post 2',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is post 3',
  },
];

// Get all posts
app.get('/api/posts', (req, res) => {
  const limit = parseInt(req?.query?.limit);
  if (!isNaN(limit)) {
    res.status(200).json(posts.slice(0, limit));
    return;
  }
  res.status(200).json(posts);
});

// Get a single post
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res
      .status(404)
      .json({ message: `Post with id ${id} was not found` });
  } else res.status(200).json(post);
});

app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
