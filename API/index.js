import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

//conectando com o mongodb
mongoose.connect('mongodb+srv://pollyanastefanies2_db_user:X7vnngeGsEapRUgN@cluster0.9lvlrax.mongodb.net/Transacoes?appName=Cluster0')
.then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.log('Erro ao conectar ao MongoDB:', err.message);
});


const transacaoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  categoria: { type: String, required: true },
  descricao: { type: String, required: false },
  data: { type: String, required: true }
},{ timestamps: true });


const Transacao = mongoose.model('Transacao', transacaoSchema);

//Rota para buscar todas as transações

app.get('/transacoes', async (request, response) => {
   
  const transacoes = await Transacao.find()
  .sort({ createdAt: -1 });

   response.status(200).json(transacoes);
})

//Rota para criar uma nova transação

app.post('/transacoes', async (request, response) => {
  try {
    

    const novaTransacao = await Transacao.create(request.body);

    response.status(201).json(novaTransacao);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

//Rota para deletar uma transação pelo ID

app.delete('/transacoes/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const transacao = await Transacao.findOneAndDelete({ id: Number(id) });

    response.status(200).json({ message: 'Transação excluída com sucesso' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(3008, () => {
  console.log('Servidor rodando na porta 3008');
});