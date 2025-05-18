const defaultTemplates = {
  "Business Trip": {
    Clothing: [
      { name: "T-shirts", checked: false },
      { name: "Jeans", checked: false },
    ],
    Toiletries: [
      { name: "Toothbrush", checked: false },
      { name: "Shampoo", checked: false },
    ],
    Electronics: [
      { name: "Phone charger", checked: false },
      { name: "Power bank", checked: false },
    ],
  },
  "Vacation": {
    Clothing: [
      { name: "Shorts", checked: false },
      { name: "Swimwear", checked: false },
    ],
    Toiletries: [
      { name: "Sunscreen", checked: false },
      { name: "Toothbrush", checked: false },
    ],
    Electronics: [
      { name: "Camera", checked: false },
    ],
  },
};

const emojis = {
  Clothing: "👕",
  Toiletries: "🧴",
  Electronics: "🔌",
};

export {defaultTemplates,emojis};
  