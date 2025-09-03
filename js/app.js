document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
});

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        console.log('Config loaded:', config);
        // We can now use the config object
        window.appConfig = config;
    } catch (error) {
        console.error('Could not load config.json:', error);
        alert('Ошибка: Не удалось загрузить файл конфигурации. Проверьте консоль для получения дополнительной информации.');
    }
}
