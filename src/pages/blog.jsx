import { Row, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useSearchParams, useNavigate } from "react-router-dom";

import CustomInputText from "../components/customInputText";
import CustomButton from "../components/customButton";
import CustomAlert from "../components/customAlert";
import formatDateTime from "../utils/format_date";
import isEditorEmpty from "../utils/editor_empty";

import "../css/button.css";
import "../css/blog.css";

const API_URL = "https://blogappbackend-2uwb.onrender.com/blogs";

function Blog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const blogID = searchParams.get("blogID");

  useEffect(() => {
    if (blogID) {
      fetch(`${API_URL}/${blogID}`)
        .then((res) => res.json())
        .then((data) => {
          setBlogTitle(data.title);
          const blocksFromHTML = convertFromHTML(data.content);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setBlogContent(EditorState.createWithContent(contentState));
        })
        .catch(() => {
          navigate("/blog");
        });
    }
  }, [blogID, navigate]);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const onSubmitBtnClick = async (e) => {
    e.preventDefault();
    if (blogTitle && !isEditorEmpty(blogContent)) {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
          date: formatDateTime(new Date()),
        }),
      });
      setBlogTitle("");
      setBlogContent(EditorState.createEmpty());
      showAlert("Published successfully ", "success");
      navigate("/"); // redirect back to homepage
    } else {
      setFormSubmitted(true);
      showAlert("Please fill all required fields ", "danger");
    }
  };

  const onClickUpdate = async (e) => {
    e.preventDefault();
    if (blogTitle && !isEditorEmpty(blogContent)) {
      await fetch(`${API_URL}/${blogID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
          date: formatDateTime(new Date()),
        }),
      });
      setBlogTitle("");
      setBlogContent(EditorState.createEmpty());
      showAlert("updated successfully ", "success");
      navigate("/");
    } else {
      setFormSubmitted(true);
      showAlert("Please fill all required fields ", "danger");
    }
  };

  const onClickDelete = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/${blogID}`, { method: "DELETE" });
    showAlert("deleted 🗑", "warning");
    navigate("/");
  };

  return (
    <Container>
      <Row style={{ paddingTop: 90 }}>
        <Form className="mt-3">
          <CustomInputText
            inputLabel="Blog Title"
            inputPlaceholder="Enter your Blog Title"
            inputType="text"
            inputValidationMsg="Please add Blog Title"
            inputValue={blogTitle}
            inputOnChange={(e) => setBlogTitle(e.target.value)}
            inputIsValid={formSubmitted && blogTitle === ""}
          />

          <Form.Group className="mb-3">
            <Form.Label>Write your blog</Form.Label>
            <Editor editorState={blogContent} onEditorStateChange={setBlogContent} />
          </Form.Group>

          {alert.show && (
            <CustomAlert
              isVisible={alert.show}
              alertMessage={alert.message}
              alertClass={alert.type}
            />
          )}

          {blogID ? (
            <>
              <CustomButton
                buttonText="Update Blog"
                buttonType="submit"
                buttonClassName="btn btn-custom w-100"
                buttonOnClick={onClickUpdate}
              />
              <CustomButton
                buttonText="Delete Blog"
                buttonType="submit"
                buttonClassName="btn btn-warning w-100 mt-3"
                buttonOnClick={onClickDelete}
              />
            </>
          ) : (
            <CustomButton
              buttonText="Publish Blog"
              buttonType="submit"
              buttonClassName="btn btn-custom w-100"
              buttonOnClick={onSubmitBtnClick}
            />
          )}
        </Form>
      </Row>
    </Container>
  );
}

export default Blog;


