import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { validationSignup } from "./functions";
import Form from 'react-bootstrap/Form'


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
            setFormValues(initialValues)
        }
    }, [formErrors])


    return (
        <>
        <Form onSubmit={handleSubmit}>
            <div className="d-flex">
            <Form.Group className="flex-fill">
                <Form.Control 
                placeholder="نام" 
                type="text" 
                name="name" 
                value={formValues.name}
                onChange={changeValues}
                />
                {formErrors.name? <Form.Text>{formErrors.name}</Form.Text>: null}
            </Form.Group>

            <Form.Group className="flex-fill">
                <Form.Control 
                placeholder="نام خانوادگی" 
                type="text" 
                name="lastName" 
                value={formValues.lastName}
                onChange={changeValues}
                />
                {formErrors.lastName? <Form.Text>{formErrors.lastName}</Form.Text>: null}
            </Form.Group>
            </div>
        </Form>
\
        <form onSubmit={handleSubmit}>
            {/* <div className="field">
            <InputBox text="نام" type="text" name="name" value={formValues.name} onChange={changeValues}/>
            {formErrors.name? <p>{formErrors.name}</p>: null}
            </div> */}
            
            {/* <div className="field">
            <InputBox text="نام خانوادگی" type="text" name="lastName" value={formValues.lastName} onChange={changeValues}/>
            {formErrors.lastName? <p>{formErrors.lastName}</p>: null}
            </div> */}

            <div className="field">
                <select 
                name="province" 
                defaultValue={""}
                onChange={changeValues}
                >
                    {/* <option value="" disabled selected hidden></option> */}
                    <option value="">استان</option>
                    {Object.keys(provinceData).map(prov => {
                        return <option>{prov}</option>
                    })}
                </select>
            
                <select 
                name="city" 
                defaultValue={""}
                onChange={changeValues}
                >
                    {formValues.province?
                    <><option value="" selected hidden>شهرستان</option>
                    {provinceData[formValues.province].map(city => {
                        return <option>{city}</option>
                    })}</> : (<><option value="" selected hidden>شهرستان</option>
                    <option value="" disabled>ابتدا استان محل زندگی خود را انتخاب کنید</option></>)}

                </select>

                {formErrors.place? <p>{formErrors.place}</p>: null}
            </div>

            <div className="field">
                <select 
                name="education" 
                defaultValue={""}
                onChange={changeValues}
                >
                    <option value="">تحصیلات</option>
                    <option value={'diploma'}>دیپلم</option>
                    <option value={'bachelor'}>لیسانس</option>
                    <option value={'master'}>فوق لیسانس</option>
                    <option value={'phd'}>دکتری</option>
                </select>
                
                {formValues.education?
                    <InputBox 
                        text="محل تحصیل"
                        type="text"
                        name="eduPlace"
                        value={formValues.eduPlace}
                        onChange={changeValues}
                    /> : null
                }

                {formErrors.eduPlace? <p>{formErrors.eduPlace}</p>: null}
            </div>

            <div className="field">
            <InputBox text="پست الکترونیک" type="text" name="email" value={formValues.email} onChange={changeValues}/>
            {formErrors.email? <p>{formErrors.email}</p>: null}
            </div>

            <div className="field">
            <InputBox text="کلمه عبور" type="password" name="password" value={formValues.password} onChange={changeValues}/>
            {formErrors.password? <p>{formErrors.password}</p>: null}
            </div>
            
            <button type="submit">ثبت نام</button>
        </form>
        </>
    )   
}

export default Signup;