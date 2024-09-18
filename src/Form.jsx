import React, { useState, useRef, useEffect } from "react";
import "./Form.css";

const Form = () => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);

  function newComment(event) {
    setComment(event.target.value);
  }

  const submitComment = (event) => {
    event.preventDefault();

    if (isEditing) {
      setCommentList(
        commentList.map((comt) =>
          comt.id === editId ? { ...comt, comt: comment } : comt
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setCommentList([
        ...commentList,
        { id: commentList.length + 1, comt: comment },
      ]);
    }
    setComment("");
  };

  const deleteComment = (id) => {
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  const editComment = (id) => {
    const commentToEdit = commentList.find((comt) => comt.id === id);
    setComment(commentToEdit.comt);
    setIsEditing(true);
    setEditId(id);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div className="post-comment">
        {commentList.map((comt) => (
          <div className="comment-sack" key={comt.id}>
            <p>{comt.comt}</p>
            <div className="buttons">
              <button onClick={() => editComment(comt.id)} className="edit">
                Edit
              </button>
              <button onClick={() => deleteComment(comt.id)} className="delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={submitComment}>
        <input
          type="text"
          onChange={newComment}
          className="input"
          name="comment"
          value={comment}
          ref={inputRef}
        />
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>
    </>
  );
};

export default Form;
