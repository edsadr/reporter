// React router compatible with Meteor

FlowRouter.route('/', {
  action: function(params, queryParams) {
   ReactLayout.render(MainLayout, {content: <LinkHome />});
  },
  name: "home"
});

FlowRouter.route('/addLink/:linkId', {
  action: function(params, queryParams) {
    Meteor.call('publishLink', params.linkId,function(err, data) {
        ReactLayout.render(MainLayout, {content: <LinkPost linkId={params.linkId} />});
    });
  }
});
