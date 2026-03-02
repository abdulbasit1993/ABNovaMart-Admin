import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import apiClient from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function SignUp() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    const { email, password, confirmPassword, firstName, lastName, phone } =
      data;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      toast.error("Please fill all the required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
        firstName,
        lastName,
        phone,
        role: "ADMIN",
      };

      const signupResp = await apiClient.post("/auth/register", payload);

      const respData = signupResp?.data;

      const userData = respData?.user;
      const accessToken = respData?.token;

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(loginSuccess(userData));

      toast.success(respData?.message || "Sign up successful!");
    } catch (error: any) {
      console.log("Error signing up ==>> ", error);

      // Extract validation errors from the response
      const errorData = error.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Combine all errors into a single message
        const combinedError = errorData.errors.join("\n");
        toast.error(combinedError);
      } else {
        // Fallback to generic error message
        toast.error(errorData?.message || "An error occurred during sign up");
      }

      dispatch(loginFailure(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
      </AuthLayout>
    </>
  );
}
