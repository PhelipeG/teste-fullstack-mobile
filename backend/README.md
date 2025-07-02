# 🏃‍♂️ FitTracker API

API REST para aplicativo de controle de atividades físicas e fitness, desenvolvida com NestJS, Prisma e PostgreSQL.

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Decisões Técnicas](#-decisões-técnicas)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Documentação da API](#-documentação-da-api)
- [Validação de Dados](#-validação-de-dados)
- [Autenticação](#-autenticação)

## 🚀 Tecnologias Utilizadas

### **Backend Framework**

- **NestJS** - Framework Node.js para construção de APIs escaláveis
- **TypeScript** - Superset do JavaScript com tipagem estática

### **Banco de Dados**

- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM moderno para TypeScript/JavaScript

### **Autenticação & Segurança**

- **JWT (JSON Web Tokens)** - Para autenticação stateless
- **bcryptjs** - Para hash seguro de senhas
- **Passport JWT** - Middleware de autenticação

### **Validação**

- **Zod** - Biblioteca de validação e parsing de esquemas TypeScript-first

### **Documentação**

- **Swagger/OpenAPI** - Documentação automática da API

### **Outras Bibliotas**

- **class-validator** - Validação baseada em decorators
- **class-transformer** - Transformação de objetos

## 🎯 Decisões Técnicas

### **1. NestJS como Framework Principal**

Optei pelo NestJS principalmente pela sua arquitetura modular que se alinha perfeitamente com os princípios SOLID. Vindo de experiências anteriores com Express puro, sentia falta de uma estrutura mais opinativa que facilitasse a organização do código conforme a aplicação cresce.

O sistema de módulos do NestJS permite que cada funcionalidade (autenticação, usuários, atividades) viva em seu próprio contexto, com seus próprios controllers, services e DTOs. Isso facilita muito a manutenção e permite que diferentes desenvolvedores trabalhem em features diferentes sem conflitos.

Além disso, o sistema de injeção de dependências nativo elimina a necessidade de bibliotecas externas como container IoC, mantendo o código mais limpo e testável.

### **2. Prisma: A Escolha Óbvia para TypeScript**

Depois de trabalhar com ORMs como TypeORM e Sequelize, o Prisma se destaca principalmente pela geração automática de tipos. Não há mais aquela dor de cabeça de manter interfaces TypeScript sincronizadas com o schema do banco.

O sistema de migrations é outro ponto forte - conseguimos versionar mudanças no banco de forma clara e rollbacks são simples. O Prisma Studio também é uma mão na roda durante o desenvolvimento para visualizar dados rapidamente.

Uma decisão importante foi usar o PostgreSQL como banco principal. Para uma aplicação de fitness com relacionamentos claros (usuário -> atividades), um banco relacional faz mais sentido que NoSQL, e o PostgreSQL oferece performance e recursos avançados que podem ser úteis conforme a aplicação escale.

### **3. Validação com Zod: Runtime Safety**

A escolha do Zod foi motivada por uma experiência ruim anterior onde dados inválidos passaram pela validação e causaram bugs em produção. Com Zod, conseguimos validação em runtime E inferência de tipos compile-time.

Implementei um pipe customizado (`ZodValidationPipe`) que aplica a validação diretamente nos parâmetros dos controllers. Isso significa que se os dados chegarem até o service, já estão garantidamente válidos. É uma camada a mais de segurança que evita aqueles "undefined is not a function" clássicos.

O legal é que definimos o schema uma vez e tanto a validação quanto os tipos TypeScript são derivados automaticamente - DRY principle na prática.

### **4. JWT: Simplicidade e Escalabilidade**

Para autenticação, JWT foi a escolha natural. Considerando que esta API pode futuramente servir tanto um frontend web quanto um app mobile, ter autenticação stateless é fundamental.

Implementei um guard personalizado (`JwtAuthGuard`) que intercepta requests e valida tokens automaticamente. O decorator `@CurrentUser()` foi uma adição que facilita muito a vida - em vez de ficar extraindo dados do token manualmente em cada controller, o usuário já chega pronto para uso.

Uma decisão de segurança importante: o payload do JWT contém apenas o ID do usuário. Dados sensíveis ficam sempre no banco, evitando vazamentos caso um token seja comprometido.

### **5. Swagger: Documentação que Não Mente**

Swagger foi implementado desde o início porque já sofri com APIs sem documentação adequada. Com os decorators do NestJS, a documentação fica sempre sincronizada com o código - impossível ficar desatualizada.

O `@ApiOperation()` e `@ApiBearerAuth()` em cada endpoint criam uma documentação interativa que pode ser usada tanto para testes manuais durante desenvolvimento quanto para integração com o frontend.

### **6. Arquitetura de DTOs: Contratos Bem Definidos**

Cada operação tem seu próprio DTO com schema Zod correspondente. Isso pode parecer verboso inicialmente, mas na prática cria contratos claros entre as camadas da aplicação.

Por exemplo, `CreateActivityDTO` e `UpdateActivityDTO` são diferentes - o primeiro exige todos os campos obrigatórios, o segundo aceita campos opcionais. Isso evita bugs onde tentamos atualizar com dados incompletos ou criar com dados desnecessários.

A validação acontece no nível do controller, então os services podem focar apenas na lógica de negócio, assumindo que os dados já chegaram validados e tipados corretamente.

## 🔧 Funcionalidades

### **Autenticação**

- ✅ Registro de usuário
- ✅ Login com JWT
- ✅ Proteção de rotas com guards

### **Gerenciamento de Usuários**

- ✅ Visualizar perfil
- ✅ Atualizar dados do usuário
- ✅ Hash seguro de senhas

### **Atividades Físicas**

- ✅ Criar atividade (nome, duração, intensidade)
- ✅ Listar todas as atividades do usuário
- ✅ Atualizar atividade existente
- ✅ Deletar atividade
- ✅ Resumo estatístico das atividades

### **Chatbot Fitness**

- ✅ Conversação com IA para dicas de fitness
- ✅ Integração com prompt personalizado para coach fitness

## 📁 Estrutura do Projeto

```
src/
├── auth/                    # Módulo de autenticação
│   ├── auth.controller.ts   # Endpoints de login/registro
│   ├── auth.service.ts      # Lógica de negócio auth
│   ├── auth.module.ts       # Configuração do módulo
│   ├── jwt.strategy.ts      # Estratégia JWT Passport
│   └── dto/
│       └── auth.dto.ts      # DTOs e schemas Zod
├── users/                   # Módulo de usuários
│   ├── users.controller.ts  # Endpoints de usuário
│   ├── users.service.ts     # Lógica de negócio usuário
│   ├── users.module.ts      # Configuração do módulo
│   └── dto/
│       └── update-user.dto.ts
├── activities/              # Módulo de atividades
│   ├── activities.controller.ts
│   ├── activities.service.ts
│   ├── activities.module.ts
│   └── dto/
│       ├── create-activity.dto.ts
│       └── update-activity.dto.ts
├── chatbot/                 # Módulo do chatbot
│   ├── chatbot.controller.ts
│   ├── chatbot.service.ts
│   ├── chatbot.module.ts
│   ├── dto/
│   │   └── create-message.dto.ts
│   └── prompt/
│       └── prompt-fit-coach.ts
├── common/                  # Utilitários compartilhados
│   ├── decorators/          # Decorators personalizados
│   ├── guards/              # Guards de autenticação
│   └── pipes/               # Pipes de validação
├── prisma/                  # Configuração Prisma
│   └── prisma.service.ts
└── main.ts                  # Entry point da aplicação
```

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**

- Node.js 18+
- PostgreSQL
- npm ou yarn

### **1. Clonar e Instalar Dependências**

```bash
git clone <repository-url>
cd backend
npm install ou yarn
```

### **2. Configurar Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fittracker"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Application
PORT=3000
```

### **3. Configurar Banco de Dados**

```bash
# Executar migrations
npx prisma migrate dev

# Gerar Client do Prisma
npx prisma generate

# (Opcional) Visualizar dados no Prisma Studio
npx prisma studio
```

### **4. Executar a Aplicação**

#### **Desenvolvimento**

```bash
npm run start:dev
```

#### **Produção**

```bash
npm run build
npm run start:prod
```

### **5. Verificar se está funcionando**

- API estará rodando em: `http://localhost:3000`
- Documentação Swagger: `http://localhost:3000/docs`

## 📚 Documentação da API

### **Endpoints Principais**

#### **Autenticação**

- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login

#### **Usuários**

- `GET /users/me` - Perfil do usuário logado
- `PATCH /users` - Atualizar perfil

#### **Atividades**

- `POST /activities` - Criar atividade
- `GET /activities` - Listar atividades
- `PATCH /activities/:id` - Atualizar atividade
- `DELETE /activities/:id` - Deletar atividade
- `GET /activities/summary` - Resumo estatístico

#### **Chatbot**

- `POST /chatbot` - Conversar com o coach fitness

### **Autenticação**

Todas as rotas (exceto auth) requerem header:

```
Authorization: Bearer <jwt-token>
```

## 🛡️ Validação de Dados

### **Implementação**

- **Custom Pipe:** `ZodValidationPipe` para validação automática
- **Schemas Zod:** Definidos em cada DTO para type-safety
- **Aplicação:** Diretamente nos parâmetros `@Body()` dos controllers

### **Exemplo de Validação**

```typescript
// DTO com schema Zod
export const CreateActivitySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  intensity: z.enum(['low', 'medium', 'high'])
});

// Controller com validação automática
@Post()
create(
  @CurrentUser() user,
  @Body(new ZodValidationPipe(CreateActivitySchema)) body: CreateActivityDTO
) {
  return this.service.create(user.userId, body);
}
```

## 🔐 Autenticação

### **Fluxo de Autenticação**

1. **Registro/Login:** Usuário envia credenciais
2. **Validação:** Credenciais são verificadas
3. **JWT Generation:** Token JWT é gerado e retornado
4. **Protected Routes:** Token é verificado via `JwtAuthGuard`
5. **User Context:** Informações do usuário ficam disponíveis via `@CurrentUser()`

### **Segurança**

- Senhas são hasheadas com bcrypt (salt rounds: 10)
- Tokens JWT incluem apenas ID do usuário
- Guards impedem acesso não autorizado

## 🎨 Padrões Adotados

### **Code Style**

- TypeScript com strict mode
- ESLint + Prettier para formatação
- Naming conventions: camelCase para variáveis, PascalCase para classes

### **Error Handling**

- HTTP status codes apropriados
- Mensagens de erro descritivas
- Validação com feedback específico

### **Database Design**

- Relações bem definidas (User -> Activities)
- Enums para campos com valores fixos
- Timestamps automáticos (createdAt, updatedAt)

---

## 📞 Suporte

Para dúvidas ou problemas, verifique:

1. Se todas as variáveis de ambiente estão configuradas
2. Se o PostgreSQL está rodando
3. Se as migrations foram executadas
4. Logs da aplicação para erros específicos

**Documentação interativa disponível em:** `http://localhost:3000/docs`
