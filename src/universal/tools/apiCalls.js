export function authHeader(token) {
  return {
    headers: {
      Authorization: token,
    },
  };
}
