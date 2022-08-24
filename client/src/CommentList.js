import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    let content;
    const { status } = comment;

    switch (status) {
      case "pending":
        content = 'This comment is awaiting moderation';
        break;
      case "rejected":
        content = "This comment has been rejected";
        break;
      case "approved":
        content = comment.content;
        break;
      default:
        content = comment.content;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;  
