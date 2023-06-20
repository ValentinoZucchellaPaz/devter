import { Avatar } from "@chakra-ui/react";

export default function Devit({ img, name, username, message }) {
  return (
    <article className="flex flex-row w-full h-auto gap-2 py-3 px-4 border-b-[1px] border-gray-800">
      <img className="h-12 w-12 rounded-full" src={img} alt={message} />
      {/* <Avatar user=/> */}
      <div>
        <div className="flex flex-row gap-1">
          <p className=" text-sm font-semibold">{name}</p>
          <p className=" text-sm font-semibold text-gray-700">@{username}</p>
        </div>
        <p className=" text-sm font-medium">{message}</p>
      </div>
    </article>
  );
}
