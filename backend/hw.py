import sys
import os
import pandas as pd
import numpy as np
import pickle

tokens = list(map(float,sys.argv[1:]))


encoder_dict={0: "/", 1: "A", 2:"E", 3:"F", 4:"J", 5: "L", 6: "N", 7:"Q", 8:"R", 9:"S", 10:"V", 11:"a", 12:"e", 13:"f", 14:"j"}

random_for = pickle.load(open("randomforest.sav", 'rb'))


def my_class_predict(data):
    #data = data.values.reshape(1,-1)
    #print(type(data))
    temp=random_for.predict(data)
    return encoder_dict[temp[0]]

#data=x_train.iloc[10019]
#my_class_predict(data)



csv = tokens
npcsv = np.asarray(csv)
npcsv = npcsv.reshape(1,-1)

res = my_class_predict(npcsv)

print(res)


