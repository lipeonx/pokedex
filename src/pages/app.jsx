import  React ,{useState} from 'react';
import api from '../services/api/api';
import Spinner from '../components/spinner';

const App = ( ) => {

    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [typedPokemon, setTypedPokemon] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (event) =>{
        setTypedPokemon(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!typedPokemon) {
            return;
        }
        setIsLoading(true);
        try{
            const response = await api.get(`/pokemon/${typedPokemon}`);
            setPokemon(response.data);
            setError(null);
            setIsLoading(false);
        }   catch (error) {
            setError('Pokemon não encontrado!');
            setIsLoading(false);
            setPokemon(null);
        }
    };
    return(

        <div>
            <h1>Seja bem-vindo à pokedex!</h1>
            <p>
                digite o nome ou id de um pokemon para começar!
            </p>
            <form onSubmit = {handleSubmit}>
                <input
                value={typedPokemon}
                placeholder="Nome do pokemon/id"
                onChange={handleChange}/>
                <button type="submit">
                    {isLoading ? (
                        <span>carregando...</span>
                    ):(
                        <>
                        Buscar
                        </>
                    )}
                </button>
            </form>
    {pokemon && (
        <div key={pokemon.id}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div>
                <h2>{pokemon.name}</h2>
                <img
                  src={pokemon.sprites['front_default']}
                  alt={pokemon.name}
                />
              </div>
              <div>
                <span>
                  <strong>Height</strong>: {pokemon.height * 10} cm
                </span>
                <span>
                  <strong>Weight</strong>: {pokemon.weight / 10} kg
                </span>
                <span>
                  <strong>Type</strong>: {pokemon.types[0].type.name}
                </span>
                <span>
                  <strong>id</strong>: {pokemon.id}
                </span>
              </div>
            </>
          )}
        </div>
      )}

        </div>

        
    );

    

};
export default App;