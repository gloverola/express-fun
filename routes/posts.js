// @ts-nocheck
import express from 'express';
const router = express.Router();

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
router.get('/', (req, res) => {
  const limit = parseInt(req?.query?.limit);
  if (!isNaN(limit)) {
    res.status(200).json(posts.slice(0, limit));
    return;
  }
  res.status(200).json(posts);
});

// Get a single post
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res
      .status(404)
      .json({ message: `Post with id ${id} was not found` });
  } else res.status(200).json(post);
});

// Create new post
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: 'Please include a title' });
  }

  posts.push(newPost);
  res.status(201).json(posts);
});

// Update post
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id ${id} was not found` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id ${id} was not found` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
