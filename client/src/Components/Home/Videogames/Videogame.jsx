import { Link } from "react-router-dom";
import styles from './videogame.module.css'


export default function Videogame({ id, name, image, genres}) {
    return <>
        <Link to={`/videogames/${id}`}>
        <div className={styles.card}>
        <h3>{name}</h3>
        <img className={styles.image} src={image} alt='imagen' />
        {genres?.map((g, index) => {
            return <p key={index}>{g}</p>
        })}
        </div>
        </Link>
    </>
}