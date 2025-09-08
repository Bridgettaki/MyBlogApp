import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
function BlogItem({ blogTitle, blogAuthor, blogTimeAndDate, onBlogClick, onBlogViewClick }) {
  console.log("Blog Item: ", blogTitle);

  return (
    <div className="blog-item" onClick={onBlogClick}>
      <div className="blog-content">
        <div className="blog-text">
          <h3 className="blog-title">{blogTitle}</h3>
          <p className="blog-author">{blogAuthor}</p>
          <p className="blog-publish-time">{blogTimeAndDate}</p>
        </div>
       
        <div className="blog-view">
          <p onClick={onBlogViewClick}>View</p>
        </div>
       </div>
      </div>
  );
}

BlogItem.propTypes = {
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.any,
  blogTimeAndDate: PropTypes.string.isRequired, 
  onBlogClick: propTypes.any,
  onBlogViewClick:propTypes.any
};

export default BlogItem;
