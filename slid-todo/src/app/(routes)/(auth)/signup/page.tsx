
import SignupForm from "./components/Signup-form";
import Image from "next/image";
import Container from "@/components/ui/container";

const SignupPage = () => {
  return(
    <div className="bg-white w-full">
      <Container>
        <div className="flex justify-center mb-8 flex-col items-center h-screen">
          <div className="mb-8">
            <Image src="/imgs/logo.png" alt="Slid to-do" width={270} height={89} priority />
          </div>
          <SignupForm />
          </div>
     </Container>
    </div>
  );
}

export default SignupPage;
