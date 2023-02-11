import { Text, Stack, SkeletonCircle } from "@chakra-ui/react";
import styles from "./UserAvatar.module.css";

export default function UserAvatar({ user }) {
  console.log(user);

  return (
    <Stack
      padding="4"
      alignItems="start"
      margin="2"
      position="absolute"
      left="0"
      top="0"
      borderRadius="8px"
      boxShadow="lg"
      bg="back"
      spacing="0"
      transition="all .2s ease"
    >
      {user === null ? (
        // <SkeletonCircle size="3rem" title="Debes loguearte con Github" />
        <div
          className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full transition-all"
          title="Debes loguearte con Github"
        ></div>
      ) : (
        <>
          <img
            onClick={() => {
              const collection = Array.from(
                document.getElementsByClassName("user-info")
              );
              collection.forEach((el) =>
                el.classList.toggle(`${styles.showText}`)
              );
            }}
            className="rounded-full w-12 h-12 cursor-pointer"
            src={user.photoURL}
            title="ver detalle"
          />
          <Text
            className="user-info"
            fontSize="12px"
            fontWeight="700"
            display="none"
            textAlign="center"
          >
            {user.displayName}
          </Text>
          <Text
            className="user-info"
            fontSize="12px"
            fontWeight="700"
            display="none"
            textAlign="center"
          >
            {user.email}
          </Text>
        </>
      )}
    </Stack>
  );
}
