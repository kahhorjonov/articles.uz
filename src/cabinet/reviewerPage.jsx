import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/navbar";
import ProtectedRoute from "../components/protectedRoute";
import Articles from "../routes/articles";
import MyTasks from "./../routes/MyTasks";

class ReviewerPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          {/* <Route path="/admin/articles" component={Articles} /> */}
          {/* <Route path="/logout" component={Logout} /> */}
          <ProtectedRoute path="/reviewer/articles" component={Articles} />
          <ProtectedRoute path="/reviewer/myTasks" component={MyTasks} />
          {/* <ProtectedRoute path="/reviewer/articles" component={Articles} /> */}
          {/* <Route
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          /> */}
          {/* <Route path="/not-found" component={NotFound} /> */}
          {/* <Redirect from="/" exact to="/admin" /> */}
        </Switch>
      </div>
    );
  }
}

export default ReviewerPage;
