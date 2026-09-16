
import './UserTr.css'

    //COMPONENTE QUE MOSTRA CADA TRANSAÇÃO, SEJA DE ENTRADA OU SAIDA
    
        interface Transacoes{
              id:number,
              tipo:string,
              valor:number,
              categoria:string,
              descricao:string, 
              data:string
          }

        interface UserTrProps {
            transacao: Transacoes,
            onDelete: (id: number) => void;
          }

            
      
      
      function UserTr({ transacao, onDelete }: UserTrProps){

      //Função para deletar a transação do banco de dados e atualizar a lista de transações no frontend

        const handleDelete = async() => {
          try{
            const response = await fetch(`http://localhost:3008/transacoes/${transacao.id}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              onDelete(transacao.id);
            }
          } catch (error) {
            console.error('Erro ao excluir transação:', error);
          }
        };

        return(
              <div> 
             

              <div className="transacao" key={transacao.id}>
                  
                <div className="icon-container">
                  <img src={transacao.categoria + '.png'} alt="Icone" className="icon-saida"/>
                </div>

               <div className="transacao-info"> 
                  <p className="descricao">
                  {transacao.descricao}
                  </p>
                  <p className="categoria">{transacao.categoria} * {transacao.data}</p>
                </div>

                <div className="transacao-valor">
                  <p className={`valor ${transacao.tipo === "saida" ? "valor-saida" : "valor-entrada"}`}>
                    {transacao.tipo==="saida" ? "- ": "+ " }
                     {   
                        transacao.valor.toLocaleString('pt-br',{
                        style:'currency', currency:'BRL'})
                      } 
                  </p>     
                </div>

                <div>
                  <button className="btn-trash" onClick={handleDelete}>
                  <img src="trash.png" alt="trash" className="trash-icon"/>
                  </button> 
                </div>
              </div>
            </div>
        )
      }

  export default UserTr
