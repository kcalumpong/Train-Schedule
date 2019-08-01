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

// var trainTime = 0;
// var trainName = "";
// var destination = "";
// var frequency = 0;

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

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(time),
        // $("<td>").text(minutesAway),
    );


    $("#train-table > tbody").append(newRow);





    // $("tbody").append("<tr><td>" + childSnapshot.val().destination + "</td></tr>")
    // $("tbody").append("<tr><td>" + childSnapshot.val().frequency + "</td></tr>")

})

