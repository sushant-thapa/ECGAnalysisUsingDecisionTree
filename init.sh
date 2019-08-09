#! /bin/bash

npm install -g nodemon

cd backend
npm install

cd ../client
npm install

cd ..
pip3 install -r requirements.txt
