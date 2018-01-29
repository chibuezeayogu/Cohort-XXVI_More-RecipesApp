import React from 'react';
import moment from 'moment';

const Comments = (props) => {
  const { review } = props;
  return (
    <li className="collection-item avatar z-depth-1">
      <img
        src={review.User.imageUrl}
        alt=""
        className="circle responsive-img"
      />
      <span className="text-title bold">{review.User.firstName}</span>
   
      <p 
        className="" 
        style={{ wordWrap: 'break-word' }}>
        {review.comment}
      </p>
      <div className="secondary-content">
      { moment(new Date(review.createdAt)).fromNow()}
      </div>
    </li>
  );
};

export default Comments;