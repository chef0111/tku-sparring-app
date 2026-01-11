import { getRequestHeaders } from "@tanstack/react-start/server";
import { cache } from "react";
import { auth } from "./auth";

export const getSession = cache(async () => {
  const headers = getRequestHeaders();
  return await auth.api.getSession({ headers });
});
