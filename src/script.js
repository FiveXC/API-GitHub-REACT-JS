import './styles.css'
//import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, useRef } from 'react';
import ExibindoInfosGitHub  from './componentes/scriptReact'

function App() {

let [dadosUser, setDadosUser] = useState('')
let [repUser,setRepUser] = useState('')
let inputGithub = useRef();
let btnPrincipal = useRef();

function limpandoAozerarInput(){
    if(!inputGithub.current.value){
    setDadosUser('')
    setRepUser('')
  }
}

function rodarAoApertarEnter(event){
    if (event.key === "Enter") {
      event.preventDefault();
      btnPrincipal.current.click(); 
     }
}



async function pegandoInfosUser(event){
event.preventDefault();
try{

if(inputGithub.current.value){

        let infosPessoas = await fetch(`https://api.github.com/users/${inputGithub.current.value}`)

        if(infosPessoas.ok){
            infosPessoas = await infosPessoas.json()
            setDadosUser(infosPessoas)
        }
        else{
            throw new Error(`Erro na requisição infosPessoas, ERROR: ${infosPessoas.status}`);
        }
        

        let repositorios = await fetch(`https://api.github.com/users/${inputGithub.current.value}/repos`)

        if(repositorios.ok){
            repositorios = await repositorios.json()
            setRepUser(repositorios)
        }
        else{
            throw new Error(`Erro na requisição repositorios, ERROR: ${repositorios.status}`);
        }
}
    
else{
 alert("Preencha o campo de busca.")
}

}
catch(error){
    if(error.message.includes(404) ){
        alert("Usuario não encontrado.")
       }
    else{
        alert("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
        throw new Error(error)
    }
  
}

}

return (
<>
<section className = "areaInput">

<h3>Buscar usuário</h3>

    <form onKeyDown={rodarAoApertarEnter}>
      <input type = "text" ref = {inputGithub} className = "inputGitHub" placeholder="Digite seu github." onInput= {limpandoAozerarInput}/>
      <button type = "submit" className = "btnPrincipal" onClick={pegandoInfosUser} ref={btnPrincipal} >Buscar</button>
    </form>

<div className = "domAPI">
     {
      typeof dadosUser === "object" && Array.isArray(repUser)?(
        <ExibindoInfosGitHub  dadosUser = {dadosUser} repositorios = {repUser}/>
      ):('')
     }     
</div>

</section>

                     
</>
);

}  
export default App;










