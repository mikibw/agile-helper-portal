import SignIn from "./SignIn";
import Invitation from "./pages/invitation/Invitation";
import Landing from "./pages/invitation/Landing";
import { useLocalStorageState } from "./hooks";
import {
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import React from "react";
import Nav from "./Nav";
import { client, saveToken } from "./client";

const NotFoundScreen = () => {
  return (
    <div className="container">
      <div className="title">
        Sorry... nothing here.
        <Link
          className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded"
          to="/"
        >
          Go Sign in
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useLocalStorageState("User");
  const history = useHistory()
  const signUp = (form) => {
    return client("/v1/users/join", { data: form}).then(
      (resp) => {
        if(resp.data.success) {
          history.replace({pathname: '/landing'})
        }
      }
    );
  };
  const login = (form) =>
    client("/v1/users/login", { data: form }).then((resp) => {
      saveToken(resp.data.token);
      setUser(resp.data);
    });
  const signOut = () => {
    localStorage.clear();
    setUser(null);
    history.replace('/')
  };
  if (user) {
    return (
      <>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <Nav user={user} onSignOut={signOut} />
          <Dashboard />
        </Route>
        </>
    );
  } else {
    return (
      <>
        <Route exact path="/">
          <SignIn onSubmit={login} />
        </Route>
        <Route path="/invitations/:code">
          <Invitation onSubmit={signUp} />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="*">
          <NotFoundScreen />
        </Route>
        </>
    );
  }
};

export default App;
