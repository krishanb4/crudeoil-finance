module.exports = [
  {
    key: "home",
    name: "Home",
    icon: "ios-home-outline",
    child: [
      {
        key: "landing_page",
        name: "Landing Page",
        title: true,
      },
      {
        key: "corporate",
        name: "Corporate",
        link: "/",
        badge: "Hot",
        icon: "ios-globe-outline",
      },
      {
        key: "creative",
        name: "Creative",
        link: "/landing-creative",
        icon: "ios-desktop-outline",
      },
    ],
  },

  {
    key: "Orders",
    name: "Orders",
    icon: "md-cart",
    child: [
      {
        key: "OrderTypes",
        name: "Order Types",
        title: true,
      },
      {
        key: "CartOrder",
        name: "Order through Cart",
        link: "/app/order/cart",
        icon: "ios-cart-outline",
      },
      {
        key: "Direct",
        name: "Order through Receipt",
        link: "/app/order/receipt",
        icon: "md-chatbubbles",
      },
    ],
  },
  {
    key: "shop",
    name: "Shops",
    icon: "md-appstore",
    child: [
      {
        key: "manage-shops",
        name: "Manage",
        title: true,
      },
      {
        key: "ListShops",
        name: "List Shops",
        link: "/app/shops",
        icon: "ios-contact-outline",
      },
      {
        key: "email",
        name: "Email",
        link: "/app/pages/email",
        badge: "2",
        icon: "ios-mail-outline",
      },
      {
        key: "social_apps",
        name: "Social",
        title: true,
      },
      {
        key: "timeline",
        name: "Timeline",
        link: "/app/pages/timeline",
        icon: "ios-people-outline",
      },
      {
        key: "chat",
        name: "Chat",
        link: "/app/pages/chat",
        badge: "4",
        icon: "ios-chatbubbles-outline",
      },
      {
        key: "ecommerce_app",
        name: "Ecommerce",
        title: true,
      },
      {
        key: "Itemlist",
        name: "Product Catalogues",
        link: "/app/pages/ecommerce",
        icon: "ios-apps-outline",
      }
    ],
  },
  {
    key: "Products",
    name: "Products",
    icon: "md-aperture",
    child: [
      {
        key: "ProductCategory",
        name: "Product List",
        title: true,
      },
      {
        key: "AllProductTypes",
        name: "All Product Types",
        link: "/app/product/types",
        icon: "ios-person-outline",
      },
    ],
  },
  {
    key: "Delivery",
    name: "Delivery Location",
    icon: "md-locate",
    child: [
      {
        key: "LocationsToDelivery",
        name: "Locations to deliver",
        title: true,
      },
      {
        key: "AllProductTypes",
        name: "All Product Types",
        link: "/app/delivery",
        icon: "ios-car",
      },
    ],
  },
  {
    key: "Product",
    name: "Product",
    icon: "ios-cog",
    child: [
      
      {
        key: "Products",
        name: "Products",
        link: "/app/products",
        icon: "ios-cog",
      },
    ],
  },
  {
    key: "Category",
    name: "Category",
    icon: "ios-cube",
    child: [
      {
        key: "GoodsCategory",
        name: "Goods Category",
        title: true,
      },
      {
        key: "ListCategory",
        name: "Category",
        link: "/app/category",
        icon: "ios-cube",
      },
    ],
  },
];
