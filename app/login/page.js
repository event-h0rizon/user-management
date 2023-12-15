'use client'
import React, { useState, useEffect } from 'react'
import isd from '@/json/isd.json'
import states from '@/json/states.json'
import { TiDelete } from "react-icons/ti";

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [firstNameWarning, setFirstNameWarning] = useState(false)
    const [lastName, setLastName] = useState('')
    const [lastNameWarning, setLastNameWarning] = useState(false)
    const [email, setEmail] = useState('')
    const [emailWarning, setEmailWarning] = useState(false)
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [mobile, setMobile] = useState('')
    const [mobileWarning, setMobileWarning] = useState(false)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [zipWarning, setZipWarning] = useState(false)
    const [address1Warning, setAddress1Warning] = useState(false)
    const [disableButton, setDisabledButton] = useState(false)
    const [isValid, setIsValid] = useState(false)




    const [dropDown, setDropDown] = useState(false)
    const [dropDownStates, setDropDownStates] = useState(true)

    const [countryList, setCountryList] = useState([...isd])
    const [stateDB, setStateDB] = useState([...states])

    const [stateList, setStateList] = useState([])

    const [selectedCountryList, setSelectedCountryList] = useState([])
    const [selectedStateList, setSelectedStateList] = useState([])

    const [typedCountry, setTypedCountry] = useState('')


    const addCountry = (country) => {
        if (selectedCountryList.includes(country)) {
            setCountry([...selectedCountryList])
            setTypedCountry('')
            return
        } else {
            setSelectedCountryList([...selectedCountryList, country])
            setCountry([...selectedCountryList])
            setTypedCountry('')

        }
    }

    const removeCountry = (country) => {

        const updatedCountries = selectedCountryList.filter((item) => {
            return item !== country;
        });
        setSelectedCountryList(updatedCountries)
        setCountry([...selectedCountryList])

    }

    const addState= (state)=> {
        setSelectedStateList([...selectedStateList, state])
        setState([...selectedStateList])

    }
    const removeState= (state)=> {
        const updatedStates = selectedStateList.filter((item) => {
            return item !== state;
        });
        setSelectedStateList(updatedStates)
        setState([...selectedStateList])
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
            setFirstName(e.target.value)
        }
        if (e.target.name === 'lastName') {
            setLastName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            const validateEmail = () => {
   
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const isValidEmail = emailRegex.test(email);
                setIsValid(isValidEmail);
            };
          
            validateEmail()

        }
        if (e.target.name === 'zip') {
            setZip(e.target.value)
        }
        if (e.target.name === 'mobile') {
            setMobile(e.target.value)
        }
        if (e.target.name === 'address1') {
            setAddress1(e.target.value)
        }
        if (e.target.name === 'address2') {
            setAddress2(e.target.value)
        }

    }

    useEffect(() => {
        if (typedCountry !== '') {
            function selectItemsWithPrefix(array, prefix) {
                function capitalizeFirstLetterOfEachWord(inputString) {
                    return inputString.replace(/\b\w/g, match => match.toUpperCase());
                }
                const moddedPrefix = capitalizeFirstLetterOfEachWord(prefix);
                console.log('prefix', prefix)

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

        (firstName.length === 0 || firstName.length < 5) ? setFirstNameWarning(true) : setFirstNameWarning(false);

        (lastName.length === 0 || lastName.length < 5) ? setLastNameWarning(true) : setLastNameWarning(false);

        (mobile.length === 0 || mobile.length != 10) ? setMobileWarning(true) : setMobileWarning(false);

        (zip.length === 0 || zip.length != 6) ? setZipWarning(true) : setZipWarning(false);

        (address1.length === 0 || address1.length < 20) ? setAddress1Warning(true) : setAddress1Warning(false);


    }, [firstName, lastName, email, mobile, address1, zip])

    useEffect(() => {
        if (firstName.length >= 5 && lastName.length >= 5 && mobile.length == 10 && zip.length == 6 && address1.length >= 20) {
            setDisabledButton(false)
        }
        else {
            setDisabledButton(true)
        }

    }, [firstName, lastName, email, mobile, address1, zip])



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
                    <select id="myList" name="myList" className='w-[40%]'>
                        {isd.map((item, index) => {
                            return (<option key={index} value="item.dial_code">{item.name} ({item.dial_code})</option>)
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
                    <input onClick={(e) => setDropDown(value => !value)} onChange={handleChange} name='typedCountry' value={typedCountry} type="text" className='border-2 border-black rounded-md px-2 py-1 w-[100%]' placeholder='Country' />
                    {dropDown && <div className='relative h-[150px] overflow-auto'>
                        <ul className=' px-2 py-2 my-2'>
                            {countryList.map((item, index) => {
                                return (<li key={index}>
                                    <input onClick={() => addCountry(item.name)} type="checkbox" className='hidden' id={item.code} name={item.name} />
                                    <label htmlFor={item.code}>{item.name}</label>
                                </li>)
                            })}
                        </ul>
                    </div>}

                    {<div className='flex gap-2 flex-wrap py-3'>
                        {selectedCountryList.map((country, index) => {
                            return (
                                <div key={index} value={country} onClick={() => removeCountry(country)} className='border-gray-400 border-2 rounded-md px-1 py-1 flex items-center gap-x-2' >{country} <TiDelete className='text-2xl' /></div>
                            )
                        })}

                    </div>}
                </div>
                <div className='flex gap-x-2 my-2 items-center'>
                    <div className='w-[60%]'>
                        <label htmlFor="myStateList"></label>
                        <select id="myStateList" name="myStateList" className='w-[100%] border-black border-2 rounded-md px-2 py-1'>
                            <option key='dummy' value="item.dial_code">Select State</option>
                            {stateList.map((item, index) => {
                                console.log(item)
                                return (<option key={index} onClick={()=> addState(item.name)} value="item.dial_code">{item.name}</option>)
                            })}
                        </select>
                    </div>
                    <input type="number" name='zip' value={zip} onChange={handleChange} className='border-2 border-black rounded-md px-2 py-1 w-[50%]' placeholder='ZIP Code' />
                </div>
                {<div className='flex gap-2 flex-wrap py-3 bg-red-500 text-white'>
                        {selectedStateList.map((state, index) => {
                            return (
                                <div key={index} value={state} onClick={() => removeState(state)} className='border-gray-400 border-2 rounded-md px-1 py-1 flex items-center gap-x-2' >{state} <TiDelete className='text-2xl' /></div>
                            )
                        })}

                    </div>}
                {zipWarning && <div className='my-2 text-red-600'>
                    *Enter a 6 digit ZIP code.
                </div>}
                <div className='mt-10 mb-20 text-center'>
                    <button disabled={disableButton} className='border-black border-2 disabled:bg-slate-500 rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-blue-600'>Create</button>
                </div>

            </div>
        </div>
    )
}

export default SignUp
