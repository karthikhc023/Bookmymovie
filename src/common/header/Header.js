import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom'
import './Header.css';




function getModalStyle() {

  return {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'

  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'} style={{ padding: 0, textAlign: 'center' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(0)
  },
  lrtab: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  loginStyle: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  }
}));

export default function Header(props) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [loggedin, setLoggedin] = React.useState(sessionStorage.getItem("access-token") == null ? false : true);

  //classes state for Login
  const [usernameRequire, setUsersnameRequire] = React.useState("dispNone")
  const [passwordRequire, setPasswordRequire] = React.useState("dispNone")

  //states for Login
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invalidlogin, setInvalidLogin] = React.useState("");

  //states of Registration
  const [firstname, setFirstName] = React.useState("")
  const [lastname, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [registerpassword, setRegisterPassword] = React.useState("")
  const [contact, setContact] = React.useState("")

  //classes states of Registration
  const [firstnameRequired, setFirstnameRequired] = React.useState("dispNone")
  const [lastnameRequired, setLastnameRequired] = React.useState("dispNone")
  const [emailRequired, setEmailRequired] = React.useState("dispNone")
  const [registerPasswordRequired, setRegisterPasswordRequired] = React.useState("dispNone")
  const [contactRequired, setContactRequired] = React.useState("dispNone")

  const [registrationSuccess, setRegistrationSucess] = React.useState(false);

  //handler to open modal
  const handleOpen = () => {
    setOpen(true);
  };

  //handler to close modal
  const handleClose = () => {
    setOpen(false);
  };


  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  //Handler for Login
  const inputUsernameChangeHandler = (e) => {
    setUsername(e.target.value);
    //console.log(username);

  }

  //Handler for Password
  const inputPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
    //console.log(password);

  }

  //Handlers for Registration

  const inputFirstNameChangeHandler = (e) => {
    setFirstName(e.target.value)
  }

  const inputLastNameChangeHandler = (e) => {
    setLastName(e.target.value)
  }

  const inputEmailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const inputRegisterPasswordChangeHandler = (e) => {
    setRegisterPassword(e.target.value)
  }

  const inputContactChangeHandler = (e) => {
    setContact(e.target.value)
  }

  //Handler for Login
  const loginClickHandler = async () => {
    //Classname assigned on basis of empty value or non empty value
    username === "" ? setUsersnameRequire("dispBlock") : setUsersnameRequire("dispNone");
    password === "" ? setPasswordRequire("dispBlock") : setPasswordRequire("dispNone")

    const requestOptions = {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "authorization": "Basic " + window.btoa(username + ":" + password)
      }
    }

    if (username !== "" && password !== "") {
      try {

        const rawResponse = await fetch(props.baseUrl + 'auth/login', requestOptions)
        //console.log(window.btoa({username:password}))

        const result = await rawResponse.json();
        if (rawResponse.ok) {
          //console.log(JSON.stringify(result));

          setLoggedin(true);
          sessionStorage.setItem("uuid", JSON.stringify(result["id"]));
          sessionStorage.setItem("access-token", rawResponse.headers.get('access-token'));
          //console.log(JSON.stringify(result["id"]) + " " + rawResponse.headers.get('access-token'))
          setUsername("")
          setPassword("")
          handleClose();
          setInvalidLogin("");
        }
        else {
          const error = new Error();
          error.message = result.message || 'Something went wrong.';
          setInvalidLogin("Invalid username or password")
        }

      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    }
  }
  const logoutClickHandler = () => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    setLoggedin(false);

  }

  const registerClickHandler = async () => {
    //Handler for Registration

    firstname === "" ? setFirstnameRequired("dispBlock") : setFirstnameRequired("dispNone");
    lastname === "" ? setLastnameRequired("dispBlock") : setLastnameRequired("dispNone")
    registerpassword === "" ? setRegisterPasswordRequired("dispBlock") : setRegisterPasswordRequired("dispNone")
    email === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone")
    contact === "" ? setContactRequired("dispBlock") : setContactRequired("dispNone")


    const params = {
      email_address: email,
      first_name: firstname,
      last_name: lastname,
      mobile_number: contact,
      password: registerpassword
    }

    if (email !== "" && firstname !== "" && lastname !== "" && contact !== "" && registerpassword !== "") {
      try {
        const rawResponse = await fetch(props.baseUrl + '/signup', {
          body: JSON.stringify(params),
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          }
        });

        const result = await rawResponse.json();

        if (rawResponse.ok) {
          //window.location.href = './login.html';
          setRegistrationSucess(true);

        } else {
          setRegistrationSucess(false);
          const error = new Error();
          error.message = result.message || 'Something went wrong.';
          throw error;

        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }

    }
  }
  /// variable body has the Modal contents - Tab, Login and Registration fields
  const body = (

    <div style={modalStyle} className={classes.paper}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        Login
        <form className={classes.loginStyle} noValidate >
          <div>
            <FormControl required>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" type="text" value={username} onChange={inputUsernameChangeHandler} />
              <FormHelperText className={usernameRequire}>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl><br /><br />
            <FormControl required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" value={password} onChange={inputPasswordChangeHandler} />
              <FormHelperText className={passwordRequire}>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl>
            <br /> <div className="invalidlogin">{invalidlogin}</div>

            <br />
            <Button
              variant="contained"
              type="button"
              color="primary"
              onClick={loginClickHandler}
            >Login </Button>
          </div>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>


        <FormControl required>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Input id="firstname" type="text" firstname={firstname} onChange={inputFirstNameChangeHandler} />
          <FormHelperText className={firstnameRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br /><br />
        <FormControl required>
          <InputLabel htmlFor="lastname">Last Name</InputLabel>
          <Input id="lastname" type="text" lastname={lastname} onChange={inputLastNameChangeHandler} />
          <FormHelperText className={lastnameRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br /><br />
        <FormControl required>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="text" email={email} onChange={inputEmailChangeHandler} />
          <FormHelperText className={emailRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br /><br />
        <FormControl required>
          <InputLabel htmlFor="registerPassword">Password</InputLabel>
          <Input id="registerPassword" type="password" registerpassword={registerpassword} onChange={inputRegisterPasswordChangeHandler} />
          <FormHelperText className={registerPasswordRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br /><br />
        <FormControl required>
          <InputLabel htmlFor="contact">Contact No.</InputLabel>
          <Input id="contact" type="text" contact={contact} onChange={inputContactChangeHandler} />
          <FormHelperText className={contactRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br /><br />
        {registrationSuccess === true &&
          <FormControl>
            <span className="successText">
              Registration Successful. Please Login!
            </span>
          </FormControl>
        }
        <br /><br />
        <Button variant="contained" color="primary" onClick={registerClickHandler}>REGISTER</Button>

      </TabPanel>


    </div>
  );



  return (
    <div>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Movies App Logo" />
        {// if not logged in show Login button else Logout Button 
        }
        {!loggedin ?

          <Button
            variant="contained"
            type="button"
            color="default"
            onClick={handleOpen}
            className="login-button"
          >
            Login
          </Button> :
          <Link to="/">
            <Button
              variant="contained"
              type="button"
              color="default"
              onClick={logoutClickHandler}
              className="login-button"
            >

              Logout
            </Button></Link>}

        {// Hide book show on home button, as well as if not logged in forward user to Login window
        }

        {!loggedin && props.showBookShowButton === "true" ?

          <div className="book-button"> <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={handleOpen}
            className="book-button"
          >Book Show</Button></div>
          :
          ""
        }



        {loggedin && props.showBookShowButton === "true" ?
          <Link to={"/bookshow/" + props.id}>
            <div className="book-button"> <Button
              variant="contained"
              type="button"
              color="primary"

              className="book-button"
            >Book Show</Button></div></Link>
          :
          ""
        }
        <Modal open={open} onClose={handleClose} style={modalStyle} >
          {body}
        </Modal>
      </header>
    </div>
  );
}
