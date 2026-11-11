const API_BASE_URL = "http://localhost:5000/api"; //testing
// const API_BASE_URL = "https://api.mrsenterprises.co.in/api"; //Live

// ===============================
// HEADER / CUSTOMER ACCOUNT
// ===============================

function updateHeader() {
    const token = localStorage.getItem("token");

    const loginLinks = document.querySelectorAll(".login-link");
    const logoutLinks = document.querySelectorAll(".logout-link");

    loginLinks.forEach(link => {
        link.style.display = token ? "none" : "inline-flex";
    });

    logoutLinks.forEach(link => {
        link.style.display = token ? "inline-flex" : "none";
    });

    updateCartCount();
}


// ===============================
// CART COUNT
// ===============================

async function updateCartCount() {
    const cartCountElements =
        document.querySelectorAll(".cart-count");

    if (!cartCountElements.length) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        cartCountElements.forEach(element => {
            element.textContent = "0";
        });
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return;
        }

        const result = await response.json();

        const items = result.data?.items || [];

        const count = items.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
        );

        cartCountElements.forEach(element => {
            element.textContent = count;
        });

    } catch (error) {
        console.error("Failed to update cart count:", error);
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {
    localStorage.removeItem("token");

    // Remove any other customer data if stored
    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// ===============================
// UPDATE HEADER WHEN PAGE LOADS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    updateHeader();
});
