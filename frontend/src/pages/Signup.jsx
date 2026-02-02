import SignupLeft from "../components/auth/SignupLeft";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <SignupLeft />
      <SignupForm />
    </div>
  );
}
 