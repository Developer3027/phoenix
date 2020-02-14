import redux from 'redux';

// This is an action creator and reducer for single state object that is 
// initialized in the reducer. 
function increment() {
    return {
        type: "INCREMENT"
    }
}

function reducer(state = {count: 0}, action) {
    switch(action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            }
        default:
            return state
    }
}

/* ****************************************************************** */
// here is more than one item in state and change increment to handle
// more than one calc with paylaod.

//action creator that takes in a variable. Given a default amount so no
// variable has to be passed in.
function changeCount(amount = 1) {
    return {
        type: "CHANGE_COUNT", //notice the comma here
        payload: amount // payload is the vaiable being passed in.
    }
}

// state is inialized as object count: 0
function reducer(state = {count: 0}, action) {
    switch(action.type) { //switch is a function, passing in action.type
        case "CHANGE_AMOUNT": // case goes to next line with a colon
            return {
                count: state.count + action.payload // this code block does the work.
            }
        default:
            return state
    }
    
}

/* ****************************************************************** */
// Dealing with more than one state
function changeCount(amount = 1) {
    return {
        type: "CHANGE_COUNT",
        payload: amount
    }
}

function addFavoriteThing(thing) {
    return {
        type: "ADD_FAVORITE_THING",
        payload: thing
    }
}

function removeFavoriteThing(thing) {
    return {
        type: "REMOVE_FAVORITE_THING",
        payload: thing
    }
}

const initialState = {
    count: 0,
    favoriteThings: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case "CHANGE_AMOUNT":
            return {
                ...state,   // now you are dealing with more than one state, spread
                            // in the previous state before touching it
                count: state.count + action.payload
            }
        case "ADD_FAVORITE_THING":
            return {
                ...state,
                favoriteThings: [...state.favoriteThings, action.payload]
            }   // to add to the favthings array without mutating state, spread in
                // its state then add the payload
        case "REMOVE_FAVORITE_THING":
            // create a new array that uses filter to include everything but the
            // payload. then set the new filtered array to state
            const removedArray = state.favoriteThings.filter(thing => thing.toLowerCase() !== action.payload.toLowerCase())
            return {
                ...state,
                favoriteThings: removedArray
            }
        default:
            return state
    }
}






const store = redux.createStore(reducer)
store.subscribe(() => {
    console.log(store.getState())
})