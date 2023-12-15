'use client'
import React, { useState, useEffect } from 'react'
import isd from '@/json/isd.json'
import states from '@/json/states.json'
import { TiDelete } from "react-icons/ti";
import { useRouter } from 'next/navigation';
import validator from "validator";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { changeFirstName, changeLastName, changeEmail, changeMobile, changeAddress1, changeAddress2, changeZip, changeFirstNameWarning, changeLastNameWarning, changeMobileWarning, changeCountry, changeState, changeZipWarning, changeAddress1Warning, changeDisableButton, changeIsValid, changeSelectedISD } from '@/redux/features/user/userSlice';




const CreateUser = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const firstName = useSelector((state) => state.user.firstName)
    const lastName = useSelector((state) => state.user.lastName)
    const email = useSelector((state) => state.user.email)
    const mobile = useSelector((state) => state.user.mobile)
    const address1 = useSelector((state) => state.user.address1)
    const address2 = useSelector((state) => state.user.address2)
    const zip = useSelector((state) => state.user.zip)

    const firstNameWarning = useSelector((state) => state.user.firstNameWarning)
    const lastNameWarning = useSelector((state) => state.user.lastNameWarning)
    const mobileWarning = useSelector((state) => state.user.mobileWarning)
    const zipWarning = useSelector((state) => state.user.zipWarning)
    const address1Warning = useSelector((state) => state.user.address1Warning)

    const country = useSelector((state) => state.user.country)
    const state = useSelector((state) => state.user.state)

    const disableButton = useSelector((state) => state.user.disableButton)
    const isValid = useSelector((state) => state.user.isValid)
    const selectedISD = useSelector((state) => state.user.selectedISD)

    const [dropDown, setDropDown] = useState(false)
    const [dropDownStates, setDropDownStates] = useState(false)

    const [countryList, setCountryList] = useState([...isd])
    const [stateDB, setStateDB] = useState([...states])

    const [stateList, setStateList] = useState([])

    const [selectedCountryList, setSelectedCountryList] = useState([])
    const [selectedStateList, setSelectedStateList] = useState([])

    const [typedCountry, setTypedCountry] = useState('')


    const addCountry = (country) => {
        if (selectedCountryList.includes(country)) {
            dispatch(changeCountry([...selectedCountryList]))
            setTypedCountry('')
            return
        } else {
            dispatch(changeCountry([...selectedCountryList]))
            setSelectedCountryList([...selectedCountryList, country])
            setTypedCountry('')

        }
    }

    const removeCountry = (country) => {

        const updatedCountries = selectedCountryList.filter((item) => {
            return item !== country;
        });
        setSelectedCountryList(updatedCountries)
        dispatch(changeCountry([...selectedCountryList]))

    }

    const addState = (state) => {

        if (selectedStateList.includes(state)) {
            dispatch(changeState([...selectedStateList]))
            return
        } else {
            dispatch(changeState([...selectedStateList]))
            setSelectedStateList([...selectedStateList, state])

        }

    }
    const removeState = (state) => {
        const updatedStates = selectedStateList.filter((item) => {
            return item !== state;
        });
        setSelectedStateList(updatedStates)
        dispatch(changeState([...selectedStateList]))
    }

    const handleISDChange = (e) => {
        dispatch(changeSelectedISD(e.target.value))
    };


    const submitUserDetails = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_CREATE_USER, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                firstName,
                lastName,
                email,
                country_isd: selectedISD,
                mobile,
                address1,
                address2,
                countries: selectedCountryList,
                states: selectedStateList,
                zip
            })
        })
        const data = await response.json()
        if (data?.success) {
            router.push('/view')
            toast.success(`User created successfully.`, {
                transition: Flip,
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

    }


    const collapseDropDown = (e) => {
        if (e.target.name !== 'clickedCountry') {
            setDropDown(false)
        }
        else return
    }


    const handleChange = (e) => {

        if (e.target.name === 'typedCountry') {
            setTypedCountry(e.target.value)
        }
        if (e.target.name === 'firstName') {
            dispatch(changeFirstName(e.target.value))
        }
        if (e.target.name === 'lastName') {
            dispatch(changeLastName(e.target.value))
        }
        if (e.target.name === 'email') {
            dispatch(changeEmail(e.target.value))
            const validateEmail = () => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const isValidEmail = emailRegex.test(email);
                dispatch(changeIsValid(isValidEmail))
            };

            validateEmail()

        }
        if (e.target.name === 'zip') {
            dispatch(changeZip(e.target.value))
        }
        if (e.target.name === 'mobile') {
            dispatch(changeMobile(e.target.value))

        }
        if (e.target.name === 'address1') {
            dispatch(changeAddress1(e.target.value))

        }
        if (e.target.name === 'address2') {
            dispatch(changeAddress2(e.target.value))
        }

    }

    useEffect(() => {
        if (typedCountry !== '') {
            function selectItemsWithPrefix(array, prefix) {
                function capitalizeFirstLetterOfEachWord(inputString) {
                    return inputString.replace(/\b\w/g, match => match.toUpperCase());
                }
                const moddedPrefix = capitalizeFirstLetterOfEachWord(prefix);
                return array.filter(item => item.name.startsWith(moddedPrefix));
            }

            const selectedItems = selectItemsWithPrefix(countryList, typedCountry);

            setCountryList([...selectedItems])

        }
        else {
            setCountryList([...isd])
            setTypedCountry('')
        }

    }, [typedCountry])

    useEffect(() => {

        (firstName.length === 0 || firstName.length < 5) ? dispatch(changeFirstNameWarning(true)) : dispatch(changeFirstNameWarning(false));

        (lastName.length === 0 || lastName.length < 5) ? dispatch(changeLastNameWarning(true)) : dispatch(changeLastNameWarning(false));

        (mobile.length === 0 || mobile.length != 10) ? dispatch(changeMobileWarning(true)) : dispatch(changeMobileWarning(false));

        (zip.length === 0 || zip.length != 6) ? dispatch(changeZipWarning(true)) : dispatch(changeZipWarning(false));

        (address1.length === 0 || address1.length < 20) ? dispatch(changeAddress1Warning(true)) : dispatch(changeAddress1Warning(false));

        { validator.isEmail(email) ? dispatch(changeIsValid(true)) : dispatch(changeIsValid(false)) }


    }, [firstName, lastName, email, mobile, address1, zip])

    useEffect(() => {
        if (firstName.length >= 5 && lastName.length >= 5 && mobile.length == 10 && zip.length == 6 && address1.length >= 20 && address1.length >= 20 && selectedCountryList.length > 0 && selectedStateList.length > 0) {
            dispatch(changeDisableButton(false))
        }
        else {
            dispatch(changeDisableButton(true))
        }

    }, [firstName, lastName, email, mobile, address1, zip, selectedCountryList, selectedStateList])



    useEffect(() => {
        const currentCountry = selectedCountryList[0]
        const filteredStates = stateDB.filter((item) => {
            return item.country_name === currentCountry;
        });
        setStateList([...filteredStates])

    }, [selectedCountryList])



    return (
        <div className='flex justify-center items-center  '>
            <div className='w-[40vw] mx-auto'>
                <div className='my-2 text-center font-bold text-3xl'>
                    Create User
                </div>
                <div className='flex gap-x-2 my-2 w-[100%]'>
                    <input type="text" name='firstName' value={firstName} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[50%]' placeholder='First Name' />
                    <input type="text" name='lastName' value={lastName} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[50%]' placeholder='Last Name' />
                </div>
                {firstNameWarning && <div className='my-2 text-red-600'>
                    *First Name should be atleast 5 letters long
                </div>}
                {lastNameWarning && <div className='my-2 text-red-600'>
                    *Last Name should be atleast 5 letters long
                </div>}
                <div className='my-2'>
                    <input type="email" name='email' value={email} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[100%]' placeholder='Email' />
                </div>
                {!isValid && <div className='my-2 text-red-600'>
                    *Enter a valid Email
                </div>}
                <div className='flex my-2'>
                    <label htmlFor="myList"></label>
                    <select id="myList" name="myList" value={selectedISD} onChange={handleISDChange} className='w-[40%]'>
                        {isd.map((item, index) => {
                            return (<option key={index} selected={item.name === 'India'} value={item.dial_code}>{item.name} ({item.dial_code})</option>)
                        })}
                    </select>
                    <input type="number" name='mobile' value={mobile} onChange={handleChange} className='border-2 border-black rounded-md ml-2 px-2 py-1 w-[100%]' placeholder='Mobile' />
                </div>
                {mobileWarning && <div className='my-2 text-red-600'>
                    *Enter a valid 10 digit mobile number
                </div>}
                <div className='my-2'>
                    <input type="text" name='address1' value={address1} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[100%]' placeholder='Address 1' />
                </div>
                {address1Warning && <div className='my-2 text-red-600'>
                    *Enter a valid address.
                </div>}

                <div className='my-2'>
                    <input type="text" name='address2' value={address2} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[100%]' placeholder='Address 2' />
                </div>
                <div className='my-2'>
                    <input onClick={(e) => setDropDown(value => !value)} onChange={handleChange} name='typedCountry' value={typedCountry} type="text" className='border-2 border-black rounded-md px-2 py-1 w-[100%] cursor-pointer' placeholder='Choose Country' />
                    {dropDown && <div className='relative h-[150px] overflow-auto cursor-pointer'>
                        <ul className=' px-2 py-2 my-2'>
                            {countryList.map((item, index) => {
                                return (<li key={index}>
                                    <input onClick={() => addCountry(item.name)} type="checkbox" className='hidden' id={item.code} name={item.name} />
                                    <label htmlFor={item.code}>{item.name}</label>
                                </li>)
                            })}
                        </ul>
                    </div>}
                    <div className='bg-blue-500 px-1 rounded-md py-1 my-2 text-white' >
                        Selected Countries
                        {<div className='flex gap-2 flex-wrap py-3 px-2'>
                            {selectedCountryList.map((country, index) => {
                                return (
                                    <div key={index} value={country} onClick={() => removeCountry(country)} className='border-gray-400 border-2 rounded-md cursor-pointer px-1 py-1 flex items-center gap-x-2 bg-white text-black' >{country} <TiDelete className='text-2xl' /></div>
                                )
                            })}

                        </div>}
                    </div>

                </div>
                <div className='flex gap-x-2 my-2 items-center'>
                    <div className='w-[100%]'>

                        <div id="myStateList" onClick={(e) => setDropDownStates(value => !value)} name="myStateList" className='w-[100%]  overflow-auto border-black border-2 rounded-md px-2 py-1 cursor-pointer'>Choose State


                        </div>
                    </div>

                </div>

                {dropDownStates && <div className={`${stateList.length === 0 ? 'h-[150px]' : ''}overflow-auto cursor-pointer`}>
                    {stateList && stateList.length === 0 ? <div className='text-red-500' key={Date.now()} >Choose a country first</div> : <div></div>}
                    {dropDownStates && stateList.map((item, index) => {
                        console.log(item)
                        return (<div key={index} onClick={() => addState(item.name)} value="item.dial_code">{item.name}</div>)
                    })}

                </div>}

                {<div className='px-1 py-1 bg-blue-500 text-white mt-1 rounded-md cursor-pointer'>
                    <div className='text-sm pt-2 pb-4'>Note: Only the states of the country in the first place of selected countries above, will be populated. However, multiple states can be selected.</div>
                    Selected States:
                    <div className='flex gap-2 flex-wrap pb-3 px-2 pt-1'>
                        {selectedStateList.map((state, index) => {
                            return (
                                <div key={index} value={state} onClick={() => removeState(state)} className='border-gray-400 cursor-pointer border-2 rounded-md px-1 py-1 flex items-center gap-x-2 bg-white text-black' >{state} <TiDelete className='text-2xl' /></div>
                            )
                        })}

                    </div>


                </div>}
                <div>
                    <input type="number" name='zip' value={zip} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[100%] mt-4 mb-2' placeholder='ZIP Code' />

                </div>
                {zipWarning && <div className='my-2 text-red-600'>
                    *Enter a 6 digit ZIP code.
                </div>}

                <div className='mt-10 mb-20 text-center'>
                    <button onClick={submitUserDetails} disabled={disableButton} className='border-black border-2 disabled:bg-slate-500 rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-blue-600'>Create</button>
                </div>

            </div>
        </div>
    )
}

export default CreateUser
