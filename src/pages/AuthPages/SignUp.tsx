import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import apiClient from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function SignUp() {
  const dispatch = useDispatch();

  const handleSignUp = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    console.log("sign up data ====>> ", data);

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

      console.log("response data sign up ===>>> ", signupResp);

      const userData = signupResp?.data?.data;
      const accessToken = signupResp?.data?.token;

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(loginSuccess(signupResp?.data?.data));

      toast.success(signupResp?.data?.message || "Sign up successful!");
    } catch (error) {
      console.log("Error signing up ==>> ", error);
      dispatch(loginFailure(error));
    }
  };

  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm onSubmit={handleSignUp} />
      </AuthLayout>
    </>
  );
}
