import {useEffect, useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css'
function Home(){

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(()=>{
        async function loadFilmes(){
const response = await api.get("movie/now_playing", {
    params:{
        api_key:"33ad6f51a263a12bca53a1d4b997d3e5",
        language: "pt-BR",
        page: 1,
    }
})
            
            setFilme(response.data.results.slice(0,20))
            setLoading(false);
        }

        loadFilmes();
    },[])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
 
    return(
        <div className='container'>
            <div className='lista-filmes'>
            {filme.map((filme)=> {
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                          <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}/images`} alt={filme.title}/>
                        <Link to={`/filme/${filme.id}`}>Acessar filme</Link>
                    </article>
                )
            })}    
            </div>         
        </div>
    )
}

export default Home;