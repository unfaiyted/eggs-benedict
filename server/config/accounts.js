// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "1020490952465-k15bucbs8umi2ccu977dupt8chgsaq6q.apps.googleusercontent.com",
  secret: "dnIqyc2IPIF_rpMzsTbW-je6"
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
      
    
      return user;
  });

