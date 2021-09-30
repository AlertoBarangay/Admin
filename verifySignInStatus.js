let user = null;
initApp = function() {
  const logInUrl = "/login";
  const homeUrl = "/";
  const verifyAdminUrl = "/verifyadmin";
  firebase.auth().onAuthStateChanged(function(userInfo) {
    if(userInfo){
      user = userInfo;
      console.log(userInfo);
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
