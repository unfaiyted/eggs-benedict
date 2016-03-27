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


// Calculate Route
Router.route('/profile/', {
  name: 'profile',
  action: function () {
    this.render('profile');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});


// Calculate Route
Router.route('/about/', {
  name: 'about',
  action: function () {
    this.render('about');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});


// Calculate Route
Router.route('/contact/', {
  name: 'contact',
  action: function () {
    this.render('contact');
    SEO.set({ title: '' + Meteor.App.NAME });
  }
});




Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  }
};

var filters = Router._filters;

if(Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll); // for all pages
}

