import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, Spacer, Input, Button, Container } from "@nextui-org/react";
import { useState } from "react";

function SignupPage() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      if (data.password_confirm != data.password) {
        setIsLoading(false);
        // console.log("passwords dont match");
        setMessage("passwords dont match");
      } else {
        await signUp(data.email, data.password);
        router.push("/dashboard");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <Container justify="center" align="center">
      <Spacer y={1} />
      <Text>Sign Up</Text>
      <Spacer y={1} />
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            width="250px"
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
            width="250px"
            color="secondary"
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            labelPlaceholder="Password"
          />

          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <Spacer y={1.5} />
          <Input.Password
            bordered
            width="250px"
            color="secondary"
            label="Confirm Password"
            type="password"
            {...register("password_confirm", {
              required: "Verify your password",
            })}
            labelPlaceholder="password_confirm"
          />

          {errors.password_confirm && (
            <p className="text-red-400">{errors.password_confirm.message}</p>
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
              router.push("/login");
            }}
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}

export default SignupPage;
