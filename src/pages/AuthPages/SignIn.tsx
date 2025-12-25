import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import apiClient from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const loginResp = await apiClient.post("/auth/login", data);

      const userRole = loginResp?.data?.data?.role;

      if (userRole?.toLowerCase() !== "admin") {
        toast.error("Access Denied");
        return;
      }

      const userData = loginResp?.data?.data;
      const accessToken = loginResp?.data?.token;

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(loginSuccess(loginResp?.data?.data));
    } catch (error) {
      console.log("Error signing in ==>> ", error);
      dispatch(loginFailure(error));
    }
  };

  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm onSubmit={handleSignIn} />
      </AuthLayout>
    </>
  );
}
