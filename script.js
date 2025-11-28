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

// WhatsApp Floating Button with Chat Modal
(function() {
  var button = document.createElement('button');
  button.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" style="width:36px;height:36px;">';
  button.style.cssText = [
    'position: fixed;',
    'bottom: 20px;',
    'right: 20px;',
    'width: 64px;',
    'height: 64px;',
    'border-radius: 50%;',
    'background: #25D366;',
    'border: none;',
    'cursor: pointer;',
    'box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);',
    'z-index: 1000;',
    'transition: all 0.3s ease;',
    'display: flex;',
    'align-items: center;',
    'justify-content: center;',
    'padding: 0;'
  ].join(' ');
  button.onmouseover = function() { this.style.transform = 'scale(1.05)'; this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)'; };
  button.onmouseout = function() { this.style.transform = 'scale(1)'; this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'; };
  document.body.appendChild(button);

  var modal = document.createElement('div');
  modal.style.cssText = [
    'display: none;',
    'position: fixed;',
    'bottom: 100px;',
    'right: 20px;',
    'width: 380px;',
    'height: 600px;',
    'background: rgba(0,0,0,0.7);',
    'z-index: 1001;',
    'border-radius: 12px;',
    'overflow: hidden;'
  ].join(' ');

  var chatContainer = document.createElement('div');
  chatContainer.style.cssText = [
    'background: #efeae2;',
    'width: 100%;',
    'height: 100%;',
    'border-radius: 12px;',
    'display: flex;',
    'flex-direction: column;',
    'box-shadow: 0 8px 25px rgba(0,0,0,0.3);',
    'overflow: hidden;',
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;'
  ].join(' ');
  modal.appendChild(chatContainer);

  var header = document.createElement('div');
  header.style.cssText = [
    'background: linear-gradient(135deg, #075e54, #128c7e);',
    'color: white;',
    'padding: 12px 16px;',
    'display: flex;',
    'align-items: center;',
    'gap: 12px;',
    'box-shadow: 0 2px 4px rgba(0,0,0,0.1);'
  ].join(' ');

  var profilePic = document.createElement('img');
  profilePic.src = 'https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png';
  profilePic.style.cssText = 'width: 40px; height: 40px;';
  profilePic.onerror = function() { this.style.display = 'none'; };

  var headerInfo = document.createElement('div');
  headerInfo.innerHTML = '<div style="font-weight: 600; font-size: 16px;">Atendimento Dra. Pâmella</div><div style="font-size: 13px; opacity: 0.8;">Online</div>';

  header.appendChild(profilePic);
  header.appendChild(headerInfo);

  var closeIcon = document.createElement('span');
  closeIcon.innerHTML = '×';
  closeIcon.style.cssText = 'margin-left: auto; font-size: 24px; cursor: pointer; opacity: 0.7;';
  closeIcon.onclick = function() { modal.style.display = 'none'; };
  header.appendChild(closeIcon);

  chatContainer.appendChild(header);

  var messages = document.createElement('div');
  messages.style.cssText = [
    'flex: 1;',
    'padding: 12px;',
    'overflow-y: auto;',
    'display: flex;',
    'flex-direction: column;',
    'gap: 8px;'
  ].join(' ');

  var welcomeMsg = document.createElement('div');
  welcomeMsg.style.cssText = [
    'background: #ffffff;',
    'max-width: 80%;',
    'padding: 12px 16px;',
    'border-radius: 0 18px 18px 18px;',
    'align-self: flex-start;',
    'box-shadow: 0 1px 2px rgba(0,0,0,0.1);',
    'font-size: 14px; line-height: 1.4;'
  ].join(' ');
  welcomeMsg.innerHTML = '<strong>Dra. Pâmella Fernandes</strong><br>Olá! 👋 Que bom ter você aqui! Para agendar sua consulta ou tirar dúvidas sobre procedimentos, por favor, informe seu nome e telefone abaixo.';
  messages.appendChild(welcomeMsg);

  chatContainer.appendChild(messages);

  var inputContainer = document.createElement('div');
  inputContainer.style.cssText = [
    'background: #f0f0f0;',
    'padding: 12px;',
    'border-top: 1px solid #ddd;',
    'display: flex;',
    'flex-direction: column;',
    'gap: 8px;'
  ].join(' ');

  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Seu nome completo';
  nameInput.style.cssText = [
    'padding: 12px 16px;',
    'border: 1px solid #ccc;',
    'border-radius: 20px;',
    'font-size: 16px;',
    'outline: none;'
  ].join(' ');

  var phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.placeholder = '(xx) xxxxx-xxxx';
  phoneInput.maxLength = 15;
  phoneInput.style.cssText = [
    'padding: 12px 16px;',
    'border: 1px solid #ccc;',
    'border-radius: 20px;',
    'font-size: 16px;',
    'outline: none;'
  ].join(' ');

  phoneInput.onkeyup = function() {
    var v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length <= 11) {
      if (v.length <= 2) this.value = '(' + v;
      else if (v.length <= 6) this.value = '(' + v.substring(0,2) + ') ' + v.substring(2);
      else this.value = '(' + v.substring(0,2) + ') ' + v.substring(2,7) + '-' + v.substring(7);
    }
  };

  var messageInput = document.createElement('textarea');
  messageInput.placeholder = 'Mensagem (opcional)';
  messageInput.rows = 2;
  messageInput.style.cssText = [
    'padding: 12px 16px;',
    'border: 1px solid #ccc;',
    'border-radius: 20px;',
    'font-size: 16px;',
    'outline: none;',
    'resize: none;',
    'font-family: inherit;'
  ].join(' ');

  var sendBtn = document.createElement('button');
  sendBtn.textContent = 'Enviar';
  sendBtn.style.cssText = [
    'background: #25D366;',
    'color: white;',
    'border: none;',
    'padding: 12px 24px;',
    'border-radius: 20px;',
    'cursor: pointer;',
    'font-size: 16px;',
    'font-weight: 500;',
    'transition: background 0.2s;'
  ].join(' ');
  sendBtn.onmouseover = function() { this.style.background = '#128C7E'; };
  sendBtn.onmouseout = function() { this.style.background = '#25D366'; };

  inputContainer.appendChild(nameInput);
  inputContainer.appendChild(phoneInput);
  inputContainer.appendChild(messageInput);
  inputContainer.appendChild(sendBtn);

  chatContainer.appendChild(inputContainer);

  document.body.appendChild(modal);

  // Função para verificar e preencher dados fake
  function fillFakeData() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('fake_data')) {
      nameInput.value = 'João Silva';
      // Preencher telefone já formatado
      phoneInput.value = '(31) 99999-9999';
      messageInput.value = 'Gostaria de agendar uma consulta para avaliação de procedimento estético.';
    }
  }

  // Função global para abrir o modal
  window.openWhatsAppModal = function() {
    modal.style.display = 'block'; 
    messages.scrollTop = messages.scrollHeight;
    fillFakeData();
  };

  button.onclick = function() { 
    window.openWhatsAppModal();
  };

  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };

  sendBtn.onclick = function() {
    var name = nameInput.value.trim();
    var phone = phoneInput.value.replace(/\D/g, '');
    var message = messageInput.value.trim();
    if (!name || phone.length !== 11) return messages.appendChild(createBubble('Preencha nome e telefone (11 dígitos)!', 'self', true));

    var userMsgText = 'Nome: ' + name + '<br>Telefone: ' + phone;
    if (message) userMsgText += '<br>Mensagem: ' + message;
    var userMsg = createBubble(userMsgText, 'self');
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    var urlParamsStr = window.location.search.substring(1);
    var urlParams = {};
    if (urlParamsStr) {
      urlParamsStr.split('&').forEach(function(param) {
        var parts = param.split('=');
        if (parts[1]) urlParams[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      });
    }

    var analytics = {
      names: {
        source: urlParams['utm_source'] || '',
        medium: urlParams['utm_medium'] || '',
        campaign: urlParams['utm_campaign'] || '',
        adset: urlParams['adset'] || '',
        ad: urlParams['ad'] || '',
        term: urlParams['utm_term'] || ''
      },
      ids: {
        campaign_id: parseInt(urlParams['campaign_id'], 10) || 0,
        adset_id: parseInt(urlParams['adset_id'], 10) || 0,
        ad_id: parseInt(urlParams['ad_id'], 10) || 0,
        gclid: urlParams['gclid'] || '',
        gbraid: urlParams['gbraid'] || '',
        wbraid: urlParams['wbraid'] || ''
      }
    };

    var payload = {
      userId: "5531990005148",
      name: name,
      phone: parseInt(phone, 10),
      message: message || '',
      analytics: analytics
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hkdk.events/e2kjhgiy0xb7k4', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // Disparar evento de Lead no Meta Pixel
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            content_name: 'Formulário de Contato - Modal',
            content_category: 'Contato',
            value: 1,
            currency: 'BRL',
            phone: phone,
            external_id: phone
          });
        }

        // Disparar evento no Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': 'WhatsApp Modal Form',
            'value': 1
          });

          // Disparar conversão do Google Ads
          gtag('event', 'conversion', {
            'send_to': 'AW-17210029785/lead',
            'value': 1,
            'currency': 'BRL'
          });
        }

        var whatsappText = 'Olá, meu nome é ' + name + ' e meu telefone é ' + phone;
        if (message) whatsappText += '\n\n' + message;
        
        // Criar mensagem de sucesso com botão CTA
        var successContainer = document.createElement('div');
        successContainer.style.cssText = [
          'background: #ffffff;',
          'max-width: 80%;',
          'padding: 16px;',
          'border-radius: 0 18px 18px 18px;',
          'align-self: flex-start;',
          'box-shadow: 0 1px 2px rgba(0,0,0,0.1);',
          'font-size: 14px;',
          'line-height: 1.4;'
        ].join(' ');
        
        successContainer.innerHTML = '<strong>Dra. Pâmella Fernandes</strong><br>Perfeito! Suas informações foram recebidas. Clique no botão abaixo para continuar no WhatsApp:';
        
        var whatsappButton = document.createElement('button');
        whatsappButton.textContent = 'Abrir WhatsApp';
        whatsappButton.style.cssText = [
          'background: #25D366;',
          'color: white;',
          'border: none;',
          'padding: 12px 24px;',
          'border-radius: 20px;',
          'cursor: pointer;',
          'font-size: 16px;',
          'font-weight: 600;',
          'margin-top: 12px;',
          'width: 100%;',
          'transition: background 0.2s;',
          'display: flex;',
          'align-items: center;',
          'justify-content: center;',
          'gap: 8px;'
        ].join(' ');
        
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp" style="font-size: 18px;"></i> Abrir WhatsApp';
        
        whatsappButton.onmouseover = function() { this.style.background = '#128C7E'; };
        whatsappButton.onmouseout = function() { this.style.background = '#25D366'; };
        
        whatsappButton.onclick = function() {
          window.open('https://wa.me/5531990005148?text=' + encodeURIComponent(whatsappText), '_blank');
          modal.style.display = 'none';
        };
        
        successContainer.appendChild(whatsappButton);
        messages.appendChild(successContainer);
        messages.scrollTop = messages.scrollHeight;
      }
    };
    xhr.onerror = function() { messages.appendChild(createBubble('Erro ao enviar. Tente novamente.', 'self', true)); };
    xhr.send(JSON.stringify(payload));

    nameInput.value = phoneInput.value = messageInput.value = '';
  };

  function createBubble(text, type, error) {
    var bubble = document.createElement('div');
    var bg = type === 'self' ? (error ? '#ffcccc' : '#dcf8c6') : '#ffffff';
    var radius = type === 'self' ? '18px 18px 0 18px' : '0 18px 18px 18px';
    var align = type === 'self' ? 'flex-end' : 'flex-start';
    bubble.style.cssText = [
      'background: ' + bg + ';',
      'max-width: 80%;',
      'padding: 12px 16px;',
      'border-radius: ' + radius + ';',
      'align-self: ' + align + ';',
      'box-shadow: 0 1px 2px rgba(0,0,0,0.1);',
      'font-size: 14px; line-height: 1.4;'
    ].join(' ');
    bubble.innerHTML = (error ? '<strong style="color: #d00;">Erro: </strong>' : '') + text;
    return bubble;
  }
})();

// Tracking para botão "Agende sua Consulta"
document.querySelector('.cta-button')?.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Disparar evento de Lead no Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: 'Botão Agende sua Consulta',
      content_category: 'Contato',
      value: 1,
      currency: 'BRL'
    });
  }

  // Disparar evento no Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      'event_category': 'Contact',
      'event_label': 'CTA Button - Agende sua Consulta',
      'value': 1
    });

    // Disparar conversão do Google Ads
    gtag('event', 'conversion', {
      'send_to': 'AW-17210029785/lead',
      'value': 1,
      'currency': 'BRL'
    });
  }
  
  // Abrir o modal do WhatsApp
  if (typeof window.openWhatsAppModal === 'function') {
    window.openWhatsAppModal();
  }
});
