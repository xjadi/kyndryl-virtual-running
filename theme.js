(function () {
  var storageKey = 'runtrack-theme';
  var root = document.documentElement;

  function readTheme() {
    try {
      return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
    } catch (error) {
      return 'light';
    }
  }

  function writeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Ignore storage failures and keep the in-memory theme.
    }
  }

  function updateButtons(theme) {
    var buttons = document.querySelectorAll('.theme-toggle');
    var isDark = theme === 'dark';

    buttons.forEach(function (button) {
      var icon = button.querySelector('.theme-toggle-icon');
      var value = button.querySelector('.theme-toggle-value');
      var nextThemeLabel = isDark ? 'light' : 'dark';

      if (icon) {
        icon.textContent = isDark ? '☾' : '☀';
      }

      if (value) {
        value.textContent = isDark ? 'Dark' : 'Light';
      }

      button.setAttribute('aria-label', 'Switch to ' + nextThemeLabel + ' theme');
      button.setAttribute('title', 'Switch to ' + nextThemeLabel + ' theme');
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    writeTheme(theme);
    updateButtons(theme);
  }

  function toggleTheme() {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', toggleTheme);
    });

    applyTheme(readTheme());
  });
}());