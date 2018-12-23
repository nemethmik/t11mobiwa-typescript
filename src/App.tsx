import * as React from "react"
import logo from "./logo.svg"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
class App extends React.Component {
  toggleDrawer = () => {}
  render() {
    return (
      <>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} color="inherit" 
              style={{marginLeft: -18, marginRight: 4,}}> 
              <img src={logo} className="App-logo" alt="logo" width="56px" />
              {/*<MenuIcon />*/}
            </IconButton>
            <Typography variant="h6" noWrap color="inherit">MobiWa</Typography>
          </Toolbar>
        </AppBar>
        <div>
        </div>
      </>
    )
  }
}

export default App;
