let user = null;
initApp = function() {
  const logInUrl = "/login.html";
  const logInUrl2 = "/login";
  const homeUrl = "/";
  const homeUrl2 = "/index.html";
  const verifyAdminUrl = "/verifyAdmin.html";
  const verifyAdminUrl2 = "/verifyAdmin";
  firebase.auth().onAuthStateChanged(function(userInfo) {
    if(userInfo){
      user = userInfo;
      console.log(userInfo);
      firebase.database().ref('Barangay/verifiedEmailUID').child(user.uid).get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          if(location.pathname !== homeUrl || location.pathname !== homeUrl2 )location.href = homeUrl;
        }else{
          if(location.pathname !== verifyAdminUrl || location.pathname !== verifyAdminUrl2)location.href = verifyAdminUrl;
        }
      }).catch((error) => {
        console.error(error);
      });
      
    }else{
      if(location.pathname !== logInUrl || location.pathname !== logInUrl2 )location.href = logInUrl;
    }
  });  
}

window.addEventListener('load', function() {
  initApp()
 

});