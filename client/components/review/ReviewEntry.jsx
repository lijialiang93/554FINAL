import React from "react";

function ReviewEntry({ review }) {
  return (
    <div className="card">

      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img class="card-img-top" src={review.avatar} alt="Card image cap" />
          </div>
          <div className="col-9">
            <h5 className="card-title">{review.author}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{new Date(review.createdAt).toLocaleString()}</h6>
          </div>
        </div>
        <p className="card-text">{review.content}</p>
      </div>
    </div>
  )
}

export default ReviewEntry;
