import React, { useState } from "react";
import './addTransaction.css'
import axios from "axios";

    //ADICIONANDO NOVA TRANSAÇÃO AO BANCO DE DADOS    

    interface AddProps {
            fetchTransacoes: () => Promise<void> | void;
    }


    function Add({ fetchTransacoes }: AddProps) {
        
        //controla se o modal esta aberto ou fechado
        const[ModalOpen, setModalOpen]= useState(false)

        //guarda o tipo da movimentação
        const[tipo, setTipo]= useState("entrada")

        //guarda o valor digitado
        const [valor, setValor] = useState<number | "">("");

        //guarda a categoria
        const[categoria, setCategoria]= useState("")

        //guarda a descrição
        const[descricao, setDescricao]= useState("")

                                
    //Função para enviar os dados para o backend

       async function handleSubmit(e:React.SyntheticEvent){
            e.preventDefault()

            if (valor === "" || valor <= 0) {
            alert("Por favor, insira um valor válido.")
            return;
        }


            await axios.post('https://controle-de-gastos-ur8h.onrender.com', {
                id: Date.now(),
                tipo:tipo,
                valor:valor, 
                categoria:categoria, 
                descricao:descricao, 
                data: new Date().toLocaleDateString('pt-BR')
            })

            await fetchTransacoes(); 

            

           //fecha o modal 
            setModalOpen(false)

            //zerar valores
            setValor('')
            setCategoria('')
            setDescricao('')
            setTipo('')

        }
        
        return(
            <div className="app">
                <button className="btn-green" onClick={()=> setModalOpen(true)}>
                    <img src="add.png" alt="add" className="size-icon"/>
                    Receita
                </button>

                <button className="btn-red" onClick={()=> setModalOpen(true)}>
                    <img src="remove.png" alt="remove" className="size-icon"/>
                    Despesa
                </button>

                {ModalOpen &&(
                    <div className="overlay">
                        <div className="modal">

                            {/*fechar modal*/}

                            <button className="btn-close" onClick={()=>setModalOpen(false)}>
                                <img src="close.png" alt="close"/>
                            </button>
                            
                            

                        <form onSubmit={handleSubmit} >

                            <h2>Transação</h2>
                            {/*tipo*/}
                            <div className="espaço-radio">
                            <label>
                                <input
                                type="radio"
                                name="tipo"
                                value="entrada"
                                checked={tipo === "entrada"}
                                onChange={() => setTipo("entrada")}
                                />
                                Entrada
                            </label>

                            <label>
                                <input
                                type="radio"
                                name="tipo"
                                value="saida"
                                checked={tipo === "saida"}
                                onChange={() => setTipo("saida")}
                                />
                                Saída
                            </label>
                            </div>

                            {/*valor*/}

                            <div className="espaço">
                                <label htmlFor="valor">Valor</label>
                                <input type="number" value={valor}
                                onChange={(event) => setValor(event.target.value === "" ? "" : Number(event.target.value))}/>
                            </div>

                            <div className="espaço">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="string" value={descricao} 
                                onChange={(event)=> setDescricao(event.target.value)}/>
                            </div>
                            <div className="espaço">
                                
                                <select
                                    value={categoria}
                                    onChange={(event) =>
                                    setCategoria(event.target.value as "Alimentação" |"Lazer"|"Pix recebido"|"Freelancer"|"Salario"| "Casa"|"Transporte"| "Saúde"| "Outros")
                                    }
                                >
                                    <option value="" disabled>Categoria</option>
                                    <option value="Alimentação">Alimentação</option>
                                    <option value="Lazer">Lazer</option>
                                    <option value="Pix recebido">Pix recebido</option>
                                    <option value="Freelancer">Freelancer</option>
                                    <option value="Salario">Salario</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Outros">Outros</option>
                                </select>    
                            </div>

                            {/*botoes*/}
                            <div className="espaço-btn">
                                <button type="submit" className="btn-confirmar" >
                                    Confirmar
                                </button>
                            </div>
                        </form>
                        
                        </div>
                    </div>
                )}

            </div>

        )
            
    }

    export default Add