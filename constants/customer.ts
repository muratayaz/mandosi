import { OrderType } from "@prisma/client";
export const customerDetailTypes = {
  breast: {
    title: "Göğüs",
    type: "number",
    position: {
      column: 1,
      row: 1,
    },
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
    position: {
      column: 1,
      row: 2,
    },
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
    position: {
      column: 1,
      row: 3,
    },
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },

  shirtSize: {
    title: "Gömlek Boyu",
    type: "number",
    position: {
      column: 2,
      row: 1,
    },
    category: [OrderType.GOMLEK],
  },
  pantSize: {
    title: "Pantolon Boyu",
    type: "number",
    position: {
      column: 3,
      row: 6,
    },
    category: [OrderType.PANTOLON],
  },
  shirtArmSize: {
    title: "Gömlek Kol Boyu",
    type: "number",
    position: {
      column: 2,
      row: 2,
    },
    category: [OrderType.GOMLEK],
  },
  coatArmSize: {
    title: "Ceket Kol Boyu",
    position: {
      column: 1,
      row: 7,
    },
    type: "number",
    category: [OrderType.CEKET],
  },
  roba: {
    title: "Roba",
    type: "number",
    position: {
      column: 1,
      row: 4,
    },
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
  },
  frontRoba: {
    title: "Ön Roba",
    type: "number",
    category: [OrderType.GOMLEK],
    position: {
      column: 2,
      row: 3,
    },
  },

  waist: {
    title: "Bel",
    type: "number",
    position: {
      column: 3,
      row: 1,
    },
    category: [OrderType.PANTOLON],
  },

  hip: {
    title: "Basen",
    type: "number",
    position: {
      column: 3,
      row: 2,
    },
    category: [OrderType.PANTOLON],
  },

  ag: {
    title: "Ağ",
    type: "number",
    position: {
      column: 3,
      row: 3,
    },
    category: [OrderType.PANTOLON],
  },

  knee: {
    title: "Diz Genişliği",
    position: {
      column: 3,
      row: 4,
    },
    type: "number",
    category: [OrderType.PANTOLON],
  },

  trot: {
    title: "Paça Genişliği",
    type: "number",
    position: {
      column: 3,
      row: 5,
    },
    category: [OrderType.PANTOLON],
  },

  embroidery: {
    title: "Nakış",
    type: "text",
    position: {
      column: 2,
      row: 6,
    },
    category: [OrderType.GOMLEK],
  },

  backSize: {
    title: "Arka Boy",
    type: "number",
    category: [OrderType.CEKET, OrderType.GOMLEK],
    position: {
      column: 1,
      row: 6,
    },
  },
  frontSize: {
    title: "Ön Boy",
    type: "number",
    position: {
      column: 1,
      row: 5,
    },
    category: [OrderType.CEKET, OrderType.GOMLEK],
  },
  pens: {
    title: "Pens Ölçüsü",
    type: "text",
    position: {
      column: 2,
      row: 5,
    },
    category: [OrderType.GOMLEK],
  },
  height: {
    title: "Yükseklik",
    type: "number",
    position: {
      column: 3,
      row: 7,
    },
    category: [OrderType.PANTOLON],
  },
  lowerCalf: {
    title: "Alt Baldır",
    type: "number",
    position: {
      column: 3,
      row: 8,
    },
    category: [OrderType.PANTOLON],
  },

  arm: {
    title: "Kol",
    type: "number",
    category: [OrderType.CEKET, OrderType.KABAN, OrderType.GOMLEK],
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

  shoeSize: {
    title: "Ayakkabı Numarası",
    type: "text",
    category: [OrderType.AYAKKABI],
  },

  collor: {
    title: "Yaka",
    type: "text",
    category: [OrderType.GOMLEK],
  },
  collarModel: {
    title: "Model",
    type: "image",
    category: [
      OrderType.GOMLEK,
      OrderType.CEKET,
      OrderType.KABAN,
      OrderType.PANTOLON,
    ],
  },
};
