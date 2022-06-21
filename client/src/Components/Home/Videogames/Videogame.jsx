import { Link } from "react-router-dom";
import styles from './videogame.module.css'


export default function Videogame({ id, name, image, genres}) {
    return <>
        <Link className={styles.link} to={`/videogames/${id}`}>
        <div className={styles.card}>
        <img className={styles.image} src={image} alt='imagen' />
        <h3 className={styles.title}>{name}</h3>
        <h4>{genres.join(', ')}</h4>
        </div>
        </Link>
    </>
}