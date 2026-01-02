"use client";

import qs from "qs";

export async function getGlobal() {
  const query = {
    populate: {
      header: {
        populate: {
          logo: { populate: ["image"] },
        },
      },
      advertisement: true,
      footer: {
        populate: {
          logo: { populate: ["image"] },
        },
      },
      bankInformation: true,
      momo: true,
      internationalTransfers: true,
      social: "*",
    },
  };

  const queryString = qs.stringify(query, { encodeValuesOnly: true });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
  }

  // Ensure no double slash and use the correct Strapi v4 endpoint: /api/global
  const url = `${baseUrl.replace(/\/$/, "")}/global?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Global fetch failed:", response.status, text);
    throw new Error("Failed to fetch global data");
  }

  return response.json();
}
