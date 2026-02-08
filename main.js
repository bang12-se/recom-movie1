const data = {
    movie: [
        "인터스텔라 🌌", "인셉션 🌀", "기생충 ", "어벤져스: 엔드게임 🦸‍♂️",
        "다크 나이트 🦇", "타이타닉 🚢", "라라랜드 🎶", "매트릭스 💊",
        "글래디에이터 ⚔️", "트루먼 쇼 🎭", "조커 🤡", "포레스트 검프 🏃"
    ],
    anime: [
        "너의 이름은 🌠", "슬램덩크 극장판 🏀", "귀멸의 칼날 🔥",
        "진격의 거인 ⚔️", "주술회전 🌀", "원피스 ☠️",
        "나루토 🍥", "에반게리온 🤖", "하이큐 🏐", "스즈메의 문단속 🚪"
    ],
    drama: [
        "오징어 게임 🦑", "더 글로리 💥", "이태원 클라쓰 🍻",
        "미스터 션샤인 🇰🇷", "응답하라 1988 📻",
        "비밀의 숲 🌲", "도깨비 👹", "킹덤 🧟", "시그널 📟"
    ],
    variety: [
        "런닝맨 🏃", "무한도전 🧠", "유 퀴즈 온 더 블럭 🎤",
        "1박 2일 🎒", "놀면 뭐하니 🎶", "신서유기 🧳",
        "아는 형님 📚"
    ]
};

const translations = {
    ko: {
        title: "🎬 오늘 뭐 볼까?",
        darkMode: "🌙 다크 모드",
        lightMode: "☀️ 라이트 모드",
        selectCategory: "카테고리를 선택하세요",
        movie: "🎥 영화",
        anime: "🎌 애니메이션",
        drama: "📺 드라마",
        variety: "🎤 예능",
        recommendBtn: "추천 받기",
        warning: "⚠️ 카테고리를 먼저 선택하세요!",
        recommendContent: "👉 추천 콘텐츠: ",
        inquiryTitle: "🤝 제휴 문의",
        name: "이름:",
        email: "이메일:",
        message: "메시지:",
        sendInquiry: "문의 보내기"
    },
    en: {
        title: "🎬 What to Watch Today?",
        darkMode: "🌙 Dark Mode",
        lightMode: "☀️ Light Mode",
        selectCategory: "Select a category",
        movie: "🎥 Movie",
        anime: "🎌 Anime",
        drama: "📺 Drama",
        variety: "🎤 Variety Show",
        recommendBtn: "Get Recommendation",
        warning: "⚠️ Please select a category first!",
        recommendContent: "👉 Recommended Content: ",
        inquiryTitle: "🤝 Partnership Inquiry",
        name: "Name:",
        email: "Email:",
        message: "Message:",
        sendInquiry: "Send Inquiry"
    }
};

let currentLang = 'ko'; // Default language

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang; // Set html lang attribute

    // Update main title
    document.querySelector('h1').innerText = translations[lang].title;

    // Update category options
    const categorySelect = document.getElementById('category');
    categorySelect.options[0].innerText = translations[lang].selectCategory;
    categorySelect.options[1].innerText = translations[lang].movie;
    categorySelect.options[2].innerText = translations[lang].anime;
    categorySelect.options[3].innerText = translations[lang].drama;
    categorySelect.options[4].innerText = translations[lang].variety;

    // Update recommend button
    document.querySelector('button[onclick="recommend()"]').innerText = translations[lang].recommendBtn;

    // Update partnership inquiry section
    document.querySelector('#partnership-inquiry h2').innerText = translations[lang].inquiryTitle;
    document.querySelector('label[for="name"]').innerText = translations[lang].name;
    document.querySelector('label[for="email"]').innerText = translations[lang].email;
    document.querySelector('label[for="message"]').innerText = translations[lang].message;
    document.querySelector('.contact-form button[type="submit"]').innerText = translations[lang].sendInquiry;

    // Update theme toggle button text
    // This will be handled by the modified setTheme function later
    setTheme(localStorage.getItem("theme") || (document.body.classList.contains("dark-mode") ? "dark" : "light"));


    localStorage.setItem('lang', lang);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage('ko'); // Default to Korean if no preference is saved
    }
    // After setting the initial language, update the toggle button text
    // This function will be defined in the next step
    if (typeof updateLangToggleButtonText === 'function') {
        updateLangToggleButtonText(currentLang);
    }
}


function recommend() {
    const category = document.getElementById("category").value;
    const result = document.getElementById("result");

    if (!category) {
        result.innerText = translations[currentLang].warning;
        return;
    }

    const list = data[category];
    const randomIndex = Math.floor(Math.random() * list.length);
    result.innerText = translations[currentLang].recommendContent + list[randomIndex];
}

// Theme switching logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Function to set the theme
function setTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.innerText = translations[currentLang].lightMode;
    } else {
        body.classList.remove("dark-mode");
        themeToggle.innerText = translations[currentLang].darkMode;
    }
    localStorage.setItem("theme", theme);
}

// Load theme preference from localStorage or detect system preference
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // System prefers dark mode
        setTheme("dark");
    } else {
        // Default to light mode
        setTheme("light");
    }
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
});

// Language switching logic
const langToggleButton = document.getElementById('lang-toggle');

function updateLangToggleButtonText(lang) {
    if (lang === 'ko') {
        langToggleButton.innerText = 'English';
    } else {
        langToggleButton.innerText = '한국어';
    }
}

langToggleButton.addEventListener('click', () => {
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
    updateLangToggleButtonText(newLang);
});


// Apply theme and language on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    loadLanguage();
});