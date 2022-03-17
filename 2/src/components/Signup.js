import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { validationSignup } from "./../functions";
import Province from "./Province";

function Signup(props) {
    const initialValues = {name:'', lastName:'', province:'', city:'', education:'',
    eduPlace:'', email:'', password:''};

    const [provinceData, setProvinceData] = useState("");
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [submit, setSubmit] = useState(false)



    // fetching data
    useEffect(() => {
        fetch('/iranstates.json')
            .then(res => res.json())
            .then(data => {
                setProvinceData(data)
            })
    }, [])


    // change the stored input values
    const changeValues = (e) => {
        if (e.target.name === "province") {
            setFormValues({...formValues, [e.target.name] : e.target.value, city: ""})
        } else {
            setFormValues({...formValues, [e.target.name] : e.target.value})
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validationSignup(formValues, props.accounts))
        setSubmit(true)
    }


    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && submit === true) {
            props.transferData(formValues)
            props.transferMessage("حساب کاربری شما با موفقیت ساخته شد")
            setFormValues(initialValues)
            setSubmit(false)
        }
    }, [formErrors])


    return (
        <>
        <h2 className="title text-center my-4">رایگان ثبت نام کنید</h2>
        <form onSubmit={handleSubmit}>
            {/* name and last name */}
            <div className="d-flex flex-column flex-sm-row mb-3 name">
                <div className="field flex-fill">
                <InputBox text="نام" type="text" name="name" value={formValues.name} onChange={changeValues}/>
                {formErrors.name? <p className="error mt-2 mb-0">{formErrors.name}</p>: null}
                </div>
                
                <div className="field flex-fill">
                <InputBox text="نام خانوادگی" type="text" name="lastName" value={formValues.lastName} onChange={changeValues}/>
                {formErrors.lastName? <p className="error mt-2 mb-0">{formErrors.lastName}</p>: null}
                </div>
            </div>

            {/* the city and province */}
            <div className="field mb-3">
                <Province 
                handleClick={changeValues} 
                provinceData={provinceData}
                formValues={formValues}
                formErrors={formErrors}/>
            </div>

            {/*education and place  */}
            <div className="edu d-flex flex-column mb-3">
                <InputBox 
                className="w-100" text="تحصیلات" type="text" 
                name="education" value={formValues.education} onChange={changeValues}
                />
                
                {formValues.education?
                    <InputBox 
                        className="w-100" text="محل تحصیل" type="text"
                        name="eduPlace" value={formValues.eduPlace} onChange={changeValues}
                    /> : null
                }
                {formErrors.eduPlace? <p className="error mt-2 mb-0">{formErrors.eduPlace}</p>: null}
            </div>

            {/*email and password  */}
            <div className="field mb-3">
            <InputBox text="پست الکترونیک" type="text" name="email" value={formValues.email} onChange={changeValues}/>
            {formErrors.email? <p className="error mt-2 mb-0">{formErrors.email}</p>: null}
            </div>

            <div className="field mb-3">
            <InputBox text="کلمه عبور" type="password" name="password" value={formValues.password} onChange={changeValues}/>
            {formErrors.password? <p className="error mt-2 mb-0">{formErrors.password}</p>: null}
            </div>
            
            <button className="submit mt-3" type="submit">ثبت نام</button>
        </form>
        
        </>
    )   
}

export default Signup;