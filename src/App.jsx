import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";


function App() {
  const [id, setId] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [duracao, setDuracao] = useState("");
  const [listaDisciplinas, setListaDisciplinas] = useState([])

  const itemDaLista = {
    id: id =="" ? Date.now() : id,
    disciplina: disciplina,
    duracao: duracao,
  }
  
  const addItem = (event) => {
    // debugger
    event.preventDefault();
    if(validaCampo(itemDaLista)){
      return;
    }
    
    // if(id != ""){
    //   const newListaDisciplinas = listaDisciplinas.slice()
    //   let index = newListaDisciplinas.findIndex(item => {
    //     return item.id == id;
    //   });
    //   newListaDisciplinas[index].disciplina = itemDaLista.disciplina;
    //   newListaDisciplinas[index].duracao = itemDaLista.duracao; 
    // }else{
      setListaDisciplinas([...listaDisciplinas,itemDaLista]);
    // }

    limparForm();
  }

  const editItem = (event) =>{
    event.preventDefault();
    if(validaCampo(itemDaLista)){
      return;
    }
    const newListaDisciplinas = listaDisciplinas.slice()
    let index = newListaDisciplinas.findIndex(item => {
      return item.id == id;
    });
    newListaDisciplinas[index].disciplina = itemDaLista.disciplina;
    newListaDisciplinas[index].duracao = itemDaLista.duracao; 
    limparForm();
  }

  const apagarItem = (id) => {
    if(confirm("Deseja realmente apagar o item?")){
      const result = listaDisciplinas.filter((item) => item.id !== id);
      setListaDisciplinas(result);
    }
  }

  const carregarDados = (index) => {
    let indexItem = index-1;
    const itemResult = listaDisciplinas[indexItem];
    setId(itemResult.id)
    setDisciplina(itemResult.disciplina);
    setDuracao(itemResult.duracao);
  }

  const validaCampo = (item) =>{
    let msg = "";
    if(item.disciplina == "")
      msg += "- Informe o nome da disciplina \n";
    
    if(item.duracao == "")
      msg += "- Informe a carga horaria da disciplicn. \n";
    
    if(msg != ""){
      alert(msg);
      return true;
    }
    return false;
  }

  const limparForm = () =>{
    setDisciplina("");
    setDuracao("");
    setId("");
  }
  
  

  return (
    <div className="container">
      <div className="col-12" >
        <h1> Cadastro de Disciplina</h1>
        <div className="col-4">
          <form>
            <span>Disciplina <strong style={{color:"red"}}> *</strong> </span>
            <input type="text" 
              required
              onChange={(event) => setDisciplina (event.target.value)} 
              value={disciplina}
              />

              <span>Duração <strong style={{color:"red"}}> *</strong> </span>
              <select required onChange={(event) => setDuracao(event.target.value)} value={duracao} >
                <option value="">Selecione uma opção</option>
                <option value="40">40 horas</option>
                <option value="60">60 horas</option>
                <option value="80">80 horas</option>
              </select>
              <div>
                <button className="btn success" onClick={(event) => id ? editItem(event) : addItem(event)} > {id ? "Atualizar" : "Aidiconar"} </button>
              </div>
          </form>
        </div>
        <div className="col-8">
          {listaDisciplinas.length > 0 ? (
            <ul>
              {listaDisciplinas.map((item, index) => (
                <li key={index}>
                  <h3> {index++ +1} - {item.disciplina} <br />
                  <small>{item.duracao} Horas</small>
                  </h3>
                  <div className="right">
                    <button className="btnIcon danger_outline"> <FontAwesomeIcon icon={faTrashAlt} 
                    onClick={() => apagarItem(item.id)}/> </button>
                    <button className="btnIcon alert_outline"> <FontAwesomeIcon icon={faPencil} 
                    onClick={() => carregarDados(index)}/> </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (<p>Nenhum item cadastrado</p>)}
        </div>
      </div>
    </div>
  )
}

export default App
