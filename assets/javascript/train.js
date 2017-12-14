// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD6RL4XWCxLR3a6jlk4h_H7wFb9mGwBbvw",
    authDomain: "train-activity-2aac0.firebaseapp.com",
    databaseURL: "https://train-activity-2aac0.firebaseio.com",
    projectId: "train-activity-2aac0",
    storageBucket: "",
    messagingSenderId: "755936223723"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#submitButton").on("click", function(event) {
  event.preventDefault();

  // User Input
  var trainName = $("#trainNameInput").val().trim();
  var destInput = $("#destinationInput").val().trim();
  var timeInput = $("#trainTimeInput").val().trim();
  var freqInput = $("#frequencyInput").val().trim();

  // Creates local object to hold all info
  var newTrain = {
    name: trainName,
    destination: destInput,
    trainTime: timeInput,
    frequency: freqInput,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.trainTime);
  console.log(newTrain.rate);

  // Alert
  alert("Choo Choo! Train Time Added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destInput = childSnapshot.val().destination;
  var timeInput = childSnapshot.val().trainTime;
  var freqInput = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destInput);
  console.log(timeInput);
  console.log(freqInput);

  // Minutes Away
  var trainMoment =moment(timeInput,"HH:mm"); 
  var nowMoment = moment();

  var sinceTrainInput = nowMoment.diff(trainMoment,'minutes');
  var lastTrainInput =sinceTrainInput % freqInput;
  var minutesAway =freqInput - lastTrainInput;

  var nextArrival = nowMoment.add(minutesAway,'m');
  var formatNewArrival = nextArrival.format("HH:mm");

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destInput + "</td><td>" +
  freqInput + "</td><td>" + formatNewArrival + "</td><td>" + minutesAway + "</td></tr>");
});

