// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});

// Home Route
Router.route('/calculate/', {
  name: 'calculate',
  action: function () {
    this.render('calculations');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});

