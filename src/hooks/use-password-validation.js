import { useState, useEffect } from "react";

export function usePasswordValidation({ currentPassword, newPassword, confirmPassword, touched }) {
    const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const newErrors = { ...errors };

    if (touched.currentPassword) {
      newErrors.currentPassword = !currentPassword
        ? "The Current Password is required"
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

  return errors;
}