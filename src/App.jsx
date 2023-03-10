import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";


function App() {
  const [id, setId] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [duracao, setDuracao] = useState("");
  const [listaDisciplinas, setListaDisciplinas] = useState([])

  const addItem = () => {
    if(disciplina === "" || duracao === "") {
      alert("Preencha todas as informações")
      return;
    }
    setListaDisciplinas([...listaDisciplinas,{
      id: Date.now(),
      disciplina: disciplina,
      duracao: duracao,
    },
    ])
    setDisciplina("");
    setDuracao("");
    setId("");
  }

  const apagarItem = (id) => {
    if(confirm("Deseja realmente apagar o item?")){
      const result = listaDisciplinas.filter((item) => item.id !== id);
      setListaDisciplinas(result);
    }
  }

  const editarItem = (item) => {
    alert(JSON.stringify(item));
    setId(item.id);
    setDisciplina(item.disciplina);
    setDuracao(item.duracao);
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
                <button className="btn success" onClick={addItem} > {id ? "Atualizar" : "Aidiconar"} </button>
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
                    onClick={() => editarItem(item)}/> </button>
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
