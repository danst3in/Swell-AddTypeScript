import React, { Component } from 'react';

import ReactJson from 'react-json-view'

class ResponsePlain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);

    // const json = this.props.content.events[0].data

    let contentBody;
    if (this.props.content.events[0]) {
      try {
        let json = JSON.parse(this.props.content.events[0].data);
        contentBody = <ReactJson src={json} name={false} collapsed={1} />
      } 
      catch(err) {
        contentBody = <ReactJson src={{json}} name={false} collapsed={1} />
      }
    }

    return(
      <div style={{'border' : '1px solid black', 'margin' : '3px', 'display' : 'flex', 'flexDirection' : 'column'}}>
        ResponsePlain

        {contentBody}
 
      </div>
    )
  }
}

export default ResponsePlain;