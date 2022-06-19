import { useHistory } from 'react-router-dom'
import styles from './landingPage.module.css'

export default function Home (){

    let history = useHistory();

    const redirect = () => {
        history.push('/videogames')
    }

    return (
    <div >
        <h1>
            Videogames
        </h1>
        <img 
        className={styles.imageLanding}
        src="https://i.pinimg.com/originals/26/c2/93/26c2932cd4beff0f3cc992391bd75922.gif" 
        alt="page_gif" />
        <button onClick={redirect}>
            Comenzar
        </button>
    </div>
    )
    
}