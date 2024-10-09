import React from "react"
import Signup from "./components/Signup"
import { AuthenticationProvider } from "./Context"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Profile from "./components/Profile"
import Login from "./components/Login"
import HelperRoute from "./components/HelperRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import Dashboard from "./components/Main_Coponents/Home"

function App() {
  return (
    <Router>
      <AuthenticationProvider>
          <HelperRoute exact path="/" component={Dashboard} />
          <HelperRoute exact path="/folder/:folderId" component={Dashboard} />

          <HelperRoute path="/user" component={Profile} />
          <HelperRoute path="/update-profile" component={UpdateProfile} />

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
      </AuthenticationProvider>
    </Router>
  )
}

export default App;
