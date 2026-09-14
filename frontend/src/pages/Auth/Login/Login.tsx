import { useState } from "react";
import type { FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "../../../components/auth/AuthLayout/AuthLayout";
import { ApiError } from "../../../api/apiClient";
import { authService } from "../../../services/auth.services";
import styles from "./Login.module.css";
import { useAuth } from "../../../context/Authcontext";

export function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await authService.login({
        email: email.trim(),
        password,
      });

      setAuth(response.data.user, response.data.accessToken);

      navigate("/giveaway");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === "INVALID_CREDENTIALS") {
          setError("Invalid email or password.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Unable to log in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to continue to your VELOOP account."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              autoComplete="current-password"
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
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
}