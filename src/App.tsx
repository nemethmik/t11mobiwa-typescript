import * as React from "react"
import * as PropTypes from "prop-types"
import logo from "./logo.svg"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/Home"
import ShopIcon from "@material-ui/icons/Shop"
import LogoutIcon from "@material-ui/icons/PowerSettingsNew"
import NotificationsIcon from "@material-ui/icons/Notifications"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ThreeVerticalDotsIcon from "@material-ui/icons/MoreVert"
import {withStyles, Theme, createStyles} from "@material-ui/core/styles"
import firebase from "./t11reactivefbconfig"

type TAppBarStyleFields = {
  sectionDesktop: any,
  sectionMobile: any,
}
const appBarStyleShape: TAppBarStyleFields = {
  sectionDesktop: PropTypes.string.isRequired,
  sectionMobile: PropTypes.string.isRequired,
}
type TAppProps = {
  //The Material UI withStyles HOC automatically includes the field classes into props, and TypeScript compiler somehow understands the trick; really amazing technology.  
  classes: TAppBarStyleFields,
}
type TAppState = {
  fbUser: any,
  loginError: any,
  mobileMoreAnchorEl: any,
  anchorEl: any,
  drawerOpen: boolean,
}

class App extends React.Component<TAppProps,TAppState> {
  public static propTypes = {
    classes: PropTypes.shape(appBarStyleShape).isRequired,
  }  
  state: TAppState = {
    fbUser:{},
    loginError:{},
    mobileMoreAnchorEl:null,
    anchorEl:null,
    drawerOpen: false,
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        // User is signed in.
        this.setState({fbUser,loginError:{}})
        console.log("Firebase User", fbUser)  
      } else {
        try {
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then( () => {
            console.log("SESSION Auth Persistence Logging in ...")
            return firebase.auth().signInWithEmailAndPassword("vera@scross.com", "Password")
          })
        } catch(loginError) {
          console.log("Login Error", loginError)
          this.setState({fbUser:{},loginError})
        }
      }
    })
  }
  toggleDrawer = () => {
    this.setState({drawerOpen : !this.state.drawerOpen});
  }
  private handleMobileMenuOpen = (event:any) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }
  private handleProfileMenuOpen = (event:any) => {
    this.setState({ anchorEl: event.currentTarget });
  }
  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }
  private handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }
  private onLogout = async () => {
    if(this.state.fbUser) {
      try {
        await firebase.auth().signOut();
        this.setState({fbUser:{}})
      } catch (logoutError){
        console.log("Logout Error", logoutError)
      }       
    }
    //console.log("onLogout")
    this.handleMobileMenuClose();
  }

  render() {
    const fbUser = this.state.fbUser as firebase.User
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const renderDesktopMenu = (
      <Menu anchorEl={this.state.anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen} onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
      </Menu>
    );
    const renderMobileMenu = (
      <Menu anchorEl={this.state.mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen} onClose={this.handleMobileMenuClose}>
        <MenuItem onClick={this.onLogout}>
          <IconButton color="inherit"><LogoutIcon /></IconButton>
          <p>Logout</p>
        </MenuItem>
        <MenuItem  onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )
    const drawerSideList = (
      <div>
        <List>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon><ShopIcon /></ListItemIcon>
              <ListItemText primary="Goods Receipt PO" />
            </ListItem>
        </List>
      </div>
    )

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
            <div style={{flexGrow: 1}} />
            <div className={this.props.classes.sectionDesktop}>
              <IconButton color="inherit" onClick={this.onLogout}><LogoutIcon /></IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
            <div className={this.props.classes.sectionMobile}>
              <IconButton color="inherit">
                <Badge badgeContent={11} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <ThreeVerticalDotsIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderDesktopMenu}
        {renderMobileMenu}
        <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.toggleDrawer}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
            {drawerSideList}
          </div>
        </Drawer>
        <div>
          {!fbUser.email && <p>Signin in progress ...</p>}
          {fbUser.email && <p>{fbUser.email}</p>}
          {this.state.loginError.code && <p>{this.state.loginError.code} =  {this.state.loginError.message}</p>} 
        </div>
      </>
    )
  }
}
const appBarStyles = (theme: Theme) => createStyles({
  sectionDesktop: { display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: { display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});
export default withStyles(appBarStyles)(App)
