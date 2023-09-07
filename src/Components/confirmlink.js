import React from 'react';

class ConfirmLink extends React.Component {
  handleLinkClick = (e) => {
    e.preventDefault();
    const { to, message } = this.props;

    const confirmed = window.confirm(message);

    if (confirmed) {
      // If the user confirms, navigate to the new page
      window.location.href = to;
    }
  };

  render() {
    const { children } = this.props;

    return (
      <a href="#" onClick={this.handleLinkClick}>
        {children}
      </a>
    );
  }
}

export default ConfirmLink;
