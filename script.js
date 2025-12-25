// ==================================================
// TO ADD MORE REASONS: Just add them to this array!
// Copy the format: "Reason text here",
// ==================================================
const reasons = [
    "I love how easy it is to talk to you about anything", // 1
    "I love the way you look at me", // 2
    "I love your unruly hair just the way it is", // 3
    "I love how thoughtful you are with your gifts for me, like my custom necklace with your name carved on it", // 4
    "I love how you always laugh at my jokes even when I think they are not funny. I think it's sweet", // 5
    "I love the way you care about your hair, as well as your different hairstyles with it", // 6
    "I love the way you respect your parents and give them gifts/treats", // 7
    "I love how you face challenges head-on and think of innovative solutions that I wouldn't even think of", // 8
    "I love how much you value your bonds with your friends and how proactive you are in keeping your friendships with them", // 9
    "I love the creativity and effort that you give in all that you do", // 10
    "I love how caring you are of cats, so much so that you keep them even when it becomes inconvenient", // 11
    "I love how much you take care of crinkles", // 12
    "I love that you always involve yourself in organizations and other things that improve you", // 13
    "I love how you strive to become financially wise and know how to take care of your money", // 14
    "I love the fact that your hands are so capable in so many different things---art, crafts, embroidery,  letter-making, bouquet-making, and many more", // 15
    "I love how you always bring out the best in me", // 16
    "🫢", // 17
    "I love the comfort that you give to me naturally", // 18
    "I love your random GIFs when we chat. Some of them were really funny hehe", // 19
    "I love how calm and loving we become with each other after overcoming a challenge we've had in our relationship", // 20
    "I love all the memories we've made on all the different places we've been to together with just the two of us", // 21
    "I love your memory gold", // 22
    "I love you hehe mwa", // 23
    "I love when you become childish and playful when we're together", // 24
    "I love how we've made future plans already on what to do with our future together" // 25
    // Add more reasons here - just keep adding lines like above!
    // Remember to put a comma after each reason except the last one
];

// Start date - change this to when you want the countdown to begin
const START_DATE = new Date('2025-12-25T17:13:00');

function getDayNumber() {
    const now = new Date();
    const diffTime = Math.abs(now - START_DATE);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, 365);
}

function getTodayDate() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

function hasUnlockedToday() {
    const lastUnlock = localStorage.getItem('lastUnlock');
    return lastUnlock === getTodayDate();
}

function createHearts(x, y) {
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = '♥';
        heart.style.left = x + (Math.random() - 0.5) * 50 + 'px';
        heart.style.top = y + (Math.random() - 0.5) * 50 + 'px';
        heart.style.color = `hsl(${330 + Math.random() * 30}, 100%, ${60 + Math.random() * 20}%)`;
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
}

function unlockReason() {
    const dayNum = getDayNumber();
    const reasonIndex = dayNum - 1;
    
    if (reasonIndex >= reasons.length) {
        document.getElementById('reasonText').textContent = 
            `You've unlocked all ${reasons.length} reasons! ♥`;
        document.getElementById('unlockBtn').disabled = true;
        return;
    }

    const reason = reasons[reasonIndex];
    document.getElementById('reasonText').textContent = reason;
    document.getElementById('unlockBtn').disabled = true;
    document.getElementById('unlockBtn').textContent = 'Unlocked for Today ♥';
    
    localStorage.setItem('lastUnlock', getTodayDate());
    localStorage.setItem('lastReason', reason);
}

function init() {
    const dayNum = getDayNumber();
    document.getElementById('dayNumber').textContent = dayNum;

    if (hasUnlockedToday()) {
        const lastReason = localStorage.getItem('lastReason');
        document.getElementById('reasonText').textContent = lastReason;
        document.getElementById('unlockBtn').disabled = true;
        document.getElementById('unlockBtn').textContent = 'Unlocked for Today ♥';
    } else {
        document.getElementById('reasonText').textContent = 
            'Today\'s reason is waiting for you... ♥';
    }

    document.getElementById('unlockBtn').addEventListener('click', function(e) {
        const rect = e.target.getBoundingClientRect();
        createHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
        unlockReason();
    });
}

init();