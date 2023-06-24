// import Devit from '@/components/Devit'
import DevitDetail from '@/components/DevitDetail'

export default function DevitPage (props) {
  const devit = props
  console.log(devit)
  return (
    devit && <DevitDetail {...props}/>
  )
}

export async function getServerSideProps (context) {
  const { params, res } = context
  const { id } = params
  console.log('desde get initial props')

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
