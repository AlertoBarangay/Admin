let user = null;
initApp = function() {
  let logInUrl = "/login";
  let homeUrl = "/";
  let verifyAdminUrl = "/verifyadmin";
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    logInUrl += ".html";
    verifyAdminUrl += ".html";
  }
  firebase.auth().onAuthStateChanged(function(userInfo) {
    if(userInfo){
      user = userInfo;
      // console.log(userInfo);
      firebase.database().ref('Barangay/verifiedEmailUID').child(user.uid).get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          if(location.pathname === verifyAdminUrl || location.pathname === logInUrl)location.href = homeUrl;
        }else{
          if(location.pathname !== verifyAdminUrl)location.href = verifyAdminUrl;
        }
      }).catch((error) => {
        console.error(error);
      });
      
    }else{
      if(location.pathname !== logInUrl )location.href = logInUrl;
    }
  });  
}

window.addEventListener('load', function() {
  initApp()
});
