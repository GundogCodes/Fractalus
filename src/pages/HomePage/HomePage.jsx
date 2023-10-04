import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'

export default function HomePage({user,setUser}){


    return(
        <div className={styles.HomePage}>
      <h1 className={styles.hidden} id={styles.name}>Etch</h1>
      <section className={styles.userInfo}>
        <div className={styles.userPic}>Userpic</div>
        <div className={styles.username}>Username</div>
      </section>
            <HomePosts/>

            <div className={styles.buttonDiv}>
                <h4>Your Forums</h4>
                    <ul>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                        <li>forum</li>
                    </ul>
                    <h4>Create a Forum</h4>
            <button>+</button>
            </div>

            <Footer/>
        </div>
)
}