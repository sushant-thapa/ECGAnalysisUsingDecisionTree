import json

def main():
    limit = 1
    with open("output.csv") as lines:
        beatsJson = []
        counter = {}

        for line in lines:
            line = line.strip("\r\n")
            tokens = line.split(",")
            sym  = tokens.pop()
            if sym in counter:
                if counter[sym] >= limit:
                    continue
                else:
                    counter[sym] += 1
            else:
                counter[sym] = 1
            
            vals = list(map( float, tokens ))
            js = {
                    "sym":sym,
                    "vals":vals
            }

            beatsJson.append(js)
        f = open("beatsjson.js","w+")
        json.dump(beatsJson,f)
        f.close()
        





if __name__ == "__main__":
    main()
