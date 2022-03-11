import Boat from "./model/BoatInterface";
import Coord from "./model/CoordInterface";

const initialState = {
    // other reducer parts here
    boats: [],
    bombs: []
}

function populateReducer(state: {boats: Boat[], bombs: Coord[]} = initialState, action: any) {
    switch (action.type) {
        case 'BOAT':
            return {...state, boats: action.element};
        case 'BOMB':
            return { ...state, bombs: action.element};
        default:
            return state
    }
}

export default populateReducer;
