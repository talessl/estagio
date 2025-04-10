# Nessa pasta apresentarei o projeto e deixarei disponibilizado o EER

## Configurações
Aconselho que use o docker-compose para executar o projeto, pois já deixei tudo configurado!
- Execução : docker-compose up -d
- Após executar, caso o banco não receba os migrates e seeders do script, siga os comandos:
  docker-compose exec -it backend bash </br>
  Ao acessar o container do backend, executer npx sequelize-cli db:migrate </br>
  Depois, basta executar npx sequelize-cli db:seed:all

  ### Usuários cadastrados para teste:
  emails: 
  'adm@adm.com',
              'procurador@pge.com',
              'cliente@pge.com',
              'procurador1@pge.com',
              'procurador2@pge.com',
              'procurador3@pge.com',
              'cliente1@pge.com',
              'cliente2@pge.com',
              'cliente3@pge.com' </br>
              senha: 12345

  ### Sobre o projeto
  O projeto foi feito em Reactjs + Vite e Nodejs + Sequelize. Para rodar os dois é necessário o comando 'npm run dev', mas sem se esquecer do 'npm i' para baixar as dependências antes! Essa será a opção caso não utilize o container, mas lembre de alterar o config/config.json para conectar corretamente com o banco.

  
