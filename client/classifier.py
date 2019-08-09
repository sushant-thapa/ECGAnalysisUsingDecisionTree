#!/usr/bin/env python
# coding: utf-8

# In[31]:


import os
import pandas as pd
import numpy as np
import pickle


from sklearn.preprocessing import LabelEncoder
encoder=LabelEncoder()



random_for = pickle.load(open("randomforest.sav",'rb'))


# In[47]:


def my_class_predict(data):
    data = data.reshape(1,-1)
    temp=random_for.predict(data)
    encoded_predict=encoder.inverse_transform(temp)
    print(encoded_predict[0])


# In[48]:


data=x_train.iloc[10004]
my_class_predict(data)


inp = input()
tokens = inp.split(',')
csv = tokens
npcsv = np.asarray(csv)
npcsv = npcsv.reshape(1,-1)

print(npcsv)






