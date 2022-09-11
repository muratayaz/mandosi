import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { uploadImage } from "../../utils/cloudinary";
import { getImage } from "../../utils/formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const imageUploaded = await getImage(req);
    const imageData = await uploadImage(imageUploaded.filepath);
    const imageId = await prisma.image.create({
      data: {
        publicId: imageData.public_id,
        format: imageData.format,
        version: imageData.version.toString(),
        url: imageData.url,
      },
      select: {
        id: true,
      },
    });

    res.json(imageId.id);
  } else res.status(405).json({ message: "Method Not Allowed" });
}
