import wfdb
from wfdb import processing
import numpy as np
import sys

tokens = list(map(float,sys.argv[1:]))


freq = tokens.pop(0)

beats = np.array(tokens)


xqrs = processing.XQRS(sig=beats,fs = freq)
xqrs.detect(learn=False,verbose=False)

print(",".join([str(item) for item in xqrs.qrs_inds]),end="")
