// ==========================================
// 76ERS VOLLEYBALL CLUB - MASTER JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. ACCORDION LOGIC (Homepage) ---
    const acc = document.getElementsByClassName("accordion-header");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    // --- 2. GLIGHTBOX INITIALIZATION (Homepage/Media) ---
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true
        });
    }

    // --- 3. DYNAMIC CONTENT & SEARCH (Homepage) ---
    if (document.getElementById('itemContainer')) {
        const items = [
            { name: "76ERS Home Jersey", category: "Merchandise" },
            { name: "76ERS Away Jersey", category: "Merchandise" },
            { name: "Volleyball Training Sessions", category: "Services" },
            { name: "Private Coaching", category: "Services" },
            { name: "Club Membership Fee", category: "Services" }
        ];

        const container = document.getElementById('itemContainer');

        function renderItems(data) {
            container.innerHTML = ""; 
            if (data.length === 0) {
                container.innerHTML = "<p>No items found.</p>";
                return;
            }
            data.forEach(item => {
                let div = document.createElement('div');
                div.className = 'item-card';
                div.innerHTML = `<h4>${item.name}</h4><p><strong>Category:</strong> ${item.category}</p>`;
                container.appendChild(div);
            });
        }

        renderItems(items);

        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.category.toLowerCase().includes(searchTerm)
            );
            renderItems(filtered);
        });
    }

    // --- 4. FORM VALIDATION & AJAX (Contact & Enquiry Pages) ---
    // Check if a form with id="contactForm" exists on the page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailAddress').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const type = document.getElementById('messageType').value;
            const message = document.getElementById('message').value.trim();

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const typeError = document.getElementById('typeError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('successMessage');

            let isValid = true;

            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            phoneError.style.display = 'none';
            typeError.style.display = 'none';
            messageError.style.display = 'none';
            successMessage.style.display = 'none';

            // Validation Rules
            if (name.length < 2) { nameError.style.display = 'block'; isValid = false; }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) { emailError.style.display = 'block'; isValid = false; }
            
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(phone)) { phoneError.style.display = 'block'; isValid = false; }
            
            if (type === "") { typeError.style.display = 'block'; isValid = false; }
            
            if (message.length < 10) { messageError.style.display = 'block'; isValid = false; }

            // AJAX Submission
            if (isValid) {
                // FAKE API URL FOR TESTING (Replace with Formspree for real emails)
                const fakeApiUrl = 'https://jsonplaceholder.typicode.com/posts';

                const formData = {
                    name: name,
                    email: email,
                    phone: phone,
                    type: type,
                    message: message
                };

                fetch(fakeApiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (response.ok) {
                        successMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                        alert("Oops! Something went wrong on the server.");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Network error. Please try again later.");
                });
            }
        });
    }
});