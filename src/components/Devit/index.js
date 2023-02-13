import { Heading, Text } from "@chakra-ui/react";

export default function Devit({ img, name, username, message }) {
  return (
    <article className="flex flex-row w-full h-auto gap-2 py-3 px-4 border-b-[1px] border-gray-800">
      <img className="h-12 w-12 rounded-full" src={img} alt={message} />
      <div>
        <div className="flex flex-row gap-1">
          <Text fontWeight="600" fontSize="15px">
            {name}
          </Text>
          <Text color="gray.300" fontSize="15px">
            @{username}
          </Text>
        </div>
        <Text color="gray.900" fontSize="15px">
          {message}
        </Text>
      </div>
    </article>
  );
}
