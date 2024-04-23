
import VueI18n from 'vue-i18n';
const messages = {
    en_US: {
        welcome: 'Welcome to Pokédex!',
        search_placeholder: 'Search Pokémon...',
        close: 'Close',
        moves: 'Moves',
    },
    pt_BR: {
        welcome: 'Bem-vindo à Pokédex!',
        search_placeholder: 'Pesquisar Pokémon...',
        close: 'Fechar',
        moves: 'Movimentos',
    },
    es_ES: {
        welcome: '¡Bienvenido a la Pokédex!',
        search_placeholder: 'Buscar Pokémon...',
        close: 'Cerrar',
        moves: 'Movimientos',
    },
};

const i18n = new VueI18n({
    locale: 'en_US', // idioma padrão
    messages,
});

export default i18n;