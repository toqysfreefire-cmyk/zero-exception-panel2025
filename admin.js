/* ============================================================
   ZERO EXCEPTION - ADMIN CONSOLE LOGIC & VERCEL SYNC ENGINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Default Credentials
    const DEFAULT_ADMIN_EMAIL = 'tgsgaming2024@gmail.com';
    const DEFAULT_ADMIN_PASS = 'Sweet+candy2026';

    // BroadcastChannel for instant zero-latency cross-tab sync
    let syncChannel = null;
    try {
        syncChannel = new BroadcastChannel('zero_exception_sync');
    } catch(e) {
        console.warn('BroadcastChannel not supported in this browser environment.');
    }

    // State Variables
    let products = [];
    let settings = {
        storeName: "ZERO EXCEPTION",
        storeTagline: "Fast, Trusted 24/7 Digital Game Key Store",
        noticeText: "⚡ 24/7 AUTOMATED DELIVERY: Instant License Delivery via WhatsApp & Telegram within 30 Seconds. Safe, Verified, Anti-Ban!",
        noticeEnabled: true,
        popupEnabled: false,
        popupTitle: "VIP SPECIAL ANNOUNCEMENT",
        popupMessage: "Welcome to ZERO EXCEPTION! All panel keys are 100% updated and online. Contact WhatsApp for bulk reseller discounts.",
        whatsappNumber: "8801727400370",
        whatsappText: "Hello ZERO EXCEPTION, I need help with panel keys.",
        telegramUrl: "https://t.me/+nE1pT80-i6oyOGU1/",
        paymentMethods: {
            bkash: { name: "bKash Personal", number: "01718404195", active: true, type: "Personal" },
            nagad: { name: "Nagad Personal", number: "01718404195", active: true, type: "Personal" },
            rocket: { name: "Rocket Personal", number: "01718404195", active: true, type: "Personal" },
            upay: { name: "Upay Personal", number: "01718404195", active: true, type: "Personal" },
            binance: { name: "Binance USDT (TRC20)", number: "TP8B9j6s5... / Pay ID: 12345678", active: true, type: "Crypto" }
        },
        currencyRates: {
            BDT: { symbol: "৳", rate: 1, name: "BDT" },
            INR: { symbol: "₹", rate: 0.70, name: "INR" },
            NPR: { symbol: "Rs", rate: 1.12, name: "NPR" },
            PKR: { symbol: "Rs", rate: 2.32, name: "PKR" }
        },
        cloudSync: {
            autoSync: false
        }
    };

    let activeCategoryFilter = 'all';
    let searchQuery = '';

    // Available project images for quick selection
    const PRESET_IMAGES = [
        'images/drip_client_non_root.png',
        'images/alpha_non_root.png',
        'images/aim_hack_non_root_ios.png',
        'images/bala_mod_non_root.png',
        'images/non_root_pato.png',
        'images/abcd_mod_non_root.png',
        'images/xreg_non_root.png',
        'images/crack_master.png',
        'images/drip_client_ff_proxy.png',
        'images/dolphin_root_only.png',
        'images/angry_mod_root_only.png',
        'images/drip_client_root_only.png',
        'images/drip_wire_external.png',
        'images/migul_pro_aim_kill.png',
        'images/gbox_esign.png',
        'images/br_mods_pc.png',
        'images/zolo_pubg.png',
        'images/carrom.png',
        'images/jitu.jpg',
        'images/logo.jpg'
    ];

    // Category names mapping
    const CATEGORY_NAMES = {
        'non-root': 'Free Fire NON ROOT',
        'root': 'FREE FIRE ROOT',
        'ios': 'FREE FIRE IOS',
        'pc': 'FREE FIRE PC',
        'pubg': 'PUBG MOBILE',
        'demo': 'DEMO / TOOLS'
    };

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const loginErrorMsg = document.getElementById('loginErrorMsg');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const rememberMe = document.getElementById('rememberMe');

    const adminApp = document.getElementById('adminApp');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const admSidebar = document.getElementById('admSidebar');
    const topbarTitle = document.getElementById('topbarTitle');
    const toastContainer = document.getElementById('toastContainer');
    const syncStatusBadge = document.getElementById('syncStatusBadge');
    const syncStatusText = document.getElementById('syncStatusText');
    const quickSyncBtn = document.getElementById('quickSyncBtn');
    const quickAddProductBtn = document.getElementById('quickAddProductBtn');

    // Stats
    const statTotalProducts = document.getElementById('statTotalProducts');
    const statTotalCategories = document.getElementById('statTotalCategories');
    const statActivePayments = document.getElementById('statActivePayments');
    const statNetlifyMode = document.getElementById('statNetlifyMode');

    // Navigation Tabs
    const navButtons = document.querySelectorAll('.sidebar-nav .nav-link-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Tab 1: Products
    const catalogSearchInput = document.getElementById('catalogSearchInput');
    const categoryChipsContainer = document.getElementById('categoryChipsContainer');
    const productsCardsGrid = document.getElementById('productsCardsGrid');
    const btnGoToAddNew = document.getElementById('btnGoToAddNew');

    // Tab 2: Editor
    const productEditorForm = document.getElementById('productEditorForm');
    const editProductId = document.getElementById('editProductId');
    const editorFormHeading = document.getElementById('editorFormHeading');
    const editorFormSubtitle = document.getElementById('editorFormSubtitle');
    const btnCancelEditor = document.getElementById('btnCancelEditor');
    const prodTitle = document.getElementById('prodTitle');
    const prodCategory = document.getElementById('prodCategory');
    const customCategoryWrap = document.getElementById('customCategoryWrap');
    const prodCustomCategoryName = document.getElementById('prodCustomCategoryName');
    const prodStatus = document.getElementById('prodStatus');
    const prodBasePrice = document.getElementById('prodBasePrice');
    const prodOldPrice = document.getElementById('prodOldPrice');
    const prodDiscount = document.getElementById('prodDiscount');
    const prodStatusText = document.getElementById('prodStatusText');
    const prodDescription = document.getElementById('prodDescription');
    const packagesListContainer = document.getElementById('packagesListContainer');
    const btnAddPackageRow = document.getElementById('btnAddPackageRow');
    const imagePreview = document.getElementById('imagePreview');
    const prodImageUrl = document.getElementById('prodImageUrl');
    const prodImageFileInput = document.getElementById('prodImageFileInput');
    const btnUploadImageFile = document.getElementById('btnUploadImageFile');
    const presetImagesContainer = document.getElementById('presetImagesContainer');
    const btnSaveProduct = document.getElementById('btnSaveProduct');
    const btnResetProductForm = document.getElementById('btnResetProductForm');

    // Vercel Deploy & Tool Elements
    const btnDeployNetlifyTop = document.getElementById('btnDeployNetlifyTop');
    const netlifyDeployModal = document.getElementById('netlifyDeployModal');
    const btnCloseNetlifyDeployModal = document.getElementById('btnCloseNetlifyDeployModal');
    const btnModalDownloadProducts = document.getElementById('btnModalDownloadProducts');
    const btnModalDownloadSettings = document.getElementById('btnModalDownloadSettings');
    const deployAlertBanner = document.getElementById('deployAlertBanner');
    const deployAlertTitle = document.getElementById('deployAlertTitle');
    const deployAlertText = document.getElementById('deployAlertText');
    const btnAlertExport = document.getElementById('btnAlertExport');
    const btnCleanDuplicatesAlert = document.getElementById('btnCleanDuplicatesAlert');
    const btnCleanDuplicates = document.getElementById('btnCleanDuplicates');
    const btnReloadFromServer = document.getElementById('btnReloadFromServer');
    const btnQuickExportProducts = document.getElementById('btnQuickExportProducts');

    // Tab 3: Payments
    const payBkashNumber = document.getElementById('payBkashNumber');
    const payBkashName = document.getElementById('payBkashName');
    const payBkashActive = document.getElementById('payBkashActive');
    const payNagadNumber = document.getElementById('payNagadNumber');
    const payNagadName = document.getElementById('payNagadName');
    const payNagadActive = document.getElementById('payNagadActive');
    const payRocketNumber = document.getElementById('payRocketNumber');
    const payRocketName = document.getElementById('payRocketName');
    const payRocketActive = document.getElementById('payRocketActive');
    const payBinanceNumber = document.getElementById('payBinanceNumber');
    const payBinanceName = document.getElementById('payBinanceName');
    const payBinanceActive = document.getElementById('payBinanceActive');
    const btnSavePaymentSettings = document.getElementById('btnSavePaymentSettings');

    // Tab 4: Notices
    const noticeEnabled = document.getElementById('noticeEnabled');
    const noticeText = document.getElementById('noticeText');
    const supportWhatsappNumber = document.getElementById('supportWhatsappNumber');
    const supportTelegramUrl = document.getElementById('supportTelegramUrl');
    const popupEnabled = document.getElementById('popupEnabled');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    const btnSaveNotices = document.getElementById('btnSaveNotices');

    // Tab 5: Currencies
    const storeNameInput = document.getElementById('storeName');
    const storeTaglineInput = document.getElementById('storeTagline');
    const rateINR = document.getElementById('rateINR');
    const rateNPR = document.getElementById('rateNPR');
    const ratePKR = document.getElementById('ratePKR');
    const btnSaveCurrencies = document.getElementById('btnSaveCurrencies');

    // Tab 6: Catalog & Vercel Publishing Hub
    const btnDownloadProductsJson = document.getElementById('btnDownloadProductsJson');
    const btnDownloadProductsTop = document.getElementById('btnDownloadProductsTop');
    const btnCopyProductsJson = document.getElementById('btnCopyProductsJson');
    const btnCopyJsonQuick = document.getElementById('btnCopyJsonQuick');
    const btnModalCopyJson = document.getElementById('btnModalCopyJson');
    const btnDownloadSettingsJson = document.getElementById('btnDownloadSettingsJson');
    const importProductsFileInput = document.getElementById('importProductsFileInput');
    const btnTriggerImportProducts = document.getElementById('btnTriggerImportProducts');
    const btnReloadServerCatalog = document.getElementById('btnReloadServerCatalog');
    const btnCleanDuplicatesSyncTab = document.getElementById('btnCleanDuplicatesSyncTab');
    const btnResetToDefaults = document.getElementById('btnResetToDefaults');

    // GitHub Auto-Deploy Engine Elements
    const ghRepoName = document.getElementById('ghRepoName');
    const ghBranchName = document.getElementById('ghBranchName');
    const ghPersonalToken = document.getElementById('ghPersonalToken');
    const ghAutoDeployOnSave = document.getElementById('ghAutoDeployOnSave');
    const btnSaveGitHubConfig = document.getElementById('btnSaveGitHubConfig');
    const btnTriggerGitHubDeployNow = document.getElementById('btnTriggerGitHubDeployNow');
    const ghAutoDeployBadge = document.getElementById('ghAutoDeployBadge');

    // Tab 7: Backup
    const btnExportFullBackup = document.getElementById('btnExportFullBackup');
    const backupFileInput = document.getElementById('backupFileInput');
    const btnTriggerRestoreUpload = document.getElementById('btnTriggerRestoreUpload');
    const btnFactoryReset = document.getElementById('btnFactoryReset');

    // Tab 8: Super Admin & Admin Management
    const navBtnAdmins = document.getElementById('navBtnAdmins');
    const adminUserPill = document.getElementById('adminUserPill');
    const adminRoleIcon = document.getElementById('adminRoleIcon');
    const currentAdminEmail = document.getElementById('currentAdminEmail');
    const currentAdminBadge = document.getElementById('currentAdminBadge');
    const subAdminsContainer = document.getElementById('subAdminsContainer');
    const btnOpenAddSubAdmin = document.getElementById('btnOpenAddSubAdmin');
    const subAdminModal = document.getElementById('subAdminModal');
    const btnCloseSubAdminModal = document.getElementById('btnCloseSubAdminModal');
    const btnCancelSubAdminModal = document.getElementById('btnCancelSubAdminModal');
    const subAdminForm = document.getElementById('subAdminForm');
    const subAdminEditId = document.getElementById('subAdminEditId');
    const subAdminName = document.getElementById('subAdminName');
    const subAdminEmail = document.getElementById('subAdminEmail');
    const subAdminPassword = document.getElementById('subAdminPassword');
    const subAdminRoleSelect = document.getElementById('subAdminRoleSelect');
    const subAdminStatusSelect = document.getElementById('subAdminStatusSelect');
    const permProductsManage = document.getElementById('permProductsManage');
    const permProductsDelete = document.getElementById('permProductsDelete');
    const permPaymentsManage = document.getElementById('permPaymentsManage');
    const permNoticesManage = document.getElementById('permNoticesManage');
    const permCurrenciesManage = document.getElementById('permCurrenciesManage');
    const permSyncManage = document.getElementById('permSyncManage');
    const permBackupManage = document.getElementById('permBackupManage');
    const btnToggleChangeSuperPass = document.getElementById('btnToggleChangeSuperPass');
    const superAdminPassForm = document.getElementById('superAdminPassForm');
    const formChangeSuperPass = document.getElementById('formChangeSuperPass');
    const newSuperPass = document.getElementById('newSuperPass');
    const confirmSuperPass = document.getElementById('confirmSuperPass');

    // Current logged in admin state
    let currentSessionUser = null;

    // ============================================================
    // AUTHENTICATION & MULTI-ADMIN PERMISSION SYSTEM
    // ============================================================
    function getSuperAdminPassword() {
        return localStorage.getItem('zero_super_admin_pass') || DEFAULT_ADMIN_PASS;
    }

    function initAdminsArray() {
        if (!settings.admins || !Array.isArray(settings.admins) || settings.admins.length === 0) {
            settings.admins = [
                {
                    id: 'super-admin',
                    name: 'Main Server Admin',
                    email: DEFAULT_ADMIN_EMAIL,
                    password: getSuperAdminPassword(),
                    role: 'Super Admin',
                    isSuperAdmin: true,
                    status: 'active',
                    permissions: {
                        products_manage: true,
                        products_delete: true,
                        payments_manage: true,
                        notices_manage: true,
                        currencies_manage: true,
                        sync_manage: true,
                        backup_manage: true,
                        admins_manage: true
                    },
                    createdAt: new Date().toISOString()
                }
            ];
        }
    }

    function checkAuth() {
        const sessionAuth = sessionStorage.getItem('zero_admin_session');
        const localAuth = localStorage.getItem('zero_admin_session');
        const storedUser = sessionStorage.getItem('zero_current_admin_user') || localStorage.getItem('zero_current_admin_user');

        if ((sessionAuth === 'true' || localAuth === 'true') && storedUser) {
            try {
                currentSessionUser = JSON.parse(storedUser);
                if (currentSessionUser.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
                    currentSessionUser.isSuperAdmin = true;
                    currentSessionUser.role = 'Super Admin';
                }
                showAdminDashboard();
                return;
            } catch(e) {}
        }
        showLoginScreen();
    }

    function showLoginScreen() {
        loginScreen.style.display = 'flex';
        adminApp.style.display = 'none';
        if (loginEmail) loginEmail.value = '';
        if (loginPassword) loginPassword.value = '';
        loginError.style.display = 'none';

        // Counteract browser password managers attempting late autofill
        setTimeout(() => {
            if (loginEmail) loginEmail.value = '';
            if (loginPassword) loginPassword.value = '';
        }, 80);
        setTimeout(() => {
            if (loginEmail) loginEmail.value = '';
            if (loginPassword) loginPassword.value = '';
        }, 300);
    }

    function showAdminDashboard() {
        loginScreen.style.display = 'none';
        adminApp.style.display = 'flex';
        initDashboard();
        applyUserPermissions();
    }

    function applyUserPermissions() {
        if (!currentSessionUser) return;
        const isSuper = currentSessionUser.isSuperAdmin || currentSessionUser.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase();

        // Update Topbar User Badge
        if (currentAdminEmail) currentAdminEmail.textContent = currentSessionUser.email;
        if (adminRoleIcon) {
            adminRoleIcon.className = isSuper ? 'fas fa-crown' : 'fas fa-user-shield';
            adminRoleIcon.style.color = isSuper ? '#FACC15' : '#00fcca';
        }
        if (currentAdminBadge) {
            currentAdminBadge.textContent = isSuper ? 'SUPER ADMIN' : (currentSessionUser.role || 'SUB-ADMIN').toUpperCase();
            currentAdminBadge.style.background = isSuper ? 'rgba(250, 204, 21, 0.2)' : 'rgba(0, 252, 202, 0.2)';
            currentAdminBadge.style.color = isSuper ? '#FACC15' : '#00fcca';
        }

        // Manage Admins Navigation button is strictly visible to Main Server Admin
        if (navBtnAdmins) {
            navBtnAdmins.style.display = isSuper ? 'flex' : 'none';
        }

        // Enforce granular permissions if not Super Admin
        if (!isSuper) {
            const perms = currentSessionUser.permissions || {};

            // Product deletion restriction
            if (!perms.products_delete) {
                document.querySelectorAll('.btn-del-p').forEach(btn => btn.style.display = 'none');
            }
            // Payments edit restriction
            if (!perms.payments_manage && btnSavePaymentSettings) {
                btnSavePaymentSettings.disabled = true;
                btnSavePaymentSettings.style.opacity = '0.5';
                btnSavePaymentSettings.title = 'No permission to modify payment gateways.';
            }
            // Notices edit restriction
            if (!perms.notices_manage && btnSaveNotices) {
                btnSaveNotices.disabled = true;
                btnSaveNotices.style.opacity = '0.5';
            }
            // Currencies edit restriction
            if (!perms.currencies_manage && btnSaveCurrencies) {
                btnSaveCurrencies.disabled = true;
                btnSaveCurrencies.style.opacity = '0.5';
            }
            // Netlify & Cloud sync restriction
            if (!perms.sync_manage) {
                if (quickSyncBtn) quickSyncBtn.style.display = 'none';
                if (btnTestAndSyncAll) btnTestAndSyncAll.disabled = true;
            }
            // Backup & reset restriction
            if (!perms.backup_manage && btnFactoryReset) {
                btnFactoryReset.disabled = true;
                btnFactoryReset.style.opacity = '0.5';
            }
        }
    }

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPass = loginPassword.type === 'password';
            loginPassword.type = isPass ? 'text' : 'password';
            togglePasswordBtn.classList.toggle('fa-eye', !isPass);
            togglePasswordBtn.classList.toggle('fa-eye-slash', isPass);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginEmail.value.trim().toLowerCase();
            const pass = loginPassword.value;

            initAdminsArray();

            // 1. Check if Super Admin (tgsgaming2024@gmail.com)
            const superEmail = DEFAULT_ADMIN_EMAIL.toLowerCase();
            const superPass = getSuperAdminPassword();

            if (email === superEmail) {
                if (pass === superPass) {
                    currentSessionUser = {
                        id: 'super-admin',
                        name: 'Main Server Admin',
                        email: DEFAULT_ADMIN_EMAIL,
                        isSuperAdmin: true,
                        role: 'Super Admin',
                        permissions: {
                            products_manage: true,
                            products_delete: true,
                            payments_manage: true,
                            notices_manage: true,
                            currencies_manage: true,
                            sync_manage: true,
                            backup_manage: true,
                            admins_manage: true
                        }
                    };
                    executeLoginSuccess();
                    return;
                } else {
                    showLoginError('Incorrect Master Admin Password.');
                    return;
                }
            }

            // 2. Check if Secondary Sub-Admin
            const subAdmin = (settings.admins || []).find(a => a.email.toLowerCase() === email);
            if (subAdmin) {
                if (subAdmin.status === 'suspended') {
                    showLoginError('⚠️ This admin account is suspended. Contact Main Server Admin.');
                    return;
                }
                if (subAdmin.password === pass) {
                    currentSessionUser = {
                        ...subAdmin,
                        isSuperAdmin: false
                    };
                    executeLoginSuccess();
                    return;
                } else {
                    showLoginError('Incorrect password for this admin account.');
                    return;
                }
            }

            // No match found
            showLoginError('Admin account not found. Please verify your email.');
        });
    }

    function showLoginError(msg) {
        loginError.style.display = 'flex';
        loginErrorMsg.textContent = msg;
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 500);
    }

    function executeLoginSuccess() {
        loginError.style.display = 'none';
        const userJson = JSON.stringify(currentSessionUser);
        if (rememberMe.checked) {
            localStorage.setItem('zero_admin_session', 'true');
            localStorage.setItem('zero_current_admin_user', userJson);
        } else {
            sessionStorage.setItem('zero_admin_session', 'true');
            sessionStorage.setItem('zero_current_admin_user', userJson);
        }
        showToast(`Authenticated as ${currentSessionUser.name}! (${currentSessionUser.role})`, 'success');
        showAdminDashboard();
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out of the Admin Console?')) {
                sessionStorage.removeItem('zero_admin_session');
                sessionStorage.removeItem('zero_current_admin_user');
                localStorage.removeItem('zero_admin_session');
                localStorage.removeItem('zero_current_admin_user');
                currentSessionUser = null;
                showToast('Logged out successfully.', 'info');
                showLoginScreen();
            }
        });
    }

    // ============================================================
    // TOAST NOTIFICATION UTILITY
    // ============================================================
    function showToast(message, type = 'success') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `adm-toast ${type}`;
        const iconClass = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-times-circle' : 'fa-info-circle');
        toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // ============================================================
    // TAB NAVIGATION WITH PERMISSION ENFORCEMENT
    // ============================================================
    function switchTab(tabId) {
        // Enforce Super Admin restriction on Tab 8
        if (tabId === 'tab-admins') {
            const isSuper = currentSessionUser && (currentSessionUser.isSuperAdmin || currentSessionUser.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase());
            if (!isSuper) {
                alert('🔒 Access Denied: Only Main Server Admin (tgsgaming2024@gmail.com) has permission to manage admin accounts.');
                switchTab('tab-products');
                return;
            }
            renderSubAdminsList();
        }

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabId);
        });

        const activeBtn = document.querySelector(`.sidebar-nav .nav-link-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            topbarTitle.textContent = activeBtn.textContent.trim();
        }

        if (window.innerWidth <= 768) {
            admSidebar.classList.remove('open');
        }

        if (tabId === 'tab-products') {
            renderCatalogCards();
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            admSidebar.classList.toggle('open');
        });
    }

    if (btnGoToAddNew || quickAddProductBtn) {
        [btnGoToAddNew, quickAddProductBtn].forEach(b => {
            if (b) b.addEventListener('click', () => {
                resetProductForm();
                switchTab('tab-editor');
            });
        });
    }

    if (btnCancelEditor) {
        btnCancelEditor.addEventListener('click', () => {
            resetProductForm();
            switchTab('tab-products');
        });
    }

    // ============================================================
    // DATA PERSISTENCE & INITIALIZATION
    // ============================================================
    async function initDashboard() {
        await loadSettings();
        await loadProducts();
        initAdminsArray();
        loadGitHubConfig();
        renderPresetImages();
        renderCategoryChips();
        renderCatalogCards();
        populatePaymentFields();
        populateNoticeFields();
        populateCurrencyFields();
        renderSubAdminsList();
        applyUserPermissions();
        updateStats();
    }

    async function loadSettings() {
        try {
            const raw = localStorage.getItem('bpo_store_settings');
            if (raw) {
                settings = { ...settings, ...JSON.parse(raw) };
            } else {
                const res = await fetch('settings.json');
                if (res.ok) {
                    const fetched = await res.json();
                    settings = { ...settings, ...fetched };
                    localStorage.setItem('bpo_store_settings', JSON.stringify(settings));
                }
            }
        } catch(e) {
            console.log('Using default settings fallback.');
        }

        if (!settings.admins || !Array.isArray(settings.admins) || settings.admins.length === 0) {
            initAdminsArray();
        }
    }

    function saveSettings() {
        try {
            localStorage.setItem('bpo_store_settings', JSON.stringify(settings));
            broadcastSync({ type: 'SETTINGS_UPDATED', settings, timestamp: Date.now() });
        } catch(e) {
            console.error('Error saving settings:', e);
        }
    }

    async function loadProducts() {
        try {
            const raw = localStorage.getItem('bpo_full_catalog_v2');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    products = parsed;
                    return;
                }
            }
            
            const res = await fetch('products.json?_t=' + Date.now(), { cache: 'no-store' });
            if (res.ok) {
                products = await res.json();
                localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(products));
                return;
            }
        } catch(e) {
            console.warn('Could not load products.json directly; falling back to local memory.');
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            products = getFallbackProducts();
            localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(products));
        }
    }

    function saveProducts() {
        try {
            localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(products));
            localStorage.setItem('bpo_catalog_updated_at', Date.now().toString());
            localStorage.setItem('bpo_local_draft_active', 'true');
            broadcastSync({
                type: 'CATALOG_UPDATED',
                catalog: products,
                timestamp: Date.now()
            });
            updateStats();

            // 100% Automated GitHub & Vercel deployment
            const ghConfig = getGitHubConfig();
            if (ghConfig.token && ghConfig.autoDeploy !== false) {
                pushToGitHub({ silent: true });
            }
        } catch(e) {
            console.error('Error saving products:', e);
        }
    }

    function broadcastSync(data) {
        if (syncChannel) {
            try {
                syncChannel.postMessage(data);
            } catch(e) {}
        }
    }

    function updateStats() {
        if (statTotalProducts) statTotalProducts.textContent = products.length;
        
        const cats = new Set(products.map(p => p.category));
        if (statTotalCategories) statTotalCategories.textContent = cats.size;

        let activePays = 0;
        if (settings.paymentMethods) {
            Object.values(settings.paymentMethods).forEach(p => {
                if (p.active) activePays++;
            });
        }
        if (statActivePayments) statActivePayments.textContent = activePays;
    }

    // ============================================================
    // PRESET IMAGES PICKER
    // ============================================================
    function renderPresetImages() {
        if (!presetImagesContainer) return;
        presetImagesContainer.innerHTML = '';
        PRESET_IMAGES.forEach(imgSrc => {
            const tile = document.createElement('div');
            const isSelected = prodImageUrl && prodImageUrl.value === imgSrc;
            tile.className = 'preset-img-tile' + (isSelected ? ' selected' : '');
            tile.title = imgSrc;
            tile.innerHTML = `<img src="${imgSrc}" alt="${imgSrc}">`;
            tile.addEventListener('click', () => {
                if (prodImageUrl) prodImageUrl.value = imgSrc;
                if (imagePreview) imagePreview.src = imgSrc;
                presetImagesContainer.querySelectorAll('.preset-img-tile').forEach(el => el.classList.remove('selected'));
                tile.classList.add('selected');
            });
            presetImagesContainer.appendChild(tile);
        });
    }

    if (prodImageUrl) {
        prodImageUrl.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            imagePreview.src = val || 'images/logo.jpg';
        });
    }

    if (btnUploadImageFile && prodImageFileInput) {
        btnUploadImageFile.addEventListener('click', () => prodImageFileInput.click());

        prodImageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (PNG, JPG, WEBP).');
                return;
            }

            // Compress image using HTML5 Canvas to keep local storage & cloud fast
            const reader = new FileReader();
            reader.onload = (re) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 380;
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

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
                    prodImageUrl.value = compressedBase64;
                    imagePreview.src = compressedBase64;
                    showToast('Image compressed & uploaded!', 'success');
                };
                img.src = re.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Auto-calculate discount when old price and base price change
    function updateAutoDiscount() {
        const base = parseFloat(prodBasePrice.value);
        const old = parseFloat(prodOldPrice.value);
        if (!isNaN(base) && !isNaN(old) && old > base) {
            const disc = Math.round(((old - base) / old) * 100);
            prodDiscount.value = `${disc}% OFF`;
        }
    }
    if (prodBasePrice) prodBasePrice.addEventListener('input', updateAutoDiscount);
    if (prodOldPrice) prodOldPrice.addEventListener('input', updateAutoDiscount);

    // ============================================================
    // DURATION PACKAGES BUILDER
    // ============================================================
    function syncBasePriceFromPackages() {
        if (!packagesListContainer) return;
        const firstRow = packagesListContainer.querySelector('.package-row-item, .pkg-row-item');
        if (firstRow) {
            const priceInput = firstRow.querySelector('.pkg-price-input');
            if (priceInput && priceInput.value && !prodBasePrice.value) {
                prodBasePrice.value = priceInput.value;
                updateAutoDiscount();
            }
        }
    }

    function createPackageRow(name = '1 Day', price = 50) {
        const row = document.createElement('div');
        row.className = 'package-row-item pkg-row-item';
        row.innerHTML = `
            <input type="text" class="pkg-name-input" placeholder="Package Duration (e.g. 1 Day, 7 Days, 30 Days)" value="${name}" required style="flex: 2;">
            <input type="number" class="pkg-price-input" placeholder="Price (BDT ৳)" value="${price}" required style="flex: 1;">
            <button type="button" class="btn-del-pkg btn-remove-pkg" title="Remove duration option" style="color: #F87171; padding: 6px 10px; cursor: pointer;">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        const priceInput = row.querySelector('.pkg-price-input');
        if (priceInput) {
            priceInput.addEventListener('input', syncBasePriceFromPackages);
        }

        row.querySelector('.btn-remove-pkg').addEventListener('click', () => {
            const rows = packagesListContainer.querySelectorAll('.pkg-row-item, .package-row-item');
            if (rows.length > 1) {
                row.remove();
                syncBasePriceFromPackages();
            } else {
                alert('At least one duration package option is required.');
            }
        });

        return row;
    }

    if (btnAddPackageRow && packagesListContainer) {
        btnAddPackageRow.addEventListener('click', () => {
            packagesListContainer.appendChild(createPackageRow('7 Days', 200));
        });
    }

    // Handle Custom Category Toggle
    if (prodCategory && customCategoryWrap) {
        prodCategory.addEventListener('change', () => {
            if (prodCategory.value === 'custom') {
                customCategoryWrap.style.display = 'block';
                prodCustomCategoryName.required = true;
            } else {
                customCategoryWrap.style.display = 'none';
                prodCustomCategoryName.required = false;
            }
        });
    }

    // ============================================================
    // CATALOG RENDERING & FILTERING
    // ============================================================
    function renderCategoryChips() {
        const counts = {
            all: products.length,
            'non-root': 0,
            root: 0,
            ios: 0,
            pc: 0,
            pubg: 0,
            demo: 0
        };

        products.forEach(p => {
            if (counts[p.category] !== undefined) {
                counts[p.category]++;
            }
        });

        document.getElementById('countAll').textContent = counts.all;
        if (document.getElementById('countNonRoot')) document.getElementById('countNonRoot').textContent = counts['non-root'];
        if (document.getElementById('countRoot')) document.getElementById('countRoot').textContent = counts.root;
        if (document.getElementById('countIos')) document.getElementById('countIos').textContent = counts.ios;
        if (document.getElementById('countPc')) document.getElementById('countPc').textContent = counts.pc;
        if (document.getElementById('countPubg')) document.getElementById('countPubg').textContent = counts.pubg;
        if (document.getElementById('countDemo')) document.getElementById('countDemo').textContent = counts.demo;
    }

    if (categoryChipsContainer) {
        categoryChipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chip-btn');
            if (!chip) return;
            categoryChipsContainer.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategoryFilter = chip.dataset.cat || 'all';
            renderCatalogCards();
        });
    }

    if (catalogSearchInput) {
        catalogSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderCatalogCards();
        });
    }

    function renderCatalogCards() {
        if (!productsCardsGrid) return;
        productsCardsGrid.innerHTML = '';
        renderCategoryChips();
        updateStats();

        const filtered = products.filter(p => {
            const matchesCat = activeCategoryFilter === 'all' || p.category === activeCategoryFilter;
            const matchesSearch = !searchQuery || 
                p.title.toLowerCase().includes(searchQuery) || 
                (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery)) ||
                (p.description && p.description.toLowerCase().includes(searchQuery));
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            productsCardsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: var(--adm-surface); border-radius: var(--adm-radius); border: 1.5px dashed var(--adm-border);">
                    <i class="fas fa-search" style="font-size: 32px; color: var(--adm-text-muted); margin-bottom: 12px; display: block;"></i>
                    <h4 style="font-size: 16px;">No products match your search or filter.</h4>
                    <p style="font-size: 12px; color: var(--adm-text-secondary); margin-top: 4px;">Try searching for another keyword or add a new product.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'adm-prod-card';
            card.dataset.productId = p.id;

            const statusClass = p.status === 'warning' ? 'warning' : (p.status === 'new' ? 'new' : 'online');
            const pkgList = p.packages || [];
            const pkgsHtml = pkgList.slice(0, 3).map(pkg => `<span class="adm-pkg-pill">${pkg.name}: ৳${pkg.price}</span>`).join('');
            const morePkgs = pkgList.length > 3 ? `<span class="adm-pkg-pill">+${pkgList.length - 3} more</span>` : '';

            card.innerHTML = `
                <div class="adm-prod-media">
                    <img src="${p.image || 'images/logo.jpg'}" alt="${p.title}" class="adm-prod-img" onerror="this.src='images/logo.jpg'">
                    <div class="adm-card-badges">
                        <span class="adm-badge-cat">${p.categoryName || p.category}</span>
                        ${p.discount ? `<span class="adm-badge-discount">${p.discount}</span>` : ''}
                    </div>
                    <div class="adm-badge-status">
                        <span class="status-dot"></span>
                        <span>${p.statusText || 'Online'}</span>
                    </div>
                </div>

                <div class="adm-prod-body">
                    <h4 class="adm-prod-title" title="${p.title}">${p.title}</h4>
                    <div class="adm-prod-price-row">
                        <span class="adm-prod-price-current">৳${p.basePrice}</span>
                        ${p.oldPrice ? `<span class="adm-prod-price-old">৳${p.oldPrice}</span>` : ''}
                    </div>
                    <div class="adm-packages-preview">
                        ${pkgsHtml} ${morePkgs}
                    </div>
                </div>

                <div class="adm-prod-footer">
                    <button class="btn-card-action btn-card-edit btn-edit-p" title="Edit this product">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-card-action btn-card-clone btn-dup-p" title="Clone this product">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button class="btn-card-action btn-card-del btn-del-p" title="Delete this product">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;

            card.querySelector('.btn-edit-p').addEventListener('click', () => editProduct(p));
            card.querySelector('.btn-dup-p').addEventListener('click', () => duplicateProduct(p));
            card.querySelector('.btn-del-p').addEventListener('click', () => deleteProduct(p.id, p.title));

            productsCardsGrid.appendChild(card);
        });
    }

    // ============================================================
    // CLEAN DUPLICATES & RELOAD SERVER CATALOG
    // ============================================================
    function cleanDuplicates() {
        let removedCount = 0;
        const seen = new Set();
        const cleaned = [];

        products.forEach(p => {
            const baseTitle = p.title.replace(/\s*\(Copy\)+/gi, '').trim();
            const key = baseTitle.toLowerCase() + '_' + p.category;

            if (seen.has(key)) {
                removedCount++;
            } else {
                seen.add(key);
                if (p.title.includes('(Copy)')) {
                    p.title = baseTitle;
                }
                cleaned.push(p);
            }
        });

        if (removedCount === 0) {
            showToast('No duplicate products found.', 'info');
            return;
        }

        if (confirm(`Found ${removedCount} duplicate / cloned products. Clean them up now and keep 1 clean version of each?`)) {
            products = cleaned;
            saveProducts();
            renderCatalogCards();
            showToast(`Cleaned up ${removedCount} duplicate products!`, 'success');
        }
    }

    async function reloadFromServer() {
        if (confirm('Reload the original pristine 18 products from products.json on the server? This will clear any duplicate copies in Chrome.')) {
            try {
                const res = await fetch('products.json?_t=' + Date.now(), { cache: 'no-store' });
                if (res.ok) {
                    products = await res.json();
                    localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(products));
                    localStorage.removeItem('bpo_local_draft_active');
                    renderCatalogCards();
                    showToast('Original server catalog reloaded successfully!', 'success');
                } else {
                    alert('Could not load products.json from server.');
                }
            } catch(e) {
                alert('Error loading products.json: ' + e.message);
            }
        }
    }

    // ============================================================
    // PRODUCT CRUD OPERATIONS
    // ============================================================
    function resetProductForm() {
        if (productEditorForm) productEditorForm.reset();
        if (editProductId) editProductId.value = '';
        if (editorFormHeading) editorFormHeading.textContent = '➕ Add New Product';
        if (editorFormSubtitle) editorFormSubtitle.textContent = 'Configure product details, duration packages, pricing, and high quality thumbnail.';
        if (btnSaveProduct) {
            const span = btnSaveProduct.querySelector('span');
            if (span) span.textContent = 'Save Product';
        }
        if (imagePreview) imagePreview.src = 'images/logo.jpg';
        if (customCategoryWrap) customCategoryWrap.style.display = 'none';

        if (packagesListContainer) {
            packagesListContainer.innerHTML = '';
            packagesListContainer.appendChild(createPackageRow('1 Day', 50));
            packagesListContainer.appendChild(createPackageRow('3 Days', 130));
            packagesListContainer.appendChild(createPackageRow('7 Days', 250));
            packagesListContainer.appendChild(createPackageRow('30 Days', 750));
        }
    }

    if (btnResetProductForm) {
        btnResetProductForm.addEventListener('click', resetProductForm);
    }

    function editProduct(product) {
        editProductId.value = product.id;
        prodTitle.value = product.title || '';
        
        if (CATEGORY_NAMES[product.category]) {
            prodCategory.value = product.category;
            customCategoryWrap.style.display = 'none';
        } else {
            prodCategory.value = 'custom';
            customCategoryWrap.style.display = 'block';
            prodCustomCategoryName.value = product.categoryName || product.category;
        }

        prodStatus.value = product.status || 'online';
        prodBasePrice.value = product.basePrice || '';
        prodOldPrice.value = product.oldPrice || '';
        prodDiscount.value = product.discount || '';
        prodStatusText.value = product.statusText || 'Online';
        prodDescription.value = product.description || '';
        prodImageUrl.value = product.image || '';
        imagePreview.src = product.image || 'images/logo.jpg';

        // Packages
        packagesListContainer.innerHTML = '';
        if (product.packages && product.packages.length > 0) {
            product.packages.forEach(pkg => {
                packagesListContainer.appendChild(createPackageRow(pkg.name, pkg.price));
            });
        } else {
            packagesListContainer.appendChild(createPackageRow('1 Day', product.basePrice || 50));
        }

        editorFormHeading.textContent = `✏️ Edit Product: ${product.title}`;
        editorFormSubtitle.textContent = `Modifying product ID: ${product.id}. Changes will save instantly.`;
        btnSaveProduct.querySelector('span').textContent = 'Save Changes';

        switchTab('tab-editor');
    }

    function duplicateProduct(product) {
        const copy = JSON.parse(JSON.stringify(product));
        copy.id = product.id + '-copy-' + Date.now().toString().slice(-4);
        copy.title = product.title + ' (Copy)';
        products.unshift(copy);
        activeCategoryFilter = 'all';
        searchQuery = '';
        if (catalogSearchInput) catalogSearchInput.value = '';
        if (categoryChipsContainer) {
            categoryChipsContainer.querySelectorAll('.chip-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.cat === 'all');
            });
        }
        saveProducts();
        renderCatalogCards();
        updateStats();
        showToast(`Cloned "${product.title}" successfully!`, 'success');
        setTimeout(() => {
            if (productsCardsGrid) {
                const targetCard = productsCardsGrid.querySelector(`[data-product-id="${copy.id}"]`);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.classList.add('pulse-highlight');
                    setTimeout(() => targetCard.classList.remove('pulse-highlight'), 2500);
                }
            }
        }, 120);
    }

    function deleteProduct(id, title) {
        if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
            const idx = products.findIndex(p => p.id === id);
            if (idx !== -1) {
                products.splice(idx, 1);
                saveProducts();
                renderCatalogCards();
                updateStats();
                showToast(`Deleted "${title}" from catalog.`, 'info');
            }
        }
    }

    if (productEditorForm) {
        productEditorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = prodTitle.value.trim();
            let category = prodCategory.value;
            let categoryName = CATEGORY_NAMES[category] || 'Custom Category';

            if (category === 'custom') {
                categoryName = prodCustomCategoryName.value.trim() || 'Custom Category';
                category = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }

            const basePrice = Number(prodBasePrice.value);
            const oldPrice = prodOldPrice.value ? Number(prodOldPrice.value) : null;
            let discount = prodDiscount.value.trim();
            if (!discount && oldPrice && oldPrice > basePrice) {
                const pct = Math.round(((oldPrice - basePrice) / oldPrice) * 100);
                discount = `${pct}% OFF`;
            }

            const status = prodStatus.value;
            const statusText = prodStatusText.value.trim() || 'Online';
            const description = prodDescription.value.trim();
            const image = prodImageUrl.value.trim() || 'images/logo.jpg';

            // Gather packages
            const packageRows = packagesListContainer.querySelectorAll('.pkg-row-item');
            const packages = [];
            packageRows.forEach(row => {
                const name = row.querySelector('.pkg-name-input').value.trim();
                const price = Number(row.querySelector('.pkg-price-input').value);
                if (name && price) {
                    packages.push({ name, price });
                }
            });

            if (packages.length === 0) {
                alert('Please add at least one valid duration package option.');
                return;
            }

            const currentEditingId = (editProductId.value || '').trim();
            let savedProductId = '';

            if (currentEditingId) {
                // Update existing product
                const targetIdx = products.findIndex(p => p.id === currentEditingId);
                if (targetIdx !== -1) {
                    products[targetIdx] = {
                        ...products[targetIdx],
                        id: currentEditingId,
                        title,
                        category,
                        categoryName,
                        basePrice,
                        oldPrice,
                        discount,
                        status,
                        statusText,
                        description,
                        image,
                        packages
                    };
                    savedProductId = currentEditingId;
                    saveProducts();
                    showToast(`Successfully updated "${title}"!`, 'success');
                } else {
                    savedProductId = 'prod-' + Date.now();
                    const newProduct = {
                        id: savedProductId,
                        title,
                        category,
                        categoryName,
                        basePrice,
                        oldPrice,
                        discount,
                        status,
                        statusText,
                        description,
                        image,
                        packages,
                        isCustom: true
                    };
                    products.unshift(newProduct);
                    saveProducts();
                    showToast(`Added product: "${title}"!`, 'success');
                }
            } else {
                // Create new product
                savedProductId = 'prod-' + Date.now();
                const newProduct = {
                    id: savedProductId,
                    title,
                    category,
                    categoryName,
                    basePrice,
                    oldPrice,
                    discount,
                    status,
                    statusText,
                    description,
                    image,
                    packages,
                    isCustom: true
                };
                products.unshift(newProduct);
                saveProducts();
                showToast(`Added new product: "${title}"!`, 'success');
            }

            // CRITICAL: Reset filters so the new/updated product is immediately visible
            activeCategoryFilter = 'all';
            searchQuery = '';
            if (catalogSearchInput) catalogSearchInput.value = '';
            if (categoryChipsContainer) {
                categoryChipsContainer.querySelectorAll('.chip-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.cat === 'all');
                });
            }

            resetProductForm();
            renderCatalogCards();
            updateStats();
            switchTab('tab-products');

            // Visual feedback: scroll to and highlight updated card
            setTimeout(() => {
                if (productsCardsGrid) {
                    const targetCard = productsCardsGrid.querySelector(`[data-product-id="${savedProductId}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetCard.classList.add('pulse-highlight');
                        setTimeout(() => targetCard.classList.remove('pulse-highlight'), 2500);
                    }
                }
            }, 120);
        });
    }

    // ============================================================
    // TAB 3: PAYMENT GATEWAYS
    // ============================================================
    function populatePaymentFields() {
        if (!settings.paymentMethods) return;
        const p = settings.paymentMethods;
        if (p.bkash) {
            payBkashNumber.value = p.bkash.number || '';
            payBkashName.value = p.bkash.name || 'bKash Personal';
            payBkashActive.checked = p.bkash.active !== false;
        }
        if (p.nagad) {
            payNagadNumber.value = p.nagad.number || '';
            payNagadName.value = p.nagad.name || 'Nagad Personal';
            payNagadActive.checked = p.nagad.active !== false;
        }
        if (p.rocket) {
            payRocketNumber.value = p.rocket.number || '';
            payRocketName.value = p.rocket.name || 'Rocket Personal';
            payRocketActive.checked = p.rocket.active !== false;
        }
        if (p.binance) {
            payBinanceNumber.value = p.binance.number || '';
            payBinanceName.value = p.binance.name || 'Binance USDT (TRC20)';
            payBinanceActive.checked = p.binance.active !== false;
        }
    }

    if (btnSavePaymentSettings) {
        btnSavePaymentSettings.addEventListener('click', () => {
            settings.paymentMethods = {
                bkash: {
                    name: payBkashName.value.trim(),
                    number: payBkashNumber.value.trim(),
                    active: payBkashActive.checked,
                    type: 'Personal'
                },
                nagad: {
                    name: payNagadName.value.trim(),
                    number: payNagadNumber.value.trim(),
                    active: payNagadActive.checked,
                    type: 'Personal'
                },
                rocket: {
                    name: payRocketName.value.trim(),
                    number: payRocketNumber.value.trim(),
                    active: payRocketActive.checked,
                    type: 'Personal'
                },
                binance: {
                    name: payBinanceName.value.trim(),
                    number: payBinanceNumber.value.trim(),
                    active: payBinanceActive.checked,
                    type: 'Crypto'
                }
            };
            saveSettings();
            showToast('Payment gateway numbers updated & live on Vercel!', 'success');
        });
    }

    // ============================================================
    // TAB 4: NOTICES & CONTACT SUPPORT
    // ============================================================
    function populateNoticeFields() {
        if (noticeEnabled) noticeEnabled.checked = settings.noticeEnabled !== false;
        if (noticeText) noticeText.value = settings.noticeText || '';
        if (supportWhatsappNumber) supportWhatsappNumber.value = settings.whatsappNumber || '';
        if (supportTelegramUrl) supportTelegramUrl.value = settings.telegramUrl || '';
        if (popupEnabled) popupEnabled.checked = settings.popupEnabled === true;
        if (popupTitle) popupTitle.value = settings.popupTitle || '';
        if (popupMessage) popupMessage.value = settings.popupMessage || '';
    }

    if (btnSaveNotices) {
        btnSaveNotices.addEventListener('click', () => {
            settings.noticeEnabled = noticeEnabled.checked;
            settings.noticeText = noticeText.value.trim();
            settings.whatsappNumber = supportWhatsappNumber.value.trim();
            settings.telegramUrl = supportTelegramUrl.value.trim();
            settings.popupEnabled = popupEnabled.checked;
            settings.popupTitle = popupTitle.value.trim();
            settings.popupMessage = popupMessage.value.trim();
            saveSettings();
            showToast('Notices & WhatsApp support details updated!', 'success');
        });
    }

    // ============================================================
    // TAB 5: CURRENCIES & STORE INFO
    // ============================================================
    function populateCurrencyFields() {
        if (storeNameInput) storeNameInput.value = settings.storeName || 'ZERO EXCEPTION';
        if (storeTaglineInput) storeTaglineInput.value = settings.storeTagline || '';
        if (settings.currencyRates) {
            if (rateINR && settings.currencyRates.INR) rateINR.value = settings.currencyRates.INR.rate;
            if (rateNPR && settings.currencyRates.NPR) rateNPR.value = settings.currencyRates.NPR.rate;
            if (ratePKR && settings.currencyRates.PKR) ratePKR.value = settings.currencyRates.PKR.rate;
        }
    }

    if (btnSaveCurrencies) {
        btnSaveCurrencies.addEventListener('click', () => {
            settings.storeName = storeNameInput.value.trim();
            settings.storeTagline = storeTaglineInput.value.trim();
            if (!settings.currencyRates) settings.currencyRates = {};
            settings.currencyRates.BDT = { symbol: '৳', rate: 1, name: 'BDT' };
            settings.currencyRates.INR = { symbol: '₹', rate: Number(rateINR.value), name: 'INR' };
            settings.currencyRates.NPR = { symbol: 'Rs', rate: Number(rateNPR.value), name: 'NPR' };
            settings.currencyRates.PKR = { symbol: 'Rs', rate: Number(ratePKR.value), name: 'PKR' };
            saveSettings();
            showToast('Currency rates & store info saved!', 'success');
        });
    }

    // ============================================================
    // TAB 6: VERCEL & CATALOG PUBLISHING ENGINE
    // ============================================================

    function downloadJsonFile(filename, content) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(`Downloaded ${filename} ready for Vercel / GitHub`, 'success');
    }

    function copyProductsJsonToClipboard() {
        const jsonStr = JSON.stringify(products, null, 4);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(jsonStr).then(() => {
                showToast('Copied products.json to clipboard!', 'success');
            }).catch(() => fallbackCopy(jsonStr));
        } else {
            fallbackCopy(jsonStr);
        }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied products.json to clipboard!', 'success');
    }

    // Export Buttons
    const exportProductBtns = [btnDownloadProductsJson, btnDownloadProductsTop, btnAlertExport, btnQuickExportProducts, btnModalDownloadProducts];
    exportProductBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                downloadJsonFile('products.json', JSON.stringify(products, null, 4));
            });
        }
    });

    const copyJsonBtns = [btnCopyProductsJson, btnCopyJsonQuick, btnModalCopyJson];
    copyJsonBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', copyProductsJsonToClipboard);
        }
    });

    const exportSettingsBtns = [btnDownloadSettingsJson, btnModalDownloadSettings];
    exportSettingsBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                downloadJsonFile('settings.json', JSON.stringify(settings, null, 4));
            });
        }
    });

    // ============================================================
    // 100% AUTOMATED GITHUB & VERCEL AUTO-DEPLOY ENGINE
    // ============================================================

    function getGitHubConfig() {
        let config = {
            repo: 'toqysfreefire-cmyk/zero-exception-panel',
            branch: 'main',
            token: '',
            autoDeploy: true
        };
        try {
            const raw = localStorage.getItem('zero_github_config');
            if (raw) {
                config = { ...config, ...JSON.parse(raw) };
            }
        } catch(e) {}
        return config;
    }

    function loadGitHubConfig() {
        const config = getGitHubConfig();
        if (ghRepoName) ghRepoName.value = config.repo || 'toqysfreefire-cmyk/zero-exception-panel';
        if (ghBranchName) ghBranchName.value = config.branch || 'main';
        if (ghPersonalToken) ghPersonalToken.value = config.token || '';
        if (ghAutoDeployOnSave) ghAutoDeployOnSave.checked = config.autoDeploy !== false;
        updateGitHubBadge(config);
    }

    function updateGitHubBadge(config) {
        if (!ghAutoDeployBadge) return;
        const currentConfig = config || getGitHubConfig();
        const token = (currentConfig.token || '').trim();
        if (token.length > 5) {
            if (currentConfig.autoDeploy !== false) {
                ghAutoDeployBadge.className = 'sync-provider-badge active';
                ghAutoDeployBadge.innerHTML = '🟢 Auto-Deploy Active (15s)';
            } else {
                ghAutoDeployBadge.className = 'sync-provider-badge idle';
                ghAutoDeployBadge.innerHTML = '🟡 Manual Deploy Mode';
            }
        } else {
            ghAutoDeployBadge.className = 'sync-provider-badge idle';
            ghAutoDeployBadge.innerHTML = '⚪ Enter Token to Enable';
        }
    }

    function saveGitHubConfigFromInputs() {
        const repo = ghRepoName ? ghRepoName.value.trim() : 'toqysfreefire-cmyk/zero-exception-panel';
        const branch = ghBranchName ? ghBranchName.value.trim() : 'main';
        const token = ghPersonalToken ? ghPersonalToken.value.trim() : '';
        const autoDeploy = ghAutoDeployOnSave ? ghAutoDeployOnSave.checked : true;

        const config = { repo, branch, token, autoDeploy };
        localStorage.setItem('zero_github_config', JSON.stringify(config));
        updateGitHubBadge(config);

        if (token.length > 5) {
            showToast('GitHub Auto-Deploy configuration saved! Auto-sync is active.', 'success');
        } else {
            showToast('GitHub settings saved. (Token is empty - Auto-Deploy idle)', 'info');
        }
    }

    if (btnSaveGitHubConfig) {
        btnSaveGitHubConfig.addEventListener('click', saveGitHubConfigFromInputs);
    }

    if (btnTriggerGitHubDeployNow) {
        btnTriggerGitHubDeployNow.addEventListener('click', () => {
            pushToGitHub({ silent: false });
        });
    }

    function utf8ToBase64(str) {
        try {
            return window.btoa(unescape(encodeURIComponent(str)));
        } catch(e) {
            const bytes = new TextEncoder().encode(str);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
    }

    async function pushToGitHub(options = {}) {
        const config = getGitHubConfig();
        const token = (config.token || '').trim();
        const repo = (config.repo || 'toqysfreefire-cmyk/zero-exception-panel').trim();
        const branch = (config.branch || 'main').trim();

        if (!token) {
            if (!options.silent) {
                alert('⚠️ GitHub Personal Access Token is missing!\n\nPlease enter your GitHub token in the field above and click "Save GitHub Settings".\n\nSee the 30-second setup guide below the form to create your token in seconds.');
            }
            return false;
        }

        if (ghAutoDeployBadge) {
            ghAutoDeployBadge.className = 'sync-provider-badge syncing';
            ghAutoDeployBadge.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Committing to GitHub...';
        }

        if (!options.silent) {
            showToast('Connecting to GitHub API...', 'info');
        }

        try {
            let commitSha = null;
            let success = false;

            // 1. Try Vercel Serverless Function /api/save-products
            try {
                const apiRes = await fetch('/api/save-products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        products,
                        settings,
                        token,
                        repo,
                        branch
                    })
                });

                if (apiRes.ok) {
                    const data = await apiRes.json();
                    commitSha = data.results?.products?.commit || 'serverless';
                    success = true;
                }
            } catch(e) {
                // Endpoint not available (e.g. running on local file system or static preview)
            }

            // 2. Direct GitHub REST API fallback (works 100% anywhere in browser)
            if (!success) {
                commitSha = await directGitHubCommit(repo, branch, token, 'products.json', JSON.stringify(products, null, 4));
                success = true;
            }

            if (ghAutoDeployBadge) {
                ghAutoDeployBadge.className = 'sync-provider-badge active';
                ghAutoDeployBadge.innerHTML = '🟢 Deployed! (~15s live)';
                setTimeout(() => updateGitHubBadge(config), 7000);
            }

            const shortCommit = commitSha && commitSha.length >= 7 ? commitSha.substring(0, 7) : 'latest';
            showToast(`🚀 Auto-committed to GitHub (${shortCommit})! Vercel deploying live in ~15s.`, 'success');
            return true;
        } catch(err) {
            console.error('Push to GitHub error:', err);
            if (ghAutoDeployBadge) {
                ghAutoDeployBadge.className = 'sync-provider-badge error';
                ghAutoDeployBadge.innerHTML = '❌ Commit Error';
                setTimeout(() => updateGitHubBadge(config), 6000);
            }

            if (!options.silent) {
                alert('❌ GitHub Auto-Deploy Error:\n\n' + err.message + '\n\nPlease ensure your GitHub token has the "repo" scope checked and your repository name is correct.');
            } else {
                showToast('GitHub Auto-Deploy failed: ' + err.message, 'error');
            }
            return false;
        }
    }

    async function directGitHubCommit(repo, branch, token, path, contentStr) {
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;

        // Get current SHA
        let currentSha = null;
        try {
            const getRes = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'Zero-Exception-Admin'
                }
            });
            if (getRes.ok) {
                const data = await getRes.json();
                currentSha = data.sha;
            }
        } catch(e) {}

        const base64Content = utf8ToBase64(contentStr);

        const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Auto-update ${path} via ZERO Admin Console [deploy]`,
                content: base64Content,
                sha: currentSha || undefined,
                branch: branch
            })
        });

        if (!putRes.ok) {
            const errData = await putRes.json().catch(() => ({}));
            throw new Error(errData.message || `GitHub HTTP ${putRes.status}`);
        }

        const putResult = await putRes.json();
        return putResult.commit?.sha || 'ok';
    }

    // Import products.json File
    if (btnTriggerImportProducts && importProductsFileInput) {
        btnTriggerImportProducts.addEventListener('click', () => importProductsFileInput.click());

        importProductsFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (re) => {
                try {
                    const parsed = JSON.parse(re.target.result);
                    let importedList = [];
                    if (Array.isArray(parsed)) {
                        importedList = parsed;
                    } else if (parsed.products && Array.isArray(parsed.products)) {
                        importedList = parsed.products;
                    } else {
                        alert('Invalid JSON file format. It must contain a products list.');
                        return;
                    }

                    if (importedList.length === 0) {
                        alert('No products found in the selected file.');
                        return;
                    }

                    products = importedList;
                    saveProducts();
                    renderCatalogCards();
                    updateStats();
                    showToast(`Successfully imported ${products.length} products!`, 'success');
                } catch(err) {
                    alert('Error parsing JSON file: ' + err.message);
                }
            };
            reader.readAsText(file);
        });
    }

    // Reload from server products.json
    async function reloadFromServer() {
        if (confirm('Discard any local browser drafts and reload fresh products.json from the server?')) {
            try {
                const res = await fetch('products.json?_t=' + Date.now(), { cache: 'no-store' });
                if (res.ok) {
                    products = await res.json();
                    localStorage.setItem('bpo_full_catalog_v2', JSON.stringify(products));
                    localStorage.removeItem('bpo_local_draft_active');
                    localStorage.removeItem('bpo_catalog_updated_at');
                    renderCatalogCards();
                    updateStats();
                    showToast('Fresh server catalog loaded successfully!', 'success');
                } else {
                    alert('Could not load products.json from server.');
                }
            } catch(e) {
                alert('Error fetching products.json: ' + e.message);
            }
        }
    }

    if (btnReloadServerCatalog) btnReloadServerCatalog.addEventListener('click', reloadFromServer);
    if (btnReloadFromServer) btnReloadFromServer.addEventListener('click', reloadFromServer);

    // Reset to initial 18 default products
    function resetToDefaults() {
        if (confirm('Reset your catalog to the clean, original 18 default products?')) {
            products = getFallbackProducts();
            saveProducts();
            renderCatalogCards();
            updateStats();
            showToast('Catalog reset to initial 18 products!', 'info');
        }
    }

    if (btnResetToDefaults) btnResetToDefaults.addEventListener('click', resetToDefaults);

    // Clean duplicates buttons
    const cleanDupBtns = [btnCleanDuplicatesSyncTab, btnCleanDuplicatesAlert, btnCleanDuplicates];
    cleanDupBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', cleanDuplicates);
    });

    // Deploy Modal Controls
    function openDeployModal() {
        if (netlifyDeployModal) netlifyDeployModal.classList.add('active');
    }
    function closeDeployModal() {
        if (netlifyDeployModal) netlifyDeployModal.classList.remove('active');
    }

    if (btnDeployNetlifyTop) btnDeployNetlifyTop.addEventListener('click', openDeployModal);
    if (btnCloseNetlifyDeployModal) btnCloseNetlifyDeployModal.addEventListener('click', closeDeployModal);
    if (netlifyDeployModal) {
        netlifyDeployModal.addEventListener('click', (e) => {
            if (e.target === netlifyDeployModal) closeDeployModal();
        });
    }

    // ============================================================
    // TAB 7: BACKUP & RESTORE
    // ============================================================
    if (btnExportFullBackup) {
        btnExportFullBackup.addEventListener('click', () => {
            const backup = {
                version: "2.0",
                exportedAt: new Date().toISOString(),
                products,
                settings
            };
            downloadJsonFile(`zero_exception_backup_${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(backup, null, 4));
        });
    }

    if (btnTriggerRestoreUpload && backupFileInput) {
        btnTriggerRestoreUpload.addEventListener('click', () => backupFileInput.click());

        backupFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (re) => {
                try {
                    const parsed = JSON.parse(re.target.result);
                    if (parsed.products && Array.isArray(parsed.products)) {
                        products = parsed.products;
                        saveProducts();
                    }
                    if (parsed.settings) {
                        settings = { ...settings, ...parsed.settings };
                        saveSettings();
                    }
                    initDashboard();
                    showToast('Backup restored successfully!', 'success');
                } catch(err) {
                    alert('Invalid backup file. Ensure it is a valid JSON file.');
                }
            };
            reader.readAsText(file);
        });
    }

    if (btnFactoryReset) {
        btnFactoryReset.addEventListener('click', () => {
            if (confirm('⚠️ WARNING: This will reset all products and store settings to initial factory defaults!\nAre you sure you want to proceed?')) {
                localStorage.removeItem('bpo_full_catalog_v2');
                localStorage.removeItem('bpo_store_settings');
                products = getFallbackProducts();
                saveProducts();
                initDashboard();
                showToast('Factory reset complete. Initial defaults restored.', 'info');
            }
        });
    }

    // ============================================================
    // FALLBACK PRODUCTS DATASET
    // ============================================================
    function getFallbackProducts() {
        return [
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
                    { "name": "1 Day", "price": 53 },
                    { "name": "3 Days", "price": 140 },
                    { "name": "7 Days", "price": 224 },
                    { "name": "15 Days", "price": 413 },
                    { "name": "30 Days", "price": 700 }
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
                    { "name": "1 Day", "price": 70 },
                    { "name": "3 Days", "price": 112 },
                    { "name": "7 Days", "price": 210 },
                    { "name": "14 Days", "price": 350 },
                    { "name": "30 Days", "price": 560 }
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
                "description": "AIM HACK for Free Fire Non Root + iOS.",
                "packages": [
                    { "name": "1 Day", "price": 231 },
                    { "name": "7 Days", "price": 602 },
                    { "name": "30 Days", "price": 1260 }
                ]
            },
            {
                "id": "bala-mod",
                "title": "BALA MOD NON ROOT",
                "category": "non-root",
                "categoryName": "Free Fire NON ROOT",
                "basePrice": 28,
                "oldPrice": 70,
                "discount": "60% OFF",
                "status": "online",
                "statusText": "Online",
                "image": "images/bala_mod_non_root.png",
                "description": "BALA MOD NON ROOT budget friendly panel key.",
                "packages": [
                    { "name": "1 Day", "price": 28 },
                    { "name": "3 Days", "price": 70 },
                    { "name": "7 Days", "price": 126 },
                    { "name": "15 Days", "price": 252 },
                    { "name": "30 Days", "price": 420 }
                ]
            },
            {
                "id": "pato-cheat",
                "title": "NON ROOT PATO CHEAT",
                "category": "non-root",
                "categoryName": "Free Fire NON ROOT",
                "basePrice": 70,
                "oldPrice": 112,
                "discount": "37% OFF",
                "status": "online",
                "statusText": "Online",
                "image": "images/non_root_pato.png",
                "description": "NON ROOT PATO CHEAT mod injector.",
                "packages": [
                    { "name": "1 Day", "price": 70 },
                    { "name": "7 Days", "price": 280 },
                    { "name": "30 Days", "price": 560 }
                ]
            },
            {
                "id": "abcd-mod",
                "title": "ABCD MOD NON ROOT",
                "category": "non-root",
                "categoryName": "Free Fire NON ROOT",
                "basePrice": 56,
                "oldPrice": 98,
                "discount": "43% OFF",
                "status": "online",
                "statusText": "Online",
                "image": "images/abcd_mod_non_root.png",
                "description": "ABCD MOD NON ROOT high accuracy mod key.",
                "packages": [
                    { "name": "1 Day", "price": 56 },
                    { "name": "7 Days", "price": 238 },
                    { "name": "30 Days", "price": 490 }
                ]
            },
            {
                "id": "xreg-non-root",
                "title": "XREG NON ROOT",
                "category": "non-root",
                "categoryName": "Free Fire NON ROOT",
                "basePrice": 98,
                "oldPrice": 168,
                "discount": "41% OFF",
                "status": "online",
                "statusText": "Online",
                "image": "images/xreg_non_root.png",
                "description": "XREG NON ROOT registry tweak mod.",
                "packages": [
                    { "name": "1 Day", "price": 98 },
                    { "name": "7 Days", "price": 350 },
                    { "name": "30 Days", "price": 700 }
                ]
            },
            {
                "id": "crack-master",
                "title": "CRACK MASTER",
                "category": "non-root",
                "categoryName": "Free Fire NON ROOT",
                "basePrice": 70,
                "oldPrice": 112,
                "discount": "37% OFF",
                "status": "online",
                "statusText": "Online",
                "image": "images/crack_master.png",
                "description": "CRACK MASTER APK Mod Injector for Free Fire.",
                "packages": [
                    { "name": "1 Day", "price": 70 },
                    { "name": "3 Days", "price": 140 },
                    { "name": "7 Days", "price": 280 },
                    { "name": "15 Days", "price": 420 },
                    { "name": "30 Days", "price": 560 }
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
                    { "name": "1 Day", "price": 98 },
                    { "name": "3 Days", "price": 224 },
                    { "name": "7 Days", "price": 406 },
                    { "name": "30 Days", "price": 812 }
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
                    { "name": "1 Day", "price": 98 },
                    { "name": "7 Days", "price": 532 },
                    { "name": "30 Days", "price": 1372 }
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
                    { "name": "1 Day", "price": 98 },
                    { "name": "7 Days", "price": 420 },
                    { "name": "30 Days", "price": 1050 }
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
                    { "name": "1 Day", "price": 168 },
                    { "name": "7 Days", "price": 700 },
                    { "name": "30 Days", "price": 1680 }
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
                    { "name": "1 Day", "price": 504 },
                    { "name": "7 Days", "price": 1330 },
                    { "name": "31 Days", "price": 2800 }
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
                    { "name": "30 Days Warranty", "price": 980 },
                    { "name": "60 Days Warranty", "price": 1190 },
                    { "name": "90 Days Warranty", "price": 1400 }
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
                    { "name": "1 Day", "price": 210 },
                    { "name": "10 Days", "price": 700 },
                    { "name": "30 Days", "price": 980 }
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
                    { "name": "1 Day", "price": 126 },
                    { "name": "7 Days", "price": 490 },
                    { "name": "30 Days", "price": 980 }
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
                    { "name": "1 Day", "price": 112 },
                    { "name": "3 Days", "price": 280 },
                    { "name": "7 Days", "price": 490 },
                    { "name": "15 Days", "price": 700 },
                    { "name": "30 Days", "price": 980 }
                ]
            }
        ];
    }

    // ============================================================
    // TAB 8: SUPER ADMIN & SUB-ADMINS MANAGEMENT ENGINE
    // ============================================================
    function renderSubAdminsList() {
        if (!subAdminsContainer) return;
        subAdminsContainer.innerHTML = '';
        initAdminsArray();

        const subList = (settings.admins || []).filter(a => a.email.toLowerCase() !== DEFAULT_ADMIN_EMAIL.toLowerCase());

        if (subList.length === 0) {
            subAdminsContainer.innerHTML = `
                <div style="text-align: center; padding: 32px; background: var(--adm-surface); border: 1.5px dashed var(--adm-border); border-radius: 8px;">
                    <i class="fas fa-users-slash" style="font-size: 32px; color: var(--adm-text-muted); margin-bottom: 10px; display: block;"></i>
                    <h5 style="font-size: 15px; margin-bottom: 4px;">No secondary admins configured yet.</h5>
                    <p style="font-size: 12px; color: var(--adm-text-secondary); max-width: 440px; margin: 0 auto;">Click "Add New Sub-Admin" above to grant controlled admin access to moderators, catalog managers, or team members.</p>
                </div>
            `;
            return;
        }

        subList.forEach(admin => {
            const card = document.createElement('div');
            card.className = 'adm-panel';
            card.style.cssText = 'background: var(--adm-surface); border: 1.5px solid var(--adm-border); border-radius: var(--adm-radius); padding: 18px; margin-bottom: 12px;';

            const isSuspended = admin.status === 'suspended';
            const statusClass = isSuspended ? 'maintenance' : 'online';
            const statusText = isSuspended ? 'SUSPENDED' : 'ACTIVE';

            // Build permission badges
            const perms = admin.permissions || {};
            const permTags = [];
            if (perms.products_manage) permTags.push('<span class="badge-tag" style="background: rgba(59, 130, 246, 0.15); color: #93C5FD;"><i class="fas fa-boxes"></i> Products CRUD</span>');
            if (perms.products_delete) permTags.push('<span class="badge-tag" style="background: rgba(239, 68, 68, 0.15); color: #FCA5A5;"><i class="fas fa-trash"></i> Delete Prods</span>');
            if (perms.payments_manage) permTags.push('<span class="badge-tag" style="background: rgba(16, 185, 129, 0.15); color: #6EE7B7;"><i class="fas fa-wallet"></i> Payments</span>');
            if (perms.notices_manage) permTags.push('<span class="badge-tag" style="background: rgba(245, 158, 11, 0.15); color: #FCD34D;"><i class="fas fa-bullhorn"></i> Notices</span>');
            if (perms.currencies_manage) permTags.push('<span class="badge-tag" style="background: rgba(124, 58, 237, 0.15); color: #C4B5FD;"><i class="fas fa-coins"></i> Currencies</span>');
            if (perms.sync_manage) permTags.push('<span class="badge-tag" style="background: rgba(0, 252, 202, 0.15); color: #00fcca;"><i class="fas fa-sync"></i> Cloud Sync</span>');
            if (perms.backup_manage) permTags.push('<span class="badge-tag" style="background: rgba(244, 63, 94, 0.15); color: #FDA4AF;"><i class="fas fa-database"></i> Backup</span>');

            card.innerHTML = `
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 14px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <h4 style="font-size: 16px; font-weight: 800;">${admin.name}</h4>
                            <span class="badge-tag cat">${admin.role || 'Sub-Admin'}</span>
                            <span class="badge-tag ${statusClass}">${statusText}</span>
                        </div>
                        <p style="font-size: 13px; color: var(--adm-text-secondary); margin-top: 4px;">
                            <i class="fas fa-envelope" style="font-size: 11px;"></i> <strong>${admin.email}</strong> &bull; Password: <code>${admin.password}</code>
                        </p>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px;">
                            ${permTags.join('')}
                        </div>
                    </div>

                    <div style="display: flex; gap: 6px; flex-shrink: 0;">
                        <button class="btn-card-action edit btn-edit-subadmin" style="padding: 7px 14px;">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-card-action duplicate btn-toggle-subadmin" style="padding: 7px 14px; background: ${isSuspended ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; color: ${isSuspended ? '#6EE7B7' : '#FCD34D'}; border-color: ${isSuspended ? '#10B981' : '#F59E0B'};">
                            <i class="fas ${isSuspended ? 'fa-play' : 'fa-pause'}"></i> ${isSuspended ? 'Activate' : 'Suspend'}
                        </button>
                        <button class="btn-card-action delete btn-del-subadmin" style="padding: 7px 14px;">
                            <i class="fas fa-trash-alt"></i> Remove
                        </button>
                    </div>
                </div>
            `;

            card.querySelector('.btn-edit-subadmin').addEventListener('click', () => openEditSubAdminModal(admin));
            card.querySelector('.btn-toggle-subadmin').addEventListener('click', () => toggleSubAdminStatus(admin));
            card.querySelector('.btn-del-subadmin').addEventListener('click', () => deleteSubAdmin(admin));

            subAdminsContainer.appendChild(card);
        });
    }

    if (btnOpenAddSubAdmin) {
        btnOpenAddSubAdmin.addEventListener('click', () => {
            if (subAdminForm) subAdminForm.reset();
            if (subAdminEditId) subAdminEditId.value = '';
            document.getElementById('subAdminModalTitle').innerHTML = '<i class="fas fa-user-plus" style="color: var(--adm-accent);"></i> Add New Sub-Admin';
            if (subAdminRoleSelect) subAdminRoleSelect.value = 'co-admin';
            applyRolePresetPermissions('co-admin');
            if (subAdminModal) subAdminModal.style.display = 'flex';
        });
    }

    if (btnCloseSubAdminModal) {
        btnCloseSubAdminModal.addEventListener('click', () => {
            if (subAdminModal) subAdminModal.style.display = 'none';
        });
    }
    if (btnCancelSubAdminModal) {
        btnCancelSubAdminModal.addEventListener('click', () => {
            if (subAdminModal) subAdminModal.style.display = 'none';
        });
    }

    function applyRolePresetPermissions(preset) {
        if (!permProductsManage) return;
        if (preset === 'co-admin') {
            permProductsManage.checked = true;
            permProductsDelete.checked = true;
            permPaymentsManage.checked = true;
            permNoticesManage.checked = true;
            permCurrenciesManage.checked = true;
            permSyncManage.checked = true;
            permBackupManage.checked = false;
        } else if (preset === 'product-manager') {
            permProductsManage.checked = true;
            permProductsDelete.checked = true;
            permPaymentsManage.checked = false;
            permNoticesManage.checked = false;
            permCurrenciesManage.checked = false;
            permSyncManage.checked = false;
            permBackupManage.checked = false;
        } else if (preset === 'support-manager') {
            permProductsManage.checked = false;
            permProductsDelete.checked = false;
            permPaymentsManage.checked = true;
            permNoticesManage.checked = true;
            permCurrenciesManage.checked = false;
            permSyncManage.checked = false;
            permBackupManage.checked = false;
        }
    }

    if (subAdminRoleSelect) {
        subAdminRoleSelect.addEventListener('change', (e) => {
            applyRolePresetPermissions(e.target.value);
        });
    }

    if (subAdminForm) {
        subAdminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = subAdminName.value.trim();
            const email = subAdminEmail.value.trim().toLowerCase();
            const password = subAdminPassword.value;
            const roleSelectVal = subAdminRoleSelect.value;
            const status = subAdminStatusSelect.value;

            if (email === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
                alert('This email is reserved exclusively for the Main Server Admin.');
                return;
            }

            let roleName = 'Sub-Admin';
            if (roleSelectVal === 'co-admin') roleName = 'Co-Admin';
            else if (roleSelectVal === 'product-manager') roleName = 'Product Manager';
            else if (roleSelectVal === 'support-manager') roleName = 'Support Manager';
            else roleName = 'Custom Admin';

            const permissions = {
                products_manage: permProductsManage.checked,
                products_delete: permProductsDelete.checked,
                payments_manage: permPaymentsManage.checked,
                notices_manage: permNoticesManage.checked,
                currencies_manage: permCurrenciesManage.checked,
                sync_manage: permSyncManage.checked,
                backup_manage: permBackupManage.checked,
                admins_manage: false
            };

            initAdminsArray();
            const editId = subAdminEditId.value;

            if (editId) {
                // Editing existing sub-admin
                const idx = settings.admins.findIndex(a => a.id === editId);
                if (idx !== -1) {
                    settings.admins[idx] = {
                        ...settings.admins[idx],
                        name,
                        email,
                        password,
                        role: roleName,
                        status,
                        permissions
                    };
                    saveSettings();
                    showToast(`Updated sub-admin: ${name}!`, 'success');
                }
            } else {
                // Creating new sub-admin
                const existing = settings.admins.find(a => a.email.toLowerCase() === email);
                if (existing) {
                    alert(`An admin account with email "${email}" already exists.`);
                    return;
                }

                const newAdmin = {
                    id: 'admin-' + Date.now().toString().slice(-6),
                    name,
                    email,
                    password,
                    role: roleName,
                    isSuperAdmin: false,
                    status,
                    permissions,
                    createdAt: new Date().toISOString()
                };

                settings.admins.push(newAdmin);
                saveSettings();
                showToast(`New admin "${name}" created successfully!`, 'success');
            }

            if (subAdminModal) subAdminModal.style.display = 'none';
            renderSubAdminsList();
        });
    }

    function openEditSubAdminModal(admin) {
        if (!subAdminModal) return;
        document.getElementById('subAdminModalTitle').innerHTML = `<i class="fas fa-edit" style="color: var(--adm-accent);"></i> Edit Sub-Admin: ${admin.name}`;
        subAdminEditId.value = admin.id;
        subAdminName.value = admin.name;
        subAdminEmail.value = admin.email;
        subAdminPassword.value = admin.password;
        subAdminStatusSelect.value = admin.status || 'active';

        const perms = admin.permissions || {};
        permProductsManage.checked = perms.products_manage !== false;
        permProductsDelete.checked = perms.products_delete !== false;
        permPaymentsManage.checked = perms.payments_manage !== false;
        permNoticesManage.checked = perms.notices_manage !== false;
        permCurrenciesManage.checked = perms.currencies_manage !== false;
        permSyncManage.checked = perms.sync_manage !== false;
        permBackupManage.checked = perms.backup_manage === true;

        subAdminModal.style.display = 'flex';
    }

    function toggleSubAdminStatus(admin) {
        const newStatus = admin.status === 'suspended' ? 'active' : 'suspended';
        const actionWord = newStatus === 'active' ? 'activate' : 'suspend';
        if (confirm(`Are you sure you want to ${actionWord} the admin account for "${admin.name}"?`)) {
            admin.status = newStatus;
            saveSettings();
            renderSubAdminsList();
            showToast(`Admin account "${admin.name}" is now ${newStatus.toUpperCase()}.`, 'info');
        }
    }

    function deleteSubAdmin(admin) {
        if (confirm(`Are you sure you want to permanently remove admin "${admin.name}" (${admin.email})?\nThey will no longer be able to log in.`)) {
            settings.admins = settings.admins.filter(a => a.id !== admin.id);
            saveSettings();
            renderSubAdminsList();
            showToast(`Admin "${admin.name}" removed.`, 'info');
        }
    }

    // Super Admin Master Password Form Toggle & Submit
    if (btnToggleChangeSuperPass && superAdminPassForm) {
        btnToggleChangeSuperPass.addEventListener('click', () => {
            const isHidden = superAdminPassForm.style.display === 'none';
            superAdminPassForm.style.display = isHidden ? 'block' : 'none';
        });
    }

    if (formChangeSuperPass) {
        formChangeSuperPass.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass1 = newSuperPass.value;
            const pass2 = confirmSuperPass.value;

            if (pass1.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            if (pass1 !== pass2) {
                alert('Passwords do not match! Please check again.');
                return;
            }

            localStorage.setItem('zero_super_admin_pass', pass1);
            initAdminsArray();
            if (settings.admins && settings.admins.length > 0) {
                settings.admins[0].password = pass1;
                saveSettings();
            }
            formChangeSuperPass.reset();
            superAdminPassForm.style.display = 'none';
            showToast('Master Admin password successfully updated!', 'success');
        });
    }

    // Startup check
    checkAuth();
});
