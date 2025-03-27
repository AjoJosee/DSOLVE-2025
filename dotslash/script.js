// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tips page functionality
if (document.querySelector('.category-tabs')) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tipSections = document.querySelectorAll('.tips-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tipSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            document.getElementById(`${category}-tips`).classList.add('active');
        });
    });
}

// Carbon Footprint Calculator
if (document.getElementById('carbonForm')) {
    document.getElementById('carbonForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input values
        const electricity = parseFloat(document.getElementById('electricity').value);
        const gas = parseFloat(document.getElementById('gas').value);
        const water = parseFloat(document.getElementById('water').value);
        const carMiles = parseFloat(document.getElementById('carMiles').value);
        const publicTransit = parseFloat(document.getElementById('publicTransit').value);
        const meatConsumption = parseFloat(document.getElementById('meatConsumption').value);
        const recycling = parseFloat(document.getElementById('recycling').value);
        
        // Calculate carbon footprint
        // These are simplified conversion factors
        const electricityCO2 = electricity * 0.7; // kg CO2 per kWh
        const gasCO2 = gas * 5.3; // kg CO2 per therm
        const waterCO2 = water * 0.2; // kg CO2 per 1000 gallons
        const carCO2 = carMiles * 0.4; // kg CO2 per mile
        const transitCO2 = publicTransit * 0.1; // kg CO2 per trip
        const meatCO2 = meatConsumption * 2.5; // kg CO2 per meal
        const recyclingCO2 = (100 - recycling) * 0.5; // kg CO2 per percentage point not recycled
        
        const homeEnergyCO2 = electricityCO2 + gasCO2 + waterCO2;
        const transportCO2 = carCO2 - transitCO2; // Transit reduces car emissions
        const lifestyleCO2 = meatCO2 + recyclingCO2;
        
        const totalCO2 = homeEnergyCO2 + transportCO2 + lifestyleCO2;
        
        // Display results
        const resultContainer = document.getElementById('result');
        resultContainer.classList.add('active');
        
        document.getElementById('carbonResult').textContent = `${Math.round(totalCO2)}`;
        document.getElementById('homeEnergyResult').textContent = `${Math.round(homeEnergyCO2)} kg CO2`;
        document.getElementById('transportResult').textContent = `${Math.round(transportCO2)} kg CO2`;
        document.getElementById('lifestyleResult').textContent = `${Math.round(lifestyleCO2)} kg CO2`;
        
        // Generate recommendations
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';
        
        if (electricityCO2 > 200) {
            recommendationsList.innerHTML += '<li>Consider switching to LED bulbs and energy-efficient appliances</li>';
        }
        if (carCO2 > 100) {
            recommendationsList.innerHTML += '<li>Try carpooling or using public transportation more often</li>';
        }
        if (meatCO2 > 50) {
            recommendationsList.innerHTML += '<li>Consider reducing meat consumption or having meatless days</li>';
        }
        if (recycling < 50) {
            recommendationsList.innerHTML += '<li>Improve your recycling habits to reduce waste</li>';
        }
        
        // Add color coding based on carbon footprint
        const resultElement = document.getElementById('carbonResult');
        if (totalCO2 < 500) {
            resultElement.style.color = '#27ae60'; // Green
        } else if (totalCO2 < 1000) {
            resultElement.style.color = '#f1c40f'; // Yellow
        } else {
            resultElement.style.color = '#e74c3c'; // Red
        }
    });
}

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections that should animate
document.querySelectorAll('.tip-card, .feature-card, .about-section, .impact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
}); 