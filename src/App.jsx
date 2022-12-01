import { useState } from 'react';
import { itemsData } from "./itemsData";

import kingdom from "./items-image/Kingdom.png";
import paypal from "./items-image/Paypal.png"

import './App.css';

function App() {
  const [tentativas, setTentativas] = useState(0);
  const [cristalNegro, setCristalNegro] = useState(0);
  const [territe, setTerrite] = useState(0);
  const [stones, setStones] = useState(0);
  const [weapon, setWeapon] = useState();
  const [trys, setTrys] = useState(20);
  const [success, setSuccess] = useState(0);
  const [failure, setFailure] = useState(0);
  const [active, setMode] = useState(false);
  const [math, setMath] = useState(0)
  const [resultado, setResultado] = useState("")
  const [baseStat, setBaseStat] = useState(20)

  const ToggleMode = () => {
    setMode(!active);
  };


  const handleChange = (newWeapon) =>{
    setWeapon(newWeapon);
  }

  function aprimoramento() {
    setMath(Math.random())
    setTentativas(tentativas + 1);
    setCristalNegro(cristalNegro + 30);
    setTerrite(territe + 100);
    setStones(stones + 1);

    if(math > 0.5){
      setResultado("Sucesso")
      setTrys((p) => (p - 1));
      setTrys((p) => (p + 2));
      setSuccess((p) => (p + 1));
    }
    if(math < 0.5){
      setResultado("Falha")
      setFailure((p) => (p + 1))
      if(trys === 20){
        setTrys(20)
      }else{
        setTrys((p) => (p) - 1);;
      }
    }
  }



  const refreshPage = () =>{
    window.location.reload();
  }

  function initialEnhancement(e) {
      e.preventDefault();
      {baseStat === trys ? setBaseStat(baseStat) : setBaseStat(trys)};
      ToggleMode();
  }


  return (
    <div className="App">
      <div className='container-main'>
        <div className='container-item-selector'>
          <div className='item-selector'>
          <h2>Select an item to enchant</h2>
            <select onChange={(e) => handleChange(e.target.value)} value={weapon}>
              <option selected disabled>Select your item</option>
              {itemsData.name.map((item, index) => (<option key={item} className="itens" value={index}>{item}</option>))}
            </select>

            <div className={active ? "selecaoClose" : "selecaoOpen"}>
            
            <h4>Select the level of enhancement</h4>
            <form onSubmit={initialEnhancement}>
              <input type="number" min={20} max={99} value={trys} onChange={(e) => setTrys(e.target.value)}/>
              <input type='submit'value="Enhance" ></input>
            </form>
            </div>

            <button onClick={refreshPage}>Reset</button>
          </div>

        </div>

        <div className='item-enchant'>
          <div className='container-item-main'>
            <div className='container-item-top'>
              {weapon != null ? <img src={itemsData.image[weapon]} alt="imgWeapon" /> : <img src={kingdom} alt="imgWeapon" />}
              <h2>{resultado === "Sucesso" ?  <><h2 style={{color: "#9F4FF1"}}>Cursed</h2><h2>{itemsData.name[weapon]}</h2><h2 style={{color: "#9F4FF1"}}>{`+${trys}`}</h2></> : <><h2>{itemsData.name[weapon]}</h2><h2>{`+${trys}`}</h2></>}</h2>
              <h4>Enhance: {success - failure > 0 ? `+${success - failure}` : success - failure}</h4>
              <button onClick={aprimoramento}>Enhance Dark Magic (50% Success)</button>
            </div>
            <h3>Results</h3>
            <div className='item-results'>
              
              <h4>Initial Enhancement</h4>
              <p>{baseStat}</p>
              <h4>Current Enhancement</h4>
              <p style={{color:"#9F4FF1"}}>{trys}</p>
              <h4>Enhancement Stones Used</h4>
              <p>{stones}</p>
              <h4>Territe Used</h4>
              <p>{territe}</p>
              <h4>Dark Crystals Used</h4>
              <p>{cristalNegro}</p>
              <h4>Attempts</h4>
              <p>{tentativas}</p>
              <h4>Success</h4>
              <p style={{color:"#10B981"}}>{success}</p>
              <h4>Failures</h4>
              <p style={{color:"#EF4444"}}>{failure}</p>

            </div>
          </div>

        </div>

      </div>
      <footer>
        <div className='donation'>
          <h2>Help me with any amount!</h2>
          <a href=""><img src={paypal}atl="Donate Paypal" /></a>
        </div>
        <div className='specialThanks'>
          <div className='kingdom'>
            <h2>Kingdom</h2>
            <img src={kingdom}/>
            <p>DarkReunion</p>
          </div>

        </div>

      </footer>
    </div>
  )
}

export default App
