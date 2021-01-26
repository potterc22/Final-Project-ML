// Create Initial page



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        // searchBar = d3.select(".autocomplete")
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("div");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function when user presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the search bar:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
};

/*initiate the autocomplete function on the "myInput" element, and pass along the players array as possible autocomplete values:*/
d3.json("/api/search_players").then((players) => {
    var playersList = []
    players.forEach(function(data) {
        playersList.push(data.Player)
    })
    autocomplete(document.getElementById("myInput"), playersList)
});


var tbody_topTen = d3.select("table#myTable tbody");

// Create initial top ten table
function init() {
    var list = d3.select(".topTenTable");
    list.html("");
    d3.json("/api/table").then((ranks) => {
        console.log(ranks)

        ranks.forEach((player) => {
            var row = tbody_topTen.append("tr");
            Object.entries(player).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value)
            });
        });
    });
};

init()


// Create table based on search value
var tbody_search = d3.select("#searchTable tbody");
var thead_search = d3.select("#searchTable thead");


function searchTable(searchPlayer) {
    d3.select('#searchTable tbody').selectAll('*').remove()
    d3.select('#searchTable thead').selectAll('*').remove()
    d3.select('.searchHeader').selectAll('*').remove()

    // add table header
    d3.select(".searchHeader").append("h4").text('Search Results')

    var columnNames = [
        "Player",
        "GP",
        "G",
        "A",
        "TP",
        "PPG",
        "PIM",
        "POS",
        "Cups",
        "All-Star Games",
        "HoF",
        "FinalValue"
    ]

    d3.json("/api/player_search/" + searchPlayer).then((data) => {
        // console.log("Data: " + data)
        var header_row = thead_search.append("tr");
        columnNames.forEach((columnName) => {
            var cell = header_row.append("th");
            // console.log("Column Name: " + columnName)
            cell.text(columnName);
        });
        data.forEach((player) => {
            // console.log("Player: " + player)
            var row = tbody_search.append("tr");
            Object.entries(player).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value)
                // console.log("Cell Value: " + value)
            })
        })
    })
}

// Search Bar Event Handler
d3.select("#searchButton").on("click", updatePage);

function updatePage() {
    // assign users selection to a variable
    // var searchPlayer = d3.select('#myInput').node().value
    

    // d3.json("/api/search_players").then((players) => {
        var searchPlayer = d3.select('#myInput').node().value
        console.log("Player searched for: " + searchPlayer)
        
        // var playersList = []
        // players.forEach(function(data) {
        //     playersList.push(data.Player)
        // })
        // console.log(playersList)
        
        // // Create error handling for bad searches
        // playersList.forEach((player, index, playersList) => {
            
        //     if (searchPlayer === player) {
        //         searchTable(searchPlayer)
        //     }
        //     else {
        //         if (index != playersList.length - 1) {
        //             continue
        //         }
        //         else {
        //             alert("There is no player by that name")
        //         }
        //     }
        // });
        // alert("There is no player by that name")
        

        // When the search bar value updates, run the searchTable function
        searchTable(searchPlayer)
    // });
};

function reset() {
    // Clear search box
    d3.select('#myInput').value = ''

    // Clear search table and header
    d3.select('#searchTable tbody').selectAll('*').remove()
    d3.select('#searchTable thead').selectAll('*').remove()
    d3.select('.searchHeader').selectAll('*').remove()
}

// Reset Event Handler
d3.select("#resetButton").on("click", reset);



// Create a function to sort the table

// function sortTable(n) {
//     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.getElementById("myTable");
//     switching = true;
//     //Set the sorting direction to ascending:
//     dir = "asc"; 
//     /*Make a loop that will continue until
//     no switching has been done:*/
//     while (switching) {
//       //start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//       /*Loop through all table rows (except the
//       first, which contains table headers):*/
//       for (i = 1; i < (rows.length - 1); i++) {
//         //start by saying there should be no switching:
//         shouldSwitch = false;
//         /*Get the two elements you want to compare,
//         one from current row and one from the next:*/
//         x = rows[i].getElementsByTagName("TD")[n];
//         y = rows[i + 1].getElementsByTagName("TD")[n];
//         /*check if the two rows should switch place,
//         based on the direction, asc or desc:*/
//         if (dir == "asc") {
//           if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//             //if so, mark as a switch and break the loop:
//             shouldSwitch= true;
//             break;
//           }
//         } else if (dir == "desc") {
//           if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//             //if so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         }
//       }
//       if (shouldSwitch) {
//         /*If a switch has been marked, make the switch
//         and mark that a switch has been done:*/
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//         //Each time a switch is done, increase this count by 1:
//         switchcount ++;      
//       } else {
//         /*If no switching has been done AND the direction is "asc",
//         set the direction to "desc" and run the while loop again.*/
//         if (switchcount == 0 && dir == "asc") {
//           dir = "desc";
//           switching = true;
//         }
//       }
//     }}}}}}}