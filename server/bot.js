// Required info to create the connection
var authUrl = Meteor.settings.SlackURL;
var authToken = Meteor.settings.SlackKey;
var autoReconnect = true;
var autoMark = true;
var slack = new Slack(authToken, autoReconnect, autoMark);

// Sending DMs and messages
function sendDm(user, message) {
  slack.openDM(user, function(data) {
    var dm = slack.getDMByID(data.channel.id);
    dm.send(message);
  });
}

function sendMessage(cid, message) {
  var channel = slack.getChannelByID(cid);
  return channel.send(message);
}

// Checking, inserting and updating the links
function upsertLink(url, chan, usr, attach) {
  HTTP.get(url, function(err, data) {
    if (data.statusCode === 200) {
      var ch = cheerio.load(data.content);
      var title = ch('title').text();
      var desc = ch('meta[name=description]').attr('content');

      Links.upsert({
        link: url
      }, {
        link: url,
        title: title,
        description: desc,
        channel: chan,
        user: usr,
        attachments: attach,
        updated_at: new Date(),
        published: false
      }, function(err, data) {
        if (data && data.insertedId) {
          sendDm(usr, Meteor.settings.public.SendDmMessage + Meteor.absoluteUrl('addLink/') + data.insertedId);
        }
      });
    }
  });
}

// Connecting the bot
slack.on('open', Meteor.bindEnvironment(function() {
  console.log("Connected - bot is listening");
}));

// Listening for messages
slack.on('message', Meteor.bindEnvironment(function(message) {
  var msg = (!message.message) ? message : message.message;
  msg.channel = message.channel;
  msg.attach = msg.attachments || [];

  // checking if the message contains a link
  if (msg.user && /(https?:.+?)(?=\>)/.test(msg.text)) {
    var matches = /(https?:.+?)(?=\>)/.exec(msg.text);
    upsertLink(matches[0], msg.channel, msg.user, msg.attach);
  }
}));

// Meteor startup
Meteor.startup(function() {
  slack.login();
});
