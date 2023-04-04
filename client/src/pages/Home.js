import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => {
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setListOfPosts(sortedPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {listOfPosts.map((value) => (
        <div
          className="post"
          key={value.id}
          onClick={() => {
            navigate(`/post/${value.id}`);
          }}
        >
          <div className="title"> {value.title}</div>
          <div className="body"> {value.postText}</div>
          <div className="footer"> {value.userName}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
