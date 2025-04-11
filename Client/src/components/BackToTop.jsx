import { ArrowBigUpDash } from "lucide-react";

function BackToTop({}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed hover:scale-105 transition-all hover:bg-yellow-500 cursor-pointer bg-[#ff3e01] bottom-0 left-[0] size-[80px] flex rounded-tr-full z-30" onClick={scrollToTop}>
      <ArrowBigUpDash className="text-white ml-4 mt-8 font" size={25} />
    </div>
  );
}

export default BackToTop;