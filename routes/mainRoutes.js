// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});

// Calculate Route
Router.route('/calculate/', {
  name: 'calculate',
  action: function () {
    this.render('calculations');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});


// Calculate Route
Router.route('/results/', {
  name: 'results',
  action: function () {
    this.render('results');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});



