let adminInfo = null;
initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $("nav").show();
      $("#signOutButton").click(function(){
        firebase.auth().signOut();
      });
      

      const adminRef = firebase.database().ref('Barangay/Admins');

      adminRef.child(user.uid).get().then((snapshot)=>{
        if(snapshot.exists()){
          
          adminInfo = snapshot.val();
          adminInfo.uid = user.uid;
          const fullName = adminInfo.firstName + " " + adminInfo.middleName.charAt(0) + ". "+adminInfo.lastName;
          $("#profileActionButton").html(fullName);
          adminInfo.fullName = fullName;

          $("#showProfile").click(showProfile);

        }
      })
        
    } else {
      location.href = "/login.html";
      // User is signed out.
      $("#signOutButton").click(function(){
        location.href = "/login.html";
      });
      document.getElementById('signOutButton').innerHTML = "Sign In"
      document.getElementById('account-details').innerHTML = ' ';
    }
  }, function(error) {
    console.log(error);
  });
};

function showProfile(){

  let profileBody = "<div>";

  profileBody += '<h3 class="mb-2">'+adminInfo.fullName+'</h3>';
  
  let toShowKey = ['isNightShift','email','mobileNumber','address'];
  for(var i = 0; i < toShowKey.length; i++ ){
    var key = toShowKey[i];
    var displayKey = "";
    let splittedKey = key.split(/(?=[A-Z])/);
    for(var j = 0; j < splittedKey.length;j++){
      displayKey += splittedKey[j].charAt(0).toUpperCase() + splittedKey[j].slice(1) + " ";
    }
    if(key === "isNightShift"){
      displayKey = "Shift";
      if(key)adminInfo[key] = "Night";
      adminInfo[key] = "Day";
    }
    console.log(i);

    profileBody += '<div><div class="d-flex text-secondary my-2"><h5>'+displayKey+'</h5><span class="mx-1">:</span><h5 class="text-dark">'+adminInfo[key]+'</h5></div></div>'
  }
    
  
profileBody += "</div>"

  Swal.fire({
    html: profileBody,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
  })
}
initApp()
