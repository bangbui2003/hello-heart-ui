// Function to validate if a password is strong enough
export const validatePassword = (password) => {
  const minLength = 6; // Minimum length for the password
  const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
  const hasNumber = /[0-9]/.test(password); // At least one number
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

// Function to validate if an email is a valid Gmail address
export const validateGmail = (email) => {
  // Check if it's a valid email and ends with "@gmail.com"
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailPattern.test(email);
};
