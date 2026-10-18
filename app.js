/* ============================================================
   ZERO EXCEPTION - APPLICATION LOGIC & INTERACTION ENGINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    let currentCurrency = localStorage.getItem('bpo_currency') || 'BDT';
    let currentTheme = localStorage.getItem('bpo_theme') || 'light';
    let activeCategory = 'all';
    let searchQuery = '';
    let selectedProduct = null;
    let selectedPaymentMethod = 'bkash';
    let activePkgPrice = 0;

    let currencyRates = {
        BDT: { symbol: '৳', rate: 1, name: 'BDT' },
        INR: { symbol: '₹', rate: 0.70, name: 'INR' },
        NPR: { symbol: 'Rs', rate: 1.12, name: 'NPR' },
        PKR: { symbol: 'Rs', rate: 2.32, name: 'PKR' }
    };

    let productsData = [
    {
        "id": "drip-non-root",
        "title": "DRIP CLIENT NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 53,
        "oldPrice": 112,
        "discount": "52% OFF",
        "status": "new",
        "statusText": "Update Released",
        "image": "images/drip_client_non_root.png",
        "description": "DRIP CLIENT NON ROOT APK mod injector with direct ESP.",
        "packages": [
            {
                "name": "1 Day",
                "price": 53
            },
            {
                "name": "3 Days",
                "price": 140
            },
            {
                "name": "7 Days",
                "price": 224
            },
            {
                "name": "15 Days",
                "price": 413
            },
            {
                "name": "30 Days",
                "price": 700
            }
        ]
    },
    {
        "id": "alpha-non-root",
        "title": "ALPHA NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 70,
        "oldPrice": 140,
        "discount": "50% OFF",
        "status": "new",
        "statusText": "New Version",
        "image": "images/jitu.jpg",
        "description": "ALPHA NON ROOT headshot scope and ESP locator.",
        "packages": [
            {
                "name": "1 Day",
                "price": 70
            },
            {
                "name": "3 Days",
                "price": 112
            },
            {
                "name": "7 Days",
                "price": 210
            },
            {
                "name": "14 Days",
                "price": 350
            },
            {
                "name": "30 Days",
                "price": 560
            }
        ]
    },
    {
        "id": "aim-hack-ios",
        "title": "AIM HACK NON ROOT + IOS",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 231,
        "oldPrice": 350,
        "discount": "34% OFF",
        "status": "online",
        "statusText": "Online",
        "image": "images/aim_hack_non_root_ios.png",
        "description": "AIM HACK NON ROOT + IOS universal cross-platform key.",
        "packages": [
            {
                "name": "1 Day",
                "price": 231
            },
            {
                "name": "3 Days",
                "price": 420
            },
            {
                "name": "7 Days",
                "price": 910
            },
            {
                "name": "30 Days",
                "price": 1680
            }
        ]
    },
    {
        "id": "xreg-non-root",
        "title": "XREG NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 210,
        "oldPrice": 350,
        "discount": "40% OFF",
        "status": "online",
        "statusText": "Online",
        "image": "images/xreg_non_root.png",
        "description": "XREG NON ROOT aim assistant and recoil reducer.",
        "packages": [
            {
                "name": "1 Day",
                "price": 210
            },
            {
                "name": "3 Days",
                "price": 490
            },
            {
                "name": "7 Days",
                "price": 980
            }
        ]
    },
    {
        "id": "drip-wire-external",
        "title": "DRIP WIRE EXTERNAL",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 210,
        "oldPrice": 350,
        "discount": "40% OFF",
        "status": "online",
        "statusText": "External Wire",
        "image": "images/drip_wire_external.png",
        "description": "DRIP WIRE EXTERNAL aim assistant and ESP overlay.",
        "packages": [
            {
                "name": "1 Day",
                "price": 210
            },
            {
                "name": "7 Days",
                "price": 700
            }
        ]
    },
    {
        "id": "pato-brutal",
        "title": "PATOTEAM BRUTAL NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 291,
        "oldPrice": 364,
        "discount": "20% OFF",
        "status": "new",
        "statusText": "Brutal Mode",
        "image": "images/non_root_pato.png",
        "description": "PATOTEAM BRUTAL NON ROOT VIP panel featuring instant aim assist.",
        "packages": [
            {
                "name": "1 Day",
                "price": 291
            },
            {
                "name": "7 Days",
                "price": 910
            },
            {
                "name": "30 Days",
                "price": 1680
            }
        ]
    },
    {
        "id": "bala-mod",
        "title": "BALA MOD NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 420,
        "oldPrice": 600,
        "discount": "30% OFF",
        "status": "online",
        "statusText": "Online",
        "image": "images/bala_mod_non_root.png",
        "description": "BALA MOD NON ROOT lightweight key for Android.",
        "packages": [
            {
                "name": "1 Day",
                "price": 420
            },
            {
                "name": "2 Days",
                "price": 770
            },
            {
                "name": "3 Days",
                "price": 1050
            },
            {
                "name": "7 Days",
                "price": 3080
            }
        ]
    },
    {
        "id": "abcd-mod",
        "title": "ABCD MOD NON ROOT",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 70,
        "oldPrice": 140,
        "discount": "50% OFF",
        "status": "new",
        "statusText": "Update Released",
        "image": "images/abcd_mod_non_root.png",
        "description": "ABCD MOD NON ROOT VIP edition panel.",
        "packages": [
            {
                "name": "1 Day",
                "price": 70
            },
            {
                "name": "3 Days",
                "price": 140
            },
            {
                "name": "7 Days",
                "price": 224
            }
        ]
    },
    {
        "id": "crack-master",
        "title": "CRACK MASTER ROOT",
        "category": "root",
        "categoryName": "FREE FIRE ROOT",
        "basePrice": 70,
        "oldPrice": 112,
        "discount": "37% OFF",
        "status": "online",
        "statusText": "Online",
        "image": "images/crack_master.png",
        "description": "CRACK MASTER APK Mod Injector for Free Fire.",
        "packages": [
            {
                "name": "1 Day",
                "price": 70
            },
            {
                "name": "3 Days",
                "price": 140
            },
            {
                "name": "7 Days",
                "price": 280
            },
            {
                "name": "15 Days",
                "price": 420
            },
            {
                "name": "30 Days",
                "price": 560
            }
        ]
    },
    {
        "id": "drip-proxy",
        "title": "DRIP CLIENT FF PROXY",
        "category": "non-root",
        "categoryName": "Free Fire NON ROOT",
        "basePrice": 98,
        "oldPrice": 168,
        "discount": "41% OFF",
        "status": "new",
        "statusText": "New Release",
        "image": "images/drip_client_ff_proxy.png",
        "description": "DRIP CLIENT FF PROXY version bypass key.",
        "packages": [
            {
                "name": "1 Day",
                "price": 98
            },
            {
                "name": "3 Days",
                "price": 224
            },
            {
                "name": "7 Days",
                "price": 406
            },
            {
                "name": "30 Days",
                "price": 812
            }
        ]
    },
    {
        "id": "dolphin-root",
        "title": "DHOLPHIN ROOT ONLY",
        "category": "root",
        "categoryName": "FREE FIRE ROOT",
        "basePrice": 98,
        "oldPrice": 140,
        "discount": "30% OFF",
        "status": "online",
        "statusText": "Kernel Safe",
        "image": "images/dolphin_root_only.png",
        "description": "DHOLPHIN ROOT ONLY Magisk / KernelSU module root injector.",
        "packages": [
            {
                "name": "1 Day",
                "price": 98
            },
            {
                "name": "7 Days",
                "price": 532
            },
            {
                "name": "30 Days",
                "price": 1372
            }
        ]
    },
    {
        "id": "angry-mod-root",
        "title": "ANGRY MOD ROOT ONLY",
        "category": "root",
        "categoryName": "FREE FIRE ROOT",
        "basePrice": 98,
        "oldPrice": 140,
        "discount": "30% OFF",
        "status": "warning",
        "statusText": "Kernel Only",
        "image": "images/angry_mod_root_only.png",
        "description": "ANGRY MOD ROOT ONLY kernel safe mod menu injector.",
        "packages": [
            {
                "name": "1 Day",
                "price": 98
            },
            {
                "name": "7 Days",
                "price": 420
            },
            {
                "name": "30 Days",
                "price": 1050
            }
        ]
    },
    {
        "id": "migul-pro",
        "title": "MIGUL PRO AIM KILL",
        "category": "ios",
        "categoryName": "FREE FIRE IOS",
        "basePrice": 504,
        "oldPrice": 700,
        "discount": "28% OFF",
        "status": "online",
        "statusText": "VIP Pro",
        "image": "images/migul_pro_aim_kill.png",
        "description": "MIGUL PRO AIM KILL iOS / Android panel key.",
        "packages": [
            {
                "name": "1 Day",
                "price": 504
            },
            {
                "name": "7 Days",
                "price": 1330
            },
            {
                "name": "31 Days",
                "price": 2800
            }
        ]
    },
    {
        "id": "gbox-esign",
        "title": "GBOX & ESIGN",
        "category": "ios",
        "categoryName": "FREE FIRE IOS",
        "basePrice": 980,
        "oldPrice": 1260,
        "discount": "22% OFF",
        "status": "new",
        "statusText": "iOS Cert",
        "image": "images/gbox_esign.png",
        "description": "GBOX & ESIGN iOS installation signature key.",
        "packages": [
            {
                "name": "30 Days Warranty",
                "price": 980
            },
            {
                "name": "60 Days Warranty",
                "price": 1190
            },
            {
                "name": "90 Days Warranty",
                "price": 1400
            }
        ]
    },
    {
        "id": "drip-root-only",
        "title": "DRIP CLIENT ROOT ONLY",
        "category": "root",
        "categoryName": "FREE FIRE ROOT",
        "basePrice": 168,
        "oldPrice": 252,
        "discount": "33% OFF",
        "status": "online",
        "statusText": "Root Only",
        "image": "images/drip_client_root_only.png",
        "description": "DRIP CLIENT ROOT ONLY full featured menu.",
        "packages": [
            {
                "name": "1 Day",
                "price": 168
            },
            {
                "name": "7 Days",
                "price": 700
            },
            {
                "name": "30 Days",
                "price": 1680
            }
        ]
    },
    {
        "id": "br-mods-pc",
        "title": "BR MODS PC",
        "category": "pc",
        "categoryName": "FREE FIRE PC",
        "basePrice": 210,
        "oldPrice": 308,
        "discount": "31% OFF",
        "status": "online",
        "statusText": "Windows 10/11",
        "image": "images/br_mods_pc.png",
        "description": "BR MODS PC Mod Menu for Free Fire BlueStacks emulator.",
        "packages": [
            {
                "name": "1 Day",
                "price": 210
            },
            {
                "name": "10 Days",
                "price": 700
            },
            {
                "name": "30 Days",
                "price": 980
            }
        ]
    },
    {
        "id": "zolo-pubg",
        "title": "ZOLO PUBG MOBILE CHEAT",
        "category": "pubg",
        "categoryName": "PUBG MOBILE",
        "basePrice": 126,
        "oldPrice": 210,
        "discount": "40% OFF",
        "status": "online",
        "statusText": "Safe Mod",
        "image": "images/zolo_pubg.png",
        "description": "ZOLO PUBG Mobile Z Edition with Skeleton ESP.",
        "packages": [
            {
                "name": "1 Day",
                "price": 126
            },
            {
                "name": "7 Days",
                "price": 490
            },
            {
                "name": "30 Days",
                "price": 980
            }
        ]
    },
    {
        "id": "carrom-auto",
        "title": "CARROM Z TOOL AUTO PLAY",
        "category": "demo",
        "categoryName": "DEMO / TOOLS",
        "basePrice": 112,
        "oldPrice": 168,
        "discount": "33% OFF",
        "status": "online",
        "statusText": "100% Aim Line",
        "image": "images/carrom.png",
        "description": "CARROM Z Tool Auto Play guideline predictor.",
        "packages": [
            {
                "name": "1 Day",
                "price": 112
            },
            {
                "name": "3 Days",
                "price": 280
            },
            {
                "name": "7 Days",
                "price": 490
            },
            {
                "name": "15 Days",
                "price": 700
            },
            {
                "name": "30 Days",
                "price": 980
            }
        ]
    }
];

    function fixImagePath(path) {
        if (!path || typeof path !== 'string') return 'images/logo.jpg';
        let url = path.trim();
        if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) return url;
        url = url.replace(/\\/g, '/');
        try { url = decodeURIComponent(url); } catch(e) {}
        if (url.startsWith('file:///')) url = url.replace(/^file:\/\/\//i, '');
        else if (url.startsWith('file://')) url = url.replace(/^file:\/\//i, '');
        const lower = url.toLowerCase();
        const imgIndex = lower.indexOf('images/');
        if (imgIndex !== -1) {
            url = url.substring(imgIndex);
        } else {
            if (url.startsWith('/')) url = url.substring(1);
            if (!url.startsWith('images/')) url = 'images/' + url;
        }
        url = url.replace(/\/+/g, '/');
        return url;
    }

    function sanitizeCatalog(list) {
        if (!Array.isArray(list)) return [];
        return list.map(p => {
            const item = { ...p };
            if (item.image) {
                item.image = fixImagePath(item.image);
            }
            if (item.packages && item.packages.length > 0) {
                item.packages = item.packages.filter(pkg => !pkg.name.toLowerCase().includes('hour'));
                if (item.packages.length > 0) {
                    item.basePrice = item.packages[0].price;
                }
            }
            return item;
        });
    }

    function saveCatalogToLocalStorage() {
        try {
            localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(productsData));
        } catch (err) {
            console.error('Error saving full catalog to localStorage:', err);
        }
    }

    // Fast initial load from cache or default array
    let savedCatalog = null;
    try {
        const raw = localStorage.getItem('bpo_full_catalog_v2');
        if (raw) {
            savedCatalog = JSON.parse(raw);
        }
    } catch (e) {
        savedCatalog = null;
    }

    if (savedCatalog && Array.isArray(savedCatalog) && savedCatalog.length > 0) {
        productsData = sanitizeCatalog(savedCatalog);
    } else {
        productsData = sanitizeCatalog(productsData);
    }

    // Always fetch fresh live products.json from Vercel server (bypassing CDN cache)
    async function loadFreshServerCatalog() {
        try {
            const res = await fetch('products.json?_t=' + Date.now(), {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
            });
            if (res.ok) {
                const fetched = await res.json();
                if (Array.isArray(fetched) && fetched.length > 0) {
                    // If current browser has local admin edits, do not overwrite with stale server file
                    const isDraft = localStorage.getItem('bpo_local_draft_active') === 'true';
                    const localUpdatedAt = Number(localStorage.getItem('bpo_catalog_updated_at') || 0);

                    if (isDraft || localUpdatedAt > 0) {
                        console.log('⚡ Preserving local admin edits in this browser.');
                        return;
                    }

                    productsData = sanitizeCatalog(fetched);
                    saveCatalogToLocalStorage();
                    renderCategoryTabs();
                    renderProducts();
                }
            }
        } catch(e) {
            console.log('Server catalog loaded from cache fallback.');
        }
    }
    loadFreshServerCatalog();

    let paymentMethods = {
        bkash: { name: 'bKash Personal', number: '01718404195' },
        nagad: { name: 'Nagad Personal', number: '01718404195' },
        rocket: { name: 'Rocket Personal', number: '01718404195' },
        upay: { name: 'Upay Personal', number: '01718404195' },
        binance: { name: 'Binance USDT (TRC20)', number: 'TP8B9j6s5... / Pay ID: 12345678' }
    };

    let storeSettings = {
        storeName: "ZERO EXCEPTION",
        storeTagline: "Fast, Trusted 24/7 Digital Game Key Store",
        noticeText: "⚡ 24/7 AUTOMATED DELIVERY: Instant License Delivery via WhatsApp & Telegram within 30 Seconds. Safe, Verified, Anti-Ban!",
        noticeEnabled: true,
        whatsappNumber: "8801727400370",
        telegramUrl: "https://t.me/+nE1pT80-i6oyOGU1/",
        paymentMethods: paymentMethods
    };

    function applyStoreSettings(newSettings) {
        if (!newSettings) return;
        storeSettings = { ...storeSettings, ...newSettings };
        if (storeSettings.paymentMethods) {
            paymentMethods = { ...paymentMethods, ...storeSettings.paymentMethods };
        }
        if (storeSettings.currencyRates) {
            currencyRates = { ...currencyRates, ...storeSettings.currencyRates };
        }
        if (noticeBanner) {
            const marqueeTextEl = noticeBanner.querySelector('.marquee-text');
            if (marqueeTextEl && storeSettings.noticeText) {
                marqueeTextEl.textContent = storeSettings.noticeText;
            }
            noticeBanner.style.display = storeSettings.noticeEnabled === false ? 'none' : 'flex';
        }
        const waSupportLink = document.querySelector('a.support-card[href*="wa.me"]');
        if (waSupportLink && storeSettings.whatsappNumber) {
            waSupportLink.href = `https://wa.me/${storeSettings.whatsappNumber.replace(/[^0-9]/g, '')}`;
        }
        const tgSupportLink = document.querySelector('a.support-card[href*="t.me"]');
        if (tgSupportLink && storeSettings.telegramUrl) {
            tgSupportLink.href = storeSettings.telegramUrl;
        }
    }

    // Fast initial load of store settings
    try {
        const rawSettings = localStorage.getItem('bpo_store_settings');
        if (rawSettings) {
            applyStoreSettings(JSON.parse(rawSettings));
        }
    } catch(e) {}

    // Always fetch fresh settings.json from Vercel server
    async function loadFreshServerSettings() {
        try {
            const res = await fetch('settings.json?_t=' + Date.now(), {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
            });
            if (res.ok) {
                const freshSettings = await res.json();
                applyStoreSettings(freshSettings);
                localStorage.setItem('bpo_store_settings', JSON.stringify(freshSettings));
            }
        } catch(e) {
            console.log('Using cached settings fallback.');
        }
    }
    loadFreshServerSettings();

    // Live Cross-Tab Instant Sync via BroadcastChannel
    try {
        const liveSyncChannel = new BroadcastChannel('zero_exception_sync');
        liveSyncChannel.onmessage = (event) => {
            if (!event.data) return;
            const type = (event.data.type || '').toUpperCase();
            if (type === 'CATALOG_UPDATED') {
                if (Array.isArray(event.data.catalog) && event.data.catalog.length > 0) {
                    productsData = sanitizeCatalog(event.data.catalog);
                } else {
                    const refreshedCatalog = localStorage.getItem('bpo_full_catalog_v2');
                    if (refreshedCatalog) {
                        try {
                            productsData = sanitizeCatalog(JSON.parse(refreshedCatalog));
                        } catch(e) {}
                    }
                }
                renderCategoryTabs();
                renderProducts();
            } else if (type === 'SETTINGS_UPDATED') {
                if (event.data.settings) {
                    applyStoreSettings(event.data.settings);
                } else {
                    const refreshedSettings = localStorage.getItem('bpo_store_settings');
                    if (refreshedSettings) {
                        try {
                            applyStoreSettings(JSON.parse(refreshedSettings));
                        } catch(e) {}
                    }
                }
            }
        };
    } catch(e) {}

    // Instant Storage event sync for other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'bpo_full_catalog_v2' && e.newValue) {
            try {
                productsData = sanitizeCatalog(JSON.parse(e.newValue));
                renderCategoryTabs();
                renderProducts();
            } catch(err) {}
        }
        if (e.key === 'bpo_store_settings' && e.newValue) {
            try {
                applyStoreSettings(JSON.parse(e.newValue));
            } catch(err) {}
        }
    });

    let liveOrders = [
        { name: 'Sajid Islam', product: 'BR MODS PC', amount: 200 },
        { name: 'Tanvir Ahmed', product: 'ALPHA - NON ROOT VIP', amount: 50 },
        { name: 'Rohan K.', product: 'PUBG MOBILE Z SKULL MOD', amount: 180 },
        { name: 'Arik Hossain', product: 'Z TOOL CARROM AUTO PLAY', amount: 120 },
        { name: 'Nayan Roy', product: 'Bala Mod Non Root', amount: 19 }
    ];

    const themeToggleBtn = document.getElementById('themeToggle');
    const currencyDropdownBtn = document.getElementById('currencyDropdownBtn');
    const currencyMenu = document.getElementById('currencyMenu');
    const currencyLabel = document.getElementById('currencyLabel');
    const currencyFlag = document.getElementById('currencyFlag');
    const productGrid = document.getElementById('productGrid');
    const filterTabsContainer = document.getElementById('filterTabs');
    const searchInput = document.getElementById('searchInput');
    const searchInputHeader = document.getElementById('searchInputHeader');
    const noticeBanner = document.getElementById('noticeBanner');
    const noticeCloseBtn = document.getElementById('noticeCloseBtn');
    const liveOrdersList = document.getElementById('liveOrdersList');

    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutModalClose = document.getElementById('checkoutModalClose');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bpo_theme', theme);
        const themeIcon = themeToggleBtn.querySelector('i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });

    function formatPrice(amountInBDT) {
        const rateObj = currencyRates[currentCurrency] || currencyRates.BDT;
        const converted = (amountInBDT * rateObj.rate).toFixed(0);
        return `${rateObj.symbol} ${converted}`;
    }

    function setCurrency(currency) {
        currentCurrency = currency;
        localStorage.setItem('bpo_currency', currency);
        currencyLabel.textContent = currency;
        if (currency === 'BDT') currencyFlag.textContent = '🇧🇩';
        else if (currency === 'INR') currencyFlag.textContent = '🇮🇳';
        else if (currency === 'NPR') currencyFlag.textContent = '🇳🇵';
        else if (currency === 'PKR') currencyFlag.textContent = '🇵🇰';

        renderProducts();
        renderLiveOrders();
        currencyMenu.classList.remove('show');
    }

    currencyDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyMenu.classList.toggle('show');
    });
    document.addEventListener('click', () => currencyMenu.classList.remove('show'));

    document.querySelectorAll('.currency-item').forEach(item => {
        item.addEventListener('click', (e) => {
            setCurrency(e.currentTarget.getAttribute('data-currency'));
        });
    });

    function renderProducts() {
        productGrid.innerHTML = '';
        const filtered = productsData.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="image-wrap">
                    ${product.discount ? `<div class="discount-badge">${product.discount}</div>` : ''}
                    <div class="status-badge ${product.status}">● ${product.statusText}</div>
                    <div class="image-circle">
                        <img src="${encodeURI(fixImagePath(product.image))}" alt="${product.title.replace(/"/g, '&quot;')}" loading="lazy">
                    </div>
                </div>
                <div class="info">
                    <h4>${product.title}</h4>
                    <div class="price-row">
                        ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        <span class="price"><span class="from">from</span> ${formatPrice(product.basePrice)}</span>
                    </div>
                    <button class="order-btn">Order Now →</button>
                </div>
            `;

            card.querySelector('.order-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openCheckoutModal(product);
            });
            card.addEventListener('click', () => openCheckoutModal(product));
            productGrid.appendChild(card);
        });
    }

    function renderCategoryTabs() {
        const categories = [
            { id: 'all', name: 'All Products', count: productsData.length },
            { id: 'non-root', name: 'Free Fire NON ROOT', count: productsData.filter(p => p.category === 'non-root').length },
            { id: 'root', name: 'FREE FIRE ROOT', count: productsData.filter(p => p.category === 'root').length },
            { id: 'ios', name: 'FREE FIRE IOS', count: productsData.filter(p => p.category === 'ios').length },
            { id: 'pc', name: 'FREE FIRE PC', count: productsData.filter(p => p.category === 'pc').length },
            { id: 'pubg', name: 'PUBG MOBILE', count: productsData.filter(p => p.category === 'pubg').length },
            { id: 'demo', name: 'DEMO / TOOLS', count: productsData.filter(p => p.category === 'demo').length }
        ];

        filterTabsContainer.innerHTML = '';
        categories.forEach(cat => {
            const tab = document.createElement('div');
            tab.className = `filter-tab ${cat.id === activeCategory ? 'active' : ''}`;
            tab.innerHTML = `${cat.name} <span class="count">${cat.count}</span>`;
            tab.addEventListener('click', () => {
                activeCategory = cat.id;
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderProducts();
            });
            filterTabsContainer.appendChild(tab);
        });
    }

    if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value; renderProducts(); });
    if (searchInputHeader) searchInputHeader.addEventListener('input', (e) => { searchQuery = e.target.value; renderProducts(); });
    if (noticeCloseBtn) noticeCloseBtn.addEventListener('click', () => { noticeBanner.style.display = 'none'; });

    function renderLiveOrders() {
        liveOrdersList.innerHTML = '';
        liveOrders.forEach(order => {
            const item = document.createElement('div');
            item.className = 'live-order-item';
            item.innerHTML = `
                <div class="live-order-user">
                    <div class="live-order-avatar">${order.name.charAt(0)}</div>
                    <div class="live-order-info">
                        <div class="name">${order.name}</div>
                        <div class="product">${order.product}</div>
                    </div>
                </div>
                <div class="live-order-right">
                    <div class="live-order-price">${formatPrice(order.amount)}</div>
                    <div class="live-order-status">COMPLETED</div>
                </div>
            `;
            liveOrdersList.appendChild(item);
        });
    }

    function openCheckoutModal(product) {
        selectedProduct = product;
        document.getElementById('checkoutProductTitle').textContent = product.title;
        document.getElementById('checkoutProductCategory').textContent = product.categoryName;
        document.getElementById('checkoutProductImg').src = encodeURI(fixImagePath(product.image));
        
        activePkgPrice = product.basePrice;
        document.getElementById('checkoutBasePrice').textContent = formatPrice(activePkgPrice);

        // Render dynamic package options inside durationSelect or pill container if present
        const durationSelect = document.getElementById('durationSelect');
        if (durationSelect && product.packages && product.packages.length > 0) {
            durationSelect.innerHTML = product.packages.map((pkg, idx) => `<option value="${pkg.price}" data-name="${pkg.name}" ${idx === 0 ? 'selected' : ''}>${pkg.name} - ${formatPrice(pkg.price)}</option>`).join('');
            
            durationSelect.onchange = (e) => {
                const selectedPrice = parseFloat(e.target.value);
                activePkgPrice = selectedPrice;
                document.getElementById('checkoutBasePrice').textContent = formatPrice(selectedPrice);
            };
        }

        document.getElementById('checkoutStep1').style.display = 'block';
        document.getElementById('checkoutStep2').style.display = 'none';
        updatePaymentDetails();
        checkoutModal.classList.add('active');
    }

    function updatePaymentDetails() {
        const info = paymentMethods[selectedPaymentMethod];
        document.getElementById('paymentMethodTitle').textContent = info.name;
        document.getElementById('paymentNumberDisplay').textContent = info.number;
    }

    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedPaymentMethod = card.getAttribute('data-method');
            updatePaymentDetails();
        });
    });

    document.getElementById('copyNumberBtn').addEventListener('click', () => {
        const num = paymentMethods[selectedPaymentMethod].number;
        navigator.clipboard.writeText(num);
        alert(`Copied: ${num}`);
    });

    document.getElementById('verifyPaymentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const trxIdInput = document.getElementById('trxIdInput');
        const trxId = trxIdInput ? trxIdInput.value.trim() : '';

        const durationSelect = document.getElementById('durationSelect');
        let selectedDuration = 'Standard';
        if (durationSelect && durationSelect.options[durationSelect.selectedIndex]) {
            const selectedOpt = durationSelect.options[durationSelect.selectedIndex];
            selectedDuration = selectedOpt.getAttribute('data-name') || selectedOpt.text;
        }

        const gatewayInfo = paymentMethods[selectedPaymentMethod];
        const gatewayName = gatewayInfo ? gatewayInfo.name : selectedPaymentMethod.toUpperCase();

        // Construct WhatsApp Notification details: Transaction ID, Payment Gateway, Duration
        const waMsg = `*ZERO EXCEPTION - PAYMENT VERIFICATION*\n\n` +
                      `📌 *Product:* ${selectedProduct ? selectedProduct.title : 'Game Key'}\n` +
                      `⏳ *Duration:* ${selectedDuration}\n` +
                      `💳 *Payment Gateway:* ${gatewayName}\n` +
                      `🔢 *Transaction ID:* ${trxId}\n\n` +
                      `Please verify my payment and deliver my license key. Thank you!`;

        const cleanWa = (storeSettings.whatsappNumber || '8801727400370').replace(/[^0-9]/g, '');
        const waUrl = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent(waMsg)}`;
        
        const step2WaBtn = document.getElementById('step2WaBtn');
        if (step2WaBtn) {
            step2WaBtn.href = waUrl;
        }

        // Save order to customer session & account history
        const orderRecord = {
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            product: selectedProduct ? selectedProduct.title : 'License Key',
            duration: selectedDuration,
            amount: formatPrice(activePkgPrice || (selectedProduct ? selectedProduct.basePrice : 0)),
            gateway: gatewayName,
            trxId: trxId || 'N/A',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            status: 'Pending Verification',
            key: 'Delivery via WhatsApp'
        };

        if (currentUser) {
            if (!currentUser.orders) currentUser.orders = [];
            currentUser.orders.unshift(orderRecord);
            saveUserSession(currentUser, true);

            const customers = getStoredCustomerAccounts();
            const idx = customers.findIndex(c => c.id === currentUser.id || c.email === currentUser.email);
            if (idx !== -1) {
                customers[idx].orders = currentUser.orders;
                saveCustomerAccounts(customers);
            }
        } else {
            try {
                const guestOrders = JSON.parse(localStorage.getItem('zero_guest_orders') || '[]');
                guestOrders.unshift(orderRecord);
                localStorage.setItem('zero_guest_orders', JSON.stringify(guestOrders));
            } catch(err) {}
        }

        window.open(waUrl, '_blank');

        document.getElementById('checkoutStep1').style.display = 'none';
        document.getElementById('checkoutStep2').style.display = 'block';
    });

    const copyKeyBtn = document.getElementById('copyKeyBtn');
    if (copyKeyBtn) {
        copyKeyBtn.addEventListener('click', () => {
            const keyEl = document.getElementById('generatedKeyDisplay');
            const key = keyEl ? keyEl.textContent : '';
            if (key) {
                navigator.clipboard.writeText(key);
                alert(`License Key Copied: ${key}`);
            }
        });
    }

    checkoutModalClose.addEventListener('click', () => checkoutModal.classList.remove('active'));

    // Carousel
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;

    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dots .dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    document.getElementById('carouselPrev').addEventListener('click', () => goToSlide((currentSlide - 1 + slides.length) % slides.length));
    document.getElementById('carouselNext').addEventListener('click', () => goToSlide((currentSlide + 1) % slides.length));

    document.getElementById('playOverlayBtn').addEventListener('click', () => videoModal.classList.add('active'));
    videoModalClose.addEventListener('click', () => videoModal.classList.remove('active'));

    // Price List Modal Logic
    const priceListModal = document.getElementById('priceListModal');
    const priceListBtn = document.getElementById('priceListBtn');
    const priceListModalClose = document.getElementById('priceListModalClose');
    const priceListContainer = document.getElementById('priceListContainer');
    const priceListSearchInput = document.getElementById('priceListSearchInput');
    let priceListQuery = '';

    function renderPriceListModal() {
        if (!priceListContainer) return;
        priceListContainer.innerHTML = '';

        const filtered = productsData.filter(p => p.title.toLowerCase().includes(priceListQuery.toLowerCase()) || p.categoryName.toLowerCase().includes(priceListQuery.toLowerCase()));

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.style.cssText = 'background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); padding: 14px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--shadow-sm);';
            
            let packagesHtml = '';
            if (p.packages && p.packages.length > 0) {
                packagesHtml = p.packages.map(pkg => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: var(--bg-primary); border-radius: 8px; font-size: 12px;">
                        <span style="font-weight: 700; color: var(--text-secondary);"><i class="far fa-clock" style="margin-right: 4px; color: var(--theme-brand);"></i>${pkg.name}</span>
                        <span style="font-weight: 900; color: var(--theme-brand); font-size: 13px;">${formatPrice(pkg.price)}</span>
                    </div>
                `).join('');
            } else {
                packagesHtml = `<div style="font-size: 12px; color: var(--text-secondary);">Starting from ${formatPrice(p.basePrice)}</div>`;
            }

            card.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-light);">
                    <img src="${encodeURI(fixImagePath(p.image))}" alt="${p.title}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <h4 style="font-size: 13.5px; font-weight: 900; margin: 0;">${p.title}</h4>
                        <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${p.categoryName}</div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${packagesHtml}
                </div>
                <button class="order-btn" style="margin-top: 4px; font-size: 11px; padding: 6px 12px;">Buy Now →</button>
            `;

            card.querySelector('.order-btn').addEventListener('click', () => {
                priceListModal.classList.remove('active');
                openCheckoutModal(p);
            });

            priceListContainer.appendChild(card);
        });
    }

    if (priceListBtn) priceListBtn.addEventListener('click', () => {
        renderPriceListModal();
        priceListModal.classList.add('active');
    });
    if (priceListModalClose) priceListModalClose.addEventListener('click', () => priceListModal.classList.remove('active'));
    if (priceListSearchInput) priceListSearchInput.addEventListener('input', (e) => {
        priceListQuery = e.target.value;
        renderPriceListModal();
    });

    // Update setCurrency to also update price list modal
    const originalSetCurrency = setCurrency;
    setCurrency = function(currency) {
        currentCurrency = currency;
        localStorage.setItem('bpo_currency', currency);
        currencyLabel.textContent = currency;
        if (currency === 'BDT') currencyFlag.textContent = '🇧🇩';
        else if (currency === 'INR') currencyFlag.textContent = '🇮🇳';
        else if (currency === 'NPR') currencyFlag.textContent = '🇳🇵';
        else if (currency === 'PKR') currencyFlag.textContent = '🇵🇰';

        renderProducts();
        renderLiveOrders();
        renderPriceListModal();
        currencyMenu.classList.remove('show');
    };

    renderCategoryTabs();
    renderProducts();
    renderLiveOrders();

    /* ============================================================
       SECURITY: DISABLE RIGHT CLICK MENU
       ============================================================ */
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    /* ============================================================
       ADMIN PRODUCT CATALOG MANAGER ENGINE
       ============================================================ */
    const ALLOWED_ADMIN_PASSWORDS = [
        'CANDY@ARIYAN65465S4DA4/%&#@*G5465ASD4784A1211561SAD',
        'CANDY@ARIYAN65465S4DA4*/%&#*@*G5465ASD4784A1211561SAD'
    ];

    const categoryNamesMap = {
        'non-root': 'Free Fire NON ROOT',
        'root': 'FREE FIRE ROOT',
        'ios': 'FREE FIRE IOS',
        'pc': 'FREE FIRE PC',
        'pubg': 'PUBG MOBILE',
        'demo': 'DEMO / TOOLS'
    };

    const adminModal = document.getElementById('adminModal');
    const adminModalClose = document.getElementById('adminModalClose');
    const adminFooterLink = document.getElementById('adminFooterLink');

    const adminTabAdd = document.getElementById('adminTabAdd');
    const adminTabManage = document.getElementById('adminTabManage');
    const adminTabExport = document.getElementById('adminTabExport');

    const adminSectionAdd = document.getElementById('adminSectionAdd');
    const adminSectionManage = document.getElementById('adminSectionManage');
    const adminSectionExport = document.getElementById('adminSectionExport');

    const adminPackagesList = document.getElementById('adminPackagesList');
    const adminAddPkgBtn = document.getElementById('adminAddPkgBtn');
    const adminAddProductForm = document.getElementById('adminAddProductForm');

    const adminProductsGrid = document.getElementById('adminProductsGrid');
    const adminCatalogCount = document.getElementById('adminCatalogCount');

    const adminExportCodeArea = document.getElementById('adminExportCodeArea');
    const adminCopyCodeBtn = document.getElementById('adminCopyCodeBtn');

    function openAdminModal() {
        window.location.href = 'admin.html';
    }

    if (adminFooterLink) {
        adminFooterLink.addEventListener('click', (e) => {
            e.preventDefault();
            openAdminModal();
        });
    }

    const adminHeaderBtn = document.getElementById('adminHeaderBtn');
    if (adminHeaderBtn) {
        adminHeaderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAdminModal();
        });
    }

    if (adminModalClose) {
        adminModalClose.addEventListener('click', () => {
            adminModal.classList.remove('active');
        });
    }

    // Keyboard shortcut Ctrl + Shift + A to open Admin Panel
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            openAdminModal();
        }
    });

    // Admin Tab Switching
    function switchAdminTab(targetTab) {
        [adminTabAdd, adminTabManage, adminTabExport].forEach(tab => tab && tab.classList.remove('active'));
        [adminSectionAdd, adminSectionManage, adminSectionExport].forEach(sec => sec && (sec.style.display = 'none'));

        if (targetTab === 'add') {
            adminTabAdd.classList.add('active');
            adminSectionAdd.style.display = 'block';
        } else if (targetTab === 'manage') {
            adminTabManage.classList.add('active');
            adminSectionManage.style.display = 'block';
            renderAdminManageGrid();
        } else if (targetTab === 'export') {
            adminTabExport.classList.add('active');
            adminSectionExport.style.display = 'block';
            generateExportCode();
        }
    }

    if (adminTabAdd) adminTabAdd.addEventListener('click', () => switchAdminTab('add'));
    if (adminTabManage) adminTabManage.addEventListener('click', () => switchAdminTab('manage'));
    if (adminTabExport) adminTabExport.addEventListener('click', () => switchAdminTab('export'));

    // Dynamic Package Rows
    if (adminAddPkgBtn && adminPackagesList) {
        adminAddPkgBtn.addEventListener('click', () => {
            const row = document.createElement('div');
            row.className = 'admin-pkg-row';
            row.style.cssText = 'display: flex; gap: 8px; align-items: center;';
            row.innerHTML = `
                <input type="text" class="form-control pkg-name" placeholder="Package Name (e.g. 7 Days)" required style="flex: 2;">
                <input type="number" class="form-control pkg-price" placeholder="Price (BDT ৳)" required style="flex: 1;">
                <button type="button" class="copy-btn remove-pkg-btn" style="background: #EF4444; color: white; font-size: 14px; padding: 6px 12px;">×</button>
            `;
            adminPackagesList.appendChild(row);
        });

        adminPackagesList.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('remove-pkg-btn')) {
                const rows = adminPackagesList.querySelectorAll('.admin-pkg-row');
                if (rows.length > 1) {
                    e.target.closest('.admin-pkg-row').remove();
                } else {
                    alert('At least one duration package option is required.');
                }
            }
        });
    }

    let editingProductId = null;
    const adminFormSubmitBtn = document.getElementById('adminFormSubmitBtn');
    const adminCancelEditBtn = document.getElementById('adminCancelEditBtn');

    function compressAndConvertImage(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 350;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = Math.round(width);
                canvas.height = Math.round(height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                callback(compressedDataUrl);
            };
            img.onerror = () => {
                alert('Failed to process the selected image file.');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    const adminUploadFileBtn = document.getElementById('adminUploadFileBtn');
    const adminImageFileInput = document.getElementById('adminImageFileInput');
    const adminImagePreview = document.getElementById('adminImagePreview');
    const adminImageInput = document.getElementById('adminImage');

    if (adminUploadFileBtn && adminImageFileInput) {
        adminUploadFileBtn.addEventListener('click', () => {
            adminImageFileInput.click();
        });

        adminImageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file (PNG, JPG, WEBP, GIF).');
                return;
            }

            compressAndConvertImage(file, (base64Url) => {
                if (adminImageInput) adminImageInput.value = base64Url;
                if (adminImagePreview) adminImagePreview.src = base64Url;
            });
        });
    }

    if (adminImageInput) {
        adminImageInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (adminImagePreview) {
                adminImagePreview.src = encodeURI(fixImagePath(val));
            }
        });
    }

    function resetAdminForm() {
        editingProductId = null;
        if (adminAddProductForm) adminAddProductForm.reset();
        if (adminTabAdd) adminTabAdd.textContent = '➕ Add New Product';
        if (adminFormSubmitBtn) adminFormSubmitBtn.textContent = '💾 Save & Publish Product';
        if (adminCancelEditBtn) adminCancelEditBtn.style.display = 'none';
        
        const statusEl = document.getElementById('adminStatusText');
        if (statusEl) statusEl.value = 'Online';
        if (adminImageInput) adminImageInput.value = '';
        if (adminImagePreview) adminImagePreview.src = 'images/logo.jpg';
        if (adminImageFileInput) adminImageFileInput.value = '';

        if (adminPackagesList) {
            adminPackagesList.innerHTML = `
                <div class="admin-pkg-row" style="display: flex; gap: 8px; align-items: center;">
                    <input type="text" class="form-control pkg-name" placeholder="Package Name (e.g. 1 Day)" value="1 Day" required style="flex: 2;">
                    <input type="number" class="form-control pkg-price" placeholder="Price (BDT ৳)" required style="flex: 1;">
                    <button type="button" class="copy-btn remove-pkg-btn" style="background: #EF4444; color: white; font-size: 14px; padding: 6px 12px;">×</button>
                </div>
            `;
        }
    }

    function startEditingProduct(product) {
        editingProductId = product.id;
        switchAdminTab('add');

        if (adminTabAdd) adminTabAdd.textContent = `✏️ Edit: ${product.title}`;
        if (adminFormSubmitBtn) adminFormSubmitBtn.textContent = '💾 Save Changes to Product';
        if (adminCancelEditBtn) adminCancelEditBtn.style.display = 'block';

        const imgPath = fixImagePath(product.image);

        document.getElementById('adminTitle').value = product.title || '';
        document.getElementById('adminCategory').value = product.category || 'non-root';
        document.getElementById('adminBasePrice').value = product.basePrice || '';
        document.getElementById('adminOldPrice').value = product.oldPrice || '';
        document.getElementById('adminDiscount').value = product.discount || '';
        document.getElementById('adminStatusText').value = product.statusText || 'Online';
        if (adminImageInput) adminImageInput.value = imgPath || '';
        if (adminImagePreview) adminImagePreview.src = encodeURI(imgPath);
        document.getElementById('adminDescription').value = product.description || '';

        if (adminPackagesList && product.packages && product.packages.length > 0) {
            adminPackagesList.innerHTML = product.packages.map(pkg => `
                <div class="admin-pkg-row" style="display: flex; gap: 8px; align-items: center;">
                    <input type="text" class="form-control pkg-name" placeholder="Package Name (e.g. 1 Day)" value="${pkg.name.replace(/"/g, '&quot;')}" required style="flex: 2;">
                    <input type="number" class="form-control pkg-price" placeholder="Price (BDT ৳)" value="${pkg.price}" required style="flex: 1;">
                    <button type="button" class="copy-btn remove-pkg-btn" style="background: #EF4444; color: white; font-size: 14px; padding: 6px 12px;">×</button>
                </div>
            `).join('');
        }
    }

    if (adminCancelEditBtn) {
        adminCancelEditBtn.addEventListener('click', () => {
            resetAdminForm();
            switchAdminTab('manage');
        });
    }

    // Form submission for Add / Edit product
    if (adminAddProductForm) {
        adminAddProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('adminTitle').value.trim();
            const category = document.getElementById('adminCategory').value;
            const basePrice = Number(document.getElementById('adminBasePrice').value);
            const oldPrice = document.getElementById('adminOldPrice').value ? Number(document.getElementById('adminOldPrice').value) : null;
            const discount = document.getElementById('adminDiscount').value.trim() || null;
            const statusText = document.getElementById('adminStatusText').value.trim() || 'Online';
            const image = fixImagePath(document.getElementById('adminImage').value);
            const description = document.getElementById('adminDescription').value.trim();

            const packageRows = adminPackagesList.querySelectorAll('.admin-pkg-row');
            const packages = [];
            packageRows.forEach(row => {
                const name = row.querySelector('.pkg-name').value.trim();
                const price = Number(row.querySelector('.pkg-price').value);
                if (name && price) {
                    packages.push({ name, price });
                }
            });

            if (packages.length === 0) {
                alert('Please add at least one valid duration package option.');
                return;
            }

            const categoryName = categoryNamesMap[category] || 'Custom Category';

            if (editingProductId) {
                // UPDATE EXISTING PRODUCT IN-PLACE
                const targetIndex = productsData.findIndex(p => p.id === editingProductId);
                if (targetIndex !== -1) {
                    productsData[targetIndex] = {
                        ...productsData[targetIndex],
                        title,
                        category,
                        categoryName,
                        basePrice,
                        oldPrice,
                        discount,
                        statusText,
                        image,
                        description,
                        packages
                    };

                    saveCatalogToLocalStorage();
                    alert(`✅ Successfully updated product: "${title}"!`);
                }
            } else {
                // CREATE NEW PRODUCT
                const newProduct = {
                    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
                    title: title,
                    category: category,
                    categoryName: categoryName,
                    basePrice: basePrice,
                    oldPrice: oldPrice,
                    discount: discount,
                    status: 'online',
                    statusText: statusText,
                    image: image,
                    description: description,
                    packages: packages,
                    isCustom: true
                };

                productsData.unshift(newProduct);
                saveCatalogToLocalStorage();
                alert(`✅ Successfully added product: "${title}"!`);
            }

            // Re-render store views, admin manage grid & reset form
            renderCategoryTabs();
            renderProducts();
            renderAdminManageGrid();
            resetAdminForm();
            switchAdminTab('manage');
        });
    }

    function updateAdminCatalogCount() {
        if (adminCatalogCount) {
            adminCatalogCount.textContent = productsData.length;
        }
    }

    function renderAdminManageGrid() {
        if (!adminProductsGrid) return;
        adminProductsGrid.innerHTML = '';
        updateAdminCatalogCount();

        productsData.forEach((p, idx) => {
            const card = document.createElement('div');
            card.style.cssText = 'background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: var(--shadow-sm);';
            card.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                    <img src="${encodeURI(fixImagePath(p.image))}" alt="${p.title}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
                    <div style="overflow: hidden;">
                        <h5 style="font-size: 12.5px; font-weight: 800; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.title}</h5>
                        <div style="font-size: 10px; color: var(--theme-brand); font-weight: 700;">Starting ${formatPrice(p.basePrice)} • ${p.packages ? p.packages.length : 0} options</div>
                    </div>
                </div>
                <div style="display: flex; gap: 4px; flex-shrink: 0;">
                    <button class="copy-btn edit-prod-btn" style="background: #3B82F6; color: white; font-size: 11px; font-weight: 800; padding: 4px 10px;">Edit</button>
                    <button class="copy-btn delete-prod-btn" style="background: #EF4444; color: white; font-size: 11px; font-weight: 800; padding: 4px 10px;">Delete</button>
                </div>
            `;

            card.querySelector('.edit-prod-btn').addEventListener('click', () => {
                startEditingProduct(p);
            });

            card.querySelector('.delete-prod-btn').addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete "${p.title}" from the catalog?`)) {
                    productsData.splice(idx, 1);
                    saveCatalogToLocalStorage();

                    renderCategoryTabs();
                    renderProducts();
                    renderAdminManageGrid();
                }
            });

            adminProductsGrid.appendChild(card);
        });
    }

    function generateExportCode() {
        if (!adminExportCodeArea) return;
        const cleanData = productsData.map(p => {
            const copy = { ...p };
            delete copy.isCustom;
            return copy;
        });
        adminExportCodeArea.value = `const productsData = ${JSON.stringify(cleanData, null, 4)};`;
    }

    if (adminCopyCodeBtn && adminExportCodeArea) {
        adminCopyCodeBtn.addEventListener('click', () => {
            adminExportCodeArea.select();
            navigator.clipboard.writeText(adminExportCodeArea.value);
            alert('📋 app.js Array Code copied to clipboard!');
        });
    }

    /* ============================================================
       CUSTOMER AUTHENTICATION & ORDER TRACKING ENGINE
       ============================================================ */
    const authModal = document.getElementById('authModal');
    const authModalClose = document.getElementById('authModalClose');
    const headerLoginBtn = document.getElementById('headerLoginBtn');
    const headerUserDropdownWrap = document.getElementById('headerUserDropdownWrap');
    const headerUserProfileBtn = document.getElementById('headerUserProfileBtn');
    const headerUserMenu = document.getElementById('headerUserMenu');
    const headerUserAvatar = document.getElementById('headerUserAvatar');
    const headerUserName = document.getElementById('headerUserName');
    const dropdownUserFullName = document.getElementById('dropdownUserFullName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const dropdownUserRoleBadge = document.getElementById('dropdownUserRoleBadge');
    const menuItemMyOrders = document.getElementById('menuItemMyOrders');
    const menuItemAdminConsole = document.getElementById('menuItemAdminConsole');
    const menuItemLogout = document.getElementById('menuItemLogout');
    const mobileNavAccount = document.getElementById('mobileNavAccount');
    const mobileNavAccountLabel = document.getElementById('mobileNavAccountLabel');

    const tabAuthLogin = document.getElementById('tabAuthLogin');
    const tabAuthRegister = document.getElementById('tabAuthRegister');
    const authSectionLogin = document.getElementById('authSectionLogin');
    const authSectionRegister = document.getElementById('authSectionRegister');
    const authAlertBox = document.getElementById('authAlertBox');
    const customerLoginForm = document.getElementById('customerLoginForm');
    const customerLoginEmail = document.getElementById('customerLoginEmail');
    const customerLoginPassword = document.getElementById('customerLoginPassword');
    const toggleCustomerPass = document.getElementById('toggleCustomerPass');
    const customerRememberMe = document.getElementById('customerRememberMe');

    const customerRegisterForm = document.getElementById('customerRegisterForm');
    const regFullName = document.getElementById('regFullName');
    const regEmail = document.getElementById('regEmail');
    const regWhatsapp = document.getElementById('regWhatsapp');
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');

    const userOrdersModal = document.getElementById('userOrdersModal');
    const userOrdersModalClose = document.getElementById('userOrdersModalClose');
    const modalUserAvatarLarge = document.getElementById('modalUserAvatarLarge');
    const modalUserFullName = document.getElementById('modalUserFullName');
    const modalUserEmail = document.getElementById('modalUserEmail');
    const modalUserWhatsapp = document.getElementById('modalUserWhatsapp');
    const modalUserRoleBadge = document.getElementById('modalUserRoleBadge');
    const modalLogoutBtn = document.getElementById('modalLogoutBtn');
    const userOrdersListContainer = document.getElementById('userOrdersListContainer');

    function getStoredCustomerAccounts() {
        try {
            const raw = localStorage.getItem('zero_customer_accounts');
            return raw ? JSON.parse(raw) : [];
        } catch(e) {
            return [];
        }
    }

    function saveCustomerAccounts(accounts) {
        try {
            localStorage.setItem('zero_customer_accounts', JSON.stringify(accounts));
        } catch(e) {}
    }

    let currentUser = null;

    function loadUserSession() {
        try {
            const sess = sessionStorage.getItem('zero_user_session') || localStorage.getItem('zero_user_session');
            if (sess) {
                currentUser = JSON.parse(sess);
            }
        } catch(e) {
            currentUser = null;
        }
    }

    function saveUserSession(user, remember) {
        currentUser = user;
        const serialized = JSON.stringify(user);
        if (remember) {
            localStorage.setItem('zero_user_session', serialized);
        } else {
            sessionStorage.setItem('zero_user_session', serialized);
        }
    }

    function clearUserSession() {
        currentUser = null;
        localStorage.removeItem('zero_user_session');
        sessionStorage.removeItem('zero_user_session');
    }

    function showAuthAlert(msg, isError = true) {
        if (!authAlertBox) return;
        authAlertBox.style.display = 'flex';
        authAlertBox.style.background = isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)';
        authAlertBox.style.border = isError ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)';
        authAlertBox.style.color = isError ? '#EF4444' : '#10B981';
        authAlertBox.innerHTML = `
            <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${msg}</span>
        `;
    }

    function clearAuthAlert() {
        if (authAlertBox) authAlertBox.style.display = 'none';
    }

    function updateHeaderUserUI() {
        if (currentUser) {
            if (headerLoginBtn) headerLoginBtn.style.display = 'none';
            if (headerUserDropdownWrap) headerUserDropdownWrap.style.display = 'inline-block';
            
            const initial = (currentUser.fullName || currentUser.email || 'U').charAt(0).toUpperCase();
            if (headerUserAvatar) headerUserAvatar.textContent = initial;
            if (modalUserAvatarLarge) modalUserAvatarLarge.textContent = initial;

            const firstName = (currentUser.fullName || 'User').split(' ')[0];
            if (headerUserName) headerUserName.textContent = firstName;
            if (mobileNavAccountLabel) mobileNavAccountLabel.textContent = firstName;

            if (dropdownUserFullName) dropdownUserFullName.textContent = currentUser.fullName || 'Customer';
            if (dropdownUserEmail) dropdownUserEmail.textContent = currentUser.email;
            if (dropdownUserRoleBadge) {
                dropdownUserRoleBadge.textContent = currentUser.role || 'Customer';
                if (currentUser.isAdmin) {
                    dropdownUserRoleBadge.style.background = 'rgba(245, 158, 11, 0.2)';
                    dropdownUserRoleBadge.style.color = '#F59E0B';
                } else {
                    dropdownUserRoleBadge.style.background = 'rgba(108, 60, 225, 0.15)';
                    dropdownUserRoleBadge.style.color = 'var(--theme-brand)';
                }
            }

            if (menuItemAdminConsole) {
                menuItemAdminConsole.style.display = currentUser.isAdmin ? 'flex' : 'none';
            }
        } else {
            if (headerLoginBtn) headerLoginBtn.style.display = 'flex';
            if (headerUserDropdownWrap) {
                headerUserDropdownWrap.style.display = 'none';
                if (headerUserMenu) headerUserMenu.classList.remove('show');
            }
            if (mobileNavAccountLabel) mobileNavAccountLabel.textContent = 'Account';
        }
    }

    function switchAuthTab(tab) {
        clearAuthAlert();
        if (tab === 'login') {
            if (tabAuthLogin) {
                tabAuthLogin.classList.add('active');
                tabAuthLogin.style.background = 'var(--theme-gradient)';
                tabAuthLogin.style.color = '#fff';
            }
            if (tabAuthRegister) {
                tabAuthRegister.classList.remove('active');
                tabAuthRegister.style.background = 'transparent';
                tabAuthRegister.style.color = 'var(--text-secondary)';
            }
            if (authSectionLogin) authSectionLogin.style.display = 'block';
            if (authSectionRegister) authSectionRegister.style.display = 'none';
        } else {
            if (tabAuthRegister) {
                tabAuthRegister.classList.add('active');
                tabAuthRegister.style.background = 'var(--theme-gradient)';
                tabAuthRegister.style.color = '#fff';
            }
            if (tabAuthLogin) {
                tabAuthLogin.classList.remove('active');
                tabAuthLogin.style.background = 'transparent';
                tabAuthLogin.style.color = 'var(--text-secondary)';
            }
            if (authSectionRegister) authSectionRegister.style.display = 'block';
            if (authSectionLogin) authSectionLogin.style.display = 'none';
        }
    }

    if (tabAuthLogin) tabAuthLogin.addEventListener('click', () => switchAuthTab('login'));
    if (tabAuthRegister) tabAuthRegister.addEventListener('click', () => switchAuthTab('register'));

    if (headerLoginBtn) {
        headerLoginBtn.addEventListener('click', () => {
            switchAuthTab('login');
            if (authModal) authModal.classList.add('active');
        });
    }

    if (authModalClose && authModal) {
        authModalClose.addEventListener('click', () => {
            authModal.classList.remove('active');
        });
    }

    if (toggleCustomerPass && customerLoginPassword) {
        toggleCustomerPass.addEventListener('click', () => {
            const isPassword = customerLoginPassword.getAttribute('type') === 'password';
            customerLoginPassword.setAttribute('type', isPassword ? 'text' : 'password');
            toggleCustomerPass.classList.toggle('fa-eye', !isPassword);
            toggleCustomerPass.classList.toggle('fa-eye-slash', isPassword);
        });
    }

    if (headerUserProfileBtn && headerUserMenu) {
        headerUserProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            headerUserMenu.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (headerUserMenu && !headerUserMenu.contains(e.target) && headerUserProfileBtn && !headerUserProfileBtn.contains(e.target)) {
            headerUserMenu.classList.remove('show');
        }
    });

    if (mobileNavAccount) {
        mobileNavAccount.addEventListener('click', () => {
            if (currentUser) {
                openUserOrdersModal();
            } else {
                switchAuthTab('login');
                if (authModal) authModal.classList.add('active');
            }
        });
    }

    function openUserOrdersModal() {
        if (!currentUser) {
            switchAuthTab('login');
            if (authModal) authModal.classList.add('active');
            return;
        }

        if (headerUserMenu) headerUserMenu.classList.remove('show');
        
        const initial = (currentUser.fullName || currentUser.email || 'U').charAt(0).toUpperCase();
        if (modalUserAvatarLarge) modalUserAvatarLarge.textContent = initial;
        if (modalUserFullName) modalUserFullName.textContent = currentUser.fullName || 'User';
        if (modalUserEmail) modalUserEmail.textContent = currentUser.email;
        if (modalUserWhatsapp) modalUserWhatsapp.innerHTML = `<i class="fab fa-whatsapp"></i> ${currentUser.whatsapp || 'Not linked'}`;
        
        if (modalUserRoleBadge) {
            modalUserRoleBadge.textContent = (currentUser.role || 'CUSTOMER').toUpperCase();
            if (currentUser.isAdmin) {
                modalUserRoleBadge.style.background = 'rgba(245, 158, 11, 0.2)';
                modalUserRoleBadge.style.color = '#F59E0B';
            } else {
                modalUserRoleBadge.style.background = 'rgba(108, 60, 225, 0.15)';
                modalUserRoleBadge.style.color = 'var(--theme-brand)';
            }
        }

        renderUserOrdersList();
        if (userOrdersModal) userOrdersModal.classList.add('active');
    }

    if (menuItemMyOrders) menuItemMyOrders.addEventListener('click', openUserOrdersModal);
    if (userOrdersModalClose && userOrdersModal) {
        userOrdersModalClose.addEventListener('click', () => {
            userOrdersModal.classList.remove('active');
        });
    }

    function handleLogout() {
        clearUserSession();
        updateHeaderUserUI();
        if (userOrdersModal) userOrdersModal.classList.remove('active');
        if (headerUserMenu) headerUserMenu.classList.remove('show');
    }

    if (menuItemLogout) menuItemLogout.addEventListener('click', handleLogout);
    if (modalLogoutBtn) modalLogoutBtn.addEventListener('click', handleLogout);

    function renderUserOrdersList() {
        if (!userOrdersListContainer) return;
        userOrdersListContainer.innerHTML = '';

        const orders = currentUser && Array.isArray(currentUser.orders) ? currentUser.orders : [];

        if (orders.length === 0) {
            userOrdersListContainer.innerHTML = `
                <div style="text-align: center; padding: 36px 14px; color: var(--text-muted); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
                    <i class="fas fa-box-open" style="font-size: 32px; margin-bottom: 10px; opacity: 0.4;"></i>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--text-secondary);">No Orders Found</div>
                    <p style="font-size: 11.5px; margin-top: 4px;">You haven't placed any license orders yet. Browse our store catalog to purchase panel keys!</p>
                </div>
            `;
            return;
        }

        orders.forEach(ord => {
            const item = document.createElement('div');
            item.style.cssText = 'background: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; box-shadow: var(--shadow-sm);';
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
                    <div>
                        <span style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">ORDER ID:</span>
                        <span style="font-family: monospace; font-size: 11.5px; font-weight: 800; color: var(--theme-brand); margin-left: 4px;">#${ord.id}</span>
                    </div>
                    <span style="font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: var(--radius-pill); background: rgba(16, 185, 129, 0.15); color: #10B981;">
                        <i class="fas fa-check-circle" style="font-size: 9px; margin-right: 3px;"></i>${ord.status || 'Verified'}
                    </span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <div>
                        <h4 style="font-size: 13.5px; font-weight: 800; margin: 0;">${ord.product}</h4>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
                            <i class="far fa-clock" style="margin-right: 3px; color: var(--theme-brand);"></i>${ord.duration} • <span style="font-weight: 800; color: var(--theme-brand);">${ord.amount}</span> via ${ord.gateway}
                        </div>
                    </div>
                    <div style="text-align: right; font-size: 10.5px; color: var(--text-muted);">
                        <div>${ord.date}</div>
                        <div style="font-family: monospace; font-size: 10px; margin-top: 2px;">Trx: ${ord.trxId}</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 11px;">
                    <span style="color: var(--text-secondary);"><i class="fas fa-key" style="margin-right: 4px; color: #F59E0B;"></i>License Key:</span>
                    <span style="font-family: monospace; font-weight: 800; color: #10B981;">${ord.key || 'WhatsApp Delivery'}</span>
                </div>
            `;
            userOrdersListContainer.appendChild(item);
        });
    }

    if (customerLoginForm) {
        customerLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearAuthAlert();

            const emailInput = customerLoginEmail ? customerLoginEmail.value.trim() : '';
            const passInput = customerLoginPassword ? customerLoginPassword.value.trim() : '';
            const remember = customerRememberMe ? customerRememberMe.checked : true;

            if (!emailInput || !passInput) {
                showAuthAlert('Please fill in both email and password.');
                return;
            }

            const superEmail = 'tgsgaming2024@gmail.com';
            const superPass = localStorage.getItem('zero_super_admin_pass') || 'Sweet+candy2026';

            // 1. Check Super Admin
            if (emailInput.toLowerCase() === superEmail.toLowerCase() && passInput === superPass) {
                const superAdminUser = {
                    id: 'super-admin',
                    fullName: 'Super Admin',
                    email: superEmail,
                    role: 'Super Admin',
                    isAdmin: true,
                    whatsapp: storeSettings.whatsappNumber || '01727400370',
                    orders: []
                };
                saveUserSession(superAdminUser, remember);
                localStorage.setItem('zero_admin_session', 'true');
                localStorage.setItem('zero_current_admin_user', JSON.stringify(superAdminUser));
                sessionStorage.setItem('zero_admin_session', 'true');
                sessionStorage.setItem('zero_current_admin_user', JSON.stringify(superAdminUser));
                
                updateHeaderUserUI();
                if (authModal) authModal.classList.remove('active');
                customerLoginForm.reset();
                return;
            }

            // 2. Check Sub-Admins in storeSettings
            const adminList = (storeSettings && Array.isArray(storeSettings.admins)) ? storeSettings.admins : [];
            const matchedAdmin = adminList.find(a => a.email && a.email.toLowerCase() === emailInput.toLowerCase() && a.password === passInput);
            if (matchedAdmin) {
                if (matchedAdmin.status === 'suspended') {
                    showAuthAlert('This admin account has been suspended by the Super Admin.');
                    return;
                }
                const adminUser = {
                    id: matchedAdmin.id,
                    fullName: matchedAdmin.name || 'Admin',
                    email: matchedAdmin.email,
                    role: matchedAdmin.roleTitle || 'Admin',
                    isAdmin: true,
                    whatsapp: storeSettings.whatsappNumber || '',
                    orders: []
                };
                saveUserSession(adminUser, remember);
                localStorage.setItem('zero_admin_session', 'true');
                localStorage.setItem('zero_current_admin_user', JSON.stringify(adminUser));
                sessionStorage.setItem('zero_admin_session', 'true');
                sessionStorage.setItem('zero_current_admin_user', JSON.stringify(adminUser));

                updateHeaderUserUI();
                if (authModal) authModal.classList.remove('active');
                customerLoginForm.reset();
                return;
            }

            // 3. Check Registered Customers
            const customers = getStoredCustomerAccounts();
            const matchedCustomer = customers.find(c => c.email && (c.email.toLowerCase() === emailInput.toLowerCase() || (c.username && c.username.toLowerCase() === emailInput.toLowerCase())) && c.password === passInput);

            if (matchedCustomer) {
                saveUserSession(matchedCustomer, remember);
                updateHeaderUserUI();
                if (authModal) authModal.classList.remove('active');
                customerLoginForm.reset();
                return;
            }

            showAuthAlert('Invalid email or password. Please check your credentials or create a new account.');
        });
    }

    if (customerRegisterForm) {
        customerRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearAuthAlert();

            const fullName = regFullName ? regFullName.value.trim() : '';
            const email = regEmail ? regEmail.value.trim().toLowerCase() : '';
            const whatsapp = regWhatsapp ? regWhatsapp.value.trim() : '';
            const pass = regPassword ? regPassword.value : '';
            const confirmPass = regConfirmPassword ? regConfirmPassword.value : '';

            if (!fullName || !email || !pass) {
                showAuthAlert('Please fill in all required fields.');
                return;
            }

            if (pass.length < 6) {
                showAuthAlert('Password must be at least 6 characters long.');
                return;
            }

            if (pass !== confirmPass) {
                showAuthAlert('Passwords do not match. Please re-enter.');
                return;
            }

            const customers = getStoredCustomerAccounts();
            if (customers.some(c => c.email && c.email.toLowerCase() === email) || email === 'tgsgaming2024@gmail.com') {
                showAuthAlert('An account with this email already exists. Please sign in instead.');
                return;
            }

            const newAccount = {
                id: 'usr_' + Date.now().toString(36),
                fullName: fullName,
                email: email,
                whatsapp: whatsapp,
                password: pass,
                role: 'Customer',
                isAdmin: false,
                createdAt: new Date().toISOString(),
                orders: []
            };

            customers.push(newAccount);
            saveCustomerAccounts(customers);
            saveUserSession(newAccount, true);

            updateHeaderUserUI();
            if (authModal) authModal.classList.remove('active');
            customerRegisterForm.reset();
        });
    }

    // Initialize Customer Auth State on page load
    loadUserSession();
    updateHeaderUserUI();
});
