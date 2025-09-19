import Image from "next/image";

export default function HeroVideo({
  src,
  onPlay,
}: {
  src: string;
  onPlay?: () => void;
}) {
  return (
    <div className="py-10 px-6 md:px-14 h-full">
      <h3 className="text-[25px] md:text-[40px] text-[#0e372d] font-semibold">
        Transforming lives <br />
        through love and generosity.
      </h3>
      <div className="rounded-3xl overflow-hidden shadow ring-1 ring-white/10 mt-5 md:mt-10">
        <div className="relative aspect-[16/9]">
          <Image
            src={src}
            alt="Hero"
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
          <button
            onClick={onPlay}
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-14 w-14 rounded-full bg-[#c4a54a] shadow-lg ring-4 ring-white/10 hover:scale-105 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
