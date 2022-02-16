import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    objectId: 104025,
    apiData: {}
}


    export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

       setAPIData: (action) => {
            return{apiData: action.payload}
        },

        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1  }
        },

        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        },

       clearId: (state) => {
            return initialState
        },

        resetId: (state,action) => {
            return { ...state, objectId: action.payload }
        }
    }
    
})

export const { setAPIData, incrementId, decrementId, clearId, resetId} = dataSlice.actions

export const fetchData = () => {
    const fetchDataThunk = async () => {
        let state = getState()
        let dispatch = dispatch()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const rData = await response.json()
        dispatch(setAPIData(rData))
    }
    return fetchDataThunk
}
export default dataSlice.reducer