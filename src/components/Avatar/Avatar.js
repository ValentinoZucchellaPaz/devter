// export default function UserAvatar ({ user = undefined, withText = false }) {
//   return (
//     <Stack
//       marginX="1rem"
//       alignItems="start"
//       justifyContent='center'
//       position= 'relative'
//       transition="all .2s ease"
//     >
//       {
//       user === undefined
//         ? (
//           // <SkeletonCircle size="3rem" title="Debes loguearte con Github" />
//           <div
//             className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition-all"
//             title="Debes loguearte con Github"
//           ></div>
//           )
//         : (
//           <>
//             <img
//               onClick={() => {
//                 const collection = Array.from(
//                   document.getElementsByClassName('user-info')
//                 )
//                 collection.forEach((el) =>
//                   el.classList.toggle(`${styles.showText}`)
//                 )
//               }}
//               className="rounded-full w-10 h-10 cursor-pointer"
//               src={user.avatar}
//               alt={user.username}
//               title="ver detalle"
//             />
//             {withText && (
//               <Text
//                 className="user-info"
//                 fontSize="12px"
//                 fontWeight="700"
//                 display="none"
//                 position='absolute'
//                 left='3rem'
//                 bg='#eee'
//                 textAlign="left"
//                 padding='.5rem'
//                 rounded='8px'
//               >
//                 {user.username} <br />
//                 {user.email}
//               </Text>
//             )}
//           </>
//           )}
//     </Stack>
//   )

// }
export default function UserAvatar ({ alt, src, text }) {
  if (!src) {
    return <div className="flex items-center"><div className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full transition-all"></div></div>
  } else {
    return (
      <div className="flex items-center ">
        <img src={src} alt={alt} title={alt} className="rounded-full h-12 w-12" />
        {text && <strong className="ml-3">{text}</strong>}
      </div>
    )
  }
}
