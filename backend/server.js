const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '3600');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  
  next();
});

app.use(cors());

app.use(express.json());

let myGameList = [
  { id: 1, titulo: "Cyberpunk 2077", ano: 2020, genero: "RPG", plataforma: "PC", completado: true },
  { id: 2, titulo: "The Witcher 3", ano: 2015, genero: "RPG", plataforma: "PC", completado: false },
  { id: 3, titulo: "God of War", ano: 2018, genero: "Ação/Aventura", plataforma: "PS4", completado: true },
  { id: 4, titulo: "Persona 3", ano: 2006, genero: "J-RPG", plataforma: "PS2", completado: true },
  { id: 5, titulo: "Horizon Zero Dawn", ano: 2017, genero: "Ação/RPG", plataforma: "PS4", completado: false },
  { id: 6, titulo: "Mass Effect 2", ano: 2010, genero: "RPG", plataforma: "PC", completado: true },
  { id: 7, titulo: "Final Fantasy X", ano: 2001, genero: "J-RPG", plataforma: "PS2", completado: true },
  { id: 8, titulo: "Red Dead Redemption 2", ano: 2018, genero: "Ação/Aventura", plataforma: "PC", completado: false },
  { id: 9, titulo: "NieR: Automata", ano: 2017, genero: "Ação/J-RPG", plataforma: "PC", completado: true },
  { id: 10, titulo: "Dark Souls III", ano: 2016, genero: "RPG/Ação", plataforma: "PC", completado: false },
  { id: 11, titulo: "Dragon Age: Inquisition", ano: 2014, genero: "RPG", plataforma: "PC", completado: true },
  { id: 12, titulo: "Bloodborne", ano: 2015, genero: "Ação/RPG", plataforma: "PS4", completado: false },
  { id: 13, titulo: "Shin Megami Tensei V", ano: 2021, genero: "J-RPG", plataforma: "Switch", completado: true }
];

let nextId = Math.max(...myGameList.map(g => g.id)) + 1;

let gamesDatabase = [];
try {
  const dbPath = path.join(__dirname, 'games-database.json');
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  const parsedDB = JSON.parse(dbContent);
  gamesDatabase = parsedDB.games;
  console.log(`Carregados ${gamesDatabase.length} jogos do banco de dados`);
} catch (error) {
  console.error('Erro ao carregar banco de dados:', error);
  gamesDatabase = [
    { id: 1001, titulo: "Cyberpunk 2077", ano: 2020, genero: "RPG", plataforma: "PC" },
    { id: 1002, titulo: "The Witcher 3", ano: 2015, genero: "RPG", plataforma: "PC" },
    { id: 1003, titulo: "God of War", ano: 2018, genero: "Ação/Aventura", plataforma: "PS4" }
  ];
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'API My Game List - Backend rodando!',
    endpoints: {
      'GET /api/games': 'Listar meus jogos',
      'GET /api/games/:id': 'Obter jogo por ID',
      'POST /api/games': 'Adicionar jogo',
      'PUT /api/games/:id': 'Atualizar jogo',
      'DELETE /api/games/:id': 'Remover jogo',
      'GET /api/autocomplete?q=': 'Autocomplete de jogos',
      'GET /api/search?q=': 'Buscar jogos externos',
      'GET /api/popular': 'Jogos populares'
    }
  });
});

app.get('/api/games', (req, res) => {
  res.json(myGameList);
});

app.get('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const game = myGameList.find(g => g.id === id);
  
  if (!game) {
    return res.status(404).json({ error: 'Jogo não encontrado' });
  }
  
  res.json(game);
});
app.post('/api/games', (req, res) => {
  const { titulo, ano, genero, plataforma, completado } = req.body;
  
  if (!titulo || !ano || !genero || !plataforma) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, ano, genero, plataforma' });
  }
  
  const newGame = {
    id: nextId++,
    titulo,
    ano,
    genero,
    plataforma,
    completado: completado || false
  };
  
  myGameList.push(newGame);
  res.status(201).json(newGame);
});

app.put('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, ano, genero, plataforma, completado } = req.body;
  
  const gameIndex = myGameList.findIndex(g => g.id === id);
  
  if (gameIndex === -1) {
    return res.status(404).json({ error: 'Jogo não encontrado' });
  }
  
  myGameList[gameIndex] = {
    ...myGameList[gameIndex],
    titulo: titulo || myGameList[gameIndex].titulo,
    ano: ano || myGameList[gameIndex].ano,
    genero: genero || myGameList[gameIndex].genero,
    plataforma: plataforma || myGameList[gameIndex].plataforma,
    completado: completado !== undefined ? completado : myGameList[gameIndex].completado
  };
  
  res.json(myGameList[gameIndex]);
});

app.delete('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const gameIndex = myGameList.findIndex(g => g.id === id);
  
  if (gameIndex === -1) {
    return res.status(404).json({ error: 'Jogo não encontrado' });
  }
  
  myGameList.splice(gameIndex, 1);
  res.json({ message: 'Jogo removido com sucesso' });
});

app.get('/api/autocomplete', (req, res) => {
  console.log('🔍 Requisição de autocomplete recebida:', req.query.q);
  
  try {
    const query = req.query.q;
    
    if (!query || query.length < 2) {
      console.log('Query muito curta, retornando array vazio');
      return res.json([]);
    }

    const suggestions = gamesDatabase
      .filter(game => 
        game.titulo.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10)
      .map(game => ({
        id: game.id,
        titulo: game.titulo,
        ano: game.ano,
        genero: game.genero,
        plataforma: game.plataforma,
        completado: false,
        label: `${game.titulo} (${game.ano})`,
        value: game.titulo,
        thumbnail: game.thumbnail || `https://via.placeholder.com/64x64/007ACC/FFFFFF?text=${encodeURIComponent(game.titulo.substring(0, 2))}`
      }));

    console.log(`✅ Encontrados ${suggestions.length} jogos para "${query}"`);
    res.json(suggestions);
  } catch (error) {
    console.error('❌ Erro no autocomplete:', error);
    res.json([]);
  }
});

app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório' });
    }

    const results = gamesDatabase
      .filter(game => 
        game.titulo.toLowerCase().includes(query.toLowerCase()) ||
        game.genero.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 20)
      .map(game => ({
        ...game,
        completado: false,
        thumbnail: game.thumbnail || `https://via.placeholder.com/300x200/007ACC/FFFFFF?text=${encodeURIComponent(game.titulo.substring(0, 3))}`
      }));

    res.json(results);
  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/popular', (req, res) => {
  try {
    const popular = gamesDatabase
      .slice(0, 15)
      .map(game => ({
        ...game,
        completado: false,
        thumbnail: game.thumbnail || `https://via.placeholder.com/300x200/007ACC/FFFFFF?text=${encodeURIComponent(game.titulo.substring(0, 3))}`,
        short_description: `${game.titulo} é um excelente jogo de ${game.genero} para ${game.plataforma}.`
      }));

    res.json(popular);
  } catch (error) {
    console.error('Erro ao buscar jogos populares:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Fake Server rodando na porta ${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`   GET    /api/games           - Listar meus jogos`);
  console.log(`   GET    /api/games/:id       - Obter jogo por ID`);
  console.log(`   POST   /api/games           - Adicionar jogo`);
  console.log(`   PUT    /api/games/:id       - Atualizar jogo`);
  console.log(`   DELETE /api/games/:id       - Remover jogo`);
  console.log(`   GET    /api/autocomplete?q= - Autocomplete de jogos`);
  console.log(`   GET    /api/search?q=       - Buscar jogos externos`);
  console.log(`   GET    /api/popular         - Jogos populares`);
});
