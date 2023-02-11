import { LoginWithEmail } from "../../firebase/client";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Image,
  Divider,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function SignUpForm(handleClick) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    handleClick(show);
  }, [show]);

  function handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("email-address");
    const password = document.getElementById("password");

    LoginWithEmail({ email: email.value, password: password.value });
  }
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20 grid place-content-center">
      <Card w="550px" h="91vh" display="grid" placeContent="center">
        <CardBody w="400px">
          <Stack mt="6" spacing="3">
            <Heading size="md">Ingresa con tu mail</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  required
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
                <FormHelperText>
                  We'll never share your password.
                </FormHelperText>
              </FormControl>
              <Divider />
              <ButtonGroup spacing="2" m="2">
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme={"blue"}
                  textTransform="uppercase"
                >
                  guardar
                </Button>
                <Button
                  onClick={() => {
                    console.log(`prev ${show}, next ${!show}`);
                    setShow(!show);
                  }}
                  variant="ghost"
                  colorScheme="blue"
                  textTransform="uppercase"
                >
                  volver
                </Button>
              </ButtonGroup>
            </form>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
