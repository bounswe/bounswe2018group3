import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from '../robin.svg';

import { Link } from "react-router-dom";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit / 2,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    logo: {
        marginTop: theme.spacing.unit,
        backgroundColor: "cyan",
        //font-family: "comic-sans",
    }
});


class SignUp extends React.Component {
  
 render(){
    const { classes } = this.props;
    return (
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <img src={logo} height="140px" width="auto" alt="logo" />
            <Avatar className={classes.avatar}>
                <AddCircleOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">First Name</InputLabel>
                <Input id="fname" name="fname" autoComplete="fname" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Last Name</InputLabel>
                <Input id="lname" name="lname" autoComplete="lname" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" autoComplete="username" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                </FormControl>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign up
                </Button>
                
                <Button component={Link} to="/signIn"
                type="submit"
                fullWidth
                variant="text"
                color="secondary"
                className={classes.submit}
                >
                Already a member
                </Button>
                
            </form>
            </Paper>
        </main>
        </React.Fragment>
    );
}
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);