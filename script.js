// Dummy data for jerseys
const jerseys = [
        // { name: 'Jersey A', price: 2000, image: 'jersey1.jpg' },
        // { name: 'Jersey B', price: 2000, image: 'jersey2.jpg' },
        // { name: 'Jersey C', price: 2000, image: 'jersey4.jpg' },
        // { name: 'Jersey D', price: 2000, image: 'jersey5.jpg' },
        // { name: 'Jersey E', price: 2000, image: 'jersey6.jpg' },
        // { name: 'Jersey F', price: 2000, image: 'jersey7.jpg' },
    // { name: 'Jersey G', price: 2000, image: 'jersey8.jpg' },
    // { name: 'Jersey H', price: 2000, image: 'jersey9.jpg' },
    // { name: 'Jersey I', price: 2000, image: 'jersey10.jpg' },
    {name:'Nepal',price:2000,image:'Nepal.jpg'},
    {name:'Barcelona',price:2000,image:'bestbarca.jpg'},
    {name:'Argentina',price:2000,image:'argentina.jpg'},
    {name:'Beckam',price:2000,image:'beckam.jpg'},
    {name:'Henry',price:2000,image:'henry.jpg'},
    {name:'Messi',price:2000,image:'messi10.jpg'},
    {name:'Messi',price:2000,image:'messssi.jpg'},
    {name:'Intermiami',price:1650,image:'intermiami.jpg'},
    {name:'Arsenal',price:2000,image:'o2.jpg'},
    {name:'Ronaldo',price:2000,image:'ronaldo.jpg'},
    {name:'Ronaldo',price:2000,image:'ronaldo17.jpg'},
    {name:'Real Madrid',price:2000,image:'realmadrid2.jpg'},
    {name:'Ronaldo',price:2000,image:'ronaldoo.jpg'},
    {name:'Maldini',price:2000,image:'maldini.jpg'},
    {name:'Manchester united',price:2000,image:'mnu.jpg'},
    {name:'Manchester united',price:2000,image:'mnuuu.jpg'},
    {name:'Messi',price:2000,image:'messsssiii.jpg'},
    {name:'Portugal Sporting Club',price:2000,image:'da.jpg'},
    {name:'France',price:2000,image:'FFF.jpg'},
    {name:'Portugal',price:2000,image:'portugal.jpg'},
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
            <span><h3>${jersey.name}- Rs ${jersey.price.toFixed(2)}</h3></span>
            <button onclick="addToCart('${jersey.name}', ${jersey.price}, '${jersey.image}')">Add to Cart</button>
            <br>
             <a href="https://www.facebook.com/gnuj.kit" style="background-color: #3b5998; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;" target="_blank">Buy Now</a>"
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
const icons = document.querySelectorAll(".icon");
const answers = document.querySelectorAll(".answer");
// icons.forEach(icon =>{
//     icon.addEventListener('click',()=>{
//         answers.forEach(answer=>{
//             answer.style.display = 'inline-block';
//         })
//     })
// })

    
document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('open');
    });
});


// Initialize jersey display on page load
displayJerseys();
contactUs();
