document.addEventListener('DOMContentLoaded', function() {
    // Get references to the language buttons
    const langEnBtn = document.getElementById('lang-en-btn');
    const langZhBtn = document.getElementById('lang-zh-btn');

    /**
     * Sets the language of the page by showing/hiding content blocks
     * and updating the active language button.
     * @param {string} lang - The language to set ('en' for English, 'zh' for Chinese).
     */
    function setLanguage(lang) {
        // Hide all elements with 'lang-en' or 'lang-zh' classes
        // This ensures a clean slate before showing the desired language
        document.querySelectorAll('.lang-en, .lang-zh').forEach(el => {
            el.style.display = 'none';
        });

        // Show only the elements corresponding to the selected language
        // Use an empty string for display to revert to default (block, inline, etc. as per element type)
        document.querySelectorAll(`.lang-${lang}`).forEach(el => {
            el.style.display = '';
        });

        // Update the active state of the language buttons
        // Remove 'active' class from both buttons first
        langEnBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-gray-600', 'hover:bg-gray-700');
        langZhBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-gray-600', 'hover:bg-gray-700');

        // Add 'active' styling to the currently selected button
        if (lang === 'en') {
            langEnBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            langZhBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
            document.documentElement.lang = 'en'; // Update the HTML lang attribute for accessibility/SEO
        } else {
            langZhBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            langEnBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
            document.documentElement.lang = 'zh'; // Update the HTML lang attribute
        }

        // Store the user's preferred language in localStorage
        // This makes the preference persistent across sessions
        localStorage.setItem('preferredLang', lang);
    }

    // Add event listeners to the language buttons
    // When a button is clicked, call setLanguage with the corresponding language code
    langEnBtn.addEventListener('click', function() {
        setLanguage('en');
    });

    langZhBtn.addEventListener('click', function() {
        setLanguage('zh');
    });

    // On page load, check if a language preference is stored in localStorage
    // If found, apply it; otherwise, default to English
    const storedLang = localStorage.getItem('preferredLang');
    if (storedLang) {
        setLanguage(storedLang);
    } else {
        setLanguage('en'); // Default language if no preference is stored
    }

    // Set the current year in the footer dynamically
    // This avoids needing to manually update the year every new year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
