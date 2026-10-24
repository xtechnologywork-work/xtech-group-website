/* ==========================================================================
   XTECHNOLOGY GROUP QATAR — Language support (English / Arabic)

   English lives in index.html and is the source of truth. The Arabic
   dictionary below is keyed by the English text (whitespace-normalized),
   so the page needs no per-element keys. Text nodes and a few attributes
   are swapped in place; icons and markup are never touched.

   Brand and product names (XTECHNOLOGY GROUP, ALWALAE, FlexChange, BAQALA)
   and company names stay in Latin script. Latin runs inside Arabic
   sentences that end in punctuation are wrapped in Unicode isolates
   (U+2068 … U+2069) so the punctuation lands in the right place.
   ========================================================================== */

const LANG_KEY = 'xtech-lang';
const SUPPORTED = ['en', 'ar'];
const FSI = '⁨'; // first-strong isolate
const PDI = '⁩'; // pop directional isolate
const iso = (s) => `${FSI}${s}${PDI}`;

/* Static page text: English → Arabic */
const AR = {
  // Document (plain text: browser tabs and search results may show isolate marks as boxes)
  'XTECHNOLOGY GROUP QATAR — Tech Solutions for a Smarter Tomorrow': 'XTECHNOLOGY GROUP QATAR — حلول تقنية لغدٍ أذكى',
  'XTECHNOLOGY GROUP QATAR — Leading enterprise digital architecture, AI intelligent systems, multi-cloud platforms, and mission-critical solutions for Qatar and global markets.':
    'XTECHNOLOGY GROUP QATAR — روّاد في البنية الرقمية للمؤسسات، وأنظمة الذكاء الاصطناعي، ومنصات السحابة المتعددة، والحلول ذات المهام الحرجة لقطر والأسواق العالمية.',

  // Navigation
  'Skip to content': 'تخطَّ إلى المحتوى',
  'XTECHNOLOGY GROUP QATAR — home': `${iso('XTECHNOLOGY GROUP QATAR')} — الصفحة الرئيسية`,
  'XTECHNOLOGY GROUP QATAR — back to top': `${iso('XTECHNOLOGY GROUP QATAR')} — العودة إلى الأعلى`,
  'Main': 'التنقل الرئيسي',
  'Mobile': 'قائمة الجوال',
  'Products': 'المنتجات',
  'Industries': 'القطاعات',
  'Testimonials': 'آراء العملاء',
  'Contact': 'تواصل معنا',
  'Contact us': 'تواصل معنا',
  'Home': 'الرئيسية',

  // Hero
  'Our Vision': 'رؤيتنا',
  'A Smarter Qatar, Powered by Tech.': 'قطر أذكى، مدعومة بالتقنية.',
  'Tech solutions for a smarter tomorrow.': 'حلول تقنية لغدٍ أذكى.',
  'Core capabilities': 'القدرات الأساسية',
  'Enterprise Cloud': 'السحابة المؤسسية',
  'Intelligent AI': 'الذكاء الاصطناعي',
  'National Expansion': 'التوسع الوطني',
  'Start a project': 'ابدأ مشروعك',
  'View products': 'استعرض المنتجات',

  // Capabilities row
  'Capabilities': 'القدرات',
  'AI Systems': 'أنظمة الذكاء الاصطناعي',
  'Qatar Vision 2030': 'رؤية قطر الوطنية 2030',
  'Radical Resilience': 'مرونة استثنائية',
  'Distributed Architecture': 'بنية موزّعة',
  'Sub-Second Latency': 'استجابة في أقل من ثانية',
  'Mission Critical': 'المهام الحرجة',
  'Future Proof': 'جاهزة للمستقبل',

  // Products
  'Official venture ecosystem · Verified suite': 'منظومة المشاريع الرسمية · حزمة موثّقة',
  'Our Products by Xtech': 'منتجاتنا من Xtech',
  'Purpose-built technology platforms and scalable digital ventures engineered in Qatar, solving high-impact friction in retail loyalty, courier cash handling, and hyper-local grocery logistics.':
    'منصات تقنية مصمَّمة لغرض محدد ومشاريع رقمية قابلة للتوسع، طُوِّرت في قطر لمعالجة أبرز التحديات في ولاء عملاء التجزئة، وإدارة النقد لدى شركات التوصيل، ولوجستيات البقالة المحلية.',
  'active in production': 'منتج قيد التشغيل',
  'in development': 'قيد التطوير',
  'Built for Qatar & GCC': 'مصمَّمة لقطر ودول الخليج',
  'Our products': 'منتجاتنا',
  'carousel': 'شريط عرض متحرك',

  'ALWALAE — Digital Loyalty platform logo': 'شعار منصة ALWALAE للولاء الرقمي',
  'Active · Live': 'نشط · مباشر',
  'Enterprise SaaS': 'برمجيات خدمية للمؤسسات',
  'Customer retention platform': 'منصة للاحتفاظ بالعملاء',
  'Digital Loyalty': 'الولاء الرقمي',
  'Next-generation customer loyalty and rewards ecosystem designed for merchants, restaurants, and retail brands in Qatar. Eliminates physical cards with instantaneous QR point accumulation, seamless POS integration, and automated customer retention workflows.':
    'منظومة ولاء ومكافآت من الجيل التالي، مصمَّمة للتجار والمطاعم وعلامات التجزئة في قطر. تُغني عن البطاقات الورقية بتجميع فوري للنقاط عبر رمز QR، وتكامل سلس مع أنظمة نقاط البيع، وسير عمل آلي للاحتفاظ بالعملاء.',
  'Instant POS & QR Merchant Integration': 'تكامل فوري مع نقاط البيع ورموز QR للتجار',
  'Real-Time Cash-Back & Points Ledger': 'سجل فوري لاسترداد النقد والنقاط',
  'Automated Re-engagement Campaigns': 'حملات آلية لإعادة تفاعل العملاء',
  'Explore platform': 'استكشف المنصة',
  'Live in Qatar': 'متاح في قطر',

  'FlexChange driver app logo': 'شعار تطبيق FlexChange للسائقين',
  'In progress · Dev': 'قيد العمل · تطوير',
  'Driver FinTech': 'تقنية مالية للسائقين',
  'Last-mile cashless mobility': 'تنقّل بلا نقد في الميل الأخير',
  'Driver Change App': 'تطبيق الفكّة للسائقين',
  "Dedicated micro-fintech application resolving the cash-on-delivery change challenge for delivery drivers and courier operations in Qatar. Drivers no longer carry loose change; exact coin balances are instantly disbursed to customers' mobile wallets in seconds.":
    'تطبيق متخصص في التقنية المالية يحلّ مشكلة الفكّة في الدفع عند الاستلام لسائقي التوصيل وشركات الشحن في قطر. لم يعد السائق بحاجة إلى حمل الفكّة؛ إذ تُحوَّل المبالغ المتبقية بدقة إلى المحافظ الإلكترونية للعملاء خلال ثوانٍ.',
  'Zero-Change Cash-on-Delivery Settlement': 'تسوية الدفع عند الاستلام دون فكّة',
  'Instant Driver Micro-Wallet Disbursement': 'صرف فوري عبر المحفظة المصغّرة للسائق',
  'Courier Fleet & Dispatch Integration': 'تكامل مع أساطيل التوصيل وأنظمة الإرسال',
  'In development · Beta soon': 'قيد التطوير · النسخة التجريبية قريباً',
  'Active engineering': 'تطوير نشط',

  'BAQALA — neighborhood grocery super app logo': 'شعار BAQALA — التطبيق الشامل لبقالات الأحياء',
  'In progress · Pilot': 'قيد العمل · مرحلة تجريبية',
  'Quick Commerce': 'التجارة السريعة',
  'Qatar grocery super app': 'التطبيق الشامل للبقالة في قطر',
  'Hyper-local grocery super app engineered exclusively for local neighborhood baqalas across Qatar. Digitizes corner store inventories and delivers groceries to doorsteps in under 15 minutes, making daily essentials and home shopping seamless and ultra-fast.':
    'تطبيق شامل للبقالة المحلية، صُمِّم خصيصاً لبقالات الأحياء في جميع أنحاء قطر. يحوّل مخزون المتاجر إلى منصة رقمية ويوصل المشتريات إلى باب المنزل في أقل من 15 دقيقة، ليجعل التسوّق اليومي سلساً وفائق السرعة.',
  'Hyper-Local Baqala Cloud Inventory': 'مخزون سحابي للبقالات المحلية',
  'Sub-15 Minute Doorstep Express Dispatch': 'توصيل سريع إلى الباب في أقل من 15 دقيقة',
  'Native Bilingual Arabic & English UX': 'تجربة استخدام أصيلة بالعربية والإنجليزية',
  'Qatar pilot · Coming soon': 'تجربة في قطر · قريباً',
  'Pilot in Qatar': 'مرحلة تجريبية في قطر',

  // Industries
  'Industry intelligence': 'خبرة قطاعية',
  'Industries We Serve': 'القطاعات التي نخدمها',
  'Specialized AI solutions tailored for diverse industries and their unique challenges.':
    'حلول ذكاء اصطناعي متخصصة، مصمَّمة لمختلف القطاعات وتحدياتها الفريدة.',
  'Universal Integration': 'تكامل شامل',
  'Connect any store or custom platform instantly.': 'اربط أي متجر أو منصة مخصّصة فوراً.',
  'Automated Workflows': 'سير عمل مؤتمت',
  'Trigger actions on leads, sales, and support queries.': 'أطلق إجراءات تلقائية للعملاء المحتملين والمبيعات واستفسارات الدعم.',
  'Real Estate': 'العقارات',
  'Restaurants': 'المطاعم',
  'Logistics': 'الخدمات اللوجستية',
  'Retail': 'التجزئة',
  'Finance': 'الخدمات المالية',
  'E-Commerce': 'التجارة الإلكترونية',

  // Testimonials
  'Enterprise validation': 'ثقة المؤسسات',
  'Trusted by teams who ship': 'موثوقون لدى فرقٍ تُنجز',
  'What engineering leaders, CTOs, and sovereign partners report after deploying XTECH mission-critical architectures.':
    'ما يقوله قادة الهندسة ومديرو التقنية والشركاء السياديون بعد تشغيل بنى XTECH للمهام الحرجة.',

  'Sovereign Cloud': 'السحابة السيادية',
  '“XTECH replaced our legacy monolithic cloud infrastructure with an ultra-resilient sovereign Kubernetes topology across three regions. Zero downtime migration, sub-12ms transaction times.”':
    '«استبدلت XTECH بنيتنا السحابية القديمة أحادية الكتلة بطوبولوجيا Kubernetes سيادية فائقة المرونة عبر ثلاث مناطق. انتقال دون أي توقف، وزمن معاملات أقل من 12 ملّي ثانية.»',
  'Dr. Tariq Al-Mansoor': 'د. طارق المنصور',
  'CTO, Qatar Sovereign Logistics': `الرئيس التنفيذي للتقنية، ${iso('Qatar Sovereign Logistics')}`,

  'Next-Gen Products': 'منتجات الجيل التالي',
  '“Most dev studios deliver slow, bloated templates. XTECH built us a mathematical, zero-bloat edge interface in WebGL and Rust with 99.999% availability.”':
    '«معظم استوديوهات التطوير تقدّم قوالب بطيئة ومثقلة. أما XTECH فبنت لنا واجهة طرفية دقيقة وخالية من الحشو باستخدام WebGL وRust بنسبة توافر 99.999%.»',
  'Elena Rostova': 'إيلينا روستوفا',
  'Chief Architecture Officer, Zenith Data': `رئيسة قسم البنية التقنية، ${iso('Zenith Data')}`,

  "“XTECH isn't just a development studio; they are tactical enterprise architects. Every deliverable was production-grade and security-audited on day one.”":
    '«XTECH ليست مجرد استوديو تطوير؛ بل مهندسو مؤسسات استراتيجيون. كل مُخرَج كان جاهزاً للإنتاج ومدقَّقاً أمنياً منذ اليوم الأول.»',
  'David K. Miller': 'ديفيد ك. ميلر',
  'Managing Director, Sovereign Capital': `المدير العام، ${iso('Sovereign Capital')}`,

  '“Their neural agent deployment pipeline slashed our unstructured financial data processing time from 45 minutes to 3.2 seconds. Exceptional systems engineering from the XTECH team.”':
    '«خفّض مسار نشر الوكلاء العصبيين لديهم زمن معالجة بياناتنا المالية غير المهيكلة من 45 دقيقة إلى 3.2 ثانية. هندسة أنظمة استثنائية من فريق XTECH.»',
  'Marcus Vance': 'ماركوس فانس',
  'VP of Infrastructure, Apex Global Trading': `نائب الرئيس للبنية التحتية، ${iso('Apex Global Trading')}`,

  'Sovereign AI': 'الذكاء الاصطناعي السيادي',
  '“Their sovereign LLM cluster runs strictly on-premise within our sovereign perimeter, keeping our proprietary reservoir intelligence completely secure and isolated.”':
    '«تعمل مجموعة نماذجهم اللغوية السيادية محلياً بالكامل داخل نطاقنا السيادي، مما يُبقي بيانات مكامننا الخاصة آمنة ومعزولة تماماً.»',
  'Nasser Al-Sulaiti': 'ناصر السليطي',
  'Operations Lead, PetroTech Holdings': `قائد العمليات، ${iso('PetroTech Holdings')}`,

  'National Compliance': 'الامتثال الوطني',
  "“In healthcare, sovereign national compliance is non-negotiable. XTECH's zero-trust infrastructure passed every sovereign data audit with flying colors.”":
    '«في القطاع الصحي، لا تهاون في الامتثال الوطني السيادي. وقد اجتازت بنية XTECH القائمة على الثقة الصفرية كل تدقيق للبيانات السيادية بامتياز.»',
  'Fatima Al-Hajri': 'فاطمة الهاجري',
  'Head of Cloud, National Health Grid': `رئيسة الحوسبة السحابية، ${iso('National Health Grid')}`,

  'Zero Trust': 'الثقة الصفرية',
  '“The zero-trust cryptographic perimeter XTECH implemented survived our unannounced red-team offensive penetration audit without a single exposed attack vector.”':
    '«صمد المحيط التشفيري القائم على الثقة الصفرية الذي نفّذته XTECH أمام اختبار اختراق هجومي مفاجئ من الفريق الأحمر، دون أن يُكشف أي منفذ للهجوم.»',
  'Sarah Lin': 'سارة لين',
  'Head of Platform Security, CyberShield ME': `رئيسة أمن المنصات، ${iso('CyberShield ME')}`,

  'Cloud Topology': 'هيكلة السحابة',
  "“Deploying XTECH's enterprise cloud blueprint reduced our multi-cloud computing overhead by 38% while doubling automated disaster recovery redundancy.”":
    '«أدى اعتماد المخطط السحابي المؤسسي من XTECH إلى خفض تكاليف الحوسبة متعددة السحابات لدينا بنسبة 38%، مع مضاعفة قدرات التعافي الآلي من الكوارث.»',
  'James Chen': 'جيمس تشن',
  'Principal Engineer, CloudScale Int.': `مهندس رئيسي، ${iso('CloudScale Int.')}`,

  'Neural Mesh': 'الشبكة العصبية',
  '“The telemetry and real-time observability engineered into our XTECH AI platform gives us microsecond-level insight into our distributed neural mesh.”':
    '«تمنحنا أدوات القياس عن بُعد والمراقبة الفورية المدمجة في منصة الذكاء الاصطناعي من XTECH رؤية دقيقة على مستوى الميكروثانية لشبكتنا العصبية الموزّعة.»',
  'Robert De Vries': 'روبرت دي فريس',
  'Chief Technology Officer, Nordic Edge AI': `الرئيس التنفيذي للتقنية، ${iso('Nordic Edge AI')}`,

  'Fullstack': 'تطوير متكامل',
  "“XTECH's distributed gRPC microservices architecture handled 42,000 requests per second during peak national campaigns without a millisecond of network jitter.”":
    '«تعاملت بنية الخدمات المصغّرة الموزّعة القائمة على gRPC من XTECH مع 42,000 طلب في الثانية خلال ذروة الحملات الوطنية، دون أي تذبذب في الشبكة ولو لملّي ثانية واحدة.»',
  'Khalid Al-Kuwari': 'خالد الكواري',
  'Director of Digital Services, Gulf FinTech Group': `مدير الخدمات الرقمية، ${iso('Gulf FinTech Group')}`,

  'High-Velocity UI': 'واجهات فائقة السرعة',
  "“XTECH engineers don't cut corners. Their edge-rendered architecture delivers instantaneous page interactions across all North African and GCC networks.”":
    '«مهندسو XTECH لا يختصرون الطريق. فبنيتهم المعالَجة على الحافة توفّر تفاعلات فورية مع الصفحات عبر جميع شبكات شمال أفريقيا ودول الخليج.»',
  'Amira Benali': 'أميرة بن علي',
  'VP of Engineering, Maghreb Telecom': `نائبة الرئيس للهندسة، ${iso('Maghreb Telecom')}`,

  'Edge Telemetry': 'القياس عن بُعد على الحافة',
  '“From low-latency embedded telematics to our distributed control plane, XTECH proved why they are the elite engineering tier in the region.”':
    '«من أنظمة القياس المدمجة منخفضة الكمون إلى طبقة التحكم الموزّعة لدينا، أثبتت XTECH لماذا تمثّل نخبة الهندسة في المنطقة.»',
  'Omar Cherif': 'عمر شريف',
  'Founder & CEO, Horizon Autonomous Fleet': `المؤسس والرئيس التنفيذي، ${iso('Horizon Autonomous Fleet')}`,

  // Contact
  'Ready to scale tomorrow?': 'مستعدون للتوسع غداً؟',
  "Let's build": 'لنبنِ معاً',
  'Available for select enterprise strategic contracts, Qatar national digital expansion initiatives, and bespoke AI platform architecture.':
    'متاحون لعقود استراتيجية مختارة مع المؤسسات، ومبادرات التوسع الرقمي الوطني في قطر، وتصميم منصات ذكاء اصطناعي مخصّصة.',
  'Or email us': 'أو راسلنا عبر البريد',
  'Copy email address': 'نسخ عنوان البريد الإلكتروني',

  // Footer
  'Tech solutions for a smarter tomorrow. Sovereign enterprise architecture. Zero downtime. Absolute scalability.':
    'حلول تقنية لغدٍ أذكى. بنية مؤسسية سيادية. دون أي توقف. قابلية توسّع مطلقة.',
  'Company': 'الشركة',
  'Social': 'التواصل الاجتماعي',
  'Headquarters': 'المقر الرئيسي',
  'Doha, Qatar': 'الدوحة، قطر',
  'Security: NCSA compliant': 'الأمن: متوافق مع NCSA',
  'System: 100% operational': 'النظام: يعمل بكفاءة 100%',
  '© 2026 XTECHNOLOGY GROUP QATAR. All rights reserved.': `${iso('© 2026 XTECHNOLOGY GROUP QATAR')}. جميع الحقوق محفوظة.`,
  'Theme': 'المظهر',
  'System theme': 'مظهر النظام',
  'Light theme': 'المظهر الفاتح',
  'Dark theme': 'المظهر الداكن',

  // Inquiry dialog
  'Close': 'إغلاق',
  'Name or organization': 'الاسم أو الجهة',
  'Ministry or enterprise name': 'اسم الوزارة أو المؤسسة',
  'Work email': 'البريد الإلكتروني للعمل',
  'Capability': 'الخدمة المطلوبة',
  'Sovereign Cloud Architecture': 'هندسة السحابة السيادية',
  'AI & Intelligent Systems': 'الذكاء الاصطناعي والأنظمة الذكية',
  'Fullstack High-Concurrency Engineering': 'هندسة متكاملة عالية التزامن',
  'Cybersecurity & Zero Trust': 'الأمن السيبراني والثقة الصفرية',
  'Next-Gen Digital Products': 'منتجات رقمية من الجيل التالي',
  'Project details': 'تفاصيل المشروع',
  'National strategy objectives, compute requirements, budget tier, and timeline goals':
    'أهداف الاستراتيجية الوطنية، ومتطلبات الحوسبة، وفئة الميزانية، والجدول الزمني',
  'Send inquiry': 'إرسال الطلب',
};

