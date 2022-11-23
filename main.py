from flask import Flask, request, render_template
import json, os

app = Flask(__name__)


@app.route("/")
def launch():
    return render_template('index.html')


@app.route("/getData", methods=['POST'])
def getData():
    postData = json.loads(request.data.decode("utf-8"))

    lis_dir = os.listdir('.local\\share\\nexfil\\dumps\\')
    for file in lis_dir:
        os.remove('.local\\share\\nexfil\\dumps\\' + file)

    os.system('python3 nexfil.py -u ' + postData['username'])

    lis_dir = os.listdir('.local\\share\\nexfil\\dumps\\')
    f = open('.local\\share\\nexfil\\dumps\\' + lis_dir[0],'r')
    data = f.read().split('URLs :')[1].split('URLs Timed Out :')[0].split('\n')
    data = data[2:-2]
    return data

  
if __name__ == "__main__":
    app.run()
