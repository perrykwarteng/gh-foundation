export type Src = {
  hero: string;
};

export const defaultSrcs: Src = {
  hero: "/icons/aboutVidImage.png",
};

export function resolveSrcs(maybe: Partial<Src> | null | undefined): Src {
  const v: Partial<Src> = maybe ?? {};

  const pick = (k: keyof Src): string => {
    const raw = v[k];
    return typeof raw === "string" && raw.trim().length > 0
      ? raw
      : defaultSrcs[k];
  };

  return {
    hero: pick("hero"),
  };
}
