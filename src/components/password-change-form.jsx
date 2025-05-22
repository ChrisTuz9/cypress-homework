import { useState } from "react";
import { InputField } from "./input-field";
import { usePasswordValidation } from "../hooks/use-password-validation";

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
                error={errors.currentPassword}
                touched={touched.currentPassword}
                data-cy="current-password-input"
            />
            <InputField
                label="New password:"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, newPassword: true }))}
                error={errors.newPassword}
                touched={touched.newPassword}
                data-cy="new-password-input"
            />
            <InputField
                label="Confirm new password:"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                data-cy="confirm-new-password-input"
            />

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