/* Strings set from JavaScript (labels that change with state) */
const UI = {
  en: {
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    sliderPause: 'Pause products slider',
    sliderPlay: 'Play products slider',
    testimonialsMore: 'Show all testimonials',
    testimonialsLess: 'Show fewer testimonials',
    formError: 'Please complete the highlighted fields.',
    formThanks: (name) => `Thank you, ${name}. Our team will reply within 4 hours.`,
    copied: 'Email copied to clipboard',
    langSwitchLabel: 'التبديل إلى العربية — Switch to Arabic',
    langTarget: 'العربية',
    langTargetShort: 'ع',
    langTargetCode: 'ar',
  },
  ar: {
    themeToLight: 'التبديل إلى المظهر الفاتح',
    themeToDark: 'التبديل إلى المظهر الداكن',
    menuOpen: 'فتح القائمة',
    menuClose: 'إغلاق القائمة',
    sliderPause: 'إيقاف شريط المنتجات مؤقتاً',
    sliderPlay: 'تشغيل شريط المنتجات',
    testimonialsMore: 'عرض جميع الآراء',
    testimonialsLess: 'عرض آراء أقل',
    formError: 'يرجى استكمال الحقول المحدَّدة.',
    formThanks: (name) => `شكراً لك، ${iso(name)}. سيردّ فريقنا خلال 4 ساعات.`,
    copied: 'تم نسخ البريد الإلكتروني',
    langSwitchLabel: 'Switch to English — التبديل إلى الإنجليزية',
    langTarget: 'English',
    langTargetShort: 'EN',
    langTargetCode: 'en',
  },
};

