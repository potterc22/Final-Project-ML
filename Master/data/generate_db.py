import sqlalchemy
from sqlalchemy import create_engine
import pandas as pd

# Read in master stats file and convert it to a dataframe
csv_file = "../../Jeff/Output/master_stats_file.csv"
master_stats_df = pd.read_csv(csv_file)

# Save this to sqllite
engine = create_engine("sqlite:///NHL_stats.sqlite")
master_stats_df.to_sql(name='master_stats', con=engine, if_exists='replace', index=False)