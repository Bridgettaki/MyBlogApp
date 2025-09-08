import { Stack, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BlogItem from "../components/blogItem";
import "../css/homepage.css";
import { useState } from "react";
import { getNameLocalStore } from "../utils/local_storage";


function Homepage({ blogListData }) {
  const navigate = useNavigate();

  console.log(blogListData);

  const onBlogItemClick = (blogId) => {
    navigate({pathname:'/blog', search:`?blogID=${blogId}`});
    console.log("Blog Click");
  }

  const onBlogViewClick = (event, blogId) => {
    event.stopPropagation();
    navigate({pathname:'/view', search:`?blogID=${blogId}`});
    console.log("Blog View ", blogId);
  }


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
            {blogListData.length === 0 ? (
              <p style={{ textAlign: "center" }}>no page found</p>
            ) : (
 
              blogListData.filter((blogItem) => blogItem.title.toLowerCase().includes(search.toLowerCase())).map((filteredBlogItem, index) => { 
                console.log("Data ", filteredBlogItem)
             return filteredBlogItem.title == '' ? <p style={{ textAlign: "center" }}>No page found</p> :
              <BlogItem
                  key={index}
                  blogTitle={filteredBlogItem.title}
                  blogAuthor={getNameLocalStore() ? getNameLocalStore() : "Anonymous"}
                  blogTimeAndDate={filteredBlogItem.date}
                  onBlogClick={() => onBlogItemClick(index)}
                  onBlogViewClick={(event) => onBlogViewClick(event, index)}
                />})
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
