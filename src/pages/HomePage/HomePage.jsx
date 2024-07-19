import styles from "./HomePage.module.scss";
import Footer from "../../components/Footer/Footer";
import UserAside from "../../components/UserAside/UserAside";
import { Link } from "react-router-dom";
import FormModal from "../../components/ForumModal/ForumModal";
import { useState, useEffect } from "react";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postAPI from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Post from "../../components/Post/Post";
import { ChevronRightIcon, SunIcon } from "@chakra-ui/icons";
export default function HomePage({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate();
  /******************************************** STATES ********************************************/
  const [showModal, setShowModal] = useState(false);
  const [forums, setForums] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  /******************************************** USE EFFECTS ********************************************/
  useEffect(() => {
    (async () => {
      try {
        const forums = await forumService.getAll();
        const posts = await postAPI.allPosts();
        setForums(forums);
        // console.log("allforums", forums);
        setAllPosts(posts);
        console.log("POSTS: ", posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /******************************************** FUNCTIONS ********************************************/

  function handleCreateClick() {
    console.log("showModal", showModal);
    setShowModal(!showModal);
  }
  if (user) {
    console.log(user);
  }
  return (
    <div className={styles.HomePage}>
      {showModal ? (
        <FormModal
          title={"Create a New Quarry"}
          showModal={showModal}
          setShowModal={setShowModal}
          headings={["Title", "Topic", "Brief Description"]}
        />
      ) : (
        <></>
      )}
      <div className={styles.mainBody}>
        {forums ? <SearchBar forums={forums} allPosts={allPosts} /> : <></>}
        {user ? (
          <div className={styles.userInfo}>
            <h1> Hey, {user.username}</h1>
            <img
              className={styles.profilePic}
              src={`/profilePics/${user.profileImage}`}
            />
            <div className={styles.userForums}>
              <h2>Your Forums</h2>
              {user.followedForums.map((forum) => {
                return (
                  <Link className={styles.userForum} to={`/forum/${forum._id}`}>
                    <ChevronRightIcon /> {forum.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.userInfo}>
            <h1 className={styles.pageTitle}>Home</h1>
            <h1>Login</h1>
            <img
              className={styles.profilePic}
              src={`/src/assets/userFunc/profileImage.png`}
            />
          </div>
        )}
        <div className={styles.homePosts}>
          {allPosts ? (
            <div className={styles.postList}>
              {allPosts.map((post) => {
                return (
                  <Post
                    id={post._id}
                    title={post.title}
                    forum={post.forum.title}
                    sender={post.sender.username}
                    text={post.text}
                    image={post.image}
                    comments={post.comments}
                    likes={post.likes}
                    dislikes={post.dislikes}
                  ></Post>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.explore}>
          <div className={styles.exploreHeading}>
            <h1>
              Explore <SunIcon boxSize={4} color={"white"} height={"15px"} />
            </h1>
          </div>
          <div>
            {forums ? (
              <div className={styles.forumList}>
                {forums.map((forum) => {
                  return (
                    <Link to={`forum/${forum._id}`}>
                      <p>{forum.title}</p>
                    </Link>
                  );
                })}
                {user ? (
                  <button
                    className={styles.createPost}
                    onClick={handleCreateClick}
                  >
                    +
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.theFooter}>
          <div className={styles.upperSection}>
            <div className={styles.footerSection1}>
              <h3 id={styles.headings}>Contact Us</h3>
              <div className={styles.contactSection}>
                <div className={styles.contactSection1}>
                  <h3>Edmonton</h3>
                  <div className={styles.infoSection}>
                    <h5>10303 65 Ave NW T6H 1V1</h5>
                    <h5>780-245-1258</h5>
                  </div>
                </div>
                <div className={styles.contactSection2}>
                  <h3>Grand Prairie</h3>
                  <div className={styles.infoSection}>
                    <h5>Unit 206, 9804 100 Ave T8V 0T8</h5>
                    <h5>780-965-6258</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footerSection2}>
              <h3 id={styles.headings}>Industries</h3>
              <div className={styles.industriesDiv}>
                <h5>Delivery & Logistics</h5>
                <h5>E-Commerce/Medicine Deliveries</h5>
                <h5>FedEx Ground Deliveries</h5>
                <h5>Auto Parts Deliveries</h5>
              </div>
            </div>
            <div className={styles.footerSection3}>
              <h3 id={styles.headings}>Follow Us</h3>
              <div className={styles.linksDiv}>
                <a href="https://linkedin.com">
                  <img src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/linkedin-1.png" />
                </a>
                <a href="https://facebook.com">
                  <img src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/facebook.png" />
                </a>
                <a href="https://x.com">
                  <img src="https://www.tforcelogistics.com/wp-content/uploads/2023/10/icons8-twitterx-24.png" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.lowerSection}>
            <h4> &#169; 2024 1652357 Alberta LTD. All Rights Reserved.</h4>
            <h4>
              <Link href="/">Home</Link>
            </h4>
            <h4>
              <Link href="/contact"> Contact Us</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
