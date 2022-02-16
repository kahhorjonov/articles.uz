import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/navbar";
import ProtectedRoute from "../components/protectedRoute";
import ReductorsArticles from "../routes/reductor'sArticles";
import MyTasks from "./../routes/MyTasks";
import Messages from "./../routes/messages";
import Users from "./../routes/users";

class ReductorPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          {/* <Route path="/logout" component={Logout} /> */}
          <ProtectedRoute
            path="/reductor/articles"
            component={ReductorsArticles}
          />
          <ProtectedRoute path="/reductor/myTasks" component={MyTasks} />
          <ProtectedRoute path="/reductor/messages" component={Messages} />
          <ProtectedRoute path="/reductor/users" component={Users} />
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

export default ReductorPage;
