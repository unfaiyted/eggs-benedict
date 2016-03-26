// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "1020490952465-k15bucbs8umi2ccu977dupt8chgsaq6q.apps.googleusercontent.com",
  secret: "dnIqyc2IPIF_rpMzsTbW-je6"
});


ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '238160829863958',
    secret: '725672b73edf3d68194d186ec3bb4d2d'
});


Accounts.onCreateUser(function(options, user) {
  var attachData, email, picture, profileImageUrl, profilePicture, url, service,
      allEmails, firstEmail;
  
  profileImageUrl = undefined;
  user.profile = user.profile || {};


      if (user.services.google) {
        user.emails = [
          {
           address: user.services.google.email,
           verified: true
          }
        ];
        
      user.profile.firstName = user.services.google.given_name;
      user.profile.lastName = user.services.google.family_name;
      user.profile.avatar = user.services.google.picture;
      
      } 
      
      if (user.services.facebook) {
         user.emails = [
          {
           address: user.services.facebook.email,
           verified: true
          }
        ];
        
      user.profile.firstName = user.services.facebook.name;
      user.profile.lastName = user.services.facebook.name;
      user.profile.avatar = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  
      
      
        
      }
      
    
      return user;
  });

