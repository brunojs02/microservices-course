import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = comment.content;
    if (comment.status === "pending") {
      content = "Comentário pendente";
    } else if (comment.status === "rejected") {
      content = "Comentário reprovado";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
