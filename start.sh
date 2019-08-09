#! /bin/bash

(cd client; npm start) & (cd backend; nodemon ../backend/server.js)
