import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="email" isInvalid={Boolean(errors.name)} isRequired>
          <FormLabel>Email</FormLabel>
          <Input id="email" {...register("email")} />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Şifre</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {router.query.error && router.query.error === "CredentialsSignin" && (
          <Text align="center" fontSize="md" color="tomato">
            Lütfen Bilgilerinizi Kontrol Ediniz.
          </Text>
        )}

        <Button
          isLoading={isSubmitting}
          loadingText="Signing in..."
          bg={"blue.400"}
          color={"white"}
          type="submit"
          _hover={{
            bg: "blue.500",
          }}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
