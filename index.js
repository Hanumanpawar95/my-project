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
        var bsCitScore = parseFloat(definition['BS-CIT']) || 0;
        var bsClsScore = parseFloat(definition['BS-CLS']) || 0;
        var bsCssScore = parseFloat(definition['BS-CSS']) || 0;
        var totalScore = bsCitScore + bsClsScore + bsCssScore;
        var bsCitPercentage = (bsCitScore / 100) * 100;
        var bsClsPercentage = (bsClsScore / 100) * 100;
        var bsCssPercentage = (bsCssScore / 100) * 100;
        var totalPercentage = (totalScore / 300) * 100;

        output.innerHTML = '<hr>Name: <span class="blinking-text">' + definition['Name'] + '</span><hr>Result: ' + definition['Result'] + '<hr>BS-CIT Score: ' + bsCitScore + ' out of 100 (' + bsCitPercentage.toFixed(2) + '%)<hr>BS-CLS Score: ' + bsClsScore + ' out of 100 (' + bsClsPercentage.toFixed(2) + '%)<hr>BS-CSS Score: ' + bsCssScore + ' out of 100 (' + bsCssPercentage.toFixed(2) + '%)<hr>Total Score: ' + totalScore + ' out of 300 (' + totalPercentage.toFixed(2) + '%)<hr>Thanks for connecting with Beed Cyber Infotech KYP Center<hr>';

        // Add a print button dynamically
        var printButton = document.createElement('input');
        printButton.setAttribute('type', 'button');
        printButton.setAttribute('value', 'Print Result');
        printButton.setAttribute('onclick', 'printResult()');
        output.appendChild(printButton);
      }
    }
  });
}

function printResult() {
  var outputResult = document.getElementById('output').innerHTML;
  var printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Print Result</title></head><body>');
  printWindow.document.write(outputResult);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  printWindow.onload = function() {
    printWindow.print();
    printWindow.onafterprint = function() {
      printWindow.close();
    };
  };
}
 function printResult() {
  var outputResult = document.getElementById('output').innerHTML;
  var printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Print Result</title>');

  // Get the styles from the <style> section in the original HTML
  var styleElements = document.getElementsByTagName('style');
  for (var i = 0; i < styleElements.length; i++) {
    var styleElement = styleElements[i];
    printWindow.document.write(styleElement.outerHTML);
  }

  printWindow.document.write('</head><body>');
  printWindow.document.write(outputResult);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  printWindow.onload = function() {
    printWindow.print();
    printWindow.onafterprint = function() {
      printWindow.close();
    };
  };
}

