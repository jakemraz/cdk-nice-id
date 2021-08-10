from flask import Flask
import sys
import uuid

app = Flask(__name__) 

id = str(uuid.uuid4())
@app.route("/", methods=['GET', 'POST']) 
def main():
	ans = f'welcome to ping service {id}'
	return ans

@app.route("/ping", methods=['GET']) 
def ping():
	ans = f'pong {id}'
	return ans

@app.route("/ping2", methods=['GET']) 
def ping2():
	ans = f'pong2 {id}'
	return ans

if __name__ == "__main__": 
	app.run(debug=True, host="0.0.0.0", port=3000)