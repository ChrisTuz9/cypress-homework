import { useState, useEffect } from "react";

export function usePasswordValidation({ currentPassword, newPassword, confirmPassword, touched }) {
    const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
}