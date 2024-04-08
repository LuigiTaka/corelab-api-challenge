#!/bin/bash
cp -r /usr/app/cache/node_modules/. /usr/app/node_modules/
cp /usr/app/cache/package.json /usr/app/package.json

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm  run dev
