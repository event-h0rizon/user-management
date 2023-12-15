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

const Edit = ({ params: { id }, searchParams }) => {
    const router = useRouter()
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

    const [selectedISD, setselectedISD] = useState('+91')

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

    const addState = (state) => {
        setSelectedStateList([...selectedStateList, state])
        setState([...selectedStateList])

    }
    const removeState = (state) => {
        const updatedStates = selectedStateList.filter((item) => {
            return item !== state;
        });
        setSelectedStateList(updatedStates)
        setState([...selectedStateList])
    }

    const handleISDChange = (e) => {
        setselectedISD(e.target.value);
    };


    const submitUserDetails = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_UPDATE_USER}/${id}`, {
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
                zip,
            })
        })
        const data = await response.json()
        if (data?.success) {
            router.push('/view')
            toast.success(`User updated successfully.`, {
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
            setFirstName(e.target.value)
        }
        if (e.target.name === 'lastName') {
            setLastName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            const validateEmail = () => {
                const result = validator.isEmail(email)
                setIsValid(result);
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
        const rawUserFetch = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EDIT_USER}/${id}`, { method: 'GET', headers: { "Content-Type": "application/json" } })
            const data = await response.json()

            setFirstName(data.fetchedUser.firstName)
            setLastName(data.fetchedUser.lastName)
            setEmail(data.fetchedUser.email)
            setMobile(data.fetchedUser.mobile)
            setAddress1(data.fetchedUser.address1)
            setAddress2(data.fetchedUser.address2)
            setZip(data.fetchedUser.zip)
            // setZipWarning(false)
            setselectedISD(data.fetchedUser.country_isd)

        }
        rawUserFetch()

    }, [])


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

        (firstName.length === 0 || firstName.length < 5) ? setFirstNameWarning(true) : setFirstNameWarning(false);

        (lastName.length === 0 || lastName.length < 5) ? setLastNameWarning(true) : setLastNameWarning(false);

        { validator.isMobilePhone(mobile.toString(), ['en-IN']) ? setMobileWarning(false) : setMobileWarning(true); }

       
        

        (zip.toString().length != 6) ? setZipWarning(true) : setZipWarning(false);

        (address1.length === 0 || address1.length < 20) ? setAddress1Warning(true) : setAddress1Warning(false);

        { validator.isEmail(email) ? setIsValid(true) : setIsValid(false) }


    }, [firstName, lastName, email, mobile, address1, zip, selectedISD])

    useEffect(() => {
        if (firstName.length >= 5 && lastName.length >= 5 && mobile.length == 10 && zip.length == 6 && address1.length >= 20 && address1.length >= 20 && selectedCountryList.length > 0 && selectedStateList.length > 0) {
            setDisabledButton(false)
        }
        else {
            setDisabledButton(true)
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
                    Update User Details
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
                    {dropDown && <div className='relative h-[150px] overflow-auto'>
                        <ul className=' px-2 py-2 my-2 cursor-pointer'>
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
                {dropDownStates && <div className={`${stateList.length === 0 ? 'h-[150px]' : ''}overflow-auto text-red-500 cursor-pointer`}>
                    {stateList && stateList.length === 0 ? <div className='' key={Date.now()} >Choose a country first</div> : <div></div>}
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
                    <button onClick={() => submitUserDetails(id)} disabled={disableButton} className='border-black border-2 disabled:bg-slate-500 rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-blue-600'>Update</button>
                </div>

            </div>
        </div>
    )
}

export default Edit
