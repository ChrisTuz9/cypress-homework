import { useState, useEffect } from "react";
import { InputField } from "../components/input-field";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });


  useEffect(() => {
    const newErrors = { ...errors };

    if (touched.currentPassword) {
      newErrors.currentPassword = !currentPassword
        ? "Current Password is required"
        : "";
    }

    if (touched.newPassword) {
      if (!newPassword) {
        newErrors.newPassword = "New Password is required";
      } else if (newPassword.length < 8) {
        newErrors.newPassword = "The New Password must be at least 8 characters long";
      } else if (newPassword.length > 30) {
        newErrors.newPassword = "The New Password must be not longer than 30 characters long";
      } else if (!/\d/.test(newPassword)) {
        newErrors.newPassword = ("The New Password must contain at least one number");
      } else {
        newErrors.newPassword = "";
      }
    }

    if (touched.confirmPassword) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm New Password is required";
      } else if (confirmPassword !== newPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors.confirmPassword = "";
      }
  }
    setErrors(newErrors);
  }, [currentPassword, newPassword, confirmPassword, touched]);


  const handleSubmit = () => {
    alert("Your password has beensuccessfully changed.");
  };

  const isSubmitDisabled =
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    Object.values(errors).some((error) => error !== "");

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