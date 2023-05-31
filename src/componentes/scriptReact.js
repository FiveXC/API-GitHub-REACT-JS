function ExibindoInfosGitHub(props) {

    return (
      <div className="divDom">
        <div className="divAreaNomeFoto">
          <img
            className="imgDom"
            onClick={() => {
                window.open(props.dadosUser.html_url, "_blank");
            }}
            title="Clique para ir para o perfil."
            src={props.dadosUser.avatar_url}
          />
          <p className="nomeDom">
            {props.dadosUser.name ?? "Não possui nome cadastrado. 😥"}
          </p>
        </div>
  
        {
        props.repositorios.length > 0 && (
        <>
        <h2 className="h2repositorio">Repositórios</h2>
             <div className="divAreaRepositorio">
                {props.repositorios.map((ref, index) => (
                  <a className = "linkRepositorio" href = {ref.html_url} target="_blank" key={index} >{ref.full_name}</a>
                ))}
             </div>
         
        </>
        )
        }
      </div>
    );
}

export default ExibindoInfosGitHub










    




    








    




    