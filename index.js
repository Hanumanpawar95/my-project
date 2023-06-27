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
        var bsCitScore = parseInt(definition['BS-CIT']) || 0;
        var bsClsScore = parseInt(definition['BS-CLS']) || 0;
        var bsCssScore = parseInt(definition['BS-CSS']) || 0;
        var totalScore = bsCitScore + bsClsScore + bsCssScore;
        var bsCitPercentage = (bsCitScore / 100) * 100;
        var bsClsPercentage = (bsClsScore / 100) * 100;
        var bsCssPercentage = (bsCssScore / 100) * 100;
        var totalPercentage = (totalScore / 300) * 100;

        output.innerHTML = '<hr>Name: <span class="blinking-text">' + definition['Name'] + '</span><hr>Result: ' + definition['Result'] + '<hr>BS-CIT Score: ' + bsCitScore + ' out of 100 (' + bsCitPercentage + '%)<hr>BS-CLS Score: ' + bsClsScore + ' out of 100 (' + bsClsPercentage + '%)<hr>BS-CSS Score: ' + bsCssScore + ' out of 100 (' + bsCssPercentage + '%)<hr>Total Score: ' + totalScore + ' out of 300 (' + totalPercentage + '%)<hr>Thanks for connecting with Beed Cyber Infotech KYP Center<hr>';
      }
    }
  });
}
