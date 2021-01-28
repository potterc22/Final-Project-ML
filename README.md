# Final-Project-ML

Use Machine Learning to predict NHL players probability of induction into the Hockey Hall of Fame.

DATA
To aquire our data, we scraped five different websites to gather career scoring statistics, all-star game appearances,
season awards won, Stanley Cup victories and current players in the hall of fame.  Data cleanup included spliting combined columns,
converting position and Hall of Fame to integer values, combining individual awards totals into a sum column, remove duplicate and
unnecesary columns.  We then had to match the player names across all data sheets. This incuded spelling differences, removing special
characters, adding Jr. to a few father and son pairs and researching a some player nicknames. There were aproximately 100 mismatches
that we needed to address in our code in order to be able to join the data together on player name to create our final dataset to run
through our machine learning model.

MACHINE LEARNING
This dataset was challenging to work with because it was imbalanced. There have been very few players inducted into the
Hockey Hall of Fame compared to the number of total players. After running a few tests, we decided to limit our train-test
scope to only players with a minimum 100 games played and players with their first season >= 1967. 1967 was the year the NHL
first expanded from the original 6 teams to 12 teams. We tested 3 different classification models: Logistic Regression,
Random Forest, and XG Boost. The Random Forest and XGBoost models were the most accurate, but far from great. The sampling of
the dataset was an issue. All it had to do was predict 'No' and it was correct 99% of the time. Only 2.5% of the players are
in the Hall of Fame. In order to address the imbalance, we decided to use RandomizedSearchCV from the Scikit-learn package.
The updated model produced more realistic results.

FINDINGS
After training, we decided to run all of the data for players back through
the model to check the output for players who were already in the Hall of Fame, the players that were overlooked, and players
that were not eligible but should be in the Hall. The model provided HoF probabilities less than 68% for 10 current HoF inductees.
Since the HoF selection committee focuses on more than stats, we concluded that there are factors not captured by our model
(College career, coaching career, Olympic career etc.)

FUTURE CONSIDERATIONS
Expand data set to include other leagues, Olympics/World Cup and playoff stats
Include goaltenders and the ability to predict by any position
Ability to click a table header to filter the table by that field.
Ability to search by a team to see all of their players.
Add interactive shapley value visuals.
Ability to trend current players to predict HoF probability at end of their career.
