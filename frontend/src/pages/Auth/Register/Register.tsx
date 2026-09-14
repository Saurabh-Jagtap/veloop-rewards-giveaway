import { useState } from "react";
import type { FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { ApiError } from "../../../api/apiClient";
import { AuthLayout } from "../../../components/auth/AuthLayout/AuthLayout";
import { authService } from "../../../services/auth.services";
import styles from "./Register.module.css";
import { useAuth } from "../../../context/AuthContext";

export function Register() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        if (
            !fullName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await authService.register({
                name: fullName.trim(),
                email: email.trim(),
                password,
            });

            setAuth(response.data.user, response.data.accessToken);

            navigate("/giveaway");
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.code === "EMAIL_ALREADY_EXISTS") {
                    setError(
                        "An account with this email already exists. Please log in.",
                    );
                } else {
                    setError(error.message);
                }
            } else {
                setError("Unable to create your account. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            description="Join VELOOP and start earning rewards."
            footerText="Already have an account?"
            footerLinkText="Log in"
            footerLinkTo="/login"
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="fullName">Full name</label>

                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        disabled={isSubmitting}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="email">Email address</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="password">Password</label>

                    <div className={styles.passwordWrapper}>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />

                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() =>
                                setShowPassword((current) => !current)
                            }
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            disabled={isSubmitting}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="confirmPassword">Confirm password</label>

                    <div className={styles.passwordWrapper}>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />

                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() =>
                                setShowConfirmPassword((current) => !current)
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            disabled={isSubmitting}
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </AuthLayout>
    );
}