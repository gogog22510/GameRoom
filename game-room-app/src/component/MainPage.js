import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {dispatchJoinMission, makeJoinMission} from "../core/request";
import {AccountCircle} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
    verticalHorizontal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        joinMission: dispatchJoinMission(dispatch)
    }
};

function MainPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const [missionID, setMissionID] = useState("");
    const {joinMission} = props;

    const handleChange = setVal => evt => {
        setVal(evt.target.value);
    };

    const startMission = evt => {
        if (missionID) {
            makeJoinMission(missionID, data => {
                // change page
                joinMission(missionID)
                history.push("/missionPage");
            });
        } else {
            alert("Please enter the mission ID");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div className={classes.verticalHorizontal}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Enter Mission ID" onChange={handleChange(setMissionID)}/>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" color="primary" className={classes.button}
                            onClick={startMission}>
                        Join
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage)