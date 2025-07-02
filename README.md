# 🏃‍♂️ Fitness Tracker - Teste Técnico Fullstack Mobile

Uma aplicação completa para **registro de atividades físicas** com autenticação e chatbot inteligente.

## 📋 Sobre o Projeto

Aplicação desenvolvida para teste técnico de Desenvolvedor Fullstack Mobile Pleno. Permite registro de atividades físicas, autenticação segura e interação com chatbot.

### ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Login e registro com email/senha
- 📊 **Registro de Atividades** - Cadastro de exercícios com nome, duração e intensidade
- 🤖 **Chatbot Inteligente** - Interface conversacional para dicas de exercícios
- 📱 **Interface Mobile** - App responsivo com React Native/Expo

## 🛠️ Stack Tecnológica

**Backend:** NestJS, Prisma ORM, PostgreSQL (Neon), JWT, Zod, bcryptjs  
**Mobile:** React Native, Expo, TypeScript, NativeWind, React Query  
**DevOps:** ESLint, Prettier, Husky, Swagger

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório

```bash
# Clone o projeto
git clone https://github.com/PhelipeG/teste-fullstack-mobile.git

# Navegue para o diretório
cd teste-fullstack-mobile
```

### 2. 🔧 Backend

```bash
# Navegue para backend
cd teste-fullstack-mobile/backend


# Instale dependências
npm install

# Configure .env
DATABASE_URL="sua_url_do_neon_aqui"
JWT_SECRET="seu_jwt_secret_aqui"
GEMINI_API_KEY="sua_chave_gemini_aqui"

# Configure banco
npx prisma generate
npx prisma migrate dev --name init

# Inicie servidor
npm run start:dev
```

### 3. 🌐 Expose o Backend (ngrok)

**Para testar no dispositivo móvel, use ngrok:**

```bash
# Em outro terminal, instale ngrok
npm install -g ngrok

# Exponha o backend
ngrok http 3000

# Anote a URL gerada (ex: https://abc123.ngrok.io)
```

### 4. 📱 Mobile

```bash
# Navegue para mobile
cd teste-fullstack-mobile/mobile-app

# Instale dependências
npm install

# Configure .env com a URL do ngrok
EXPO_PUBLIC_API_URL="https://sua-url-ngrok.ngrok.io"

# Inicie app
npm start
```

## 📱 **Demo Online**

### 🚀 **Teste no Expo Go:**

**⚠️ Importante:** Antes de testar, inicie o backend e ngrok!

