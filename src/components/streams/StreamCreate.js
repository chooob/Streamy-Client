import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  //redux-form automatically calls prevent default on our form and now onSubmit is called with values from our form
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
    //console.log(formValues);
  };

  render() {
    return (
      <div>
        <h3 style={{ marginLeft: "10px" }}>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream: createStream })(StreamCreate);
