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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/global?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch global data");
  }

  return response.json();
}
