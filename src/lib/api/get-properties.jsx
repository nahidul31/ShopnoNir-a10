const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getProperty = async (ownerEmail, status) => {
  const url = status
    ? `${baseUrl}/api/property?ownerEmail=${ownerEmail}&status=${status}`
    : `${baseUrl}/api/property?ownerEmail=${ownerEmail}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
};

export const getAllPropertyData = async () => {
  const url = `${baseUrl}/api/property`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
};

// শুধু approved property
export const getApprovedProperties = async () => {
  const url = `${baseUrl}/api/property?status=approved`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
};
