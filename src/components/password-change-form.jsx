import { useState } from "react";
import { InputField } from "./input-field";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

export function PasswordChangeForm() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [touched, setTouched] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const errors = usePasswordValidation({
        currentPassword,
        newPassword,
        confirmPassword,
        touched
    });

    const isSubmitDisabled =
        !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        Object.values(errors).some((error) => error !== "");

    const handleSubmit = () => {
        alert("Your password has been successfully changed.");
    };

    return (
        <div>
            <h1>Change Password</h1>

            <InputField
                label="Current password:"
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, currentPassword: true }))}
                data-cy="current-password-input"
            />
            {touched.currentPassword && errors.currentPassword && (
               <p style={{ color: "red" }}>{errors.currentPassword}</p>
            )}
            <InputField
                label="New password:"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, newPassword: true }))}
                data-cy="new-password-input"
            />
            {errors.newPassword && (
                <p style={{ color: "red" }}>{errors.newPassword}</p>
           )}
           <InputField
                label="Confirm new password:"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                data-cy="confirm-new-password-input"
            />
            {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                data-cy="submit-button"
            >
                Submit
            </button>
        </div>
    )
}