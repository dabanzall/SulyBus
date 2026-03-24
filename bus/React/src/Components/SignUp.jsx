import { useState } from "react";
import axios from "axios";

export default function SignUp() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [check, setCheck] = useState(false);

    // Track all form inputs in a single state
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    });

    const isMatch = password === confirm && password !== "";

    // Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Handle signup button click
    const handleSignUp = async () => {
        try {
            // Send only fields needed by Django
            const postData = {
                username: form.email, // or use any username logic
                email: form.email,
                password: form.password
            };

            const res = await axios.post("http://127.0.0.1:8000/App/signup/", postData);
            alert(res.data.message);
        } catch (err) {
            console.log(err.response.data);
            alert("Error: " + JSON.stringify(err.response.data));
        }
    };

    return (
        <>
            <div className="bg-amber-500 w-full py-6 text-center">
                <h1 className="headerTitle">
                    SulyBus Stop
                </h1>
            </div>

            <div className="loginContainer mt-6">
                <div className="w-full max-w-sm flex flex-wrap gap-3 px-4">

                    <div>
                        <label htmlFor="firstName" className="labels">First name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="inputs w-35"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="labels">Last name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="inputs w-35"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="labels">Phone number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="inputs w-35"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="labels">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="inputs w-60"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="labels">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleChange(e);
                            }}
                            className="inputs w-65"
                        />
                    </div>

                    <div>
                        <label htmlFor="confPassword" className="labels">Confirm password</label>
                        <input
                            id="confPassword"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="inputs w-65"
                        />
                    </div>

                    {confirm && (
                        <p className={`font-[1rem] ${isMatch ? "text-green-600" : "text-red-600"}`}>
                            {isMatch ? "Passwords match" : "Passwords do not match"}
                        </p>
                    )}

                    <div>
                        <label className="labels">
                            Agree to the terms
                            <input
                                type="checkbox"
                                className="bg-gray-200 w-full px-4 py-2 text-base rounded-xl focus:outline-none transition"
                                required
                                checked={check}
                                onChange={(e) => setCheck(e.target.checked)}
                            />
                        </label>

                        <button
                            disabled={!isMatch}
                            onClick={handleSignUp}
                            className="btn"
                        >
                            Sign up
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}