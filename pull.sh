#!/bin/sh
cd /home/koa-dome
pm2 stop app
git pull
npm install
pm2 start app
