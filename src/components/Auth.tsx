import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleGoogleSignIn} icon={<GoogleOutlined />}>
        Sign in with Google
      </Button>
    </div>
  );
};
