import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import apiClient from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: { email: string; password: string }) => {
    if (!data.email || !data.password) {
      toast.error("Please fill all the required fields");
      return;
    }

    setIsLoading(true);

    try {
      const loginResp = await apiClient.post("/auth/login", data);

      const respData = loginResp?.data;

      const userRole = respData?.user?.role;

      if (userRole?.toLowerCase() !== "admin") {
        dispatch(loginFailure("Access Denied: Only admins can log in."));
        setIsLoading(false);
        return;
      }

      const userData = respData?.user;
      const accessToken = respData?.token;

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(loginSuccess(userData));
    } catch (error: any) {
      console.log("Error signing in ==>> ", error);

      // Extract validation errors from the response
      const errorData = error.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Combine all errors into a single message
        const combinedError = errorData.errors.join("\n");
        toast.error(combinedError);
      } else {
        // Fallback to generic error message
        toast.error(errorData?.message || "Login failed. Please try again.");
      }

      dispatch(loginFailure(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
      </AuthLayout>
    </>
  );
}
