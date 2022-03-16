import React, {useState, useEffect} from 'react'
import Login from './Login'
import Signup from './Signup'
import './style.css'

function ManageRegistration() {
    const [accounts, setAccounts] = useState([])
    const [formstatus, setStatus] = useState(true)

    
    useEffect(() => {
        console.log("from management", accounts)
    }, [accounts])
    
    const getInformation = (newAcc) => {
        setAccounts(prevAccounts => [...prevAccounts, newAcc])
    }

    const toggleForms = () => {
        setStatus(prevStatus => !prevStatus)
    }

    return (
        <div className='form-container'>
            <div className='toggle-form'>
                <div onClick={toggleForms}>ورود</div>
                <div onClick={toggleForms}>ثبت نام</div>
            </div>
            {formstatus? 
            (<Signup transferData={getInformation} accounts={accounts}/>):(<Login accounts={accounts} />)
            }            
        </div>
    )
}

export default ManageRegistration;
