import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "346671050871-rq75kgeoh60u54h48p64h4jg2c526nkl.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signOutClick = () => {
    //console.log(this.props.isSignedIn + " before");
    this.auth.signOut();
    //console.log(this.auth.isSignedIn.get());
    //this.onAuthChange(this.auth.isSignedIn.get());
    //console.log(this.props.isSignedIn + " after");
  };

  signInClick = () => {
    //console.log(this.props.isSignedIn + " before1");
    this.auth.signIn();
    //console.log(this.auth.isSignedIn.get());
    //console.log(this.props.isSignedIn + " after1");
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <div>
          <button onClick={this.signOutClick} className="ui red google button">
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.signInClick} className="ui red google button">
            <i className="google icon" />
            Sign In with Google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(
  GoogleAuth
);
