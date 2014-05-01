/** @jsx React.DOM */

var FAKE_ITEMS = [
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-01.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-02.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-03.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-04.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-05.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-06.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-07.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-09.png',
  'http://www.youthedesigner.com/wp-content/uploads/2010/03/beautiful-book-covers-10.png'
];

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ZENPQU1Bb1AySmI=|1430295240|wVuklXUsOnYwMHvcZGHvcTvirvlLYPsXwqp/w9iUPG0=');
  }
});

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <div className="recent-thread-list">
          {_.map(this.props.recentThreads, this.createRecentThreadItem)}
        </div>
      </div>
    )
  },
  createRecentThreadItem: function(recentThread) {
    return (
      <div className="recent-thread-item">
        <h1>{recentThread.thread.title}</h1>{}
        <p>{this.subtitleForHtml(recentThread.html)}</p>
      </div>
    )
  },
  subtitleForHtml: function(html) {
    return $('<div/>').html(html).find(':eq(1)').text();
  }
});

var Carousel = React.createClass({
  render: function() {
    return (
      <div className="carousel">
        {_.map(this.props.items, this.createCarouselItem)}
      </div>
    );
  },
  createCarouselItem: function(item) {
    return (
      <div className="carousel-item" onClick={this.pickFile}>
        <img src={item} />
      </div>
    );
  },
  pickFile: function() {
    filepicker.setKey('ApjPJ9vSBQVqmLQv3v38gz');
    filepicker.pick(function(InkBlob){
      console.log(InkBlob.url);
    });
  }
});

var Lolita = React.createClass({
  getInitialState: function() {
    return {
      recentThreads: {}
    };
  },
  render: function() {
    return (
      <div className="lolita">
        <div className="workspace">
          <Sidebar recentThreads={this.state.recentThreads} />
          <div className="board">
            <Carousel items={FAKE_ITEMS} />
            <div className="folder-stats">
              ...
            </div>
          </div>
        </div>
        <div className="user-stats">
          <div className="user-stats-inner">
            Well, this is hawkward.
          </div>
        </div>
      </div>
    );
  },
  // componentDidMount: function() {
  //   var self = this;

  //   $.get('http://localhost:8000/?url=https://platform.quip.com/1/threads/recent?count=20', function(threads) {
  //     self.setState({
  //       recentThreads: _.sortBy(threads, function(thread) { return thread.thread.updated_usec * -1 })
  //     });
  //   });
  // }
});

React.renderComponent(<Lolita />, document.body);
