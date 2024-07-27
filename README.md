<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Banco de dados

Turma Online ON32 - Imersão JavaScript | Semana 8 | 2024 | Professora Lais Frigério

## Professora Lais

<h1>
  <img src="./assets/lais.png" alt="foto lais" width="200">
</h1>

Eu sou engenheira de software, professora de programação e compartilho conteúdo técnico em minhas redes sociais!

Fui aluna da segunda turma do curso Eudca{devas} em 2023!
Hoje trabalho como Engenheira de Software no Nubank.

- 💌 Email: laisfrigerio.dev@gmail.com
- 📸 Instagram: [@laisfrigerio](https://www.instagram.com/laisfrigerio/)
- 💼 LinkedIn: [in/laisfrigerio](https://www.linkedin.com/in/laisfrigerio/)
- 👩‍💻 Github:[/laisfrigerio](https://github.com/laisfrigerio)

## Sistema

Este projeto consiste em uma API de cadastro de usuários, que podem possuir endereçps. Todos os usuários tem em comum:

- Nome
- Email
- Senha
- CPF

> Ao informar o campo zipCode, o sistema busca os dados do CEP na base dos correios via integração com serviço externo.

Atualmente, essa API contém as seguintes APIs:

- GET http://localhost:3000/users
- GET http://localhost:3000/users/:id
- POST http://localhost:3000/users
- PUT http://localhost:3000/users/:id
- DELETE http://localhost:3000/users/:id

Existem algumas regras de validação para cadastro/edição de usuários, dentro as quais:

- Validação de CPF
- Validação de E-mail
- Validação de senha
- Minimo de 8 digitos
- Minimo de 1 letra maiúscula
- Minimo de 1 caracter especial
- Minimo de 1 número
- O e-mail deve ser único
- CPF deve ser único

Todos essas regras estão dentro do arquivo user.validator.ts

### Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- NestJs
- TypeScript
- Jest / Supertest

### TypeORM & Postgres

```sh
npm install @nestjs/typeorm typeorm pg
```

### Configurar TypeORM

- Criar arquivo `ormconfig.json`:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_username",
  "password": "your_password",
  "database": "your_database",
  "entities": ["src/domain/entities/**/*.ts"],
  "synchronize": true
}
```

<p align="center">
Desenvolvido com :purple_heart: por laisfrigerio
</p>
