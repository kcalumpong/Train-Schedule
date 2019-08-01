var firebaseConfig = {
    apiKey: "AIzaSyAlztrSXQNZJfpvLLDQsz5_LC1dccameok",
    authDomain: "train-schedule-a2e30.firebaseapp.com",
    databaseURL: "https://train-schedule-a2e30.firebaseio.com",
    projectId: "train-schedule-a2e30",
    storageBucket: "",
    messagingSenderId: "753616111723",
    appId: "1:753616111723:web:ba4e706129effcc1"
};

firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$(document).ready(function () {

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var trainTime = $("#first-train-input").val().trim();
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        var newTrain = {
            trainTime: trainTime,
            trainName: trainName,
            destination: destination,
            frequency: frequency,
        }

        alert("Train successfully added.")

        console.log(trainName)
        trainData.ref().push(newTrain)

        $("#first-train-input").val("");
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
    })

});

trainData.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val())

    var name = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().destination;
    var time = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"))

    var firstTrainConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var remainingTime = diffTime % trainFrequency;
    console.log("Remaining time: " + remainingTime);

    var minutesAway = trainFrequency - remainingTime;
    console.log("Minutes away: " + minutesAway)

    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Next Arrival: " + moment(nextTrain).format("HH:mm"))

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway),
    );

    $("#train-table > tbody").append(newRow);

})

