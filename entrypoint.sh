#!/usr/bin/env bash

cp -r /usr/app/cache/node_modules/. /usr/app/node_modules/
cp /usr/app/cache/package.json /usr/app/package.json
npm  run dev
