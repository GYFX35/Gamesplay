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
      "sports": "Sports",
      "shop_tagline": "Exclusive Gamesplay gear and gaming hardware.",
      "order_success": "Order placed successfully!",
      "order_failed": "Failed to place order.",
      "buy_now": "Buy Now",
      "in_stock": "{{count}} in stock",
      "free_shipping": "Free shipping worldwide",
      "launch_store": "Launch Your Own Store",
      "creator_dropshipping": "Are you a content creator? Use our dropshipping integration to sell your own branded merchandise directly to your audience with zero upfront costs. We handle printing, shipping, and customer service.",
      "start_selling": "Start Selling"
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
      "sports": "Deportes",
      "shop_tagline": "Equipo exclusivo de Gamesplay y hardware para juegos.",
      "order_success": "¡Pedido realizado con éxito!",
      "order_failed": "Error al realizar el pedido.",
      "buy_now": "Comprar ahora",
      "in_stock": "{{count}} en stock",
      "free_shipping": "Envío gratis a todo el mundo",
      "launch_store": "Lanza tu propia tienda",
      "creator_dropshipping": "¿Eres un creador de contenido? Utiliza nuestra integración de dropshipping para vender tu propia mercancía de marca directamente a tu audiencia sin costos iniciales. Nos encargamos de la impresión, el envío y el servicio al cliente.",
      "start_selling": "Empieza a vender"
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
      "sports": "スポーツ",
      "shop_tagline": "Gamesplay限定ギアとゲーミングハードウェア。",
      "order_success": "注文が正常に完了しました！",
      "order_failed": "注文に失敗しました。",
      "buy_now": "今すぐ購入",
      "in_stock": "在庫あり: {{count}}",
      "free_shipping": "世界中どこでも送料無料",
      "launch_store": "自分のストアを開設する",
      "creator_dropshipping": "あなたはコンテンツクリエイターですか？当社のドロップシッピング統合を利用して、初期費用なしで独自のブランド商品を視聴者に直接販売できます。印刷、配送、カスタマーサービスはすべて当社が担当します。",
      "start_selling": "販売を開始する"
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
