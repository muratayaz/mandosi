import { OrderType } from "@prisma/client";
export const customerDetailTypes = {
  breast: {
    title: "Göğüs",
    type: "number",
    category: [
      OrderType.CEKET,
      OrderType.KABAN,
      OrderType.GOMLEK,
      OrderType.YELEK,
    ],
  },

  belly: {
    title: "Göbek",
    type: "number",
    category: [
      OrderType.CEKET,
      OrderType.KABAN,
      OrderType.GOMLEK,
      OrderType.YELEK,
    ],
  },

  ispala: {
    title: "İspala",
    type: "number",
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },

  shirtSize: {
    title: "Gömlek Boyu",
    type: "number",
    category: [OrderType.GOMLEK],
  },
  coatSize: {
    title: "Ceket Boyu",
    type: "number",
    category: [OrderType.CEKET],
  },
  pantSize: {
    title: "Pantolon Boyu",
    type: "number",
    category: [OrderType.PANTOLON],
  },
  shirtArmSize: {
    title: "Gömlek Kol Boyu",
    type: "number",
    category: [OrderType.GOMLEK],
  },
  coatArmSize: {
    title: "Ceket Kol Boyu",
    type: "number",
    category: [OrderType.CEKET],
  },
  roba: {
    title: "Roba",
    type: "number",
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },
  frontRoba: {
    title: "Ön Roba",
    type: "number",
    category: [OrderType.GOMLEK],
  },

  arm: {
    title: "Kol",
    type: "number",
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },

  waist: {
    title: "Bel",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  hip: {
    title: "Basen",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  ag: {
    title: "Ağ",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  knee: {
    title: "Diz Genişliği",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  trot: {
    title: "Paça Genişliği",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  pazu: {
    title: "Pazu",
    type: "number",
    category: [OrderType.GOMLEK],
  },

  cuff: {
    title: "Manşet",
    type: "number",
    category: [OrderType.GOMLEK],
  },

  embroidery: {
    title: "Nakış",
    type: "text",
    category: [OrderType.GOMLEK],
  },

  backSize: {
    title: "Arka Boy",
    type: "number",
    category: [OrderType.CEKET, OrderType.GOMLEK],
  },
  frontSize: {
    title: "Ön Boy",
    type: "number",
    category: [OrderType.CEKET, OrderType.GOMLEK],
  },
  shoeSize: {
    title: "Ayakkabı Numarası",
    type: "text",
    category: [OrderType.AYAKKABI],
  },
  pens: {
    title: "Pens Ölçüsü",
    type: "text",
    category: [OrderType.GOMLEK],
  },

  collor: {
    title: "Yaka",
    type: "text",
    category: [OrderType.GOMLEK],
  },
  collarModel: {
    title: "Yaka Modeli",
    type: "image",
    category: [OrderType.GOMLEK],
  },
};