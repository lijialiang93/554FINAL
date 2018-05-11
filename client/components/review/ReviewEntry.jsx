import React from "react";

function ReviewEntry({ review }) {
  return (
    <div className="card">

      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img className="card-img-top" src={review.avatar} alt="Card image cap" />
          </div>
          <div className="col-9">
            <div className="card-title">{review.author}</div>
            <div className="card-subtitle mb-2 text-muted">{new Date(review.createdAt).toLocaleString()}</div>
          </div>
        </div>
        <p className="card-text">{review.content}</p>
      </div>
    </div>
  )
}

export default ReviewEntry;
