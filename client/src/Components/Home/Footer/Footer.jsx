import styles from './footer.module.css'

export default function Footer () {
    return (
        <footer>
            <hr className={styles.hr}/>
            <div className={styles.container}>
                <div className={styles.text}>
                    <h4>Proyecto individual realizado por Gabriel Weht</h4>
                    <p>Esta página fue creada para presentar el Proyecto Individual. Se utilizaron las siguientes tecnologías: HTML5, CSS3, JavaScript, React JS, Node JS, Sequelize, Postgres SQL.</p>
                </div>
                <img src="https://camo.githubusercontent.com/35b81f213ddb0e019b3567f6982d740bb2d01ae5dd712a1537e09e826e940228/68747470733a2f2f643331757a386c77666d796e38672e636c6f756466726f6e742e6e65742f4173736574732f6c6f676f2d68656e72792d77686974652d6c672e706e67" alt="Logo" />
            </div>
        </footer>
    )
}