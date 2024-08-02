
function Validations(values) {
    const errors = {}
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!values.phone.trim()) {
        errors.phone = "Số điện thoại là bắt buộc"
    }
    if(!values.password.trim()) {
        errors.password = "Mật khẩu là bắt buộc"
    }
    else if(values.password.length<8){
        errors.password = "Mật khẩu bắt buộc phải có 8 kí tự trở lên"
    }

    if(values.email.trim().length > 0 && !regex.test(values.email)) {
        errors.email = 'Email không đúng định dạng'
    }

    if(!values.retypedPassword.trim()) {
        errors.retypedPassword = "Vui lòng nhập lại mật khẩu xác nhận"
    }
    else if(values.retypedPassword !== values.password) {
        errors.retypedPassword = "Mật khẩu nhập lại không khớp"
    }

    if(!values.name.trim()) {
        errors.name = "Họ tên là bắt buộc"
    }

    return errors
}

export default Validations
