import { useState, useRef } from "react";
import AuthWrapper from "./AuthWrapper";
import { emailSchema, passwordSchema } from "../../utils/types";
import { useEffect } from "react";
import { useCallback } from "react";
import OTP from "./OTP";


export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [otpSent, setOtpSent] = useState(false);
    const emailValue = useRef();

    async function verifyEmailPassword() {
        const email = emailRef.current.value;
        let result = emailSchema.safeParse({
            email
        })

        if (!result.success) {
            alert("Invalid email")
            return
        }
        const password = passwordRef.current.value;
        result = passwordSchema.safeParse({
            password
        })

        if (!result.success) {
            alert("password does not meet requirements");
            return
        }
        addUser();
    }

    const addUser = useCallback(async function () {
        // making api call
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const outputFromServer = await response.json();

            if( outputFromServer.status === 401 || outputFromServer.status === 409 || outputFromServer.status === 500 ) {
                alert("Error occured: " + outputFromServer.msg);
                return
            }

            emailValue.current = email;
            setOtpSent(true);
            alert(outputFromServer.msg);

        } catch (error) {
            console.log(error);
            alert("Internal server error occured")
        }



    }, []);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const verifyOTP = useCallback(async function(otp) {

        try {
            const response = await fetch("http://localhost:3000/signup/otp-verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp, email: emailValue.current
                })
            })

            const output = await response.json()

            if(response.status === 401 || response.status === 400) {
                alert(output.msg);
                return
            }

            alert(output.msg);
            // naviagate to signin page

        } catch(err) {

        }
    }, []);

    return (
        <AuthWrapper>
            {!otpSent && <div>
                <div className="email-container">
                    <label htmlFor="email">Enter Email</label>
                    <input id="email" placeholder="Enter Email" type='email' ref={emailRef} />
                </div>

                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input id="password" placeholder="Enter password" type='text' ref={passwordRef} />
                </div>

                <button onClick={verifyEmailPassword}>
                    Sign In
                </button>
            </div>}

            {otpSent && <OTP verifyOTP={verifyOTP}/>}
        </AuthWrapper>
    )
}