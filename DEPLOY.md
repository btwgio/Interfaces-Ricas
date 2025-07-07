# 🚀 Guia de Deploy para GitHub Pages

## 📋 Pré-requisitos Concluídos ✅

- [x] Configuração do `angular.json` para deploy
- [x] Scripts de build e deploy no `package.json`
- [x] Workflow do GitHub Actions configurado
- [x] Arquivo `.nojekyll` criado
- [x] Configuração do `baseHref` para `/Interfaces-Ricas/`
- [x] Ajuste dos budgets de build para aceitar bundles maiores

## 🌐 Próximos Passos

### 1. Criar Repositório no GitHub
1. Acesse [GitHub.com](https://github.com)
2. Clique em "New repository"
3. Nome do repositório: `Interfaces-Ricas`
4. Marque como público
5. NÃO inicialize com README (já temos um)

### 2. Conectar Repositório Local ao GitHub
```bash
# Adicionar remote origin (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/Interfaces-Ricas.git

# Fazer push para o GitHub
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages
1. Vá para o repositório no GitHub
2. Clique em "Settings" → "Pages"
3. Em "Source", selecione "GitHub Actions"
4. O workflow já está configurado e será executado automaticamente

### 4. Métodos de Deploy

#### Método 1: Deploy Automático (Recomendado)
- Toda vez que você fizer push para `main`, o GitHub Actions fará o deploy automaticamente
- Acesse: `https://SEU_USUARIO.github.io/Interfaces-Ricas/`

#### Método 2: Deploy Manual
```bash
# Opção 1: Usando o script npm
npm run deploy

# Opção 2: Usando Angular CLI
ng deploy
```

## 🔧 Comandos Úteis

### Build Local
```bash
# Build de desenvolvimento
npm run build

# Build de produção
npm run build:prod

# Servir localmente
npm start
```

### Deploy Manual
```bash
# Build e deploy em um comando
npm run deploy

# Verificar se o build está funcionando
npm run build:prod
```

## 🐛 Troubleshooting

### Problema: Erro de Bundle Size
**Solução**: Já configurado - aumentamos os limites de budget no `angular.json`

### Problema: Rotas não funcionam no GitHub Pages
**Solução**: Criar arquivo `404.html` que redireciona para `index.html`

### Problema: Assets não carregam
**Solução**: Verificar se o `baseHref` está configurado corretamente

## 📂 Estrutura de Deploy

```
dist/temp/
├── index.html          # Página principal
├── *.js               # Arquivos JavaScript
├── *.css              # Arquivos CSS
├── *.ico              # Favicon
├── .nojekyll          # Previne processamento Jekyll
└── assets/            # Recursos estáticos
```

## 🎉 Verificação Final

Após o deploy, verifique:
1. ✅ Site carrega em `https://SEU_USUARIO.github.io/Interfaces-Ricas/`
2. ✅ Navegação funciona
3. ✅ Estilos carregam corretamente
4. ✅ Assets (imagens, ícones) funcionam

---

**Nota**: Lembre-se de substituir `SEU_USUARIO` pelo seu username real do GitHub!
