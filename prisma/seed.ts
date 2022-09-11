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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
