import React from "react";
import { Field, reduxForm } from "redux-form"; //capitalization = component  lowercase = method

class StreamForm extends React.Component {
  renderError(meta) {
    if (meta.touched === true && meta.error !== undefined) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    //console.log(formProps.meta);
    //uses Temperate literals ${} anything in the brackets will be evaluated as an expression
    const test = `field ${
      formProps.meta.error !== undefined && formProps.meta.touched === true
        ? "error"
        : ""
    }`;

    return (
      <div className={test} style={{ margin: "0 10px 10px 10px" }}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off"></input>
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  //redux-form automatically calls prevent default on our form and now onSubmit is called with values from our form
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    //console.log(formValues);
  };

  render() {
    return (
      //name prop always require in field
      //field will not show anything without a component prop
      //onSubmit we are passing in the handleSubmit function from this.props from redux-form and we are passing in our own helper onSubmit function
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button
          className="ui button primary"
          style={{ margin: "0 10px 0 10px" }}
        >
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  //console.log(formValues);
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title!";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description!";
  }

  return errors;
};

export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);
