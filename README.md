# API de Encurtamento de URL


## Como Instalar o Programa:

- 1 - Fork, clone e baixe o sistema em sua máquina.

- 2 - Abra o seu terminal e execute o comando `npm install`.

> Lembre-se de ter certeza que está rodando o comando na pasta onde está o projeto. Você pode navegar entre as pastas com o comando `cd nome_da_pasta`.

- 3 - Após instalado todas as dependências, execute o comando `npm start`.

> *Por padrão, a porta é criada como http://localhost:3000/*. Basta copiar e colar essa URL em seu navegador e você acessará o front-end.

## Como Utilizar o Programa:

- 1 - Para utilizar o projeto através de  programas request.body, como `Thunder Client` que pode ser baixado como uma extensão do VS code, basta  startar o sistema com o comendo `npm start` e você pode interagir com o banco pelas rotas desenvolvidas na pasta `routes/index.js`:

-> CREATE http://localhost:3000/new (especificando a url desejada no body);
-> READ   http://localhost:3000/all (para puxar todos os dados do banco);
-> UPDATE http://localhost:3000/:shortURL (alterando o :shortURL para a URL encurtada que deseja alterar);
-> DELETE http://localhost:3000/:shortURL (alterando o :shortURL para a URL encurtada que deseja deletar);

> *As duas ultimas funcionalidade são para o Front-end do projeto*

- 2 - Para utilizar o projeto através de seu navegador, startar o sistema com o comando `npm start` e inserir `http://localhost:3000` em seu browser.

-> A página é bem intuitiva, apenas insira a URL que deseja encurtar no input e clique no botão `encurtar`
-> Você será direcionado para uma outra página com a URL encurtada. Se você copiá-la e testá-la em outra aba de busca, ela irá funcionar enquanto o servidor estiver ativo.
-> Ao inclir `/delivery` no fim da nova URL, a página lhe mostrará os dados de quantidade de acessos e ultima visita.

- 3 - Para encerrar o programa, basta aplicar no terminal `Ctrl + c`, selecionar `s` e pronto, a o servidor está desligado.

## Como Desenvolvi o Programa:

Iniciei o projeto usando o Express do Node.js através do comando `npm i -g express-generator` por já trazer de maneira mais prática todos os elemntos que irei utilizar no desenvolvimento.

Também uapliquei algumas recomendações de uso do framework bootstrap para adicionar elementos basicos de HTML, CSS e JavaScript que você pode encontrar na documantação [!Get started with Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

Para armazenar as URLs encurtadas, levando em consideração a simplicidade do projeto, decidi optar pelo `banco de dados relacional SQLite`.
Como o projeto foi pensado focado apenas nas funcionalidades mais básicas. Para tanto, foi deixado de fora processos de cadastro de usuários, criptografias, tokens, entre outros tratamentos de dados que envolvam a sergurança da informação.

Juntamente com SQLite, decidi utilizar o `Sequelize` para ter mais praticidade ao fornecer parâmetros de criação de tabelas SQL sem precisar escrever propriamente os códigos com a sináxe necessária.

Com o Sequelize criei uma estrutura de tabela com o básico: id, coluna para armazenar a URL original (batizada como url) e uma coluna para armazenar a URL encurtada (batizada como shortURL), além de mais dois dados não muito relevantes que contão a utilização do sistema. Isso cria o arquivo database.sqlite onde eu o programei para ser criado automaticamente na raiz do projeto.

> Instalei ambos através do código comando `npm i sequelize sqlite3`

> *a pasta `model` é onde está inserido as configurações para a criação das tabelas do banco de dados.*

> *A pasta bin contem o arquivo da porta do servidor, nele fiz algumas modificações para a criação e interação do banco de dados junto com a inicialização.*

Pensando em uma boa prática, caso o endereço de domínio seja volátil, ou você deseje colocar o seu próprio, criei um arquivo .env na raiz que servirá de variável para o endereço ao longo do código.

> Foi necessário instalar `npm i dotenv`

> *por isso aparece o arquivo .env no repositório, mas não se preocupe, não adicionei informação sigilosa.*

Criei um Script que formula uma  implementação randomizada para criar a URL encurtada apartir da URL fornecida pelo usuário através de um input junto com as rotas de acesso que retornam a `lógica de requisição de dados CRUD` do banco de dados.

> *Por quesões de aceitação de sintaxe do SQLite, tive que alterar a resposta de nome `short-url` pelo nome `shortURL`. Detalhe expedido pela documentação da Empresa Musixi*

Incluí todas as funcionalidades CRUD, porém `o GET específico de apenas uma short-url recebe como status 202 ou invéz de um 200 e somente funciona no front-end`. Ela Inclui de certa forma duas funcionalidades para interação do Front-end.

Mas, para que seja possivel efetuar um GET apropriado pelo Back-end, adicionei uma funcionalidade onde você pode recuperar toda a lista do banco como uma requisição GET única.

> Ache melhor evitar modificar a funcionalidade específica de GET de uma shortURL para não quebrar a interação do Front.

> No Front-end, apenas as funcionalidades que convertem uma URL para uma shortURL e a de pesquisar com a URL encurtada estão inseridas.

Utilizei uma estilização básica apenas para deixar apresentável o projeto. As bases em HTML e CSS podem ser encontradas nas pastas `views` e `./public/stylesheets`.


!NOTE
> Obrigado pela atenção, espero que esse projeto possa ser interessante e útil de alguma forma a você.


# ASS: AEL MARTINS