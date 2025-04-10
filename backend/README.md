# node js
npm i

# sequelize
npx sequelize-cli migration:generate --name ..
npx sequelize-cli db:migrate

# seeder

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed ..

npx sequelize-cli db:seed --seed 20250405211452-create-procurador