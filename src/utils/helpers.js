export const sendAPI = async function (
  typeOfRequest,
  url,
  data = { nothing: null }
) {
  try {
    let dataReturned;
    if (typeOfRequest === "GET")
      dataReturned = await (
        await fetch(url, {
          method: typeOfRequest,
          credentials: "include",
        })
      ).json();
    else
      dataReturned = await (
        await fetch(url, {
          method: typeOfRequest,
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        })
      ).json();
    return dataReturned;
  } catch (err) {
    throw err;
  }
};

export const displayTimeTaken = function (params) {
  if (!params) return "";
  return `${`${Math.floor(params / (60 * 60 * 1000))}`.padStart(2, 0)}:${`${
    Math.floor(params / (60 * 1000)) % 60
  }`.padStart(2, 0)}:${`${Math.floor(params / 1000) % 60}`.padStart(2, 0)}`;
};
