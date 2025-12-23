"use client";

import { useEffect, useState } from "react";
import { AboutApiResponse, fetchAboutContent } from "@/app/lib/about-content";

export function useAboutContent() {
  const [data, setData] = useState<AboutApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const result = await fetchAboutContent();
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}
