import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/navbar";
import Articles from "../routes/articles";
import ArticleActivation from "../routes/articleActivation";
import ProtectedRoute from "../components/protectedRoute";
import DinamikSahifalar from "./../routes/dinamikSahifalar";
import Media from "./../routes/media";
import Division from "./../routes/division";
import MyTasks from "./../routes/MyTasks";
import Messages from "./../routes/messages";
import Users from "./../routes/users";

class AdminPage extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        {/* <Articles /> */}
        {/*<ArticleActivation />*/}

        <Switch>
          {/* <Route path="/admin/articles" component={Articles} /> */}
          {/* <Route path="/logout" component={Logout} /> */}
          <ProtectedRoute
            path="/admin/articleActivation"
            component={ArticleActivation}
          />
          <ProtectedRoute path="/admin/articles" component={Articles} />
          <ProtectedRoute path="/admin/media" component={Media} />
          <ProtectedRoute path="/admin/divisions" component={Division} />
          <ProtectedRoute path="/admin/myTasks" component={MyTasks} />
          <ProtectedRoute path="/admin/messages" component={Messages} />
          <ProtectedRoute path="/admin/users" component={Users} />
          <ProtectedRoute
            path="/admin/dynamicPages"
            component={DinamikSahifalar}
          />
          {/* <Route
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          /> */}
          {/* <Route path="/not-found" component={NotFound} /> */}
          {/* <Redirect from="/" exact to="/admin" /> */}
        </Switch>
      </>
    );
  }
}

export default AdminPage;
