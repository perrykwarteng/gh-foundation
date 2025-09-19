export default function VideoLightbox({ open, onClose, src }: { open: boolean; onClose: () => void; src: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl ring-1 ring-white/10">
        <video src={src} controls autoPlay className="w-full h-full bg-black" />
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white/90 hover:bg-black">
          ✕
        </button>
      </div>
    </div>
  );
}
