import { connect } from 'react-redux'
import { getVideogames } from '../../Actions'
import { useHistory } from 'react-router-dom'

function Home (){

    let history = useHistory();

    const redirect = () => {
        history.push('/videogames')
    }

    return (
    <div >
        <h1>
            Bienvenido a la página de Videojuegos
        </h1>
        <button onClick={redirect}>
            Comenzar
        </button>

        {/* <img className = 'Home_Image' src = {props.videogames[0].APIvideogames[4].background_image} alt='videogame_Image'/>
    */}

    </div>
    )
    
}

function mapStateToProp(state){
    return {
        videogames: state.videogamesLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogames: game => dispatch(getVideogames(game))
    };
}

export default connect(mapStateToProp, mapDispatchToProps)(Home)