import React, {useState, useEffect, useRef} from 'react'
import Login from './Login'
import ModalMessage from './ModalMessage'
import Signup from './Signup'

function ManageRegistration() {
    const [accounts, setAccounts] = useState([])
    const [formstatus, setStatus] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const modalMessage = useRef("")

    
    useEffect(() => {
        console.log("accounts updated", accounts)
    }, [accounts])
    
    const getInformation = (newAcc) => {
        setAccounts(prevAccounts => [...prevAccounts, newAcc])
    }

    const getMessage = (msg) => {
        modalMessage.current = msg
        setModalShow(true)
    }

    const toggleForms = (e) => {
        e.target.id==="login"? setStatus(false): setStatus(true)
    }

    return (
        <div className='form-container'>
            <div className='toggle-form d-flex text-center'>
                <div id="login" className={`toggle-form__box flex-fill ${!formstatus? "selected":""}`} onClick={toggleForms}>ورود</div>
                <div id="signup" className={`toggle-form__box flex-fill ${formstatus? "selected":""}`} onClick={toggleForms}>ثبت نام</div>
            </div>
            {formstatus? 
            (<Signup transferData={getInformation} accounts={accounts} transferMessage={getMessage}/>):(<Login accounts={accounts} transferMessage={getMessage}/>)}
            
            {modalShow? <ModalMessage message={modalMessage.current} show={modalShow} onHide={() => setModalShow(false)} />: null}     
        </div>
    )
}

export default ManageRegistration;
