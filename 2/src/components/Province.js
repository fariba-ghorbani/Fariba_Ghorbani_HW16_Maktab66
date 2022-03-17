import React from 'react'

function Province(props) {
  return (
    <>
        <div className="province d-flex flex-column flex-sm-row" >
            <select 
                className={`select flex-fill w-100 ${!props.formValues.province? "non-selected": ""}`}
                name="province" 
                defaultValue={""}
                onChange={props.handleClick}
                // value={props.formValues.province}
                > 
                    {/* <option value="" disabled selected hidden></option> */}
                    <option className="default" value="">استان</option>
                    {Object.keys(props.provinceData).map(prov => {
                        return <option>{prov}</option>
                    })}
            </select>
            
            <select 
            className={`select flex-fill w-100 ${!props.formValues.city? "non-selected": ""}`}
            name="city" 
            defaultValue={""}
            onChange={props.handleClick}
            // value={props.formValues.city}
            >
                {props.formValues.province?
                <><option className="default" value="" selected hidden>شهرستان</option>
                {props.provinceData[props.formValues.province].map(city => {
                    return <option>{city}</option>
                })}</> : (<><option className="default" value="" selected hidden>شهرستان</option>
                <option value="" disabled>ابتدا استان محل زندگی خود را انتخاب کنید</option></>)}
            </select>
            
        </div>
        {props.formErrors.place? <p className="error mt-2">{props.formErrors.place}</p>: null}
    </>
  )
}

export default Province;
