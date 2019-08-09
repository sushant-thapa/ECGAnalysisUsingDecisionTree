#! /bin/bash

split -b 10000000 backend/randomforest.sav backend/randomforest.sav-

rm backend/randomforest.sav
