
//sort by desending order
function compareDesc(a, b) {
    
    if (a.total_population.population > b.total_population.population) return -1;
    if (b.total_population.population > a.total_population.population) return 1;
  
    return 0;
}

function compareAsc(a, b) {
    
    if (a.total_population.population > b.total_population.population) return 1;
    if (b.total_population.population > a.total_population.population) return -1;
  
    return 0;
}

exports.sortPopulation = function sortPopulation(list, sort_by){
    
      if(sort_by == "desc")
      {
        return list.sort(compareDesc);
      }
      if(sort_by == "asc")
      {
        return list.sort(compareAsc);
      }      
    return list;
}
  
//format date in 'YYYY-MM-dd' format
exports.formatDate = function formatDate(date) {

var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

return year + '-' + monthIndex + '-' + day;
}