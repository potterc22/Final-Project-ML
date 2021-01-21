# Import dependencies
from flask import Flask, jsonify, render_template
import pandas as pd 
import sqlalchemy
from sqlalchemy import create_engine, func

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/NHL_stats.sqlite")


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template('index.html')

    





if __name__ == "__main__":
    app.run()