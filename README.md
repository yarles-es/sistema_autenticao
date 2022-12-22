# sistema_autenticao

uma aplicação simples de backEnd para fazer login com uma abstração maior de segurança para guardar dados sensiveis do usuario.
Sendo usado as tecnologoias:
- Node.js e express: para criação da api, tambem sequelize para maior facilidade de interação com o banco de dados;
- Arquitetura de camadas("MSC"): para maior organização do docigo; 
- JWT: para agregar sistema de autenticação de token nas açoes solicitadas dentro da api;
- Bcript: para trabalhar com hash na atribuição de dados sensiveis no banco de dados;
- MYSQL: como base de banco de dados relacional na aplicação;
- Sistema de teste: tendo a utilização do chai, mocha, sequelize-test-helpers, sinon e sinon-chai, tendo toda as funções da aplicação testada;
