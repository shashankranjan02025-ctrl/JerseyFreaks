// =============================
// JERSEYFREAKS STORE SETTINGS
// =============================
// Replace this with your WhatsApp number in international format.
// Example for India: 919876543210 (NO +, spaces or dashes)
const WHATSAPP_NUMBER = "7202022018";

const products = [
  {id:1,name:"JerseyFreaks Signature",price:899,label:"JF",className:"lime"},
  {id:2,name:"Classic Black Edition",price:999,label:"JF",className:"black"},
  {id:3,name:"Electric Blue Edition",price:999,label:"JF",className:"blue"},
  {id:4,name:"Red Match Edition",price:1099,label:"JF",className:"red"},
  {id:5,name:"India Fan Edition",price:999,label:"JF",className:"india"},
  {id:6,name:"Street Football Edition",price:899,label:"JF",className:"street"}
];

const cart = [];

const productArea = document.getElementById("products");
const cartEl = document.getElementById("cart");
const backdrop = document.getElementById("backdrop");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function rupees(n){ return "₹" + n.toLocaleString("en-IN"); }

function renderProducts(){
  productArea.innerHTML = products.map(p => `
    <article class="product">
      <div class="product-art"><div class="mini-shirt ${p.className}">${p.label}</div></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="price">${rupees(p.price)}</div>
        <select id="size-${p.id}" aria-label="Select size for ${p.name}">
          <option value="S">Size S</option><option value="M" selected>Size M</option>
          <option value="L">Size L</option><option value="XL">Size XL</option>
          <option value="XXL">Size XXL</option>
        </select>
        <button class="add" onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    </article>
  `).join("");
}
function addToCart(id){
  const p = products.find(x => x.id === id);
  const size = document.getElementById("size-"+id).value;
  cart.push({...p,size});
  renderCart();
  openCart();
}
function renderCart(){
  cartCount.textContent = cart.length;
  if(!cart.length){
    cartItems.innerHTML = '<div class="empty">Your cart is empty.</div>';
    cartTotal.textContent = "₹0";
    return;
  }
  cartItems.innerHTML = cart.map((item,i)=>`
    <div class="cart-row">
      <div><strong>${item.name}</strong><br><small>Size ${item.size} · ${rupees(item.price)}</small></div>
      <button class="remove" onclick="removeItem(${i})">Remove</button>
    </div>
  `).join("");
  cartTotal.textContent = rupees(cart.reduce((sum,x)=>sum+x.price,0));
}
function removeItem(i){ cart.splice(i,1); renderCart(); }
function openCart(){cartEl.classList.add("open");backdrop.classList.add("open")}
function closeCart(){cartEl.classList.remove("open");backdrop.classList.remove("open")}

document.getElementById("cartButton").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
backdrop.onclick=closeCart;

function whatsappMessage(){
  if(!cart.length) return "https://wa.me/" + WHATSAPP_NUMBER;
  const lines = cart.map((x,i)=>`${i+1}. ${x.name} — Size ${x.size} — ${rupees(x.price)}`);
  const total = cart.reduce((s,x)=>s+x.price,0);
  const msg = `Hello JerseyFreaks! I would like to order:\n${lines.join("\n")}\n\nTotal: ${rupees(total)}\nPlease confirm availability and delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
document.getElementById("orderButton").onclick=()=>{
  if(!cart.length){alert("Add a jersey to your cart first.");return;}
  window.open(whatsappMessage(),"_blank");
};
document.getElementById("contactWhatsApp").href="https://wa.me/"+WHATSAPP_NUMBER;

renderProducts();
renderCart();
