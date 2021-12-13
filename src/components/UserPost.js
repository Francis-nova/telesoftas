import React from "react";
import propTypes from "prop-types";

const UserPost = ({ allPost }) => {
  return (
    <>
      {allPost.length === 0 ? null : (
        <div className="user-list">
          {allPost?.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-title">{post.title}</div>
              <div className="post-body">{post.body}</div>
            </div>
          ))}
          {/* pagination */}
        </div>
      )}
    </>
  );
};

UserPost.defaultProps = {
  allPost: [],
};

UserPost.propTypes = {
  allPost: propTypes.array.isRequired,
};

export default UserPost;
