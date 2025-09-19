import { StaticImageData } from "next/image";

import Image1 from "../../../../public/images/g1.svg";
import Image2 from "../../../../public/images/g2.svg";
import Image3 from "../../../../public/images/g3.svg";
import Image4 from "../../../../public/images/g4.svg";
import Image5 from "../../../../public/images/g5.svg";
import Image6 from "../../../../public/images/g6.svg";

export type GalleryItem = {
  id: number | string;
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export const ImagessData: GalleryItem[] = [
  { id: 1, type: "image", src: (Image1 as StaticImageData).src },
  { id: 2, type: "image", src: (Image2 as StaticImageData).src },
  { id: 3, type: "image", src: (Image3 as StaticImageData).src },
  { id: 4, type: "image", src: (Image4 as StaticImageData).src },
  { id: 5, type: "image", src: (Image5 as StaticImageData).src },
  { id: 6, type: "image", src: (Image6 as StaticImageData).src },
  {
    id: "v1",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-city-sunset-3315/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    alt: "City sunset video",
  },
  {
    id: "v2",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-waves-at-sunset-1592/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Waves video",
  },
  {
    id: "v3",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-aerial-over-the-bridge-5882/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    alt: "Bridge aerial video",
  },
  {
    id: "v4",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-forest-mist-1573/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    alt: "Forest mist video",
  },
  {
    id: "v5",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-city-night-timelapse-5643/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
    alt: "City night timelapse",
  },
];
