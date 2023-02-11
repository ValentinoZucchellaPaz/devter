import Header from "@/components/HeaderLayout";
import MobileWrapper from "@/components/MobileWrapper";

export default function Timeline({ userName }) {
  return (
    <MobileWrapper>
      <Header title="timeline" links={[{ name: "back to home", url: "/" }]} />
      <h2 className="text-center text-orange-300 text-xl m-5">
        Este es el timeline de <b>{userName}</b>
      </h2>
    </MobileWrapper>
  );
}

Timeline.getInitialProps = () => {
  return fetch("http://localhost:3000/api/hello").then((res) => res.json());
};
