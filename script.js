// Dummy data for jerseys
const jerseys = [
    { name: 'Jersey A', price: 29.99, image: 'jersey1.jpg' },
    { name: 'Jersey B', price: 34.99, image: 'jersey2.jpg' },
    { name: 'Jersey C', price: 39.99, image: 'jersey4.jpg' },
    { name: 'Jersey D', price: 44.99, image: 'jersey5.jpg' },
    { name: 'Jersey E', price: 49.99, image: 'jersey6.jpg' },
    { name: 'Jersey F', price: 54.99, image: 'jersey7.jpg' },
    { name: 'Jersey G', price: 59.99, image: 'jersey8.jpg' },
    { name: 'Jersey H', price: 64.99, image: 'jersey9.jpg' },
    { name: 'Jersey I', price: 69.99, image: 'jersey10.jpg' },
];

let cart = [];

let totalPrice = 0;

// Initialize EmailJS
// emailjs.init('your_user_id'); // Replace with your EmailJS user ID

function displayJerseys() {
    const jerseyList = document.getElementById('jersey-list');
    jerseyList.innerHTML = '';

    jerseys.forEach(jersey => {
        const div = document.createElement('div');
        div.className = 'jersey-item';
        div.innerHTML = `
            <img src="${jersey.image}" alt="${jersey.name}">
            <span>${jersey.name} - $${jersey.price.toFixed(2)}</span>
            <button onclick="addToCart('${jersey.name}', ${jersey.price}, '${jersey.image}')">Add to Cart</button>
        `;
        jerseyList.appendChild(div);
    });
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        
        li.innerHTML = `
            <img src="${cartItem.image}" alt="${cartItem.name}">
            <span>${cartItem.name} - $${cartItem.price.toFixed(2)}</span>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${cartItem.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;
        
        cartItems.appendChild(li);
        totalPrice += cartItem.price * cartItem.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function changeQuantity(index, delta) {
    const item = cart[index];
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

function shopNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close');

    modal.style.display = 'block';

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        const orderDetails = `
            Order Details:
            ${cart.map(item => `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n')}
            Total Price: $${totalPrice.toFixed(2)}
            Shipping Address: ${address}
            Phone Number: ${phone}
        `;

        const templateParams = {
            to_name: name,
            from_name:name,
            // address: address,
            // phone: phone,
            message: orderDetails
        };
        console.log(templateParams)

        emailjs.send('service_wwnkn4e', 'template_hdfl5xh', templateParams).then(
            (response) => {
                alert("Order sent successfully",templateParams);
                cart = [];
                totalPrice = 0;
                updateCart();
                modal.style.display = 'none';
            },
            (error) => {
                alert("Failed to send order: " + JSON.stringify(error));
            }
        );
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function contactUs() {
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            to_name: "Admin",
            from_name: name,
            address: address,
            message: message
        };

        emailjs.send('service_wwnkn4e', 'template_hdfl5xh', templateParams).then(
            (response) => {
                alert("Message sent successfully!");
                contactForm.reset();
            },
            (error) => {
                alert("Failed to send message: " + JSON.stringify(error));
            }
        );
    });
}

// Initialize jersey display on page load
displayJerseys();
contactUs();
