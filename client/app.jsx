// Initializing UI theme
let ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin();

// Destructuring the theme to required specific components
let { AppBar, LinearProgress, Card, CardHeader, CardTitle, CardText, Avatar, FontIcon, Snackbar} = MUI;

// Function extracting and validating links info
function getAttachmentVars (resource) {
  let attachments = (resource.attachments && resource.attachments.length > 0)?
                      resource.attachments[0] : false;
  return {
    title: (attachments)? attachments.title : resource.title,
    desc: (attachments)? attachments.text : resource.description,
    media: (attachments && attachments.thumb_url)? attachments.thumb_url : '/images/link.png',
    width: (attachments && attachments.thumb_width)? attachments.thumb_width : 600,
    height: (attachments && attachments.thumb_height)? attachments.thumb_height : 235,
  };
}

// Main layout
MainLayout = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: () => {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      portalTitle: Meteor.settings.public.PortalTitle
    };
  },
  render () {
    return (
      <div>
        <header><AppBar title={this.data.portalTitle} showMenuIconButton={false} /></header>
        <br/>
        <main className="grid__col grid__col--3-of-5 grid__col--centered">{this.props.content}</main>
        <Snackbar message="Meteor + React rulez" autoHideDuration={6000} openOnMount={true} />
      </div>
    );
  }
});

// Home with all links
LinkHome = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: () => {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    let linkId = this.props.linkId;
    let handle = Meteor.subscribe('links');

    return {
      linkLoading: ! handle.ready(),
      resources: Links.find({})
    };
  },
  render() {
    if (this.data.linkLoading) {
      return (<LinearProgress mode="indeterminate" />);
    }

    let linkComponents = this.data.resources.map(function(resource) {
      let {title,desc,media,width,height} = getAttachmentVars(resource);
      return <LinkCard title={title} description={desc} link={resource.link} media={media} width={width} height={height} />
    }.bind(this));

    return (
      <div>
        {linkComponents}
      </div>
    );
  }
});

// Single link page after publish it
LinkPost = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: () => {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    let linkId = this.props.linkId;
    let handle = Meteor.subscribe('specificLink', this.props.linkId);

    return {
      linkLoading: ! handle.ready(),
      resource: Links.findOne(this.props.linkId)
    };
  },
  render() {
    if (this.data.linkLoading) {
      return (<LinearProgress mode="indeterminate" />);
    }

    let {title,desc,media,width,height} = getAttachmentVars(this.data.resource);

    return (
      <div>
        <LinkCard title={title} description={desc} link={this.data.resource.link} media={media} width={width} height={height} />
      </div>
    );
  }
});

// Card component for all links
LinkCard = React.createClass({
  render() {
    return (
    <div className="spacer">
      <Card>
        <CardHeader
          title={this.props.title}
          avatar={<Avatar icon={<FontIcon className="lnr lnr-bookmark" />} color="#fff" backgroundColor="#00BCD4" />}
         />
        <CardText>
          <div className="grid">
            <div className="grid__col grid__col--1-of-3">
              <img className="card-image" src={this.props.media} />
            </div>
            <div className="grid__col grid__col--2-of-3 card-text">
              {this.props.description}
              <div className="card-link">
                <a href={this.props.link} target="blank">{this.props.link}</a>
              </div>
            </div>
          </div>
        </CardText>
      </Card>
    </div>);
  }
});
