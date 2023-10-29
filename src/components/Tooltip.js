import React from 'react';
import '../components/Tooltip.css';

// can use this to create a box over anything that needs extra information on hover :)

function Tooltip(props) {
  const { text, children } = props;
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
}

export default Tooltip;