const toggleSwitchEl = document.querySelector('.theme-switch__checkbox');
const navEl = document.getElementById('nav');
const themeInfoEl = document.getElementById('theme-info');
const image1El = document.getElementById('image1');
const image2El = document.getElementById('image2');
const image3El = document.getElementById('image3');
const textBoxEl = document.getElementById('text-box');
const THEME_NAME = {
  DARK: 'dark',
  LIGHT: 'light',
}

function switchImgTheme(themeName) {
  image1El.src = `img/undraw_proud_coder_${themeName}.svg`;
  image2El.src = `img/undraw_feeling_proud_${themeName}.svg`;
  image3El.src = `img/undraw_conceptual_idea_${themeName}.svg`;
}

function switchThemeInfo(themeName) {
  const isDark = themeName == 'dark';
  const themeInfoTextEl = themeInfoEl.querySelector('.theme-info__text');
  const themeInfoFaIconEl = themeInfoEl.querySelector('.theme-info__fa-icon');

  localStorage.setItem('theme', themeName);
  if (isDark) {
    toggleSwitchEl.checked = true;
    themeInfoTextEl.textContent = 'Dark Mode';
    themeInfoFaIconEl.classList.replace('fa-sun', 'fa-moon');
  } else {
    toggleSwitchEl.checked = false;
    themeInfoTextEl.textContent = 'Light Mode';
    themeInfoFaIconEl.classList.replace('fa-moon', 'fa-sun');
  }
}

function applyTheme(themeName) {
  const isDark = themeName == 'dark';
  const rootEl = document.documentElement;

  rootEl.setAttribute('data-theme', themeName);
  if (isDark) {
    switchThemeInfo(themeName);
    switchImgTheme(themeName);
  } else {
    switchThemeInfo(themeName);
    switchImgTheme(themeName);
  }
}

function checkThemePreference() {
  const isFirstTimeVisit = localStorage.getItem('hasVisited') === 'true';
  if (!isFirstTimeVisit) {
    // Check System Theme Preference on First Ever Visit
    const isSystemPreferenceIsDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemPreferenceIsDark) {
      applyTheme(THEME_NAME.DARK);
    } else {
      applyTheme(THEME_NAME.LIGHT);
    }
    localStorage.setItem('hasVisited', 'true');
  } else {
    // Check Theme Preference in Local Storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      applyTheme(THEME_NAME.DARK);
    } else {
      applyTheme(THEME_NAME.LIGHT);
    }
  }
}

// Event Listener Callback Function
function switchTheme(e) {
  if (e.target.checked) {
    applyTheme(THEME_NAME.DARK);
  } else {
    applyTheme(THEME_NAME.LIGHT);
  }
}

// On Mount
toggleSwitchEl.addEventListener('change', switchTheme);
checkThemePreference();
