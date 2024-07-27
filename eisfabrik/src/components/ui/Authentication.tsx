"use client";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { Password } from "./PasswordInput";

interface authProps extends PaperProps {
  type: string;
}

interface formValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  adddress: string;
  terms: boolean;
}

export function Authentication(props: authProps) {
  const { type } = props;
  // const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm<formValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      adddress: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });
  function onSubmit(values: formValues) {
    console.log(values);
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Eisfabrik, {type} with
      </Text>

      <Group grow mb="md" mt="md" className="mx-auto w-[40%]">
        <GoogleButton radius="xl">Google</GoogleButton>
        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hazaribagh@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <Password
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            // error={
            //   form.errors.password &&
            //   "Password should include at least 6 characters"
            // }
          />

          {type === "register" && (
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="confirm password"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword && "Password Do not match"}
              radius="md"
            />
          )}

          {type === "register" && (
            <TextInput
              label="Address"
              placeholder="Your address"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          {/* <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
