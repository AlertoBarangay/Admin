const mobile_no = document.getElementById('mobile_no');
const type = document.getElementById('type');
const status = document.getElementById('status');

const add = document.getElementById('btnAdd');
const remove = document.getElementById('btnDelete');

const update = document.getElementById('btnUpdate');
const database = firebase.database();
const rootRef = database.ref('Report');

add.addEventListener('click', (e) => {
e.preventDefault();
const newData = {
mobile_no : mobile_no.value,
type : type.value,
status : status.value

}
rootRef.child(mobile_no.value).update(newData);
alert("Data Successfully Saved");

});

 remove.addEventListener('click', (e) => {
 e.preventDefault();
 rootRef.child(mobile_no.value).remove()
 .then(() => {
 window.alert('Data removed from database');
 })
 .catch (error =>{
 console.error(error);
 });
 });

update.addEventListener('click', (e) => {
e.preventDefault();
const newData = {
mobile_no : mobile_no.value,
type : type.value,
status : status.value
    
}
    rootRef.child(mobile_no.value).update(newData);
    alert("Data Successfully Updated");
    
});

var root = firebase.database().ref().child("Report");

root.on("child_added", snap =>{

    
    var id = snap.child('id').val();
    var mobile_no = snap.child('mobile_no').val();
    var type = snap.child('type').val();
    var status = snap.child('status').val();
    
    
    
    $("#table_body").append("<tr><td>" + id + "</td><td>"  + mobile_no + "</td><td>" + type + "</td><td>" + status + "</td><td>");
}

);