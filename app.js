const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const historyList = document.getElementById('history-list');

// Auto-grow textarea
chatInput.addEventListener('input', function() {
    this.style.height = '24px';
    this.style.height = (this.scrollHeight) + 'px';
});

function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function startNewChat() {
    // Keep history intact, but clear active screen
    chatMessages.innerHTML = `
        <div class="msg bot-msg">
            <div class="avatar"><i class='bx bx-brain'></i></div>
            <div class="content">
                New conversation started. How can I solve your problem today?
            </div>
        </div>
    `;
    chatInput.value = '';
    chatInput.style.height = '24px';
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Render User Message
    appendUserMessage(text);
    
    // Add to History Sidebar
    addToHistory(text);

    // Reset input
    chatInput.value = '';
    chatInput.style.height = '24px';

    // 2. Render Loading State
    const typingId = appendTypingIndicator();

    // 3. Make API Call to NLP Backend
    try {
        const response = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }) // We send the problem description to ML
        });

        if (!response.ok) throw new Error('API failure');
        
        const data = await response.json();
        
        removeTypingIndicator(typingId);
        
        // 4. Render AI response with deep explanation of the solution
        appendBotResponse(data.message, data.recommendations);

    } catch (err) {
        removeTypingIndicator(typingId);
        appendBotResponse("I apologize, but my backend ML connection failed. Please ensure the Python server is running.", []);
    }
}

function appendUserMessage(text) {
    const msgHTML = `
        <div class="msg user-msg">
            <div class="avatar"><i class='bx bx-user'></i></div>
            <div class="content">
                ${text.replace(/\n/g, '<br>')}
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
}

function appendTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgHTML = `
        <div class="msg bot-msg" id="${id}">
            <div class="avatar"><i class='bx bx-brain'></i></div>
            <div class="content">
                Analyzing your issue...
                <div style="margin-top: 10px;">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function appendBotResponse(messageText, recommendations) {
    let productsHTML = '';
    
    // If the ML engine successfully found matching products
    if (recommendations && recommendations.length > 0) {
        productsHTML = recommendations.map(rec => {
            return `
                <div class="product-rec-card">
                    <img src="${rec.image || 'https://via.placeholder.com/120'}" alt="${rec.title}">
                    <div class="product-rec-info">
                        <h3>${rec.title}</h3>
                        <span class="brand">${rec.brand}</span>
                        <!-- This is the crucial part requested by the user: How it solves the problem -->
                        <div class="solution-text">
                            <strong>How this helps you:</strong><br>
                            ${rec.how_it_helps}
                        </div>
                        <p class="description">${rec.desc}</p>
                        <div class="product-rec-meta">
                            <span class="price">${rec.price}</span>
                            <a href="${rec.link || '#'}" target="_blank" style="margin-left:auto; background:var(--bg-input); padding:0.5rem 1rem; border-radius:4px; color:white; border:1px solid var(--border-color); cursor:pointer; text-decoration: none;">
                                View Deal <i class='bx bx-link-external'></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    const msgHTML = `
        <div class="msg bot-msg">
            <div class="avatar"><i class='bx bx-brain'></i></div>
            <div class="content">
                <p>${messageText.replace(/\n/g, '<br>')}</p>
                ${productsHTML}
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
}

function addToHistory(text) {
    // Truncate for sidebar
    const title = text.length > 30 ? text.substring(0, 30) + '...' : text;
    const historyHTML = `
        <div class="history-item">
            <i class='bx bx-message-square'></i> ${title}
        </div>
    `;
    historyList.insertAdjacentHTML('afterbegin', historyHTML);
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
