import React ,{useState} from "react";
import Footer from "../components/Layout/Footer";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

 const handleReset = () => {
    console.log("Resetting for:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email@example.com" />
          <Button label="Send Reset Link" onClick={handleReset} className="w-full" />
          <Button label="Back to Login" variant="ghost" onClick={() => navigate('/login')} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
