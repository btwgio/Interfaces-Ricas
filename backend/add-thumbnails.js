const fs = require('fs');

// Ler o arquivo atual
const data = JSON.parse(fs.readFileSync('games-database.json', 'utf8'));

// Função para gerar URL de thumbnail baseada no título
function generateThumbnail(titulo, genero, id) {
  const cleanTitle = titulo.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '+');
  
  // Cores baseadas no gênero
  const genreColors = {
    'RPG': '800080/FFFFFF',
    'FPS': 'FF4500/FFFFFF', 
    'Plataforma': 'FFD700/000000',
    'Aventura': '228B22/FFFFFF',
    'Ação': 'DC143C/FFFFFF',
    'Estratégia': '4169E1/FFFFFF',
    'Corrida': 'FF1493/FFFFFF',
    'Luta': 'FF0000/FFFFFF',
    'Esportes': '32CD32/000000',
    'Simulação': '9370DB/FFFFFF',
    'Survival Horror': '2F4F4F/FFFFFF',
    'Horror': '8B0000/FFFFFF',
    'Puzzle': '20B2AA/FFFFFF',
    'MMORPG': '4B0082/FFFFFF',
    'RTS': '006400/FFFFFF',
    'TPS': 'B22222/FFFFFF',
    'Metroidvania': '8A2BE2/FFFFFF',
    'Stealth': '696969/FFFFFF',
    'Battle Royale': 'FF8C00/FFFFFF',
    'MOBA': '1E90FF/FFFFFF',
    'Sandbox': 'D2691E/FFFFFF',
    'Musical': 'FF69B4/FFFFFF',
    'Party': 'FFB6C1/000000',
    'Social': '87CEEB/000000',
    'Roguelike': '8B4513/FFFFFF',
    'Card Game': '191970/FFFFFF',
    'Cooperativo': '00CED1/000000',
    'Survival': '556B2F/FFFFFF',
    'Criação': 'DDA0DD/000000'
  };
  
  const color = genreColors[genero] || '333333/FFFFFF';
  
  return `https://via.placeholder.com/300x400/${color}?text=${cleanTitle}`;
}

// Adicionar thumbnails a todos os jogos
data.games = data.games.map(game => {
  if (!game.thumbnail) {
    game.thumbnail = generateThumbnail(game.titulo, game.genero, game.id);
  }
  return game;
});

// Salvar o arquivo atualizado
fs.writeFileSync('games-database.json', JSON.stringify(data, null, 2), 'utf8');

console.log(`✅ Adicionadas thumbnails para ${data.games.length} jogos!`);
console.log('🖼️ Exemplos de thumbnails geradas:');
data.games.slice(0, 5).forEach(game => {
  console.log(`   ${game.titulo}: ${game.thumbnail}`);
});
