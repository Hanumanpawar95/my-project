function checkResult() {
  var learnerCode = document.getElementById('studentName').value;
  var input = learnerCode.toUpperCase();
  var output = document.getElementById("output");

  // Replace 'studentName.csv' with the path or URL of your CSV file
  var csvFile = 'studentName.csv';

  Papa.parse(csvFile, {
    download: true,
    header: true,
    complete: function(results) {
      var parsedData = results.data;
      var definition = parsedData.find(function(student) {
        // Replace 'Learner Code' with the column name that contains the learner codes
        return student && student['Learner Code'] && student['Learner Code'].toUpperCase() === input;
      });

      if (definition === undefined) {
        output.innerHTML = '<hr>There is no information about this learner.<hr>';
      } else {
        output.innerHTML = '<hr> BS-CIT Score is ' + definition['BS-CIT'] + ' <hr> BS-CLS Score is ' + definition['BS-CLS'] + ' <hr> BS-CSS Score is ' + definition['BS-CSS'] + ' <hr>';
      }
    }
  });
}
