import './styles.css'
//import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, useRef } from 'react';
import ExibindoInfosGitHub from './componentes/scriptReact'




function App() {

let inputGithub = useRef();
let btnPrincipal = useRef();
let [dadosUser,setDadosUser] = useState('')
let [repUser,setRepUser] = useState('')

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
        let infosPessoas = await new Promise(async function (resolve, reject){

          let api = await fetch(`https://api.github.com/users/${inputGithub.current.value}`)
      
          if(!inputGithub.current.value){
             alert("Por favor preencha o campo de pesquisa.")
        
          }
          else if(api.ok){
              let apiTratada = await api.json()
              resolve(apiTratada)
          }
  
          else{
              reject(`erro na promise infosPessoas, ${api.status}`)
              inputGithub.current.value = ""
          }
      })

      let repositorio = await new Promise(async function (resolve, reject){ 
    
        let api = await fetch(`https://api.github.com/users/${inputGithub.current.value}/repos`)
        
         if(api.ok){
            let apiTratada = await api.json()
            resolve(apiTratada)
        }
           
        else{
            reject(`erro na promise repositorio, ${api.status}`)
          inputGithub.current.value = ""
        }
           
        })
           
      setDadosUser(infosPessoas)
      setRepUser(repositorio)
      }
      catch(error){
        if(error.includes(404) ){
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
            <button type = "submit" className = "btnPrincipal" onClick = {pegandoInfosUser} ref = {btnPrincipal}>Buscar</button>
          </form>

      <div className = "domAPI">
           {
            typeof dadosUser === "object" && Array.isArray(repUser)?(
              <ExibindoInfosGitHub dadosUser = {dadosUser} repositorios = {repUser}/>
            ):('')
           }     
    </div>

</section>

                     
      </>
);
}

    
export default App;










