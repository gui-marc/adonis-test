import { login } from "@/api/auth";
import { setAuthToken } from "@/api/client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Form from "@/components/Form";
import { LoginSchema, loginSchema } from "@/schemas/auth";
import { useCurrentUser } from "@/store/currentUser";
import { useProgress } from "@/store/progress";
import { Link, useNavigate } from "@tanstack/react-router";

export default function LoginPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { setProgress, complete } = useProgress();

  async function handleSubmit(data: LoginSchema) {
    setProgress(20);
    const { token } = await login(data);
    setAuthToken(token);
    complete();
    navigate({ to: "/" });
  }

  return (
    <Form.Root
      className="max-w-sm w-full"
      handleSubmit={handleSubmit}
      schema={loginSchema}
      defaultValues={{ email: user?.email }}
    >
      <Card.Root>
        <Card.Header>
          <Card.Title>Login</Card.Title>
          <Card.Description>Sign in to start chatting</Card.Description>
        </Card.Header>
        <Card.Body>
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
        </Card.Body>
        <Card.Footer>
          <Button full>Login</Button>
          <p className="mt-2 text-center">
            Don&apos;t have an account?{" "}
            <Link className="text-indigo-10" to="/auth/register">
              Register
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </Form.Root>
  );
}
