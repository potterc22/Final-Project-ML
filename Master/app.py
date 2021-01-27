# Import dependencies
from flask import Flask, jsonify, render_template, url_for
import pandas as pd 
import sqlalchemy
from sqlalchemy import create_engine, func
import json

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/NHL_final_stats.sqlite")


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

@app.route("/overview")
def overview():
    return render_template('overview.html')

@app.route("/api/HoFTable")
def HoF_table_api():
    conn = engine.connect()
    return pd.read_sql("SELECT Player, GP, G, A, TP, PPG, PIM, POS, Cups, All_Star_Games, Awards, HoF, HoF_Probability FROM master_stats WHERE HoF = 1 ORDER BY HoF_Probability desc LIMIT 10", conn).to_json(orient='records')

@app.route("/api/otherTable")
def otherTable():
    conn = engine.connect()
    return pd.read_sql("SELECT Player, GP, G, A, TP, PPG, PIM, POS, Cups, All_Star_Games, Awards, HoF, HoF_Probability FROM master_stats WHERE HoF = 0 ORDER BY HoF_Probability desc LIMIT 10", conn).to_json(orient='records')

@app.route("/api/search_players")
def autocomplete_api():
    conn = engine.connect()
    return pd.read_sql("SELECT Player FROM master_stats", conn).to_json(orient='records')

@app.route("/api/player_search/<searchPlayer>")
def search_api(searchPlayer):
    conn = engine.connect()
    return pd.read_sql("SELECT Player, GP, G, A, TP, PPG, PIM, POS, Cups, All_Star_Games, Awards, HoF, HoF_Probability FROM master_stats WHERE Player = '%s'" %searchPlayer, conn).to_json(orient='records')

if __name__ == "__main__":
    app.run()