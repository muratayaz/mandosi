import prisma from "../lib/prisma";
import hashPassword from "../utils/hash";
import { omit } from "lodash";

interface LoginCredentials {
  email: string;
  password: string;
}

async function authorize(credentials: LoginCredentials) {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
    },
  });
  if (user && user.password == hashPassword(credentials.password))
    return omit(user, "password");
  else return null;
}

export default { authorize };
//TODO: promise return type
