/** @jsx React.DOM */
$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ZENPQU1BVW96a20=|1429939491|zAKJ+H4ma1/KW9z6b1P7TlDhmb9BvoQ94Xn5HNtOoDI=');
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
        </div>
        <div className="user-stats">
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    var self = this;

    $.get('http://localhost:8000/?url=https://platform.quip.com/1/threads/recent?count=20', function(threads) {
      self.setState({
        recentThreads: _.sortBy(threads, function(thread) { return thread.thread.updated_usec * -1 })
      });
    });
  }
});

React.renderComponent(<Lolita />, document.body);
