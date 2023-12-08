# import Flask
from flask import Flask, jsonify
from flask_pymongo import PyMongo

# Create an app, being sure to pass __name__
app = Flask(__name__)

# configure flask to connect to MongoDB

app.config['MONGO_URI'] = 'mongodb://localhost:27017/londons_accidents'
mongo = PyMongo(app)

#Define what to do when a user hits the index route
@app.route("/")
def home():
     """List all available api routes."""
     return (
        f"Available Routes:<br/>"
        f"/api/v1.0/population<br/>"
        f"/api/v1.0/boroughs<br/>"
         f"/api/v1.0/accidents<br/>"
    )

     


#Define what to do when a user hits the /about route
@app.route("/api/v1.0/population")
def get_population_data():
    population_collection = mongo.db.population_list
    data = list(population_collection.find({}, {'_id': 0}))
    return jsonify(data)

@app.route("/api/v1.0/boroughs")
def get_boroughs_data():
    boroughs_collection = mongo.db.london_boroughs
    data = list(boroughs_collection.find({}, {'_id': 0}))
    return jsonify(data)

@app.route("/api/v1.0/accidents")
def get_accidents_data():
    accidents_collection = mongo.db.accidents_data
    data = list(accidents_collection.find({}, {'_id': 0}))
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
