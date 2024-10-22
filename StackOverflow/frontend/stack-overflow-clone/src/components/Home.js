import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/post', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <a href={post.codeSnippetUrl}>Download Code Snippet</a>
        </div>
      ))}
    </div>
  );
};

export default Home;
