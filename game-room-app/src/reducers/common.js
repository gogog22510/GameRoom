import {JOIN_MISSION} from "../core/constant"
const initialState = {
    missionID: null,
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case JOIN_MISSION:
            return Object.assign({}, state, {
                missionID: action.data,
            });
        default:
            return state
    }
}