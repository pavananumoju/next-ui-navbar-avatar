import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { Container, Text, Input, Button, Spacer } from "@nextui-org/react";

function Login() {
  const methods = useForm();
  const { user, logIn } = useAuth();
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
      console.log(data);
      await logIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
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
          <Spacer y={4} />
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
