import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {updateMission} from "../core/request";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    }
}));

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

function MissionPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const [goMission, setGoMission] = useState(false);
    const {common} = props;

    const noPointer = {cursor: 'default'};

    useEffect(() => {
        if (!common.missionID) {
            history.push("/");
        }
    }, [common]);

    const selectGoOrNOt = goOrNot => evt => {
        setGoMission(goOrNot);
    };

    const iconGroup = expect => {
        return (
            <React.Fragment>
                <IconButton tooltip="Go mission" style={noPointer} onClick={selectGoOrNOt(true)}>
                    <DoneIcon style={{ fontSize: 100, color: expect? "red": "black" }} />
                </IconButton>
                <IconButton tooltip="No go mission" style={noPointer} onClick={selectGoOrNOt(false)}>
                    <NotInterestedIcon style={{ fontSize: 100, color: expect? "black": "red" }} />
                </IconButton>
            </React.Fragment>
        );
    };

    const updatePoll = evt => {
        updateMission(common.missionID, goMission, data => {
            // change page
            history.push("/missionResult");
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography variant="h5" color="primary">
                    Mission : {common.missionID}
                </Typography>
                {goMission? iconGroup(true): iconGroup(false)}
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={updatePoll}>
                    Send
                </Button>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MissionPage)