document.addEventListener('DOMContentLoaded', () => {

    // Audio setup
    const bgMusic = document.getElementById('bgMusic');
    const cakeSound = document.getElementById('cakeSound');

    // General Scene Logic
    let currentScene = 1;
    const hideScene = (num) => {
        const scene = document.getElementById(`scene-${num}`);
        if(scene) {
            scene.classList.remove('active');
            setTimeout(() => scene.classList.add('hidden'), 1000); // Wait for fade out
        }
    };
    
    const showScene = (num) => {
        const scene = document.getElementById(`scene-${num}`);
        if(scene) {
            scene.classList.remove('hidden');
            // small delay to ensure display:block applies before opacity change
            setTimeout(() => scene.classList.add('active'), 100); 
        }
    };

    const nextScene = () => {
        hideScene(currentScene);
        currentScene++;
        showScene(currentScene);
    };

    // Helper to start music only once
    let musicStarted = false;
    const playMusic = () => {
        if(!musicStarted) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log("Audio play prevented:", e));
            musicStarted = true;
        }
    };

    // ----- SCENE 1: Intro -----
    const skipBtn = document.getElementById('skipScene1');
    skipBtn.addEventListener('click', () => {
        playMusic();
        nextScene();
    });

    // Auto-advance after 12 seconds for the intro video simulation
    setTimeout(() => {
        if(currentScene === 1) {
            playMusic();
            nextScene();
        }
    }, 12000); // 12 seconds

    // ----- SCENE 2: Reveal -----
    document.getElementById('startBtn').addEventListener('click', () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#005fce', '#ffffff', '#e6f0fa']
        });
        nextScene();
    });

    // ----- SCENE 3: Greeting Card -----
    const cardCover = document.querySelector('.card-cover');
    const card = document.getElementById('greetingCard');
    
    cardCover.addEventListener('click', () => {
        card.classList.add('is-open');
    });

    document.getElementById('nextScene3Btn').addEventListener('click', () => {
        nextScene();
    });

    // ----- SCENE 4: Cake Scene -----
    document.getElementById('cutCakeBtn').addEventListener('click', (e) => {
        const btn = e.target;
        btn.disabled = true;
        
        // Hide sparkles & flame (blow out candle)
        document.querySelector('.flame').style.display = 'none';
        document.querySelector('.sparkles').style.display = 'none';

        // Play Sound
        cakeSound.play();

        // Confetti burst
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#005fce', '#ffffff']
        });

        // Move to scene 5 after 3 seconds
        setTimeout(() => {
            nextScene();
        }, 3000);
    });

    // ----- SCENE 5: Memories -----
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    document.getElementById('nextSlideBtn').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide++;
        
        if (currentSlide < slides.length) {
            slides[currentSlide].classList.add('active');
        } else {
            // Done with slides
            nextScene();
        }
    });

    // ----- SCENE 6: Final Message -----
    document.getElementById('nextScene6Btn').addEventListener('click', () => {
        nextScene();
    });

    // ----- SCENE 7: Gift Box -----
    const giftContainer = document.getElementById('giftBoxContainer');
    const giftBox = document.getElementById('giftBox');
    const giftMessage = document.getElementById('giftMessage');
    const giftTitle = document.getElementById('giftTitle');

    giftContainer.addEventListener('click', () => {
        if(!giftBox.classList.contains('open')) {
            giftBox.classList.add('open');
            giftTitle.style.display = 'none';
            giftMessage.classList.remove('hidden');

            // Fake Money animation
            for(let i=0; i<20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('money-particle');
                particle.innerHTML = '💵';
                // Random directions
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 150;
                particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
                
                // Position in center of box
                particle.style.left = '50px';
                particle.style.top = '10px';
                
                giftBox.appendChild(particle);

                // remove particle after anim
                setTimeout(() => particle.remove(), 1000);
            }
        }
    });

    document.getElementById('nextScene7Btn').addEventListener('click', () => {
        nextScene();
    });

    // ----- SCENE 8: Final Card Exit -----
    const finalCardCover = document.querySelector('#finalCard .card-cover');
    const finalCard = document.getElementById('finalCard');
    
    if(finalCardCover) {
        finalCardCover.addEventListener('click', () => {
            finalCard.classList.add('is-open');
        });
    }

    document.getElementById('exitBtn').addEventListener('click', () => {
        // Just hide UI and show empty or restart
        currentScene = 1;
        document.getElementById('scene-8').classList.remove('active');
        setTimeout(() => {
            alert("Thanks for playing! 😄");
            // Optional: reset all state to Scene 1
            window.location.reload();
        }, 1000);
    });

});
