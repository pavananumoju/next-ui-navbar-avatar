import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { Container, Text, Input, Button, Spacer, Loading } from "@nextui-org/react";
import { useState } from "react";

function Login() {
  const methods = useForm();
  const { user, logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  if (user.uid) {
    router.push("/dashboard");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      await logIn(data.email, data.password);
      // router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setMessage(error.message);
    }
  };

  return (
    <Container justify="center" align="center">
      <Spacer y={1} />
      <Text>Log In</Text>
      <Spacer y={1} />
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            bordered
            color="secondary"
            labelPlaceholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <Spacer y={1.5} />
          <Input.Password
            bordered
            color="secondary"
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            labelPlaceholder="Password"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
          <Spacer y={1} />
          <Button color={"primary"} ghost type="submit">
            Submit
          </Button>
          <Spacer y={2} />
          {isLoading && <Loading size="lg" color="warning" />}
          {!isLoading && message && <Text color="orange">{message}</Text>}
          <Spacer y={2} />
          <Button
            ghost
            size="sm"
            auto
            // color={"primary"}
            onPress={() => {
              router.push("/signup");
            }}
          >
            Signup
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Login;
