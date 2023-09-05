import { register } from "@/api/auth";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Form from "@/components/Form";
import { RegisterSchema, registerSchema } from "@/schemas/auth";
import { useProgress } from "@/store/progress";
import { Link, useNavigate } from "@tanstack/react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setProgress, complete } = useProgress();

  async function handleSubmit(data: RegisterSchema) {
    setProgress(20);
    await register(data);
    complete();
    navigate({ to: "/auth/login" });
  }

  return (
    <Form.Root
      className="max-w-sm w-full"
      handleSubmit={handleSubmit}
      schema={registerSchema}
    >
      <Card.Root>
        <Card.Header>
          <Card.Title>Register</Card.Title>
          <Card.Description>
            Create an Account to start chatting
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Form.Field.Root name="fullName">
            <Form.Field.Label>Full Name</Form.Field.Label>
            <Form.Field.TextInput placeholder="John Doe" />
            <Form.Field.Errors />
          </Form.Field.Root>
          <Form.Field.Root name="email">
            <Form.Field.Label>Email</Form.Field.Label>
            <Form.Field.TextInput placeholder="example@email.com" />
            <Form.Field.Errors />
          </Form.Field.Root>
          <Form.Field.Root name="password">
            <Form.Field.Label>Password</Form.Field.Label>
            <Form.Field.TextInput type="password" placeholder="********" />
            <Form.Field.Errors />
          </Form.Field.Root>
          <Form.Field.Root name="confirmPassword">
            <Form.Field.Label>Confirm password</Form.Field.Label>
            <Form.Field.TextInput type="password" placeholder="********" />
            <Form.Field.Errors />
          </Form.Field.Root>
        </Card.Body>
        <Card.Footer>
          <Button full>Register</Button>
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <Link className="text-indigo-10" to="/auth/login">
              Login
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </Form.Root>
  );
}
