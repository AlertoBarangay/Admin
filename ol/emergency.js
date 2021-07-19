var rootRef = firebase.database().ref().child("Users");

rootRef.on("child_added", snap =>{

    var name = snap.child("name").val();
    var email = snap.child("email").val();
    var mobile_no = snap.child("mobile_no").val();
    var address = snap.child("adress").val();

    $("#table_body").append("<td>" + name + "</td><td>" + email + "</td><td>" + mobile_no + "</td><td>" + address)

});
