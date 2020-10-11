import flask
import os
from flask import request, jsonify, Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder="../build", static_url_path="/")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#app.config["DEBUG"] = True

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/api/graph', methods=['GET'])
def home():
    jsonResp = {'jack': 4098, 'sape': 4139}
    return jsonify(jsonResp)

@app.route('/api/data', methods=['GET'])
def api_id():
    if 'id' in request.args:
            id = int(request.args['id'])
    else:
            return "Error: No id field provided. Please specify an id."

    return jsonify(id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

#app.run()