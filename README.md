# giphy-the-sith

A Aliança Rebelde precisa de você. Nosso infiltrado Jar-Jar Binks bolou um plano para acabar com a ameaça de Darth
Vader uma vez por todas. A Finxi foi contratada – por meios escusos, para não dar pinta – para fazer o Lord Sith morrer.
De rir. Literalmente.

Enquanto nosso setor de ursinhos de pelúcia é pago para produzir um trilhão de ursinhos carinhosos, sua missão é
desenvolver um MVP para divulgação de gifs – e memes – através da API Pública do Giphy.

## Requisitos do MVP

Criação de um website utilizando o Semantic UI e Vue JS. Não será necessária a criação de um servidor backend para a
criação dos endpoints. Consumir a API pública de desenvolvedores do Giphy para:

- Listar gifs através de uma busca;
- Visualizar os detalhes de um gif.

O backend está alocado em outro projeto, mas teremos algo salvo em nosso servidor, especialmente o nome e o link
do gif. Crie funções para simular a comunicação com um backend que faça:

- Salvar os gifs capazes de matar o Senhor do Mal;
- Editar os dados de um gif salvo;
- Deletar um gif.

## Entrega

Nós esperamos que o projeto esteja em um container Docker. A entrega do produto deve ser feita através do link de
um repositório Git que possua um docker-compose para executar o projeto localmente.
Serão valorizados no MVP os seguintes quesitos:

- Organização do projeto;
- Boas práticas e convenções;
- Componentização;

## Project setup

### Locally
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

### With Docker-Compose
```
docker-compose up
```

A aplicação estará disponível em: http://localhost:8080/
