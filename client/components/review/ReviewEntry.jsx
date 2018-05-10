import React from "react";

function ReviewEntry({ review }) {
return (
    <div className="card">
      <div className="card-body">
      <h5 className="card-title">{review.author}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{new Date(review.createdAt).toUTCString()}</h6>
      <p className="card-text">{review.content}</p>
  </div>
</div>
  )
}

export default ReviewEntry;
