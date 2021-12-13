import React, { useEffect, useState } from "react";

// styling
import "./App.css";

// dependencies
import axios from "axios";

// components...
import UserList from "./components/UserList";
import UserPost from "./components/UserPost";
import Pagination from "./components/Pagination";

const App = () => {
  const [search, setSearch] = useState("");
  const [userPage, setUserPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPostloading, setIsPostloading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState(null);
  const [postPagination, setPostPagination] = useState(null);

  const [currentUser, setCurrentUser] = useState(0);
  const [postPage, setPostPage] = useState(0);

  // handle search...
  const handleSearch = ($event) => {
    setSearch($event.target.value);
    setUserPage(1);
    if (search.length >= 2) {
      fetchUser(); // this is to search for users...
    }
  };

  // fetch data...
  const fetchUser = () => {
    setLoading(true); // set loading to true
    axios
      .get(
        `https://gorest.co.in/public/v1/users?name=${search || ""}&page=${
          userPage || 1
        }`
      )
      .then(function (response) {
        // handle success
        setUserList(response.data.data); // assign users...
        setPagination(response.data.meta.pagination);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });
  };

  // fetch post...
  const onClick = (id) => {
    setCurrentUser(id);
    getUserPost(); // get user post...
  };

  // getUserPost...
  const getUserPost = () => {
    setIsPostloading(true); // set post loading to true...
    axios
      .get(
        `https://gorest.co.in/public/v1/posts?user_id=${currentUser}&page=${
          postPage || 1
        }`
      )
      .then(function (response) {
        // handle success
        console.log("user post: ", response);
        setPostList(response.data.data);
        setPostPagination(response.data.meta.pagination);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setIsPostloading(false);
        // console.log(pagination);
      });
  };

  const onPageChange = ($event) => {
    const page = $event.selected + 1;
    setUserPage(page);
    fetchUser();
  };

  const onPostPageChange = ($event) => {
    const page = $event.selected + 1;
    setPostPage(page);
    getUserPost();
  };

  useEffect(() => {
    // console.log("working fine!");
  }, []);

  return (
    <div className="container">
      <input
        name="search"
        type="text"
        placeholder="search user by typing 3 letters"
        className="search"
        onChange={handleSearch}
      />

      {/* users list */}
      <div>
        {loading === true ? (
          <div>Loading...</div>
        ) : (
          <div>
            <UserList userList={userList} onClick={onClick} />

            {/* pagination for user */}
            <Pagination
              pageCount={pagination?.pages}
              currentPage={userPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* user post */}
      <div>
        {isPostloading === true ? (
          <div>Loading Please wait...</div>
        ) : (
          <div>
            <UserPost allPost={postList} />

            {/* pagination for user */}
            {postList.length !== 0 ? (
              <Pagination
                pageCount={postPagination?.pages || 0}
                currentPage={postPagination?.page || 0}
                onPageChange={onPostPageChange}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
