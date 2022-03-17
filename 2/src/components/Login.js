import React, {useState, useEffect} from 'react'
import InputBox from './InputBox';
import { validationLogin } from './../functions'

function Login(props) {
    const initialValues = {email:'', password:''}

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [submit, setSubmit] = useState(false)


    const changeValues = (e) => {
        setFormValues({...formValues, [e.target.name] : e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validationLogin(formValues, props.accounts))
        setSubmit(true)
    }


    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submit === true) {
            props.transferMessage("شما با موفقیت وارد حساب کاربری خود شدید")
            setFormValues(initialValues)
            setSubmit(false)
        }
    }, [formErrors])


    return (
        <>
        <h2 className='title text-center my-4'>خوش آمدید</h2>
        <form onSubmit={handleSubmit}>
            <div className="field mb-3">
                <InputBox text="پست الکترونیک" type="text" name="email" value={formValues.email} onChange={changeValues}/>
                {formErrors.email? <p className='error mt-2'>{formErrors.email}</p>: null}
            </div>
            <div className="field mb-3">
                <InputBox text="کلمه عبور" type="text" name="password" value={formValues.password} onChange={changeValues}/>
                {formErrors.password? <p className='error mt-2'>{formErrors.password}</p>: null}
            </div>
            {formErrors.ultimateMSG? <p className='log-error error mt-2'>{formErrors.ultimateMSG}</p>: null}
            <button className="submit mt-3" type='submit'>ورود</button>
        </form>
        </>
    )
}

export default Login
