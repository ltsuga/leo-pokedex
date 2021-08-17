import './App.css';
import axios from "axios"
import React,{useState} from "react"
import {useEffect} from "react"

const App = () => {
  const [pokemon,setPokemon] = useState("eevee");
  const [pokemonData,setPokemonData] = useState([]);
  const [pokemonType,setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try{
      const url = 'https://pokeapi.co/api/v2/pokemon/'+pokemon;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);

      console.log(res);

    }catch(e){
      console.log(e);
    }
  }

const handleChange = (e) => {
  setPokemon(e.target.value.toLowerCase());
}

const handleSubmit = (e) => {
  e.preventDefault();
  getPokemon();
}

  return (
     <div className="App">
       <form onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange={handleChange} placeholder="Digite o nome do Pokemon"/>
          </label>
       </form>
      {pokemonData.map((data)=> {
      return(
        <div className="container">
        <img src={data.sprites["front_default"]}/>
        <div className = "divTable">
        <div className = "divTableBody">
        <div className = "divTableRow">
          <div className = "divTableCell">Tipo</div>
          <div className = "divTableCell">{pokemonType}</div>
        </div>
        <div className = "divTableRow">
          <div className = "divTableCell">Altura</div>
          <div className = "divTableCell">{" "}{Math.round(data.height)/10} mts</div>
        </div>
        <div className = "divTableRow">
          <div className = "divTableCell">Peso</div>
          <div className = "divTableCell">{" "}{Math.round(data.weight)/10} kgs</div>
        </div>
        <div className = "divTableRow">
          <div className = "divTableCell">Base XP</div>
          <div className = "divTableCell">{data.base_experience}</div>
        </div>
        </div>
        </div>
        </div>
        )
        }
        )
      }
      </div>
  )
}

export default App;