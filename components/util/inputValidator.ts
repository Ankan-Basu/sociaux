import InputDataType from "./InputDataType";
import ValidatedOutput from "./ValidatedOutput";


const containsInvalidChars = (str: string): boolean => {
    const invalidChars = /[`!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~ ]/;
    return invalidChars.test(str);
}


const inputValidator = ({email, uname, password} : InputDataType): ValidatedOutput => {
    let emailStatus = false, unameStatus = false, passwordStatus = false

    //email
    if (email.length < 5) { //a@b.c
        emailStatus = false;
    } else {
        const posOfAt = email.indexOf('@');

        if (posOfAt === -1 || posOfAt === 0) {
            emailStatus = false;
        } else {
            const posOfDot = email.indexOf('.', posOfAt+1);

            if (posOfDot === -1 || posOfDot === posOfAt+1 || posOfDot === email.length - 1) {
                emailStatus = false;
            } else {
                //check for no other @
                if (email.indexOf('@', posOfAt+1) !== -1) {
                    emailStatus = false;
                } else {
                    emailStatus = true;
                }
            }
        }
    }

    //uname
    if (uname.length < 1) { //a
        unameStatus = false;
    } else {
        // no need to explicitly provide @ infront of uname
        if (containsInvalidChars(uname)) {
            unameStatus = false;
        } else {
            unameStatus = true;
        }
    }

    //password
    if (password.length < 8) {
        passwordStatus = false
    } else {
        passwordStatus = true
    }

    const res: ValidatedOutput = {
        email: emailStatus,
        uname: unameStatus,
        password: passwordStatus
    }

    return res;
}

export default inputValidator;