import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, Spacer, Input, Button, Container } from "@nextui-org/react";

function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await signUp(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
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

          <Spacer y={1.5} />
          <Input.Password
            bordered
            color="secondary"
            label="password_confirm"
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

          <Spacer y={4} />
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
