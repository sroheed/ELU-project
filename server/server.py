import os
from scrape import Scrape
from flask import request, jsonify, Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder="../build", static_url_path="/")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#app.config["DEBUG"] = True

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/graph-without-posts')
def graph_without_posts():
    return app.send_static_file("index.html")

@app.route('/api/graph', methods=['GET'])
def home():
    if 'subreddit' and 'post_count' in request.args:
        subreddit = str(request.args['subreddit'])
        post_count = int(request.args['post_count'])
        #months_old = int(request.args['months_old'])
        months_old = 1
    else:
        return jsonify({"message": "Invalid request", 'code': 400})

    scrape_instance = Scrape(subreddit, months_old, post_count)
    subreddit_exists = scrape_instance.sub_exists()
    if(subreddit_exists):
        return_data = scrape_instance.get_data()
        return jsonify({"data": return_data, 'code': 200})
    else:
        return jsonify({"message": "Subreddit does not exist", 'code': 400})

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='localhost', port=port)
