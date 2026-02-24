// Pizza rendelési adatok
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

let selectedSize = 1;

document.addEventListener('DOMContentLoaded', () => {
    initializeSizes();
    initializeSauces();
    initializeToppings();
    updatePrice();
});

function initializeSizes() {
    const sizesContainer = document.getElementById('sizes');
    pizzaData.sizes.forEach(size => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'size-btn';
        if (size.id === 1) button.classList.add('active');
        button.textContent = `${size.nev}`;
        
        button.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedSize = size.id;
            updatePrice();
        });
        
        sizesContainer.appendChild(button);
    });
}

function initializeSauces() {
    const sauceSelect = document.getElementById('sauce');
    pizzaData.sauces.forEach(sauce => {
        const option = document.createElement('option');
        option.value = sauce.id;
        option.textContent = sauce.nev;
        sauceSelect.appendChild(option);
    });
    sauceSelect.addEventListener('change', updatePrice);
}

function initializeToppings() {
    const feltetekContainer = document.getElementById('feltetek');
    pizzaData.toppings.forEach(topping => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = topping.id;
        checkbox.addEventListener('change', updatePrice);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(topping.nev));
        feltetekContainer.appendChild(label);
    });
}

function updatePrice() {
    const selectedSizeData = pizzaData.sizes.find(size => size.id == selectedSize);
    const sauceSelect = document.getElementById('sauce');
    const selectedSauceData = pizzaData.sauces.find(sauce => sauce.id == sauceSelect.value);
    
    const selectedToppings = Array.from(document.querySelectorAll('#feltetek input[type="checkbox"]:checked'))
        .map(checkbox => pizzaData.toppings.find(topping => topping.id == checkbox.value));
    
    let total = pizzaData.basePrice + selectedSizeData.ar;
    if (selectedSauceData) total += selectedSauceData.ar;
    selectedToppings.forEach(topping => {
        total += topping.ar;
    });
    
    document.getElementById('total-price').textContent = total;
}

document.getElementById('order-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    
    if (!name || !phone || !address) {
        alert('Kérjük, töltsd ki az összes adatot!');
        return;
    }
    
    const sauceSelect = document.getElementById('sauce');
    if (!sauceSelect.value) {
        alert('Kérjük, válassz szószt!');
        return;
    }
    
    const selectedSizeData = pizzaData.sizes.find(size => size.id == selectedSize);
    const selectedSauceData = pizzaData.sauces.find(sauce => sauce.id == sauceSelect.value);
    
    alert(`Rendelés megerősítve!\n\nNév: ${name}\nTelefon: ${phone}\nCím: ${address}\nMéret: ${selectedSizeData.nev}\nSzósz: ${selectedSauceData.nev}`);
});

