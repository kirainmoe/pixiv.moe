import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

import ScrollContext from '@/components/ScrollContext';

export default class InfiniteScroll extends React.Component {
  static propTypes = {
    distance: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  @autobind
  onScroll(event) {
    if (this.props.isLoading) {
      return;
    }

    if (!this.props.hasMore) {
      return;
    }

    const target = event.target,
      targetHeight = target.clientHeight,
      scrollTop = target.scrollTop,
      scrollHeight = target.scrollHeight;

    if (scrollTop + targetHeight - scrollHeight > -1 * this.props.distance) {
      this.props.onLoadMore();
    }
  }

  get scrollingElement() {
    return document.querySelector(`.${ScrollContext.scrollingClassName}`);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {this.scrollingElement && (
          <EventListener
            target={this.scrollingElement}
            onScroll={this.onScroll}
          />
        )}
      </React.Fragment>
    );
  }
}
