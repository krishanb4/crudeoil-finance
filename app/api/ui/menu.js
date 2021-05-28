module.exports = [  
  {
    key: 'optimizer',
    name: 'Optimizer',
    link: '/app',
    icon: 'ios-globe-outline',
    externalLink: false
  },
  {
    key: 'stats',
    name: 'Overall Stats',
    link: '/app/stat',
    icon: 'md-stats',
    externalLink: false
  },
  {
    key: 'governance',
    name: 'Governance',
    link: '/app/coming-soon',
    badge: 'Coming Soon',
    icon: 'md-medal',
    externalLink: false
  },
  {
    key: 'doc',
    name: 'Documents',
    link: 'https://farm.crudeoil.finance/',
    icon: 'ios-document',
    externalLink: true
  },

  {
    key: 'buy',
    name: 'Buy OIL and DIESEL',
    icon: 'logo-usd',
    child: [      
      {
        key: 'buy-oil',
        name: 'Buy OIL',
        link: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xb1b17dff66d75b29d34f0bf8622c406d8219b507',
        icon: 'md-clipboard',
        externalLink: true
      },
      {
        key: 'buy-diesel',
        name: 'Buy DIESEL',
        link: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xe1ea2e1907d93f154234ce3b5a7418faf175fe11',
        icon: 'md-clipboard',
        externalLink: true
      },
    ],
  },
  {
    key: 'audit',
    name: 'Audit',
    icon: 'logo-snapchat',
    child: [      
      {
        key: 'audit-farm',
        name: 'Yield Farm',
        link: 'https://farm.crudeoil.finance/',
        icon: 'md-ribbon',
        externalLink: true
      },
      {
        key: 'audit-optimizer',
        name: 'Optimizer',
        link: 'https://farm.crudeoil.finance/',
        icon: 'md-ribbon',
        externalLink: true
      },
    ],
  }
];
