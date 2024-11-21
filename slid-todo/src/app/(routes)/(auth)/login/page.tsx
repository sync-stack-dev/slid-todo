import LoginForm from "./components/Login-form";
import Image from "next/image";
import Container from "@/components/ui/container";


const LoginPage = () => {
  return (
    <div className="bg-white">
      <Container>

        <div className="flex justify-center mb-8 flex-col items-center h-screen">
          <div className="mb-8">
            <Image src="/imgs/logo.png" alt="Slid to-do" width={270} height={89} priority />
          </div>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
