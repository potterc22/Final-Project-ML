# Import dependencies
from flask import Flask, jsonify, render_template, url_for
import pandas as pd 
import sqlalchemy
from sqlalchemy import create_engine, func
import json

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

@app.route("/api/table")
def table_api():
    conn = engine.connect()
    return pd.read_sql("SELECT Player, GP, G, A, TP, PPG, PIM, POS, Cups, 'All-Star Games', HoF FROM master_stats LIMIT 10", conn).to_json(orient='records')

@app.route("/api/search_players")
def autocomplete_api():
    conn = engine.connect()
    return pd.read_sql("SELECT Player FROM master_stats", conn).to_json(orient='records')

@app.route("/api/player_search/<player>")
def search_api(searchPlayer):
    conn = engine.connect()
    return pd.read_sql("SELECT Player, GP, G, A, TP, PPG, PIM, POS, Cups, 'All-Star Games', HoF FROM master_stats WHERE Player = '%s'" %searchPlayer, conn).to_json(orient='records')

if __name__ == "__main__":
    app.run()