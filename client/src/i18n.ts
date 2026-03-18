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
      "shop": "Shop",
      "shop_hero_title": "LEVEL UP YOUR",
      "shop_hero_highlight": "GEAR",
      "shop_hero_desc": "Discover exclusive MMA fighter skins, legendary equipment, and breathtaking visual effects for your AR experience.",
      "shop_browse_drops": "Browse New Drops",
      "shop_view_inventory": "View My Inventory",
      "shop_sort_by": "Sort By",
      "shop_load_more": "Load More Items",
      "shop_search_placeholder": "Search items..."
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
      "shop": "Tienda",
      "shop_hero_title": "MEJORA TU",
      "shop_hero_highlight": "EQUIPO",
      "shop_hero_desc": "Descubre skins exclusivas de luchadores de MMA, equipo legendario y efectos visuales impresionantes para tu experiencia de RA.",
      "shop_browse_drops": "Ver novedades",
      "shop_view_inventory": "Ver mi inventario",
      "shop_sort_by": "Ordenar por",
      "shop_load_more": "Cargar más artículos",
      "shop_search_placeholder": "Buscar artículos..."
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
      "shop": "ショップ",
      "shop_hero_title": "ギアを",
      "shop_hero_highlight": "レベルアップ",
      "shop_hero_desc": "独自のMMAファイタースキン、伝説の装備、そしてAR体験のための息をのむような視覚効果を発見してください。",
      "shop_browse_drops": "新作をブラウズ",
      "shop_view_inventory": "インベントリを表示",
      "shop_sort_by": "並び替え",
      "shop_load_more": "さらに読み込む",
      "shop_search_placeholder": "アイテムを検索..."
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
