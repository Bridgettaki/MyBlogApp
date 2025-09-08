import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/posts";

export default function PostForm({ isEdit = false }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`${API_URL}/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setAuthor(res.data.author);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`${API_URL}/${id}`, { title, content, author });
    } else {
      await axios.post(API_URL, { title, content, author });
    }
    navigate("/");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="post-form">
        <h1>{isEdit ? "✏️ Edit Post" : "📝 Create Post"}</h1>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          rows="6"
          required
        />

        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {isEdit ? "Update Post" : "Publish Post"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}
