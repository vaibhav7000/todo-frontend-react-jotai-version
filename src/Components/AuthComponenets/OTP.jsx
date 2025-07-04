import { useRef } from "react";
import { useEffect } from "react";

export default function OTP({verifyOTP}) {
    const inputBox1 = useRef();
    const inputBox2 = useRef();
    const inputBox3 = useRef();
    const inputBox4 = useRef();



    useEffect(function() {
        inputBox1.current.focus();
    })


    return (
        <div style={{
            display: "flex", flexDirection: "column", gap: 20, alignItems: "center"
        }}>
            <div className="otp-container" style={{
                display: "flex", flexDirection: "row", gap: 10
            }}>
                <input type="text" ref={inputBox1} style={inputStyle}/>
                <input type="text" ref={inputBox2} style={inputStyle}/>
                <input type="text" ref={inputBox3} style={inputStyle}/>
                <input type="text" ref={inputBox4} style={inputStyle} />
            </div>

            <div>
                <button onClick={function() {
                    const otp = inputBox1.current.value + inputBox2.current.value + inputBox3.current.value + inputBox4.current.value
                    verifyOTP(otp);
                }}>
                    Verify OTP
                </button>
            </div>
        </div>
    )
}

const inputStyle = {
    height: 40,
    width: 40,
    borderRadius: "50%",
    textAlign: "center",
    fontSize: 18,
    border: "1px solid #ccc"
};
