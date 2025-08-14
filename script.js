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

// Formatação do telefone
document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
        value = `${value.slice(0,10)}-${value.slice(10)}`;
    }
    
    e.target.value = value;
});

// Função para formatar e abrir WhatsApp
async function openWhatsApp(nome, telefone, mensagem) {
    const mensagemWhatsApp = `Olá! Me chamo ${nome}.\nTelefone: ${telefone}${mensagem ? `\n\n${mensagem}` : ''}`;
    
    // Enviar dados para o Discord
    const webhookUrl = 'https://discord.com/api/webhooks/1356766178495955284/4yvQWHpDJ8ExZMsoA8xlJ0rOrsrPhJJ6GVOJjvSKBzF5CuTJLBEjYwve-D3550sOjYtn';
    
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `**Novo Contato via Formulário**\n\n**Nome:** ${nome}\n**Telefone:** ${telefone}${mensagem ? `\n**Mensagem:** ${mensagem}` : ''}`
            })
        });
    } catch (error) {
        console.error('Erro ao enviar dados para o Discord:', error);
    }
    
    // Disparar evento de Lead no Meta Pixel com Advanced Match
    fbq('track', 'Lead', {
        content_name: 'Formulário de Contato',
        content_category: 'Contato',
        value: 1,
        currency: 'BRL',
        phone: telefone.replace(/\D/g, ''),
        external_id: telefone.replace(/\D/g, ''),
        client_ip_address: '{{client_ip_address}}',
        client_user_agent: '{{client_user_agent}}',
        fbc: '{{fbc}}',
        fbp: '{{fbp}}',
        em: '{{em}}'
    });

    // Disparar evento no Google Analytics
    gtag('event', 'form_submission', {
        'event_category': 'Contact',
        'event_label': 'WhatsApp Form',
        'value': 1
    });

    // Disparar conversão do Google Ads
    gtag('event', 'conversion', {
        'send_to': 'AW-17210029785/lead',
        'value': 1,
        'currency': 'BRL'
    });

    window.open(`https://wa.me/5531993991313?text=${encodeURIComponent(mensagemWhatsApp)}`, '_blank');
}

// Envio do formulário para WhatsApp
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = this.querySelector('input[type="text"]').value;
    const telefone = this.querySelector('input[type="tel"]').value.replace(/\D/g, '');
    const mensagem = this.querySelector('textarea').value.trim();
    
    openWhatsApp(nome, telefone, mensagem);
    this.reset();
});

// Botão WhatsApp no formulário
document.querySelector('.whatsapp-form-button').addEventListener('click', function() {
    const form = document.getElementById('contact-form');
    const nome = form.querySelector('input[type="text"]').value;
    const telefone = form.querySelector('input[type="tel"]').value.replace(/\D/g, '');
    const mensagem = form.querySelector('textarea').value.trim();
    
    if (!nome || !telefone) {
        alert('Por favor, preencha pelo menos o nome e telefone antes de ir para o WhatsApp.');
        return;
    }
    
    openWhatsApp(nome, telefone, mensagem);
});

// WhatsApp Button Scroll Control
const whatsappButton = document.querySelector('.whatsapp-button');

window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        whatsappButton.classList.add('show');
    } else {
        whatsappButton.classList.remove('show');
    }
});

// Smooth scroll for WhatsApp button
document.querySelector('.whatsapp-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contato').scrollIntoView({
        behavior: 'smooth'
    });

    // Show message
    const message = document.querySelector('.whatsapp-message');
    message.classList.add('show');

    // Hide message after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
    }, 5000);
}); 