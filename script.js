// Stories data
const stories = {
    'mamas-nunca-caem': {
        video: 'https://streamable.com/e/4ych60',
        title: 'Mamas que Nunca Caem',
        type: 'streamable-video'
    },
    'assimetria-mamaria': {
        video: 'https://streamable.com/g6mk7q',
        title: 'Assimetria Mamária',
        type: 'streamable-video'
    },
    'como-vejo-a-plastica': {
        video: 'https://streamable.com/e/bro38v',
        title: 'Como Vejo a Plástica',
        type: 'streamable-video'
    },
    'preparacao-plastica': {
        video: 'https://streamable.com/e/5j3qx0',
        title: 'Preparação para Cirurgia',
        type: 'streamable-video'
    },
    'ritdo': {
        video: 'https://streamable.com/e/efpymi',
        title: 'Sobre Ritidoplastia',
        type: 'streamable-video'
    },
    'antes-depois': {
        image: 'https://images.unsplash.com/photo-1554464901-78c9215b7e61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Antes e Depois',
        type: 'image'
    },
    'dicas': {
        image: 'https://images.unsplash.com/photo-1554464901-78c9215b7e61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Dicas',
        type: 'image'
    },
    'resultados': {
        image: 'https://images.unsplash.com/photo-1554464901-78c9215b7e61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Resultados',
        type: 'image'
    }
};

// Modal setup
const modal = document.getElementById('storyModal');
const storyContent = document.querySelector('.story-content');
const closeModal = document.querySelector('.close-modal');
const progressBar = document.querySelector('.story-progress');

// Function to show story
function showStory(storyId) {
    const story = stories[storyId];
    if (!story) return;

    // Reset progress bar
    progressBar.style.animation = 'none';
    progressBar.offsetHeight; // Trigger reflow
    progressBar.style.animation = null;

    // Clear previous content
    storyContent.innerHTML = '';

    if (story.type === 'video') {
        const video = document.createElement('video');
        video.src = story.video;
        video.controls = true;
        video.autoplay = true;
        video.muted = false;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        storyContent.appendChild(video);
    } else if (story.type === 'streamable-video') {
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '0px';
        container.style.paddingBottom = '177.778%';
        
        const iframe = document.createElement('iframe');
        // Use the correct video ID based on the story
        let videoId;
        switch(storyId) {
            case 'mamas-nunca-caem':
                videoId = '4ych60';
                break;
            case 'assimetria-mamaria':
                videoId = 'g6mk7q';
                break;
            case 'como-vejo-a-plastica':
                videoId = 'bro38v';
                break;
            case 'preparacao-plastica':
                videoId = '5j3qx0';
                break;
            case 'ritdo':
                videoId = 'efpymi';
                break;
        }
        iframe.src = `https://streamable.com/e/${videoId}?autoplay=1&loop=0&nocontrols=1`;
        iframe.allow = 'fullscreen;autoplay';
        iframe.allowFullscreen = true;
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.left = '0px';
        iframe.style.top = '0px';
        iframe.style.overflow = 'hidden';
        
        container.appendChild(iframe);
        storyContent.appendChild(container);
    } else {
        const img = document.createElement('img');
        img.src = story.image;
        img.alt = story.title;
        storyContent.appendChild(img);
    }

    // Show modal
    modal.classList.add('active');
    
    // Start progress bar animation only for images
    if (story.type === 'image') {
        progressBar.style.animation = 'progress 5s linear forwards';
    }
}

// Function to close modal
function closeStoryModal() {
    modal.classList.remove('active');
    // Pause video if exists
    const video = document.querySelector('.story-content video');
    if (video) {
        video.pause();
    }
    // Remove iframe if exists
    const iframe = document.querySelector('.story-content iframe');
    if (iframe) {
        iframe.remove();
    }
}

// Event listeners
document.querySelectorAll('.instagram-story').forEach(story => {
    story.addEventListener('click', () => {
        const storyId = story.getAttribute('data-story');
        showStory(storyId);
    });
});

closeModal.addEventListener('click', closeStoryModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeStoryModal();
    }
});

// Close modal after 5 seconds only for images
setInterval(() => {
    if (modal.classList.contains('active')) {
        const currentStory = document.querySelector('.story-content img');
        if (currentStory) {
            closeStoryModal();
        }
    }
}, 5000);

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically handle the form submission
        // For now, we'll just show an alert
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
} 