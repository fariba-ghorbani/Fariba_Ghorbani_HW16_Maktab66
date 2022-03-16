import React, {useState, useEffect} from 'react'
import InputBox from './InputBox';
import { validationLogin } from './functions'

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
            // console.log("you are logged in")
            setFormValues(initialValues)
        }
    }, [formErrors])


    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
            <InputBox text="پست الکترونیک" type="text" name="email" value={formValues.email} onChange={changeValues}/>
            {formErrors.email? <p>{formErrors.email}</p>: null}
            </div>
            <div className="field">
            <InputBox text="کلمه عبور" type="text" name="password" value={formValues.password} onChange={changeValues}/>
            {formErrors.password? <p>{formErrors.password}</p>: null}
            </div>
            {formErrors.ultimateMSG? <p>{formErrors.ultimateMSG}</p>: null}
            <button type='submit'>ورود</button>
        </form>
    )
}

export default Login
