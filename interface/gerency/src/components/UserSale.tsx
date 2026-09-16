import './UserSale.css'

    //COMPONENTE QUE MOSTRA O SALDO TOTAL, ENTRADAS E SAIDAS

        interface Transacoes{
              id:number,
              tipo:string,
              valor:number,
              categoria:string,
              descricao:string, 
              data:string
          }

        interface UserSaleProps {
            UserT: Transacoes[]
          }

        
          function UserSale({UserT}:UserSaleProps){ 

                //calcula o total de entradas, saidas e saldo total

                const entradasTotal= UserT.filter( todasTransacoes => 
                    {return(todasTransacoes.tipo == "entrada")}).reduce((acumulador, entradas)=>{
                        return acumulador + entradas.valor
                    },0)                         
                
                const saidasTotal= UserT.filter( todasTransacoes => 
                    {return(todasTransacoes.tipo == "saida")}).reduce((acumulador, saidas)=>{
                        return acumulador + saidas.valor
                    },0)
                                 
                const saldoTotal= entradasTotal - saidasTotal     

                return(
            
            
            <div>

                <div className="saldo-total">
                    <h2>Saldo Total</h2>
                    <h2> {saldoTotal.toLocaleString('pt-br',{style:'currency', currency: 'BRL'})}</h2>
                </div>

                <div className="receitas-despesas">      
                    <div className="fluxo-caixa">
                        <p>
                        <img src="up.png" alt="up" className="size-icon"/>  
                        Entradas
                        </p>
                        <p className="valor">{entradasTotal.toLocaleString('pt-br',{style:'currency', currency: 'BRL'})}</p>             
                    </div>

                    <div className="fluxo-caixa">
                        <p>  
                        <img src="down.png" alt="down" className="size-icon"/>  
                        Saídas
                        </p>
                        <p className="valor">{saidasTotal.toLocaleString('pt-br',{style:'currency', currency: 'BRL'})}</p>  
                    </div>
                </div>  
            </div>
                )
          }

export default UserSale