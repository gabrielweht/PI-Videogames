import { Link } from "react-router-dom";
import styles from './videogame.module.css'


export default function Videogame({ id, name, image, genres}) {
    return <div className={styles.card}>
        <Link to={`/videogames/${id}`}>{name}</Link>
        <img className={styles.image} src={image} alt='imagen' />
        {genres?.map((g, index) => {
            return <p key={index}>{g}</p>
        })}
    </div>
}