export const getToken = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (token === undefined) {
    return "missing authorization token";
  } else return token;
};