/* Text that intentionally stays the same in Arabic (only used for the dev check) */
const KEEP = new Set([
  'XTECHNOLOGY GROUP', 'QATAR', 'XTECHNOLOGY GROUP QATAR', 'ALWALAE', 'FlexChange', 'BAQALA',
  'Twitter / X', 'GitHub', 'LinkedIn', 'Discord', 'contact@xtechnology.group', 'you@organization.qa', ':',
]);

const normalize = (text) => text.replace(/\s+/g, ' ').trim();

let current = 'en';
const textEntries = [];
const attrEntries = [];
const TRANSLATED_ATTRS = ['aria-label', 'placeholder', 'alt', 'title', 'aria-roledescription'];

export function getLang() {
  return current;
}

export function t(key, ...args) {
  const value = UI[current][key] ?? UI.en[key];
  return typeof value === 'function' ? value(...args) : value;
}

function readPreference() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en';
}

/* Remember every translatable string in its original (English) form */
function capture() {
  const skip = (el) => !el || el.closest('[data-i18n-skip], script, style, svg, template');

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      normalize(node.nodeValue) && !skip(node.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const raw = node.nodeValue;
    textEntries.push({
      node,
      original: raw,
      key: normalize(raw),
      lead: raw.match(/^\s*/)[0],
      trail: raw.match(/\s*$/)[0],
    });
  }

  const selector = TRANSLATED_ATTRS.map((attr) => `[${attr}]`).join(',');
  document.body.querySelectorAll(selector).forEach((el) => {
    if (skip(el)) return;
    TRANSLATED_ATTRS.forEach((attr) => {
      const value = el.getAttribute(attr);
      if (value && normalize(value)) attrEntries.push({ el, attr, original: value, key: normalize(value) });
    });
  });

  // Document title and description live in <head>
  attrEntries.push({ el: null, attr: 'title', original: document.title, key: normalize(document.title) });
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    const value = description.getAttribute('content');
    attrEntries.push({ el: description, attr: 'content', original: value, key: normalize(value) });
  }
}

