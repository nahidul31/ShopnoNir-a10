"use server";
export const createNewProperty = async (newProperty) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProperty),
  });
  return res.json();
};
