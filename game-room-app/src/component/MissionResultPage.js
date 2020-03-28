import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {showMissionResult} from "../core/request";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    item: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
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

function MissionResultPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const [missionResult, setMissionResult] = useState({});
    const {common} = props;

    useEffect(() => {
        if (!common.missionID) {
            history.push("/");
        } else {
            refreshResult();
        }
    }, [common]);

    const refreshResult = evt => {
        showMissionResult(common.missionID, data => {
            console.log(data);
            // change result
            setMissionResult(data);
        });
    };

    const showResult = () => {
        const {totalCount, goCount, noGoCount} = missionResult;
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.item} variant="h5">Total : {totalCount}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.item} variant="h5">Go    : {goCount}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.item} variant="h5">No Go : {noGoCount}</Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Button variant="outlined" color="primary" className={classes.button} onClick={refreshResult}>
                    Refresh
                </Button>
                <Typography variant="h5" color="primary">
                    Mission : {common.missionID}
                </Typography>
                {showResult()}
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MissionResultPage)