function translate(key, original, lang) {
  if (lang === 'en') return original;
  return AR[key] ?? original;
}

function render(lang) {
  const missing = new Set();

  textEntries.forEach((entry) => {
    const value = translate(entry.key, null, lang);
    entry.node.nodeValue = value === null ? entry.original : `${entry.lead}${value}${entry.trail}`;
    if (lang === 'ar' && !AR[entry.key]) missing.add(entry.key);
  });

  attrEntries.forEach((entry) => {
    const value = translate(entry.key, entry.original, lang);
    if (entry.el) entry.el.setAttribute(entry.attr, value);
    else document.title = value;
    if (lang === 'ar' && !AR[entry.key]) missing.add(entry.key);
  });

  // Development aid: flag English text that has no Arabic translation
  if (import.meta.env?.DEV && lang === 'ar') {
    const untranslated = [...missing].filter((key) => /[A-Za-z]/.test(key) && !KEEP.has(key) && !/^[A-Z]{2}$/.test(key));
    if (untranslated.length) console.warn('[i18n] Missing Arabic for:', untranslated);
  }
}

function updateToggles() {
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    const full = btn.querySelector('.lang-full');
    const short = btn.querySelector('.lang-short');
    full.textContent = t('langTarget');
    short.textContent = t('langTargetShort');
    full.lang = short.lang = t('langTargetCode');
    btn.setAttribute('aria-label', t('langSwitchLabel'));
  });
}

export function setLanguage(lang, { save = true } = {}) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;

  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';

  render(lang);
  updateToggles();

  if (save) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage unavailable: language still applies for this visit */
    }
    // Keep a ?lang= link consistent with the choice
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
  }

  root.classList.remove('i18n-pending');
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

export function initLanguage() {
  capture();
  setLanguage(readPreference(), { save: false });

  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(current === 'ar' ? 'en' : 'ar'));
  });
}

export function onLanguageChange(callback) {
  document.addEventListener('languagechange', callback);
}
