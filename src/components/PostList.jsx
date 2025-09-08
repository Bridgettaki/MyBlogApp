import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/posts";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL).then(res => setPosts(res.data));
  }, []);

  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.author}</small><br />
          <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
