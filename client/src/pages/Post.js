import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const getDateDifference = (createdAt) => {
    const dateObj = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - dateObj.getTime();
    const differenceInMinutes = Math.round(
      differenceInMilliseconds / 1000 / 60
    );

    const minutesInDay = 60 * 24;
    const minutesInHour = 60;

    if (differenceInMinutes >= minutesInDay) {
      const days = Math.floor(differenceInMinutes / minutesInDay);

      // Handle plural or singular form of days
      const daysString = days === 1 ? "day" : "days";

      if (days >= 1 && days < 7) {
        return `${days} ${daysString} ago`;
      } else {
        return `${dateObj.toLocaleDateString()}`;
      }
    } else if (differenceInMinutes >= minutesInHour) {
      const hours = Math.floor(differenceInMinutes / minutesInHour);

      // Handle plural or singular form of hours
      const hoursString = hours === 1 ? "hour" : "hours";

      return `${hours} ${hoursString} ago`;
    } else {
      // Handle plural or singular form of minutes
      const minutesString = differenceInMinutes === 1 ? "minute" : "minutes";
      if (
        differenceInMinutes === 0 ||
        !createdAt ||
        isNaN(new Date(createdAt))
      ) {
        return `Less than a minute`;
      }
      return `${differenceInMinutes} ${minutesString} ago`;
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment} disabled={!newComment}>
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments
            .slice()
            .reverse()
            .map((comment, key) => (
              <div key={key} className="comment">
                {comment.commentBody}
                <div className="user">
                  <div>
                    <span>
                      <FaUserCircle />
                    </span>
                    <span> {comment.username}</span>
                  </div>

                  <div className="commentDate">
                    {getDateDifference(comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
