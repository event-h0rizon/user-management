import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    firstName: '',
    lastName: '',
    email: '',
    country_isd: '',
    address1: '',
    address2: '',
    mobile:'',
    country: [],
    state: [],
    zip: '',

    firstNameWarning: false,
    lastNameWarning: false,
    mobileWarning: false,
    zipWarning: false,
    address1Warning: false,




    country: '',
    state: '',


    disableButton: false,
    isValid: false,

    selectedISD: '+91'

}

export const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeFirstName: (state, action)=> {
            state.firstName= action.payload
        },
        changeLastName: (state, action)=> {
            state.lastName= action.payload
        },
        changeEmail: (state, action)=> {
            state.email= action.payload
        },
        changeMobile: (state, action)=> {
            state.mobile= action.payload
        },
        changeAddress1: (state, action)=> {
            state.address1= action.payload
        },
        changeAddress2: (state, action)=> {
            state.address2= action.payload
        },
        changeZip: (state, action)=> {
            state.zip= action.payload
        },
        changeFirstNameWarning: (state, action)=> {
            state.firstNameWarning= action.payload
        },
        changeLastNameWarning: (state, action)=> {
            state.lastNameWarning= action.payload
        },
        changeMobileWarning: (state, action)=> {
            state.mobileWarning= action.payload
        },
        changeCountry: (state, action)=> {
            state.country= action.payload
        },
        changeState: (state, action)=> {
            state.state= action.payload
        },
        changeZipWarning: (state, action)=> {
            state.zipWarning= action.payload
        },
        changeAddress1Warning: (state, action)=> {
            state.address1Warning= action.payload
        },
        changeDisableButton: (state, action)=> {
            state.disableButton= action.payload
        },
        changeIsValid: (state, action)=> {
            state.isValid= action.payload
        },
        changeSelectedISD: (state, action)=> {
            state.selectedISD= action.payload
        }

    }
})

export const { changeFirstName, changeLastName, changeEmail, changeMobile, changeAddress1, changeAddress2, changeZip, changeFirstNameWarning, changeLastNameWarning, changeMobileWarning, changeCountry, changeState, changeZipWarning, changeAddress1Warning, changeDisableButton, changeIsValid, changeSelectedISD }= userSlice.actions
export default userSlice.reducer