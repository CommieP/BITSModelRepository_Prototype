import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/reducers/userReducer";

const LoginSignupPage = () => {
    const [activeTab, setActiveTab] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [signUpMessage, setSignUpMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Email validation
    const validateEmail = (email) => {
        if (!email.endsWith("@bitsdesign.edu.in")) {
            setEmailError("Email must end with @bitsdesign.edu.in");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    // Password validation
    const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    // Confirm password validation (only for signup)
    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Flag that the form was submitted

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        let isConfirmPasswordValid = true;

        // Validate confirm password only if on signup tab
        if (activeTab === "signup") {
            isConfirmPasswordValid = validateConfirmPassword();
        }

        if (isEmailValid && isPasswordValid && (activeTab === "login" || isConfirmPasswordValid)) {
            try {
                if (activeTab === "signup") {
                    // Firebase sign-up
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log("User signed up successfully");
                    setSignUpMessage("Profile created successfully!");
                } else {
                    // Firebase login
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user; 
                    dispatch(updateUser({uid: user.uid, email: user.email, displayName: user.displayName}));
                    navigate("/profile");
                }
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    setSignUpMessage("Email already exists"); // Show error message for existing email
                } else {
                    console.error("Error:", error.message);
                }
            }
        }
    };

    // Switch between login and signup tabs
    const toggleTab = (tab) => {
        setActiveTab(tab);
        setFormSubmitted(false); // Reset form submission state when switching tabs
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="page">
            <div className="loginSignupCont">
                <div className="tabsCont">
                    <button
                        className={`tabButton ${activeTab === "signup" ? "active" : ""}`}
                        onClick={() => toggleTab("signup")}
                    >
                        Sign Up
                    </button>
                    <button
                        className={`tabButton ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => toggleTab("login")}
                    >
                        Login
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="loginSignupForm">
                    <h2>{activeTab === "login" ? "Login" : "Sign Up"}</h2>

                    {/* Email Field */}
                    <div className="formGroup">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        {formSubmitted && emailError && <p className="errorMessage">{emailError}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="formGroup">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        {formSubmitted && passwordError && <p className="errorMessage">{passwordError}</p>}
                    </div>

                    {/* Confirm Password Field (Only for Signup) */}
                    {activeTab === "signup" && (
                        <div className="formGroup">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                            {formSubmitted && confirmPasswordError && (
                                <p className="errorMessage">{confirmPasswordError}</p>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="submitButton">
                        {activeTab === "login" ? "Login" : "Sign Up"}
                    </button>

                    {activeTab === "signup" && signUpMessage && (
                        <p className="successMessage">{signUpMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginSignupPage;
