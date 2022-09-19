import { PrismaClient } from "@prisma/client";
import hashPassword from "../utils/hash";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Murat Ayaz",
      email: "admin",
      password: hashPassword("admin"),
    },
  });
  await prisma.user.create({
    data: {
      name: "Nadir Demir",
      email: "nadirdemir",
      password: hashPassword("nadirdemir"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
