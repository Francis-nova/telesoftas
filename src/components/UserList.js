import React from "react";
import propTypes from "prop-types";

const UserList = ({ userList, onClick }) => {
  return (
    <>
      {userList.length === 0 ? null : (
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user) => (
                <tr key={user.id} onClick={() => onClick(user.id)}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

UserList.defaultProps = {
  userList: [],
};

UserList.propTypes = {
  userList: propTypes.array.isRequired,
  pagination: propTypes.object,
  onClick: propTypes.func,
};

export default UserList;
