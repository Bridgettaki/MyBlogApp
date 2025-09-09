import { Stack } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BlogItem from "../components/blogItem";
import "../css/homepage.css";
import { useState, useEffect } from "react";
import { getNameLocalStore } from "../utils/local_storage";

const API_URL = "https://blogappbackend-2uwb.onrender.com/blogs";

function Homepage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const onBlogItemClick = (blogId) => {
    navigate({ pathname: "/blog", search: `?blogID=${blogId}` });
  };

  const onBlogViewClick = (event, blogId) => {
    event.stopPropagation();
    navigate({ pathname: "/view", search: `?blogID=${blogId}` });
  };

  return (
    <div className="main-content">
      <section id="bloglist-title-section">
        <div className="bloglist-title">
          <h2>All Blogs</h2>
          <i className="fa fa-file-text-o" aria-hidden="true"></i>
        </div>
      </section>
      <section id="bloglist-section">
        <Stack gap={3}>
          {blogs.length === 0 ? (
            <p style={{ textAlign: "center" }}>No blogs found</p>
          ) : (
            blogs.map((blogItem) => (
              <BlogItem
                key={blogItem.id}
                blogTitle={blogItem.title}
                blogAuthor={getNameLocalStore() ? getNameLocalStore() : "Anonymous"}
                blogTimeAndDate={blogItem.date}
                onBlogClick={() => onBlogItemClick(blogItem.id)}
                onBlogViewClick={(event) => onBlogViewClick(event, blogItem.id)}
              />
            ))
          )}
        </Stack>
      </section>
    </div>
  );
}

Homepage.propTypes = {
  blogListData: PropTypes.any,
};

export default Homepage;

