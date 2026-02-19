const pizzaData = {
  sizes: [
    { id: 1, nev: "Kicsi", meret: "S", ar: 0 },
    { id: 2, nev: "Közepes", meret: "M", ar: 800 },
    { id: 3, nev: "Nagy", meret: "L", ar: 1500 }
  ],

  basePrice: 2000,

  sauces: [
    { id: 1, nev: "Paradicsomos", ar: 300 },
    { id: 2, nev: "Tejfölös", ar: 400 }
  ],

  toppings: [
    { id: 1, nev: "Sajt", ar: 500 },
    { id: 2, nev: "Sonka", ar: 600 },
    { id: 3, nev: "Gomba", ar: 450 }
  ]
};

//szosz kivalasztasa
const sauceSelect = document.getElementById("sauce");
pizzaData.sauces.forEach(sauce => {
  const option = document.createElement("option");
    option.value = sauce.id;
    option.textContent = `${sauce.nev} (+${sauce.ar} Ft)`;
    sauceSelect.appendChild(option);
});

//feltetek hozzaadasa
const feltetekContainer = document.getElementById("feltetek");
pizzaData.toppings.forEach(topping => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = topping.id;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(`${topping.nev} (+${topping.ar} Ft)`));
    feltetekContainer.appendChild(label);
    feltetekContainer.appendChild(document.createElement("br"));
});

//ar szamitasa
const calculatePrice = () => {
    const sizeSelect = document.getElementById("size");
    const selectedSize = pizzaData.sizes.find(size => size.id == sizeSelect.value);
    const selectedSauce = pizzaData.sauces.find(sauce => sauce.id == sauceSelect.value);
    const selectedToppings = Array.from(document.querySelectorAll("#feltetek input[type='checkbox']:checked"))
        .map(checkbox => pizzaData.toppings.find(topping => topping.id == checkbox.value));

    let totalPrice = pizzaData.basePrice + selectedSize.ar + selectedSauce.ar;
    selectedToppings.forEach(topping => {
        totalPrice += topping.ar;
    });
    document.getElementById("price").textContent = `Ár: ${totalPrice} Ft`;
};
// CalculateTotal() keszitese

function CalculateTotal() {
    const sizeSelect = document.getElementById("size");
    const selectedSize = pizzaData.sizes.find(size => size.id == sizeSelect.value);
    const selectedSauce = pizzaData.sauces.find(sauce => sauce.id == sauceSelect.value);
    const selectedToppings = Array.from(document.querySelectorAll("#feltetek input[type='checkbox']:checked"))
        .map(checkbox => pizzaData.toppings.find(topping => topping.id == checkbox.value));

    let totalPrice = pizzaData.basePrice + selectedSize.ar + selectedSauce.ar;
    selectedToppings.forEach(topping => {
        totalPrice += topping.ar;
    });
    document.getElementById("price").textContent = `Ár: ${totalPrice} Ft`;
}

// rendelesi osszegzö ovj. letrehozasa
function OrderSummary() {
    const sizeSelect = document.getElementById("size");
    const selectedSize = pizzaData.sizes.find(size => size.id == sizeSelect.value);
    const selectedSauce = pizzaData.sauces.find(sauce => sauce.id == sauceSelect.value);
    const selectedToppings = Array.from(document.querySelectorAll("#feltetek input[type='checkbox']:checked"))
        .map(checkbox => pizzaData.toppings.find(topping => topping.id == checkbox.value));

    let summary = `Rendelés összegzése:\n`;
    summary += `Méret: ${selectedSize.nev}\n`;
    summary += `Szósz: ${selectedSauce.nev}\n`;

    if (selectedToppings.length > 0) {
        summary += `Feltétek:\n`;
        selectedToppings.forEach(topping => {
            summary += `- ${topping.nev}\n`;
        });
    } else {
        summary += `Nincsenek feltétek.\n`;
    }
    alert(summary);
}   

