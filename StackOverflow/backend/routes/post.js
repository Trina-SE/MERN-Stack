const express = require('express');
const multer = require('multer');
const Minio = require('minio');
const Post = require('../models/post');
require('dotenv').config();

const router = express.Router();

// MinIO client setup
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const upload = multer({ dest: 'uploads/' });

// Create post
router.post('/', upload.single('codeSnippet'), async (req, res) => {
  const { content } = req.body;
  const { file } = req;
  const { userId } = req.user; // Assuming JWT middleware

  // Upload code snippet to MinIO
  const snippetUrl = `codeSnippets/${file.filename}`;
  await minioClient.fPutObject('codes', snippetUrl, file.path);
  
  const post = new Post({ userId, content, codeSnippetUrl: snippetUrl });
  await post.save();
  
  res.status(201).json({ message: 'Post created' });
});

// Get posts
router.get('/', async (req, res) => {
  const { userId } = req.user;
  const posts = await Post.find({ userId: { $ne: userId } });
  res.json(posts);
});

module.exports = router;
