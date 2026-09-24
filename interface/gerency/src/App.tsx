import { useState, useEffect } from 'react'
import Add from './components/addTransaction.tsx'
import UserTr from './components/UserTr.tsx'
import UserSale from './components/UserSale.tsx'
import './App.css'
import axios from 'axios'


  //COMPONENTE PRINCIPAL DO PROJETO, ONDE SÃO CHAMADOS OS OUTROS COMPONENTES E É FEITA A BUSCA DAS 
  // TRANSAÇÕES NO BANCO DE DADOS


    interface Transacao{
        id:number,
        tipo:string,
        valor:number,
        categoria:string,
        descricao:string, 
        data:string
    }

function App() {

      //Estados que guardam as transações e as categorias selecionadas para filtro
        const [transacoes, setTransacoes] = useState<Transacao[]>([]) 
        const [opcoesFiltro, setOpcoesFiltro]= useState<string[]>(["Todos"])  


      //Função para buscar as transações no banco de dados e atualizar o estado do componente
        const buscarTransacoes = async () => {
          try {
            const response = await axios.get('https://controle-de-gastos-ur8h.onrender.com/transacoes');
            
            setTransacoes(response.data)           

          } catch (error) {
            console.error('Erro ao buscar transações:', error)
          }
        }
        
      useEffect(() => {
              buscarTransacoes()
          }, []);

      //Função para lidar com a mudança de seleção das categorias de filtro

        function handleChange(e: React.ChangeEvent<HTMLInputElement>){

          const opSelecionada= e.target.value 

           if (opSelecionada === "Todos") {
                setOpcoesFiltro(["Todos"]);
                return;
              }

              setOpcoesFiltro((opcoesAnteriores) => {
                const novasOpcoes = opcoesAnteriores.filter(
                  (item) => item !== "Todos"
                );

                if (novasOpcoes.includes(opSelecionada)) {
                  return novasOpcoes.filter(
                    (item) => item !== opSelecionada
                  );
                }

                return [...novasOpcoes, opSelecionada];
              });
            }

        const transacoesFiltradas= transacoes.filter((transacao)=>{
          if(opcoesFiltro.length === 0 || opcoesFiltro.includes("Todos")){
            return true
          }

          return opcoesFiltro.includes(transacao.categoria)
        })

        
        
  return (


    <div className="content">

      <div className="header">
        <img src="\logo.png" alt="Gerency" className="logo"/>
        <h1>Gerency</h1>
      </div>  

      {/*saldo total*/}
      <UserSale UserT={transacoes}/> 
            

       {/*add-transaction*/}
      < Add  fetchTransacoes={buscarTransacoes}/> 

      <div>
        <p className="titulo-transacoes">Transações Recentes</p> 
      </div>

              <div className="filtros">
                  <form >
                      <label htmlFor="todos" className={
                            opcoesFiltro.includes("Todos")
                              ? "filtro selecionado"
                              : "filtro"
                          }>
                        <input type="checkbox" id="todos" className="filtro-opcao" value={"Todos"} 
                        checked={opcoesFiltro.includes("Todos")} onChange={handleChange}/>
                        <span>Todos</span>
                      </label> 

                      <label htmlFor="alimentacao"  className={
                              opcoesFiltro.includes("Alimentação")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="alimentacao" className="filtro-opcao" value={"Alimentação"}
                        checked={opcoesFiltro.includes("Alimentação")} onChange={handleChange}/>
                        <span>
                        Alimentação
                        </span>
                      </label>

                      <label htmlFor="transporte" className={
                            opcoesFiltro.includes("Transporte")
                              ? "filtro selecionado"
                              : "filtro"
                          }>
                        <input type="checkbox" id="transporte" className="filtro-opcao" value={"Transporte"}
                        checked={opcoesFiltro.includes("Transporte")} onChange={handleChange}/>
                        <span>                          
                          Transporte
                        </span>
                      </label>

                      <label htmlFor="casa" className={
                              opcoesFiltro.includes("Casa")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="casa" className="filtro-opcao" value={"Casa"}
                        checked={opcoesFiltro.includes("Casa")} onChange={handleChange}/>
                        <span>Casa</span>
                      </label>

                      <label htmlFor="Freelancer" className={
                              opcoesFiltro.includes("Freelancer")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="Freelancer" className="filtro-opcao" value={"Freelancer"}
                        checked={opcoesFiltro.includes("Freelancer")} onChange={handleChange}/>
                        <span>Freelancer</span>
                      </label>

                      <label htmlFor="Salário" className={
                              opcoesFiltro.includes("Salário")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="Salário" className="filtro-opcao" value={"Salário"}
                        checked={opcoesFiltro.includes("Salário")} onChange={handleChange}/>
                        <span>Salário</span>
                      </label>

                      <label htmlFor="lazer"className={
                              opcoesFiltro.includes("Lazer")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="lazer" className="filtro-opcao" value={"Lazer"}
                        checked={opcoesFiltro.includes("Lazer")} onChange={handleChange}/>
                        <span>Lazer</span>
                      </label>

                      <label htmlFor="saude"className={
                              opcoesFiltro.includes("Saúde")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="saude" className="filtro-opcao" value={"Saúde"}
                        checked={opcoesFiltro.includes("Saúde")} onChange={handleChange}/>
                        <span>Saúde</span>
                      </label>

                      <label htmlFor="Pix recebido" className={
                              opcoesFiltro.includes("Pix recebido")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="Pix recebido" className="filtro-opcao" value={"Pix recebido"}
                        checked={opcoesFiltro.includes("Pix recebido")} onChange={handleChange}/>
                        <span>Pix recebido</span>
                      </label>

                      <label htmlFor="outros"className={
                              opcoesFiltro.includes("Outros")
                                ? "filtro selecionado"
                                : "filtro"
                            }>
                        <input type="checkbox" id="outros" className="filtro-opcao" value={"Outros"}
                        checked={opcoesFiltro.includes("Outros")} onChange={handleChange}/>
                        <span>Outros</span>
                      </label>

                    </form>
            </div> 

      <div className="transacoes">

        {transacoesFiltradas.length === 0 ?(
          <p>Nenhum gasto com essas categorias</p>
        ):(
          
          transacoesFiltradas.map((info) => (
          <UserTr
            key={info.id}
            transacao={info}
            onDelete={buscarTransacoes}
          />   
        ))
        )}
     
          
      </div>
    </div>
    
  )

  
}

export default App
