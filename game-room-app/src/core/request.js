import apiRequest, {simpleApiRequest} from "./api";
import {JOIN_MISSION} from "./constant";

export const dispatchJoinMission = (dispatch) => missionID => {
    const action = {
        type: JOIN_MISSION,
        data: missionID
    };
    dispatch(action);
    return action;
};

export const updateMission = (missionId, go, callback) => {
    const request = apiRequest(`/api/j/mission/${missionId}`, "PUT");
    const missionUpdate = {
        go: go
    };
    return simpleApiRequest(request(missionUpdate), callback);
};

export const showMissionResult = (missionId, callback) => {
    const request = apiRequest(`/api/j/mission/${missionId}`, "GET");
    return simpleApiRequest(request(), callback);
};

export const makeJoinMission = (missionId, callback) => {
    const request = apiRequest(`/api/j/mission/${missionId}`, "POST");
    return simpleApiRequest(request(), callback);
};