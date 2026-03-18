import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to <1>Gamesplay</1>",
      "tagline": "The future of interactive 3D game streaming. Accessible globally, powered by AI, and integrated with the world's leading game platforms.",
      "browse": "Browse",
      "login": "Log In",
      "start_streaming": "Start Streaming",
      "browse_live": "Browse Live Streams",
      "recommended": "Recommended Channels",
      "home": "Home",
      "create": "Create",
      "entertainment": "Entertainment",
      "extension": "Extension",
      "dns_setup": "DNS Setup",
      "platform_url": "Platform URL",
      "shop": "Shop"
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a <1>Gamesplay</1>",
      "tagline": "El futuro del streaming de juegos 3D interactivos. Accesible a nivel mundial, impulsado por IA e integrado con las principales plataformas de juegos del mundo.",
      "browse": "Explorar",
      "login": "Iniciar Sesión",
      "start_streaming": "Empezar a transmitir",
      "browse_live": "Explorar transmisiones en vivo",
      "recommended": "Canales recomendados",
      "home": "Inicio",
      "create": "Crear",
      "entertainment": "Entretenimiento",
      "extension": "Extensión",
      "dns_setup": "Configuración DNS",
      "platform_url": "URL de la plataforma",
      "shop": "Tienda"
    }
  },
  jp: {
    translation: {
      "welcome": " <1>Gamesplay</1>へようこそ",
      "tagline": "インタラクティブな3Dゲームストリーミングの未来。世界中で利用可能で、AIを搭載し、世界をリードするゲームプラットフォームと統合されています。",
      "browse": "閲覧",
      "login": "ログイン",
      "start_streaming": "ストリーミングを開始",
      "browse_live": "ライブストリームを閲覧",
      "recommended": "おすすめのチャンネル",
      "home": "ホーム",
      "create": "作成",
      "entertainment": "エンターテインメント",
      "extension": "拡張機能",
      "dns_setup": "DNS設定",
      "platform_url": "プラットフォームURL",
      "shop": "ショップ"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
