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

  roba: {
    title: "Roba",
    type: "number",
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },

  height: {
    title: "Boy",
    type: "number",
    category: [
      OrderType.CEKET,
      OrderType.KABAN,
      OrderType.GOMLEK,
      OrderType.YELEK,
      OrderType.PANTOLON,
    ],
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
    title: "Diz Boyu",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  trot: {
    title: "Paça Boyu",
    type: "number",
    category: [OrderType.PANTOLON],
  },

  frontChest: {
    title: "Ön Göğüs",
    type: "number",
    category: [OrderType.GOMLEK],
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

  collarModel: {
    title: "Yaka Modeli",
    type: "text",
    category: [OrderType.GOMLEK],
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
};
