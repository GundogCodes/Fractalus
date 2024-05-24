import styles from "./PostPage.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as postAPIs from "../../../utilities/post-api.cjs";
import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import ImageModal from "../../components/ImageModal/ImageModal";
import { PhoneIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function PostPage() {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const inputRef = useRef(null);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  /********************************************** STATES **********************************************/
  const [newComment, setNewComment] = useState();
  const [commentInfo, setCommentInfo] = useState();
  const [post, setPost] = useState();
  const [likedClicked, setLikedClicked] = useState(false);
  const [dislikedClicked, setDislikedClicked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  /********************************************** USEEFFECT **********************************************/
  useEffect(() => {
    (async () => {
      try {
        const post = await postAPIs.getPost(id);
        setPost(post);
        console.log("POST: ", post);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  /********************************************** FUNCTIONS **********************************************/
  function handleChange(e) {
    setNewComment({ text: e.target.value });
    console.log(newComment);
  }
  /********************************************** API CALLS **********************************************/
  async function handleLike() {
    console.log("like");
    setLikedClicked(!likedClicked);
    if (likedClicked) {
      try {
        const updatedPost = await postAPIs.unlikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      try {
        const updatedPost = await postAPIs.likePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }
  async function handleDislike() {
    console.log("dislike");
    setDislikedClicked(!dislikedClicked);
    if (dislikedClicked) {
      try {
        const updatedPost = await postAPIs.undislikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      try {
        const updatedPost = await postAPIs.dislikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }
  async function addComment(e) {
    e.preventDefault();
    console.log("new Comment is:", newComment);
    try {
      const updatedCommentWithPost = await postAPIs.commentOnPost(
        newComment,
        id
      );
      console.log(updatedCommentWithPost);
      setPost(updatedCommentWithPost.updatedPost);
      setCommentInfo(updatedCommentWithPost.senders);
    } catch (error) {
      console.log({ error: error });
    }
    inputRef.current.value = "";
  }
  return (
    <div className={styles.PostPage}>
      {post ? (
        <>
          {showImageModal ? (
            <ImageModal
              setShowImageModal={setShowImageModal}
              image={post.image}
            />
          ) : (
            <></>
          )}
          {post ? (
            <section>
              <header>
                {post.sender ? (
                  <h3
                    onClick={() => {
                      navigate(`/user/${post.sender._id}`);
                    }}
                    className={styles.headerClickables}
                  >
                    {post.sender.username}
                  </h3>
                ) : (
                  <h3>Deleted User</h3>
                )}
                <h1>{post.title}</h1>
                <h3
                  onClick={() => {
                    navigate(`/forum/${post.forum._id}`);
                  }}
                  className={styles.headerClickables}
                >
                  {post.forum.title}
                </h3>
              </header>
              <aside>
                {post.image ? (
                  <img
                    onClick={() => {
                      setShowImageModal(true);
                    }}
                    className={styles.postImage}
                    src={`/profilePics/${post.image}`}
                  />
                ) : (
                  <p>{post.text}</p>
                )}
              </aside>
              <div className={styles.interactions}>
                {likedClicked ? (
                  darkMode ? (
                    <h4
                      style={{ color: "#FF6410" }}
                      className={styles.dislike}
                      onClick={handleLike}
                    >
                      <ArrowUpIcon /> {post.likes}
                    </h4>
                  ) : (
                    <h4
                      style={{ color: "rgb(180,217,247)" }}
                      className={styles.dislike}
                      onClick={handleLike}
                    >
                      <ArrowUpIcon /> {post.likes}
                    </h4>
                  )
                ) : (
                  <h4 className={styles.dislike} onClick={handleLike}>
                    <ArrowUpIcon /> {post.likes}
                  </h4>
                )}

                {dislikedClicked ? (
                  darkMode ? (
                    <h4
                      style={{ color: "#FF6410" }}
                      className={styles.dislike}
                      onClick={handleDislike}
                    >
                      Dislike {post.dislikes}
                    </h4>
                  ) : (
                    <h4
                      style={{ color: "rgb(180,217,247)" }}
                      className={styles.dislike}
                      onClick={handleDislike}
                    >
                      <ArrowDownIcon /> {post.dislikes}
                    </h4>
                  )
                ) : (
                  <h4 className={styles.dislike} onClick={handleDislike}>
                    <ArrowDownIcon /> {post.dislikes}
                  </h4>
                )}
                <h4 className={styles.date}>{post.createdAt.slice(0, 10)}</h4>
              </div>

              <ul className={styles.commentSection}>
                {post.comments ? (
                  post.comments.map((comment) => {
                    return <li className={styles.comment}> {comment.text}</li>;
                  })
                ) : (
                  <h4>Add Comment</h4>
                )}
              </ul>
              <div className={styles.inputDiv}>
                <form onSubmit={addComment}>
                  <input ref={inputRef} onChange={handleChange} type="text" />
                  <button type="submit">Comment</button>
                </form>
              </div>
            </section>
          ) : (
            <img
              className={styles.loading}
              src={"../../src/assets/AppFunctions/ZKZg.gif"}
            />
          )}
        </>
      ) : (
        <div>Post Deleted</div>
      )}
    </div>
  );
}
