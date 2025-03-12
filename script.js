document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const flowerGarden = document.getElementById('flower-garden');
    const addFlowerBtn = document.getElementById('add-flower');
    const changeColorsBtn = document.getElementById('change-colors');
    
    // Configuration
    const flowerColors = [
        '#f48fb1', '#f8bbd0', '#e91e63', '#ec407a', '#ad1457',
        '#ba68c8', '#9c27b0', '#7b1fa2', '#673ab7', '#5e35b1',
        '#3f51b5', '#3949ab', '#1e88e5', '#42a5f5', '#29b6f6',
        '#26c6da', '#26a69a', '#66bb6a', '#9ccc65', '#d4e157',
        '#ffee58', '#ffca28', '#ffa726', '#ff7043', '#ff5722'
    ];
    
    const centerColors = [
        '#ffd54f', '#ffb300', '#ff9800', '#fb8c00', '#f57c00',
        '#ef6c00', '#e65100', '#ffa000', '#ff8f00', '#ff6f00'
    ];
    
    // Functions
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    function createFlower() {
        // Create flower container
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Create stem and leaves
        const stem = document.createElement('div');
        stem.className = 'stem';
        
        const leaf1 = document.createElement('div');
        leaf1.className = 'leaf';
        stem.appendChild(leaf1);
        
        const leaf2 = document.createElement('div');
        leaf2.className = 'leaf';
        stem.appendChild(leaf2);
        
        flower.appendChild(stem);
        
        // Create petals container
        const petalsContainer = document.createElement('div');
        petalsContainer.className = 'petals';
        
        // Create multiple layers of petals
        const petalColor = getRandomItem(flowerColors);
        const petalCount = Math.floor(getRandomNumber(8, 12)); // Base number of petals
        
        // Create outer layer
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal outer';
            petal.style.background = petalColor;
            petal.style.transform = `rotate(${(i * 360) / petalCount}deg) translateY(-25px)`;
            petal.style.animationDelay = `${i * 0.15}s`;
            petalsContainer.appendChild(petal);
        }

        // Create middle layer
        for (let i = 0; i < petalCount - 2; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.background = petalColor;
            petal.style.transform = `rotate(${(i * 360) / (petalCount - 2)}deg) translateY(-20px)`;
            petal.style.animationDelay = `${i * 0.15 + 0.2}s`;
            petalsContainer.appendChild(petal);
        }

        // Create inner layer
        for (let i = 0; i < petalCount - 4; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal inner';
            petal.style.background = petalColor;
            petal.style.transform = `rotate(${(i * 360) / (petalCount - 4)}deg) translateY(-15px)`;
            petal.style.animationDelay = `${i * 0.15 + 0.4}s`;
            petalsContainer.appendChild(petal);
        }
        
        flower.appendChild(petalsContainer);
        
        // Create flower center
        const flowerCenter = document.createElement('div');
        flowerCenter.className = 'flower-center';
        flowerCenter.style.background = getRandomItem(centerColors);
        flower.appendChild(flowerCenter);
        
        // Set random animation duration for swaying
        flower.style.animationDuration = `${getRandomNumber(4, 8)}s`;
        
        // Add hover effect
        flower.addEventListener('mouseenter', () => {
            flowerCenter.style.transform = 'scale(1.2)';
            createParticles(flower, 5);
        });
        
        flower.addEventListener('mouseleave', () => {
            flowerCenter.style.transform = 'scale(1)';
        });
        
        return flower;
    }
    
    function addFlowers(count = 1) {
        for (let i = 0; i < count; i++) {
            const flower = createFlower();
            flowerGarden.appendChild(flower);
        }
    }
    
    function changeAllFlowersColors() {
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach(flower => {
            // Change petal colors
            const petals = flower.querySelectorAll('.petal');
            const newPetalColor = getRandomItem(flowerColors);
            
            petals.forEach(petal => {
                petal.style.background = newPetalColor;
                // Add a small animation for color change
                petal.style.animation = 'none';
                petal.offsetHeight; // Trigger reflow
                petal.style.animation = 'bloom 0.5s ease-out forwards';
            });
            
            // Change center color
            const center = flower.querySelector('.flower-center');
            center.style.background = getRandomItem(centerColors);
            
            // Add particles for effect
            createParticles(flower, 8);
        });
    }
    
    function createParticles(element, count) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position around the flower
            const x = getRandomNumber(rect.left, rect.right);
            const y = getRandomNumber(rect.top - 20, rect.bottom - 20);
            
            // Random color from flower colors
            particle.style.background = getRandomItem(flowerColors);
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Add to body
            document.body.appendChild(particle);
            
            // Animate the particle
            const angle = getRandomNumber(0, Math.PI * 2);
            const speed = getRandomNumber(1, 3);
            const startTime = Date.now();
            const duration = getRandomNumber(1000, 2000); // 1-2 seconds
            
            function animateParticle() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;
                
                if (progress >= 1) {
                    particle.remove();
                    return;
                }
                
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);
                
                particle.style.left = `${currentX + Math.cos(angle) * speed}px`;
                particle.style.top = `${currentY + Math.sin(angle) * speed - progress * 2}px`; // Rising effect
                particle.style.opacity = 1 - progress;
                
                requestAnimationFrame(animateParticle);
            }
            
            requestAnimationFrame(animateParticle);
        }
    }
    
    // Event Listeners
    addFlowerBtn.addEventListener('click', () => {
        addFlowers(Math.floor(getRandomNumber(1, 5))); // Add 1-4 flowers
        createParticles(addFlowerBtn, 10);
    });
    
    changeColorsBtn.addEventListener('click', () => {
        changeAllFlowersColors();
        createParticles(changeColorsBtn, 10);
    });
    
    // Initialize with some flowers
    addFlowers(10);
});