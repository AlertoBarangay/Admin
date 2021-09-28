initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $("#signOutButton").click(function(){
        firebase.auth().signOut();
        
      });
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        
        document.getElementById('signOutButton').innerHTML = 'Sign out';
        document.getElementById('account-details').innerHTML = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
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

window.addEventListener('load', function() {
  initApp()
});