1. **Instale o Expo Go:**

   - [📱 Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [📱 iOS](https://apps.apple.com/app/expo-go/id982107779)

2. **Acesse o app via túnel:**

   ```
   🔗 Link Direto: exp://sl-gq-shakah-8081.exp.direct
   ```

   **Ou escaneie o QR code gerado pelo comando:**

   ```bash
   cd mobile-app
   npx expo start --tunnel
   ```

3. **Credenciais para teste:**
   - Email: `teste@gmail.com`
   - Senha: `123456`

### 📋 **Passo a passo SIMPLIFICADO para avaliadores:**

```bash
# 1. Clone e configure o backend
git clone https://github.com/PhelipeG/teste-fullstack-mobile.git
cd teste-fullstack-mobile/backend
npm install
# Configure .env com suas credenciais do Neon
npm run start:dev

# 2. Em outro terminal, exponha com ngrok
ngrok http 3000
# Anote a URL: https://xxxxx.ngrok.io

# 3. Configure e inicie o mobile
cd ../mobile-app
# Edite .env: EXPO_PUBLIC_API_URL="https://xxxxx.ngrok.io"
npx expo start --tunnel

# 4. Escaneie o QR code com Expo Go
# Ou acesse: exp://sl-gq-shakah-8081.exp.direct
```

## 📊 Estrutura do Banco de Dados

```sql
-- Usuários
User {
  id: String (UUID)
  email: String (único)
  password: String (hash)
  createdAt: DateTime
}

-- Atividades Físicas
Activity {
  id: String (UUID)
  name: String
  duration: Int (minutos)
  intensity: Enum (low, medium, high)
  userId: String
  createdAt: DateTime
}
```

## 🎯 Decisões Técnicas Adotadas

### Por que NestJS no Backend?

Inicialmente pensei em usar Express puro, mas depois de algumas pesquisas e testes, o NestJS se mostrou muito mais organizado. A estrutura de módulos me ajuda a manter tudo separadinho - autenticação em um lugar, atividades em outro. É bem mais fácil de entender quando volto no código depois de um tempo.

O TypeScript vem configurado de fábrica, então não preciso quebrar a cabeça com configurações. E a injeção de dependência facilita muito na hora de fazer testes - posso mockar os serviços sem complicação.

### Prisma: Meu Novo Melhor Amigo

Cara, eu costumava fazer queries SQL na mão e sempre dava algum problema. Com o Prisma, é completamente diferente. Você define o schema e ele gera todos os tipos TypeScript automaticamente. Se eu mudar algo no banco, o código já mostra erro se tiver inconsistência.

As migrações também são automáticas. Não preciso mais ficar criando scripts SQL ou me preocupando se a estrutura do banco está sincronizada entre desenvolvimento e produção. O `prisma migrate dev` cuida de tudo.

### PostgreSQL + Neon: Escolha Estratégica

Escolhi PostgreSQL porque é robusto e tem recursos avançados que podem ser úteis no futuro (como JSON fields). O Neon foi uma descoberta incrível - é PostgreSQL na nuvem com um free tier generoso. Setup super rápido e não preciso me preocupar com infraestrutura.

### Expo: Produtividade em Foco

Já tentei configurar React Native puro antes e é bem trabalhoso. Com Expo, em minutos já tenho um app rodando. O hot reload é instantâneo e posso testar no meu celular real só escaneando um QR code. Isso acelera muito o desenvolvimento.

A única desvantagem é que algumas funcionalidades nativas ficam limitadas, mas para este projeto está perfeito.

**Por que escolhi Tunnel ao invés de EAS Update para este projeto?**

Para um teste técnico, o túnel do Expo (`npx expo start --tunnel`) se mostrou mais adequado que EAS Update por algumas razões práticas:

- **Funciona imediatamente**: Não preciso esperar builds ou deploys, o app está disponível em segundos
- **Não depende de deploy**: Qualquer mudança no código reflete instantaneamente no dispositivo
- **Permite hot reload**: Posso fazer ajustes em tempo real durante a apresentação
- **Mais fácil de debugar**: Console logs aparecem diretamente no terminal, facilitando troubleshooting
- **Independente de configurações complexas**: Não preciso configurar profiles de build ou chaves de assinatura

Para produção, definitivamente usaria EAS Update, mas para demonstração e testes rápidos, o túnel é imbatível em agilidade.

### React Query: Gerenciamento de Estado Inteligente

Uma das maiores dores de cabeça em apps mobile é manter os dados sincronizados com o servidor. O React Query resolve isso de forma elegante - ele cuida do cache, re-fetch automático, loading states... tudo de forma transparente.

Não preciso mais ficar criando useState para loading ou me preocupando se os dados estão atualizados. O React Query faz isso automaticamente.

### TypeScript: Segurança e Produtividade

Depois que comecei a usar TypeScript, não consigo mais voltar para JavaScript puro. Ele previne tantos bugs em tempo de desenvolvimento... especialmente em um projeto fullstack onde o frontend e backend precisam conversar direito.

Quando mudo algo na API, o frontend já mostra erro se não estiver compatível. Isso é ouro.

### Segurança: Aprendendo as Melhores Práticas

Implementei algumas práticas que aprendi estudando:

- **bcryptjs**: Nunca guardo senhas em texto plano. O bcrypt faz hash com salt, então mesmo se alguém acessar o banco, as senhas ficam protegidas
- **JWT com expiração**: Tokens que expiram em 24h. Se alguém interceptar o token, a janela de ataque é limitada
- **Validação com Zod**: Todo input que vem do frontend passa por validação antes de chegar no banco
- **CORS configurado**: Só aceito requisições de origens conhecidas

### Organização do Código: Clean Architecture Adaptada

Tentei seguir alguns princípios que vi em cursos e artigos:

- **Controllers**: Só lidam com requisições HTTP, sem lógica de negócio
- **Services**: Toda regra de negócio fica aqui, centralizada
- **Custom Hooks**: No frontend, qualquer lógica que pode ser reutilizada vira hook
- **DTOs**: Uso interfaces bem definidas para comunicação entre camadas

Pode parecer over-engineering para um projeto pequeno, mas facilita muito quando preciso adicionar features ou corrigir bugs. Sei exatamente onde cada coisa está.

## � Estrutura do Banco

```sql
User {
  id: String (UUID)
  email: String (único)
  password: String (hash)
  createdAt: DateTime
}

Activity {
  id: String (UUID)
  name: String
  duration: Int (minutos)
  intensity: Enum (low, medium, high)
  userId: String
  createdAt: DateTime
}
```

## 📁 Estrutura

```
fitness-tracker/
├── backend/            # API NestJS
│   ├── src/
│   │   ├── auth/       # Autenticação
│   │   ├── activities/ # Atividades
│   │   └── chatbot/    # Chatbot
└── mobile-app/         # App React Native
    ├── app/            # Telas
    ├── components/     # Componentes
    └── services/       # APIs
```

## 🔍 Endpoints Principais

- `POST /auth/register` - Cadastro
- `POST /auth/login` - Login
- `GET /activities` - Listar atividades
- `POST /activities` - Criar atividade
- `POST /chatbot/ask` - Chatbot

## 🔧 Git Workflow

```bash
# Convenção de commits
git commit -m "feat: nova funcionalidade"
git commit -m "fix: correção de bug"
git commit -m "docs: atualiza documentação"

# Workflow
git checkout -b feature/nova-funcionalidade
git add .
git commit -m "feat: implementa funcionalidade"
git push origin feature/nova-funcionalidade
```

## 🤝 Scripts Úteis

**Backend:**

```bash
npm run start:dev    # Desenvolvimento
npm run lint:fix     # Corrigir código
npm run format       # Formatar
```

**Mobile:**

```bash
npm start                    # Expo
eas update --branch development  # Atualizar deploy
npm run android             # Android
npm run ios                 # iOS
```

**Ngrok:**

```bash
ngrok http 3000             # Expor backend
ngrok http 3000 --subdomain=fitness-app  # URL personalizada (pago)
```

---

## ⚠️ **Troubleshooting**

### **Network Error no app:**

1. Verifique se o backend está rodando
2. Confirme se o ngrok está ativo
3. Atualize o `EXPO_PUBLIC_API_URL` no `.env`
4. Execute `eas update` após mudanças

### **CORS Error:**

- Backend configurado para aceitar qualquer origem em desenvolvimento
- Verifique o arquivo `main.ts` no backend

### **Database Error:**

```bash
npx prisma migrate reset    # Reset completo
npx prisma generate         # Regenerar cliente
```

---

## 👨‍💻 Desenvolvido por

**Luis Felipe G Silva**

- GitHub: [@PhelipeG](https://github.com/PhelipeG)
- LinkedIn: [luis-felipe-silv](https://www.linkedin.com/in/luis-felipe-silv)

💪 **Developed with passion for fitness and technology!**
