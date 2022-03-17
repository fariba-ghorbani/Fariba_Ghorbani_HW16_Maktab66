export const validationSignup = (values, accounts) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // name validation
    if (!values.name) {
        errors.name = "لطفا نام خود را وارد کنید";
    }
    // last-name validation
    if (!values.lastName) {
        errors.lastName = "لطفا نام خانوادگی خود را وارد کنید";
    }
    // email validation
    if (!values.email) {
        errors.email = "لطفا پست الکترونیکی خود را وارد کنید";
    } else if (!regex.test(values.email)) {
        errors.email = "پست الکترونیکی وارد شده معتبر نیست";
    } else if (accounts.some(item => item.email === values.email)) {
        errors.email = "این پست الکترونیکی قبلا استفاده شده است";
    }
    // password validation
    if (!values.password) {
        errors.password = "لطفا کلمه عبور را وارد کنید";
    }
    // place validation
    if (!values.city) {
        errors.place = "لطفا محل زندگی خود را انتخاب کنید";
    }
    // education validation
    if (values.education && !values.eduPlace) {
        errors.eduPlace = "لطفا محل تحصیل خود را وارد کنید";
    }
    
    return errors;
}




export const validationLogin = (values, accounts) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let emailValid = false;
    let passValid = false;
    // email validation
    if (!values.email) {
        errors.email = "لطفا پست الکترونیکی خود را وارد کنید";
    } else if (!regex.test(values.email)) {
        errors.email = "پست الکترونیکی وارد شده معتبر نیست";
    } else {
        emailValid = true;
    }
    // password validation
    if (!values.password) {
        errors.password = "لطفا کلمه عبور را وارد کنید";
    } else {
        passValid = true;
    }

    if (emailValid && passValid) {
        let findAcoount = accounts.find(item => item.email === values.email && item.password === values.password)
        findAcoount ? console.log("no error"):errors.ultimateMSG = "نشانی پست الکترونیکی یا کلمه عبور صحیح نیست"
    }

    return errors;
}
