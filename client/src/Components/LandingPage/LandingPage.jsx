import { useHistory } from 'react-router-dom'
import styles from './landingPage.module.css'

export default function Home (){

    let history = useHistory();

    const redirect = () => {
        history.push('/videogames')
    }

    return (
    <div className={styles.landing}>
        <div className={styles.card}>
            <h1 className={styles.title}>
                Videogames
            </h1>
            <button 
            className={styles.btn}
            onClick={redirect}>
                Comenzar
            </button>
        </div>
    </div>
    )
    
}