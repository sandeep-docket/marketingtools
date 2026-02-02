// Icon Registry - Index of all available icons from Fluent and Huge Icons libraries
// This file provides metadata for searching and filtering icons

export type IconLibrary = 'hugeicons' | 'fluent-filled' | 'fluent-outline';

export interface IconEntry {
  name: string;
  displayName: string;
  library: IconLibrary;
  tags: string[];
}

// =============================================================================
// SEMANTIC KEYWORD MAPPINGS
// Maps search terms to related icon concepts for smarter search
// =============================================================================

const semanticKeywords: Record<string, string[]> = {
  // =============================================================================
  // AI & TECHNOLOGY
  // =============================================================================
  'ai': ['sparkle', 'sparkles', 'magic', 'wand', 'robot', 'brain', 'lightbulb', 'idea', 'star', 'lightning', 'zap', 'flash', 'bolt', 'cpu', 'chip', 'neural', 'smart', 'auto'],
  'artificial intelligence': ['sparkle', 'sparkles', 'magic', 'wand', 'robot', 'brain', 'lightbulb', 'idea', 'star'],
  'machine learning': ['brain', 'neural', 'chart', 'data', 'analytics', 'sparkle', 'magic'],
  'automation': ['robot', 'gear', 'cog', 'settings', 'refresh', 'sync', 'magic', 'sparkle', 'zap'],
  'smart': ['lightbulb', 'brain', 'sparkle', 'magic', 'star', 'idea'],
  'bot': ['robot', 'chat', 'message', 'auto', 'smart', 'sparkle'],
  'chatbot': ['robot', 'chat', 'message', 'comment', 'bubble', 'sparkle', 'smart'],
  'neural': ['brain', 'network', 'connect', 'ai', 'sparkle', 'chart'],
  'algorithm': ['code', 'chart', 'brain', 'flow', 'diagram', 'sparkle'],
  
  // =============================================================================
  // COMMUNICATION
  // =============================================================================
  'email': ['mail', 'envelope', 'inbox', 'send', 'message'],
  'message': ['chat', 'comment', 'bubble', 'mail', 'send', 'inbox'],
  'call': ['phone', 'mobile', 'video', 'mic', 'speaker'],
  'talk': ['chat', 'comment', 'message', 'mic', 'speaker', 'call'],
  'contact': ['person', 'user', 'people', 'phone', 'mail', 'address', 'book'],
  'inbox': ['mail', 'message', 'envelope', 'tray', 'receive'],
  'outbox': ['mail', 'send', 'arrow', 'envelope'],
  'newsletter': ['mail', 'document', 'paper', 'news', 'envelope'],
  'broadcast': ['speaker', 'megaphone', 'announce', 'radio', 'signal'],
  'announce': ['megaphone', 'speaker', 'bell', 'notification'],
  
  // =============================================================================
  // FINANCE & BUSINESS - EXPANDED
  // =============================================================================
  'payment': ['money', 'dollar', 'credit', 'card', 'wallet', 'bank', 'cash', 'currency', 'coin'],
  'finance': ['money', 'dollar', 'chart', 'analytics', 'bank', 'wallet', 'credit', 'invoice', 'trending'],
  'currency': ['money', 'dollar', 'coin', 'wallet', 'bank', 'exchange'],
  'shopping': ['cart', 'bag', 'basket', 'store', 'shop', 'purchase', 'buy'],
  'ecommerce': ['cart', 'bag', 'store', 'shop', 'credit', 'card', 'money', 'payment'],
  // NEW: Revenue & Income
  'revenue': ['money', 'dollar', 'chart', 'trending', 'graph', 'analytics', 'growth', 'wallet', 'cash', 'coin', 'bank', 'income', 'arrow', 'up'],
  'income': ['money', 'dollar', 'wallet', 'cash', 'bank', 'chart', 'trending', 'arrow', 'receive'],
  'profit': ['money', 'dollar', 'chart', 'trending', 'up', 'growth', 'analytics', 'wallet', 'gain'],
  'earnings': ['money', 'dollar', 'chart', 'wallet', 'trending', 'growth', 'cash'],
  'sales': ['money', 'dollar', 'chart', 'trending', 'cart', 'tag', 'receipt', 'growth', 'store'],
  'expense': ['money', 'dollar', 'receipt', 'document', 'minus', 'arrow', 'down', 'wallet'],
  'cost': ['money', 'dollar', 'tag', 'receipt', 'document', 'calculator'],
  'budget': ['money', 'dollar', 'calculator', 'chart', 'pie', 'wallet', 'document', 'plan'],
  'investment': ['money', 'dollar', 'chart', 'trending', 'growth', 'bank', 'seed', 'plant'],
  'investor': ['money', 'person', 'user', 'briefcase', 'chart', 'handshake'],
  'funding': ['money', 'dollar', 'bank', 'chart', 'rocket', 'growth', 'seed'],
  'roi': ['chart', 'trending', 'money', 'percent', 'analytics', 'return', 'growth'],
  'kpi': ['chart', 'target', 'goal', 'analytics', 'dashboard', 'meter', 'gauge'],
  'metrics': ['chart', 'analytics', 'data', 'graph', 'dashboard', 'number', 'statistics'],
  'growth': ['chart', 'trending', 'arrow', 'up', 'plant', 'rocket', 'increase'],
  'decline': ['chart', 'trending', 'arrow', 'down', 'decrease', 'minus'],
  'loss': ['money', 'minus', 'arrow', 'down', 'chart', 'trending', 'sad'],
  'tax': ['money', 'document', 'percent', 'calculator', 'government', 'building'],
  'invoice': ['document', 'receipt', 'money', 'paper', 'bill', 'dollar'],
  'receipt': ['document', 'paper', 'money', 'check', 'bill'],
  'bill': ['document', 'money', 'receipt', 'invoice', 'paper', 'dollar'],
  'pricing': ['money', 'dollar', 'tag', 'label', 'cost', 'list'],
  'subscription': ['refresh', 'calendar', 'money', 'card', 'repeat', 'cycle'],
  'transaction': ['money', 'arrow', 'exchange', 'transfer', 'bank', 'card'],
  'transfer': ['arrow', 'exchange', 'money', 'send', 'bank'],
  'deposit': ['money', 'bank', 'arrow', 'down', 'save', 'wallet'],
  'withdraw': ['money', 'bank', 'arrow', 'up', 'atm', 'cash'],
  'atm': ['money', 'cash', 'card', 'bank', 'machine'],
  'stock': ['chart', 'trending', 'money', 'analytics', 'graph', 'line'],
  'market': ['chart', 'store', 'trending', 'analytics', 'building', 'graph'],
  'trading': ['chart', 'exchange', 'arrow', 'trending', 'analytics'],
  'crypto': ['bitcoin', 'currency', 'coin', 'chart', 'blockchain', 'lock'],
  'bitcoin': ['coin', 'currency', 'money', 'crypto', 'digital'],
  'blockchain': ['chain', 'link', 'lock', 'secure', 'cube', 'block'],
  
  // =============================================================================
  // HEALTHCARE & MEDICAL
  // =============================================================================
  'medical': ['heart', 'plus', 'cross', 'hospital', 'health', 'pill', 'stethoscope', 'doctor'],
  'health': ['heart', 'plus', 'medical', 'hospital', 'pulse', 'activity', 'wellness'],
  'healthcare': ['heart', 'hospital', 'building', 'medical', 'plus', 'doctor'],
  'hospital': ['building', 'medical', 'plus', 'bed', 'health', 'emergency'],
  'doctor': ['person', 'user', 'stethoscope', 'medical', 'health', 'hospital'],
  'nurse': ['person', 'user', 'medical', 'heart', 'health', 'hospital'],
  'patient': ['person', 'user', 'bed', 'medical', 'heart', 'health'],
  'medicine': ['pill', 'capsule', 'medical', 'health', 'bottle', 'pharmacy'],
  'pharmacy': ['pill', 'medicine', 'bottle', 'store', 'medical', 'plus'],
  'prescription': ['document', 'paper', 'pill', 'medical', 'write'],
  'diagnosis': ['stethoscope', 'search', 'medical', 'document', 'report', 'chart'],
  'treatment': ['medical', 'pill', 'heart', 'plus', 'syringe', 'health'],
  'surgery': ['cut', 'medical', 'hospital', 'knife', 'scalpel'],
  'emergency': ['alert', 'warning', 'siren', 'ambulance', 'red', 'urgent', 'exclamation'],
  'ambulance': ['car', 'vehicle', 'emergency', 'medical', 'siren'],
  'vaccine': ['syringe', 'needle', 'medical', 'shield', 'protect'],
  'pill': ['capsule', 'medicine', 'medical', 'tablet', 'drug'],
  'heart rate': ['pulse', 'activity', 'chart', 'line', 'heart', 'monitor'],
  'pulse': ['heart', 'activity', 'chart', 'line', 'wave', 'monitor'],
  'wellness': ['heart', 'health', 'spa', 'yoga', 'meditation', 'balance'],
  'fitness': ['dumbbell', 'weight', 'run', 'activity', 'heart', 'health'],
  'workout': ['dumbbell', 'weight', 'run', 'fitness', 'activity', 'gym'],
  'gym': ['dumbbell', 'weight', 'fitness', 'building', 'workout'],
  'diet': ['food', 'apple', 'health', 'scale', 'leaf', 'nutrition'],
  'nutrition': ['food', 'apple', 'leaf', 'health', 'diet', 'vitamin'],
  'mental health': ['brain', 'heart', 'mind', 'meditation', 'calm', 'wellness'],
  'therapy': ['chat', 'heart', 'brain', 'person', 'couch', 'medical'],
  
  // =============================================================================
  // LEGAL & COMPLIANCE
  // =============================================================================
  'legal': ['scale', 'balance', 'document', 'gavel', 'court', 'law', 'briefcase'],
  'law': ['scale', 'balance', 'gavel', 'court', 'document', 'book'],
  'court': ['gavel', 'scale', 'building', 'legal', 'balance'],
  'contract': ['document', 'paper', 'sign', 'pen', 'handshake', 'agreement'],
  'agreement': ['document', 'handshake', 'contract', 'check', 'sign'],
  'compliance': ['check', 'shield', 'document', 'verified', 'approve', 'clipboard'],
  'policy': ['document', 'shield', 'rule', 'clipboard', 'list'],
  'terms': ['document', 'list', 'contract', 'agreement', 'paper'],
  'license': ['document', 'badge', 'certificate', 'card', 'id'],
  'patent': ['document', 'lightbulb', 'certificate', 'badge', 'shield'],
  'copyright': ['document', 'c', 'circle', 'protect', 'shield'],
  'trademark': ['badge', 'tm', 'brand', 'shield', 'protect'],
  'gdpr': ['shield', 'lock', 'privacy', 'document', 'user', 'europe'],
  'privacy policy': ['document', 'shield', 'lock', 'eye', 'user'],
  'regulation': ['document', 'rule', 'clipboard', 'check', 'government'],
  'audit': ['document', 'search', 'magnify', 'check', 'clipboard', 'report'],
  'lawsuit': ['gavel', 'scale', 'document', 'court', 'legal'],
  'attorney': ['person', 'briefcase', 'scale', 'gavel', 'legal'],
  'lawyer': ['person', 'briefcase', 'scale', 'gavel', 'legal', 'document'],
  
  // =============================================================================
  // EDUCATION & LEARNING
  // =============================================================================
  'education': ['book', 'graduation', 'school', 'learn', 'study', 'academic'],
  'school': ['building', 'book', 'graduation', 'student', 'education'],
  'university': ['building', 'graduation', 'book', 'academic', 'education'],
  'college': ['building', 'graduation', 'book', 'academic', 'education'],
  'student': ['person', 'user', 'book', 'graduation', 'backpack'],
  'teacher': ['person', 'user', 'book', 'presentation', 'board', 'education'],
  'professor': ['person', 'user', 'book', 'graduation', 'academic'],
  'course': ['book', 'video', 'play', 'list', 'education', 'learn'],
  'class': ['people', 'group', 'book', 'education', 'school'],
  'lesson': ['book', 'document', 'learn', 'education', 'lightbulb'],
  'tutorial': ['video', 'play', 'book', 'guide', 'learn', 'lightbulb'],
  'training': ['person', 'book', 'video', 'learn', 'presentation', 'dumbbell'],
  'certification': ['badge', 'certificate', 'award', 'document', 'check'],
  'certificate': ['document', 'badge', 'award', 'ribbon', 'check'],
  'diploma': ['document', 'scroll', 'graduation', 'certificate', 'award'],
  'graduation': ['cap', 'hat', 'certificate', 'education', 'award'],
  'exam': ['document', 'paper', 'check', 'pen', 'clock', 'test'],
  'test': ['document', 'check', 'clipboard', 'pen', 'exam'],
  'quiz': ['question', 'document', 'check', 'game', 'brain'],
  'homework': ['document', 'book', 'pen', 'write', 'home'],
  'assignment': ['document', 'clipboard', 'task', 'check', 'pen'],
  'research': ['search', 'magnify', 'book', 'document', 'science', 'microscope'],
  'study': ['book', 'read', 'document', 'brain', 'learn'],
  'learn': ['book', 'brain', 'lightbulb', 'education', 'video', 'sparkle'],
  'knowledge': ['book', 'brain', 'lightbulb', 'education', 'library'],
  'library': ['book', 'building', 'shelf', 'read', 'education'],
  'ebook': ['book', 'tablet', 'device', 'read', 'digital'],
  'webinar': ['video', 'camera', 'people', 'presentation', 'screen', 'online'],
  'workshop': ['tool', 'wrench', 'people', 'group', 'learn', 'build'],
  
  // =============================================================================
  // FOOD & RESTAURANT
  // =============================================================================
  'food': ['restaurant', 'eat', 'fork', 'knife', 'plate', 'meal', 'dining'],
  'restaurant': ['food', 'building', 'fork', 'knife', 'meal', 'dining'],
  'meal': ['food', 'plate', 'fork', 'knife', 'eat', 'dining'],
  'dining': ['food', 'restaurant', 'table', 'fork', 'knife'],
  'breakfast': ['food', 'coffee', 'egg', 'sun', 'morning'],
  'lunch': ['food', 'sandwich', 'meal', 'sun', 'midday'],
  'dinner': ['food', 'moon', 'meal', 'plate', 'fork', 'knife'],
  'cooking': ['fire', 'flame', 'pot', 'chef', 'kitchen', 'utensil'],
  'recipe': ['document', 'list', 'food', 'book', 'cooking'],
  'chef': ['person', 'hat', 'cooking', 'kitchen', 'food'],
  'kitchen': ['home', 'cooking', 'utensil', 'pot', 'fire'],
  'menu': ['list', 'document', 'food', 'restaurant', 'fork'],
  'order': ['cart', 'list', 'check', 'receipt', 'food'],
  'delivery': ['truck', 'car', 'box', 'package', 'arrow', 'fast'],
  'takeout': ['bag', 'box', 'food', 'arrow', 'out'],
  'coffee': ['cup', 'drink', 'hot', 'cafe', 'bean'],
  'drink': ['cup', 'glass', 'water', 'beverage', 'liquid'],
  'beverage': ['drink', 'cup', 'glass', 'bottle', 'liquid'],
  'wine': ['glass', 'drink', 'grape', 'bottle', 'alcohol'],
  'beer': ['glass', 'drink', 'mug', 'bottle', 'alcohol'],
  'pizza': ['food', 'slice', 'circle', 'cheese', 'restaurant'],
  'burger': ['food', 'fast', 'meal', 'restaurant'],
  'dessert': ['cake', 'sweet', 'ice', 'cream', 'food'],
  'cake': ['dessert', 'birthday', 'sweet', 'candle', 'celebration'],
  
  // =============================================================================
  // REAL ESTATE & PROPERTY
  // =============================================================================
  'real estate': ['home', 'house', 'building', 'key', 'property', 'location'],
  'property': ['home', 'house', 'building', 'key', 'location', 'map'],
  'house': ['home', 'building', 'property', 'key', 'door'],
  'apartment': ['building', 'home', 'property', 'key', 'door'],
  'rent': ['home', 'key', 'money', 'calendar', 'building', 'document'],
  'lease': ['document', 'sign', 'key', 'home', 'calendar'],
  'mortgage': ['home', 'bank', 'money', 'document', 'building'],
  'realtor': ['person', 'home', 'key', 'building', 'handshake'],
  'landlord': ['person', 'home', 'key', 'building', 'money'],
  'tenant': ['person', 'home', 'key', 'building'],
  'moving': ['truck', 'box', 'arrow', 'home', 'package'],
  'renovation': ['tool', 'wrench', 'hammer', 'home', 'build', 'paint'],
  'interior': ['home', 'furniture', 'design', 'sofa', 'lamp'],
  'furniture': ['sofa', 'chair', 'table', 'bed', 'home'],
  'office space': ['building', 'desk', 'chair', 'computer', 'work'],
  
  // =============================================================================
  // SPORTS & FITNESS
  // =============================================================================
  'sports': ['ball', 'trophy', 'medal', 'run', 'play', 'game', 'team'],
  'football': ['ball', 'sports', 'game', 'goal', 'team'],
  'soccer': ['ball', 'sports', 'goal', 'team', 'game'],
  'basketball': ['ball', 'sports', 'hoop', 'net', 'game'],
  'tennis': ['ball', 'racket', 'sports', 'net', 'game'],
  'golf': ['ball', 'club', 'flag', 'hole', 'sports'],
  'swimming': ['water', 'wave', 'pool', 'sports', 'activity'],
  'running': ['run', 'person', 'shoe', 'activity', 'fitness'],
  'cycling': ['bicycle', 'bike', 'wheel', 'activity', 'sports'],
  'yoga': ['meditation', 'person', 'balance', 'wellness', 'health'],
  'meditation': ['peace', 'calm', 'brain', 'wellness', 'yoga', 'zen'],
  'trophy': ['award', 'winner', 'cup', 'medal', 'champion', 'first'],
  'medal': ['award', 'winner', 'trophy', 'badge', 'star', 'ribbon'],
  'champion': ['trophy', 'medal', 'award', 'winner', 'star', 'crown'],
  'score': ['number', 'chart', 'sports', 'game', 'point'],
  'game': ['play', 'controller', 'sports', 'fun', 'entertainment'],
  'match': ['versus', 'sports', 'game', 'people', 'compete'],
  'competition': ['trophy', 'medal', 'sports', 'versus', 'race'],
  'race': ['run', 'fast', 'flag', 'timer', 'clock', 'speed'],
  
  // =============================================================================
  // ENTERTAINMENT & MEDIA
  // =============================================================================
  'entertainment': ['play', 'video', 'music', 'game', 'movie', 'star'],
  'movie': ['film', 'video', 'camera', 'play', 'clapboard', 'cinema'],
  'cinema': ['movie', 'film', 'ticket', 'building', 'popcorn'],
  'theater': ['stage', 'mask', 'curtain', 'ticket', 'movie', 'seat'],
  'concert': ['music', 'mic', 'ticket', 'stage', 'crowd', 'people'],
  'streaming': ['play', 'video', 'wifi', 'cloud', 'live', 'broadcast'],
  'podcast': ['mic', 'audio', 'headphone', 'speaker', 'play', 'voice'],
  'radio': ['speaker', 'signal', 'wave', 'broadcast', 'mic'],
  'tv': ['screen', 'monitor', 'video', 'play', 'remote'],
  'television': ['screen', 'monitor', 'video', 'play', 'remote'],
  'news': ['document', 'paper', 'newspaper', 'globe', 'world', 'broadcast'],
  'magazine': ['book', 'document', 'paper', 'read', 'image'],
  'blog': ['write', 'pen', 'document', 'web', 'article', 'text'],
  'article': ['document', 'text', 'write', 'news', 'paper'],
  'story': ['book', 'document', 'feather', 'write', 'read'],
  'gaming': ['controller', 'game', 'play', 'joystick', 'console'],
  'esports': ['controller', 'trophy', 'game', 'versus', 'team'],
  
  // =============================================================================
  // SOCIAL & REACTIONS
  // =============================================================================
  'like': ['thumb', 'heart', 'star', 'favorite', 'love'],
  'love': ['heart', 'favorite', 'star', 'like', 'thumb'],
  'favorite': ['heart', 'star', 'bookmark', 'like', 'love'],
  'reaction': ['emoji', 'smile', 'face', 'thumb', 'heart', 'star'],
  'happy': ['smile', 'emoji', 'face', 'laugh', 'joy'],
  'sad': ['frown', 'cry', 'face', 'emoji'],
  'angry': ['face', 'emoji', 'mad', 'frown'],
  'celebrate': ['party', 'confetti', 'balloon', 'cake', 'gift', 'trophy'],
  'party': ['balloon', 'confetti', 'cake', 'celebrate', 'music', 'gift'],
  'birthday': ['cake', 'gift', 'balloon', 'party', 'candle', 'celebrate'],
  'wedding': ['ring', 'heart', 'couple', 'love', 'cake', 'celebration'],
  'anniversary': ['heart', 'calendar', 'gift', 'celebrate', 'ring'],
  'social': ['people', 'group', 'share', 'connect', 'network', 'community'],
  'community': ['people', 'group', 'heart', 'home', 'together'],
  'friend': ['person', 'people', 'heart', 'hand', 'together'],
  'follower': ['person', 'people', 'plus', 'add', 'social'],
  'share': ['arrow', 'send', 'social', 'forward', 'network'],
  'comment': ['chat', 'bubble', 'message', 'text', 'reply'],
  'reply': ['arrow', 'chat', 'message', 'comment', 'return'],
  'mention': ['at', 'tag', 'user', 'person', 'notify'],
  'hashtag': ['tag', 'hash', 'trend', 'social', 'topic'],
  'trending': ['fire', 'arrow', 'up', 'chart', 'popular', 'hot'],
  'viral': ['fire', 'trending', 'share', 'spread', 'rocket'],
  
  // =============================================================================
  // SECURITY & ACCESS
  // =============================================================================
  'password': ['lock', 'key', 'shield', 'security', 'secure', 'protect'],
  'secure': ['lock', 'shield', 'key', 'protect', 'safe', 'guard'],
  'protect': ['shield', 'lock', 'guard', 'secure', 'safe'],
  'privacy': ['eye', 'lock', 'shield', 'hidden', 'secure'],
  'authentication': ['lock', 'key', 'fingerprint', 'shield', 'user', 'secure'],
  'login': ['user', 'key', 'lock', 'enter', 'door', 'sign'],
  'logout': ['user', 'arrow', 'exit', 'door', 'sign'],
  'signup': ['user', 'plus', 'add', 'create', 'register'],
  'register': ['user', 'plus', 'add', 'create', 'form'],
  'verify': ['check', 'badge', 'shield', 'approved', 'confirm'],
  'verified': ['check', 'badge', 'shield', 'approved', 'star'],
  'permission': ['lock', 'key', 'check', 'shield', 'access'],
  'access': ['key', 'lock', 'door', 'enter', 'permission'],
  'role': ['user', 'badge', 'shield', 'permission', 'crown'],
  'admin': ['crown', 'shield', 'gear', 'settings', 'user', 'star'],
  'moderator': ['shield', 'user', 'check', 'ban', 'hammer'],
  'ban': ['block', 'cross', 'cancel', 'stop', 'shield'],
  'block': ['stop', 'cancel', 'cross', 'shield', 'hand'],
  'firewall': ['shield', 'fire', 'wall', 'protect', 'security'],
  'antivirus': ['shield', 'bug', 'protect', 'security', 'scan'],
  'encrypt': ['lock', 'key', 'shield', 'code', 'secure'],
  'decrypt': ['unlock', 'key', 'code', 'open'],
  'backup': ['cloud', 'save', 'copy', 'sync', 'restore'],
  'restore': ['refresh', 'arrow', 'back', 'clock', 'history'],
  '2fa': ['lock', 'phone', 'key', 'shield', 'two', 'secure'],
  'mfa': ['lock', 'key', 'shield', 'phone', 'secure', 'multi'],
  
  // =============================================================================
  // MEDIA & CONTENT
  // =============================================================================
  'photo': ['image', 'picture', 'camera', 'gallery', 'album'],
  'picture': ['image', 'photo', 'camera', 'gallery'],
  'video': ['play', 'camera', 'film', 'movie', 'record', 'media'],
  'music': ['note', 'audio', 'sound', 'headphone', 'speaker', 'play'],
  'audio': ['sound', 'music', 'speaker', 'headphone', 'mic', 'volume'],
  'recording': ['mic', 'circle', 'red', 'voice', 'audio', 'video'],
  'live': ['circle', 'red', 'broadcast', 'video', 'stream', 'signal'],
  'stream': ['play', 'wifi', 'video', 'live', 'broadcast'],
  'gallery': ['image', 'grid', 'album', 'photo', 'collection'],
  'album': ['image', 'folder', 'music', 'photo', 'collection'],
  'playlist': ['music', 'list', 'note', 'play', 'queue'],
  'volume': ['speaker', 'sound', 'audio', 'wave', 'slider'],
  'mute': ['speaker', 'off', 'slash', 'volume', 'silent'],
  'subtitle': ['text', 'caption', 'video', 'cc', 'translate'],
  'caption': ['text', 'subtitle', 'image', 'description'],
  'thumbnail': ['image', 'small', 'preview', 'picture'],
  'banner': ['image', 'header', 'wide', 'top', 'cover'],
  'cover': ['image', 'book', 'banner', 'front', 'album'],
  'avatar': ['user', 'person', 'image', 'profile', 'circle'],
  'logo': ['brand', 'image', 'company', 'identity'],
  'icon': ['image', 'small', 'symbol', 'app'],
  
  // =============================================================================
  // FILES & DOCUMENTS
  // =============================================================================
  'file': ['document', 'folder', 'paper', 'page', 'attachment'],
  'document': ['file', 'paper', 'page', 'text', 'doc', 'pdf'],
  'attachment': ['attach', 'clip', 'link', 'file', 'document'],
  'export': ['download', 'arrow', 'share', 'send', 'save'],
  'import': ['upload', 'arrow', 'add', 'receive'],
  'pdf': ['document', 'file', 'acrobat', 'red', 'paper'],
  'word': ['document', 'file', 'text', 'blue', 'microsoft'],
  'excel': ['spreadsheet', 'table', 'grid', 'green', 'microsoft', 'chart'],
  'spreadsheet': ['table', 'grid', 'excel', 'data', 'cell'],
  'powerpoint': ['presentation', 'slide', 'orange', 'microsoft'],
  'csv': ['file', 'data', 'comma', 'table', 'export'],
  'json': ['code', 'data', 'bracket', 'file', 'api'],
  'xml': ['code', 'data', 'tag', 'file'],
  'zip': ['compress', 'archive', 'folder', 'file', 'package'],
  'archive': ['folder', 'box', 'storage', 'old', 'zip'],
  'compress': ['zip', 'shrink', 'small', 'package', 'file'],
  'extract': ['unzip', 'open', 'folder', 'arrow', 'out'],
  'template': ['document', 'layout', 'copy', 'design', 'preset'],
  'draft': ['document', 'pencil', 'write', 'paper', 'incomplete'],
  'version': ['history', 'clock', 'number', 'branch', 'git'],
  'revision': ['history', 'edit', 'change', 'version', 'document'],
  
  // =============================================================================
  // NAVIGATION & UI
  // =============================================================================
  'back': ['arrow', 'left', 'previous', 'return', 'undo'],
  'forward': ['arrow', 'right', 'next', 'proceed'],
  'up': ['arrow', 'top', 'upload', 'rise'],
  'down': ['arrow', 'bottom', 'download', 'drop'],
  'navigate': ['arrow', 'compass', 'map', 'direction', 'location'],
  'menu': ['hamburger', 'list', 'lines', 'nav', 'sidebar'],
  'sidebar': ['panel', 'left', 'menu', 'nav', 'drawer'],
  'header': ['top', 'bar', 'nav', 'title', 'banner'],
  'footer': ['bottom', 'bar', 'nav', 'info'],
  'breadcrumb': ['nav', 'path', 'arrow', 'link', 'trail'],
  'tab': ['folder', 'switch', 'nav', 'page'],
  'modal': ['window', 'popup', 'dialog', 'overlay', 'box'],
  'popup': ['window', 'modal', 'alert', 'dialog', 'box'],
  'tooltip': ['info', 'help', 'hover', 'hint', 'bubble'],
  'dropdown': ['arrow', 'down', 'select', 'menu', 'list'],
  'select': ['dropdown', 'arrow', 'option', 'choice', 'list'],
  'checkbox': ['check', 'box', 'tick', 'select', 'option'],
  'radio': ['circle', 'dot', 'select', 'option', 'choice'],
  'toggle': ['switch', 'on', 'off', 'slider', 'control'],
  'switch': ['toggle', 'on', 'off', 'control', 'slider'],
  'slider': ['range', 'bar', 'control', 'adjust', 'volume'],
  'button': ['click', 'press', 'action', 'rectangle', 'cta'],
  'link': ['chain', 'url', 'connect', 'anchor', 'web'],
  'anchor': ['link', 'hash', 'jump', 'target'],
  'scroll': ['arrow', 'up', 'down', 'page', 'mouse'],
  'zoom': ['magnify', 'search', 'plus', 'minus', 'scale'],
  'fullscreen': ['expand', 'maximize', 'screen', 'arrows'],
  'minimize': ['shrink', 'reduce', 'window', 'minus'],
  'maximize': ['expand', 'fullscreen', 'window', 'plus'],
  'close': ['x', 'cancel', 'remove', 'exit', 'dismiss', 'delete'],
  'collapse': ['arrow', 'shrink', 'fold', 'minimize', 'chevron'],
  'expand': ['arrow', 'grow', 'unfold', 'maximize', 'chevron'],
  
  // =============================================================================
  // TIME & CALENDAR
  // =============================================================================
  'time': ['clock', 'watch', 'timer', 'hour', 'schedule', 'alarm'],
  'schedule': ['calendar', 'clock', 'time', 'event', 'date', 'plan'],
  'date': ['calendar', 'day', 'schedule', 'event', 'time'],
  'deadline': ['clock', 'timer', 'alarm', 'calendar', 'alert', 'warning'],
  'reminder': ['bell', 'notification', 'alarm', 'clock', 'alert'],
  'today': ['calendar', 'day', 'sun', 'date', 'current'],
  'tomorrow': ['calendar', 'arrow', 'day', 'next', 'sun'],
  'yesterday': ['calendar', 'arrow', 'back', 'past', 'history'],
  'week': ['calendar', 'seven', 'days', 'schedule'],
  'month': ['calendar', 'grid', 'days', 'schedule'],
  'year': ['calendar', 'twelve', 'annual', 'cycle'],
  'birthday': ['cake', 'gift', 'calendar', 'candle', 'celebration'],
  'holiday': ['calendar', 'beach', 'umbrella', 'plane', 'vacation'],
  'vacation': ['beach', 'sun', 'plane', 'palm', 'holiday'],
  'weekend': ['calendar', 'sun', 'relax', 'day'],
  'appointment': ['calendar', 'clock', 'event', 'schedule', 'person'],
  'booking': ['calendar', 'check', 'reserve', 'ticket', 'schedule'],
  'reservation': ['calendar', 'check', 'book', 'ticket', 'table'],
  'event': ['calendar', 'star', 'flag', 'bell', 'notification'],
  'milestone': ['flag', 'star', 'check', 'goal', 'target', 'diamond'],
  'history': ['clock', 'arrow', 'back', 'time', 'past', 'list'],
  'recent': ['clock', 'history', 'new', 'latest', 'time'],
  'timer': ['clock', 'countdown', 'stopwatch', 'sand', 'hour'],
  'stopwatch': ['timer', 'clock', 'sports', 'race', 'time'],
  'countdown': ['timer', 'clock', 'number', 'time', 'rocket'],
  'duration': ['clock', 'time', 'length', 'range', 'bar'],
  
  // =============================================================================
  // WEATHER & NATURE
  // =============================================================================
  'weather': ['sun', 'cloud', 'rain', 'snow', 'wind', 'moon', 'temperature'],
  'sunny': ['sun', 'bright', 'day', 'clear', 'weather'],
  'rainy': ['rain', 'cloud', 'drop', 'water', 'umbrella', 'weather'],
  'cloudy': ['cloud', 'weather', 'gray', 'overcast'],
  'snowy': ['snow', 'flake', 'cold', 'winter', 'weather'],
  'windy': ['wind', 'blow', 'leaf', 'weather', 'air'],
  'stormy': ['lightning', 'thunder', 'rain', 'cloud', 'weather'],
  'nature': ['tree', 'leaf', 'plant', 'flower', 'forest', 'green'],
  'eco': ['leaf', 'tree', 'plant', 'recycle', 'green', 'nature'],
  'environment': ['leaf', 'tree', 'earth', 'globe', 'green', 'recycle'],
  'sustainable': ['leaf', 'recycle', 'green', 'eco', 'renewable'],
  'renewable': ['recycle', 'sun', 'wind', 'leaf', 'energy', 'green'],
  'organic': ['leaf', 'plant', 'natural', 'green', 'food'],
  'forest': ['tree', 'nature', 'green', 'wood', 'pine'],
  'ocean': ['water', 'wave', 'fish', 'beach', 'blue', 'sea'],
  'mountain': ['peak', 'nature', 'landscape', 'hike', 'terrain'],
  'beach': ['sun', 'umbrella', 'wave', 'sand', 'vacation'],
  'river': ['water', 'flow', 'nature', 'fish', 'stream'],
  'animal': ['pet', 'paw', 'dog', 'cat', 'bird', 'nature'],
  'pet': ['dog', 'cat', 'paw', 'heart', 'animal'],
  'dog': ['pet', 'paw', 'animal', 'bone'],
  'cat': ['pet', 'paw', 'animal'],
  'bird': ['animal', 'fly', 'feather', 'wing', 'nature'],
  'plant': ['leaf', 'flower', 'tree', 'green', 'nature', 'grow'],
  'flower': ['plant', 'nature', 'bloom', 'garden', 'rose'],
  'garden': ['plant', 'flower', 'leaf', 'nature', 'green'],
  
  // =============================================================================
  // STATUS & FEEDBACK
  // =============================================================================
  'success': ['check', 'tick', 'done', 'complete', 'verified', 'approve'],
  'error': ['cross', 'close', 'cancel', 'fail', 'wrong', 'alert', 'warning', 'danger'],
  'warning': ['alert', 'caution', 'danger', 'exclamation', 'attention'],
  'info': ['information', 'about', 'help', 'question', 'detail'],
  'loading': ['spinner', 'refresh', 'sync', 'progress', 'wait'],
  'progress': ['loading', 'bar', 'percent', 'status', 'step'],
  'pending': ['clock', 'wait', 'time', 'pause', 'hourglass'],
  'approved': ['check', 'success', 'verified', 'badge', 'green'],
  'rejected': ['cross', 'error', 'cancel', 'denied', 'red'],
  'denied': ['cross', 'block', 'stop', 'cancel', 'rejected'],
  'complete': ['check', 'done', 'success', 'finish', 'full'],
  'incomplete': ['circle', 'empty', 'partial', 'pending', 'draft'],
  'active': ['circle', 'green', 'online', 'play', 'live'],
  'inactive': ['circle', 'gray', 'offline', 'pause', 'sleep'],
  'online': ['circle', 'green', 'active', 'wifi', 'connect'],
  'offline': ['circle', 'gray', 'inactive', 'wifi', 'disconnect'],
  'available': ['check', 'green', 'open', 'ready'],
  'unavailable': ['cross', 'red', 'closed', 'busy'],
  'busy': ['clock', 'red', 'occupied', 'working'],
  'away': ['clock', 'yellow', 'moon', 'absent'],
  'new': ['star', 'sparkle', 'badge', 'tag', 'fresh'],
  'updated': ['refresh', 'arrow', 'new', 'change', 'edit'],
  'deprecated': ['warning', 'old', 'archive', 'clock', 'strikethrough'],
  'beta': ['flask', 'test', 'experiment', 'badge', 'b'],
  'alpha': ['flask', 'test', 'experiment', 'badge', 'a'],
  'stable': ['check', 'shield', 'solid', 'reliable'],
  
  // =============================================================================
  // ACTIONS & CRUD
  // =============================================================================
  'create': ['add', 'plus', 'new', 'make', 'compose', 'write'],
  'read': ['eye', 'view', 'book', 'document', 'see'],
  'update': ['edit', 'pencil', 'modify', 'change', 'write', 'refresh'],
  'delete': ['trash', 'bin', 'remove', 'minus', 'cross'],
  'remove': ['delete', 'trash', 'bin', 'minus', 'close', 'cancel'],
  'add': ['plus', 'create', 'new', 'insert'],
  'edit': ['pencil', 'pen', 'write', 'modify', 'update'],
  'view': ['eye', 'see', 'look', 'show', 'visible', 'preview'],
  'hide': ['eye', 'off', 'invisible', 'hidden', 'private'],
  'show': ['eye', 'view', 'visible', 'reveal', 'display'],
  'copy': ['duplicate', 'clone', 'clipboard', 'paste'],
  'paste': ['clipboard', 'insert', 'add'],
  'cut': ['scissors', 'remove', 'clipboard'],
  'duplicate': ['copy', 'clone', 'double', 'plus'],
  'clone': ['copy', 'duplicate', 'branch', 'fork'],
  'move': ['arrow', 'drag', 'transfer', 'hand'],
  'drag': ['hand', 'move', 'grip', 'cursor'],
  'drop': ['arrow', 'down', 'place', 'release'],
  'select': ['check', 'cursor', 'click', 'choose'],
  'deselect': ['check', 'minus', 'remove', 'uncheck'],
  'undo': ['arrow', 'back', 'left', 'return', 'history'],
  'redo': ['arrow', 'forward', 'right', 'repeat'],
  'save': ['disk', 'floppy', 'download', 'check'],
  'cancel': ['cross', 'close', 'stop', 'x', 'exit'],
  'confirm': ['check', 'approve', 'yes', 'done'],
  'submit': ['send', 'arrow', 'check', 'paper', 'plane'],
  'reset': ['refresh', 'clear', 'restart', 'arrow'],
  'clear': ['cross', 'trash', 'empty', 'reset'],
  'print': ['printer', 'paper', 'document', 'output'],
  'scan': ['camera', 'barcode', 'qr', 'document'],
  'sort': ['arrow', 'up', 'down', 'order', 'az'],
  'filter': ['funnel', 'sort', 'search', 'narrow'],
  'search': ['magnify', 'find', 'lookup', 'query', 'glass'],
  'find': ['search', 'magnify', 'lookup', 'query'],
  'replace': ['swap', 'exchange', 'change', 'switch'],
  'merge': ['combine', 'join', 'union', 'branch', 'git'],
  'split': ['divide', 'separate', 'cut', 'fork'],
  'group': ['folder', 'combine', 'merge', 'stack'],
  'ungroup': ['separate', 'split', 'divide', 'unstack'],
  
  // =============================================================================
  // DEVELOPMENT & CODE
  // =============================================================================
  'code': ['developer', 'programming', 'terminal', 'console', 'script', 'bracket'],
  'developer': ['code', 'terminal', 'git', 'branch', 'bug', 'api'],
  'programming': ['code', 'terminal', 'bracket', 'script', 'function'],
  'debug': ['bug', 'fix', 'error', 'code', 'test'],
  'api': ['code', 'connect', 'link', 'interface', 'integration', 'plug'],
  'git': ['branch', 'merge', 'commit', 'code', 'version'],
  'branch': ['git', 'fork', 'tree', 'split', 'version'],
  'commit': ['git', 'check', 'save', 'version', 'push'],
  'push': ['git', 'arrow', 'up', 'upload', 'send'],
  'pull': ['git', 'arrow', 'down', 'download', 'receive'],
  'merge': ['git', 'combine', 'branch', 'union', 'join'],
  'fork': ['git', 'branch', 'split', 'copy', 'code'],
  'deploy': ['rocket', 'cloud', 'server', 'upload', 'launch'],
  'release': ['rocket', 'tag', 'version', 'publish', 'launch'],
  'build': ['hammer', 'tool', 'construct', 'compile', 'gear'],
  'compile': ['gear', 'code', 'build', 'process'],
  'test': ['check', 'flask', 'bug', 'experiment', 'verify'],
  'unit test': ['check', 'code', 'function', 'verify'],
  'integration': ['connect', 'plug', 'link', 'api', 'combine'],
  'ci': ['gear', 'refresh', 'circle', 'auto', 'build'],
  'cd': ['rocket', 'deploy', 'auto', 'gear'],
  'pipeline': ['flow', 'arrow', 'process', 'gear', 'chain'],
  'container': ['box', 'docker', 'cube', 'package'],
  'docker': ['container', 'whale', 'box', 'ship'],
  'kubernetes': ['helm', 'wheel', 'container', 'cloud'],
  'server': ['computer', 'database', 'cloud', 'rack', 'hosting'],
  'database': ['storage', 'cylinder', 'data', 'table', 'server'],
  'sql': ['database', 'table', 'query', 'code'],
  'nosql': ['database', 'document', 'mongodb', 'data'],
  'cache': ['lightning', 'fast', 'memory', 'storage', 'clock'],
  'queue': ['list', 'stack', 'wait', 'line', 'order'],
  'webhook': ['link', 'arrow', 'api', 'connect', 'hook'],
  'sdk': ['code', 'package', 'library', 'tool', 'box'],
  'library': ['book', 'code', 'package', 'module'],
  'framework': ['layout', 'structure', 'code', 'grid'],
  'module': ['box', 'cube', 'package', 'code'],
  'package': ['box', 'gift', 'module', 'npm', 'download'],
  'npm': ['package', 'box', 'javascript', 'download'],
  'terminal': ['console', 'command', 'code', 'shell', 'prompt'],
  'console': ['terminal', 'code', 'command', 'log'],
  'log': ['document', 'list', 'history', 'console', 'terminal'],
  
  // =============================================================================
  // BUSINESS & WORK
  // =============================================================================
  'meeting': ['calendar', 'video', 'call', 'people', 'team', 'conference'],
  'presentation': ['screen', 'chart', 'slide', 'display', 'projector'],
  'report': ['document', 'chart', 'analytics', 'data', 'file', 'paper'],
  'task': ['check', 'list', 'todo', 'checkbox', 'done', 'complete'],
  'project': ['folder', 'file', 'task', 'kanban', 'board', 'plan'],
  'team': ['people', 'group', 'users', 'collaborate', 'together'],
  'employee': ['person', 'user', 'badge', 'id', 'work'],
  'employer': ['building', 'person', 'briefcase', 'company'],
  'manager': ['person', 'star', 'crown', 'team', 'lead'],
  'ceo': ['person', 'crown', 'building', 'chief', 'star'],
  'hr': ['people', 'person', 'user', 'heart', 'handshake'],
  'human resources': ['people', 'person', 'user', 'heart', 'briefcase'],
  'hiring': ['person', 'plus', 'add', 'search', 'briefcase'],
  'recruit': ['person', 'search', 'add', 'briefcase', 'hiring'],
  'interview': ['person', 'chat', 'video', 'calendar', 'mic'],
  'onboarding': ['person', 'arrow', 'enter', 'door', 'start'],
  'offboarding': ['person', 'arrow', 'exit', 'door', 'leave'],
  'salary': ['money', 'dollar', 'person', 'bank', 'pay'],
  'payroll': ['money', 'dollar', 'document', 'calendar', 'list'],
  'benefits': ['heart', 'gift', 'star', 'health', 'person'],
  'performance': ['chart', 'trending', 'star', 'graph', 'speed'],
  'review': ['star', 'chat', 'document', 'person', 'feedback'],
  'feedback': ['chat', 'message', 'star', 'comment', 'review'],
  'survey': ['document', 'list', 'checkbox', 'question', 'chart'],
  'poll': ['chart', 'bar', 'vote', 'question', 'check'],
  'vote': ['check', 'hand', 'ballot', 'box', 'poll'],
  'workflow': ['flow', 'arrow', 'process', 'gear', 'diagram'],
  'process': ['gear', 'flow', 'arrow', 'cycle', 'step'],
  'kanban': ['board', 'column', 'card', 'task', 'drag'],
  'sprint': ['run', 'clock', 'fast', 'rocket', 'agile'],
  'agile': ['refresh', 'cycle', 'sprint', 'kanban', 'board'],
  'scrum': ['people', 'cycle', 'agile', 'sprint', 'board'],
  'backlog': ['list', 'stack', 'task', 'queue', 'wait'],
  'roadmap': ['map', 'path', 'route', 'plan', 'milestone', 'flag'],
  'strategy': ['chess', 'target', 'lightbulb', 'plan', 'brain'],
  'goal': ['target', 'flag', 'trophy', 'star', 'check'],
  'target': ['circle', 'aim', 'goal', 'bullseye', 'crosshair'],
  'objective': ['target', 'goal', 'flag', 'check', 'list'],
  'okr': ['target', 'goal', 'chart', 'check', 'key'],
  'kpi': ['chart', 'target', 'gauge', 'meter', 'analytics'],
  
  // =============================================================================
  // CUSTOMER & SUPPORT
  // =============================================================================
  'customer': ['person', 'user', 'people', 'star', 'service'],
  'client': ['person', 'user', 'briefcase', 'handshake', 'building'],
  'service': ['gear', 'support', 'headphone', 'chat', 'help'],
  'support': ['help', 'question', 'headphone', 'chat', 'message', 'ticket'],
  'ticket': ['tag', 'document', 'support', 'help', 'issue'],
  'issue': ['bug', 'alert', 'warning', 'ticket', 'flag'],
  'bug': ['insect', 'error', 'code', 'fix', 'alert'],
  'request': ['hand', 'arrow', 'ask', 'question', 'document'],
  'inquiry': ['question', 'search', 'ask', 'mail', 'message'],
  'complaint': ['sad', 'face', 'alert', 'warning', 'message'],
  'satisfaction': ['smile', 'happy', 'star', 'heart', 'thumb'],
  'rating': ['star', 'number', 'review', 'score', 'grade'],
  'review': ['star', 'comment', 'chat', 'feedback', 'rating'],
  'testimonial': ['quote', 'chat', 'person', 'star', 'review'],
  'faq': ['question', 'help', 'list', 'book', 'info'],
  'knowledge base': ['book', 'database', 'search', 'document', 'help'],
  'documentation': ['book', 'document', 'code', 'file', 'read'],
  'guide': ['book', 'map', 'compass', 'document', 'help'],
  'tutorial': ['video', 'play', 'learn', 'book', 'guide'],
  'chatbot': ['robot', 'chat', 'message', 'auto', 'smart'],
  'live chat': ['chat', 'message', 'circle', 'green', 'headphone'],
  'call center': ['phone', 'headphone', 'people', 'building'],
  'crm': ['people', 'database', 'chart', 'user', 'contact'],
  'lead': ['person', 'star', 'target', 'funnel', 'chart'],
  'prospect': ['person', 'search', 'target', 'funnel'],
  'conversion': ['funnel', 'arrow', 'check', 'target', 'chart'],
  'funnel': ['filter', 'arrow', 'chart', 'conversion', 'triangle'],
  'retention': ['user', 'refresh', 'heart', 'return', 'cycle'],
  'churn': ['user', 'arrow', 'exit', 'minus', 'sad'],
  'lifetime value': ['user', 'money', 'chart', 'heart', 'clock'],
  'nps': ['chart', 'smile', 'number', 'score', 'survey'],
  
  // =============================================================================
  // MARKETING & GROWTH
  // =============================================================================
  'marketing': ['megaphone', 'chart', 'target', 'trending', 'people'],
  'campaign': ['megaphone', 'flag', 'rocket', 'target', 'calendar'],
  'advertisement': ['megaphone', 'banner', 'image', 'dollar', 'target'],
  'ads': ['megaphone', 'banner', 'dollar', 'target', 'click'],
  'banner': ['image', 'rectangle', 'ad', 'header', 'display'],
  'promotion': ['tag', 'percent', 'star', 'megaphone', 'gift'],
  'discount': ['tag', 'percent', 'minus', 'money', 'sale'],
  'coupon': ['tag', 'scissors', 'percent', 'ticket', 'gift'],
  'sale': ['tag', 'percent', 'cart', 'money', 'star'],
  'offer': ['gift', 'tag', 'star', 'hand', 'percent'],
  'deal': ['handshake', 'tag', 'money', 'percent', 'star'],
  'seo': ['search', 'chart', 'trending', 'globe', 'link'],
  'sem': ['search', 'dollar', 'chart', 'click', 'ad'],
  'ppc': ['click', 'dollar', 'cursor', 'ad', 'chart'],
  'ctr': ['click', 'percent', 'chart', 'cursor', 'arrow'],
  'impression': ['eye', 'view', 'chart', 'number'],
  'reach': ['people', 'globe', 'expand', 'broadcast', 'chart'],
  'engagement': ['heart', 'chat', 'share', 'comment', 'people'],
  'viral': ['fire', 'trending', 'rocket', 'share', 'spread'],
  'influencer': ['person', 'star', 'megaphone', 'people', 'camera'],
  'brand': ['tag', 'star', 'heart', 'logo', 'identity'],
  'branding': ['brush', 'color', 'logo', 'star', 'identity'],
  'awareness': ['eye', 'people', 'globe', 'megaphone', 'chart'],
  'launch': ['rocket', 'arrow', 'up', 'star', 'calendar'],
  'landing page': ['page', 'document', 'arrow', 'down', 'web'],
  'cta': ['button', 'arrow', 'click', 'action', 'target'],
  'ab test': ['split', 'chart', 'a', 'b', 'experiment'],
  'experiment': ['flask', 'test', 'chart', 'lightbulb', 'science'],
  'hypothesis': ['question', 'lightbulb', 'brain', 'chart'],
  'segment': ['pie', 'divide', 'group', 'people', 'filter'],
  'persona': ['person', 'user', 'target', 'document', 'profile'],
  'audience': ['people', 'group', 'target', 'megaphone', 'eye'],
  'demographic': ['people', 'chart', 'pie', 'graph', 'group'],
  
  // =============================================================================
  // TRAVEL & LOCATION
  // =============================================================================
  'travel': ['airplane', 'plane', 'car', 'map', 'location', 'globe', 'world'],
  'location': ['map', 'pin', 'marker', 'place', 'gps', 'navigate'],
  'direction': ['arrow', 'compass', 'map', 'navigate', 'route'],
  'global': ['globe', 'world', 'earth', 'international', 'worldwide'],
  'flight': ['airplane', 'plane', 'ticket', 'departure', 'sky'],
  'airport': ['airplane', 'building', 'plane', 'terminal', 'travel'],
  'hotel': ['building', 'bed', 'key', 'suitcase', 'star'],
  'booking': ['calendar', 'check', 'ticket', 'plane', 'hotel'],
  'reservation': ['calendar', 'check', 'ticket', 'table', 'book'],
  'ticket': ['pass', 'document', 'qr', 'barcode', 'event'],
  'passport': ['document', 'id', 'person', 'travel', 'book'],
  'visa': ['document', 'stamp', 'passport', 'travel'],
  'luggage': ['suitcase', 'bag', 'travel', 'briefcase'],
  'suitcase': ['luggage', 'bag', 'travel', 'briefcase'],
  'backpack': ['bag', 'travel', 'student', 'hike'],
  'destination': ['pin', 'location', 'flag', 'map', 'target'],
  'route': ['path', 'map', 'arrow', 'direction', 'line'],
  'gps': ['location', 'satellite', 'pin', 'map', 'signal'],
  'navigation': ['compass', 'map', 'arrow', 'direction', 'gps'],
  'compass': ['direction', 'navigation', 'north', 'arrow'],
  'map': ['location', 'pin', 'route', 'direction', 'world'],
  'taxi': ['car', 'ride', 'yellow', 'travel', 'transport'],
  'uber': ['car', 'ride', 'phone', 'location', 'app'],
  'bus': ['vehicle', 'transport', 'public', 'travel'],
  'train': ['rail', 'transport', 'public', 'travel', 'station'],
  'subway': ['train', 'underground', 'metro', 'transport'],
  'ship': ['boat', 'water', 'cruise', 'anchor', 'wave'],
  'cruise': ['ship', 'boat', 'water', 'vacation', 'wave'],
  
  // =============================================================================
  // DEVICES & HARDWARE
  // =============================================================================
  'mobile': ['phone', 'smartphone', 'device', 'cellular'],
  'computer': ['desktop', 'laptop', 'pc', 'monitor', 'screen'],
  'device': ['phone', 'tablet', 'laptop', 'desktop', 'watch'],
  'hardware': ['cpu', 'chip', 'memory', 'storage', 'disk', 'usb'],
  'smartphone': ['phone', 'mobile', 'touch', 'app'],
  'tablet': ['device', 'screen', 'touch', 'ipad'],
  'laptop': ['computer', 'device', 'keyboard', 'screen'],
  'desktop': ['computer', 'monitor', 'screen', 'tower'],
  'monitor': ['screen', 'display', 'desktop', 'tv'],
  'screen': ['monitor', 'display', 'device', 'window'],
  'keyboard': ['type', 'input', 'computer', 'keys'],
  'mouse': ['cursor', 'pointer', 'click', 'computer'],
  'trackpad': ['touch', 'cursor', 'laptop', 'gesture'],
  'printer': ['print', 'paper', 'document', 'output'],
  'scanner': ['scan', 'document', 'barcode', 'camera'],
  'camera': ['photo', 'picture', 'video', 'capture', 'lens'],
  'webcam': ['camera', 'video', 'call', 'meeting', 'face'],
  'microphone': ['mic', 'audio', 'record', 'voice', 'speak'],
  'speaker': ['audio', 'sound', 'volume', 'music', 'output'],
  'headphone': ['audio', 'music', 'listen', 'ear', 'sound'],
  'earbuds': ['headphone', 'audio', 'wireless', 'music'],
  'smartwatch': ['watch', 'wearable', 'fitness', 'time'],
  'wearable': ['watch', 'device', 'fitness', 'smart'],
  'vr': ['headset', 'virtual', '3d', 'immersive', 'game'],
  'ar': ['augmented', 'camera', 'overlay', 'reality'],
  'usb': ['plug', 'connect', 'cable', 'port', 'storage'],
  'cable': ['wire', 'connect', 'plug', 'cord'],
  'charger': ['battery', 'power', 'plug', 'lightning', 'cable'],
  'battery': ['power', 'charge', 'energy', 'bolt', 'level'],
  'wifi': ['signal', 'wireless', 'internet', 'connect', 'network'],
  'bluetooth': ['wireless', 'connect', 'signal', 'device'],
  'router': ['wifi', 'signal', 'network', 'internet'],
  'modem': ['wifi', 'internet', 'signal', 'connect'],
  
  // =============================================================================
  // CLOUD & STORAGE
  // =============================================================================
  'cloud': ['storage', 'server', 'upload', 'download', 'sync', 'backup'],
  'storage': ['cloud', 'disk', 'drive', 'database', 'memory', 'save'],
  'backup': ['cloud', 'save', 'copy', 'sync', 'restore'],
  'sync': ['refresh', 'cloud', 'update', 'synchronize', 'reload'],
  'upload': ['arrow', 'up', 'cloud', 'send', 'file'],
  'download': ['arrow', 'down', 'cloud', 'receive', 'file'],
  'server': ['computer', 'rack', 'database', 'cloud', 'hosting'],
  'hosting': ['server', 'cloud', 'web', 'domain', 'globe'],
  'domain': ['globe', 'web', 'link', 'at', 'hosting'],
  'dns': ['globe', 'server', 'domain', 'network'],
  'cdn': ['globe', 'server', 'fast', 'cloud', 'network'],
  'aws': ['cloud', 'server', 'amazon', 'cube', 'orange'],
  'azure': ['cloud', 'microsoft', 'server', 'blue'],
  'gcp': ['cloud', 'google', 'server', 'colorful'],
  'saas': ['cloud', 'software', 'subscription', 'app'],
  'paas': ['cloud', 'platform', 'code', 'server'],
  'iaas': ['cloud', 'infrastructure', 'server', 'rack'],
  
  // =============================================================================
  // CREATIVITY & DESIGN
  // =============================================================================
  'design': ['paint', 'brush', 'palette', 'color', 'art', 'creative', 'pencil'],
  'creative': ['sparkle', 'lightbulb', 'idea', 'magic', 'wand', 'star', 'design'],
  'art': ['paint', 'brush', 'palette', 'canvas', 'draw', 'creative'],
  'inspiration': ['lightbulb', 'idea', 'sparkle', 'star', 'magic', 'brain'],
  'sketch': ['pencil', 'draw', 'paper', 'line', 'draft'],
  'drawing': ['pencil', 'pen', 'art', 'sketch', 'canvas'],
  'illustration': ['image', 'art', 'draw', 'vector', 'graphic'],
  'graphic': ['image', 'design', 'art', 'vector', 'visual'],
  'vector': ['bezier', 'pen', 'path', 'graphic', 'svg'],
  'ui': ['layout', 'design', 'screen', 'interface', 'component'],
  'ux': ['user', 'experience', 'design', 'flow', 'research'],
  'wireframe': ['layout', 'box', 'grid', 'skeleton', 'draft'],
  'prototype': ['click', 'play', 'design', 'test', 'demo'],
  'mockup': ['image', 'device', 'design', 'preview', 'frame'],
  'layout': ['grid', 'box', 'arrange', 'design', 'structure'],
  'grid': ['layout', 'columns', 'rows', 'table', 'arrange'],
  'typography': ['font', 'text', 'letter', 'aa', 'type'],
  'font': ['text', 'typography', 'letter', 'style'],
  'color': ['palette', 'dropper', 'paint', 'rainbow', 'hue'],
  'palette': ['color', 'paint', 'brush', 'art', 'swatch'],
  'gradient': ['color', 'blend', 'rainbow', 'transition'],
  'shadow': ['box', 'drop', 'depth', 'layer', 'effect'],
  'blur': ['effect', 'fuzzy', 'soft', 'filter'],
  'filter': ['funnel', 'effect', 'adjust', 'image'],
  'crop': ['cut', 'image', 'frame', 'resize', 'trim'],
  'resize': ['scale', 'expand', 'shrink', 'dimension'],
  'rotate': ['turn', 'spin', 'angle', 'degree', 'refresh'],
  'flip': ['mirror', 'horizontal', 'vertical', 'reflect'],
  'layer': ['stack', 'overlap', 'sheet', 'depth'],
  'opacity': ['transparent', 'visibility', 'fade', 'alpha'],
  'mask': ['hide', 'layer', 'shape', 'reveal'],
  
  // =============================================================================
  // MISC COMMON SEARCHES
  // =============================================================================
  'notification': ['bell', 'alert', 'ring', 'notify', 'alarm'],
  'setting': ['gear', 'cog', 'config', 'option', 'preference', 'tool'],
  'help': ['question', 'support', 'info', 'assist', 'faq'],
  'profile': ['user', 'person', 'avatar', 'account', 'identity'],
  'account': ['user', 'person', 'profile', 'login', 'sign'],
  'dashboard': ['chart', 'analytics', 'data', 'report', 'graph', 'panel'],
  'analytics': ['chart', 'graph', 'data', 'report', 'statistics', 'dashboard'],
  'statistics': ['chart', 'graph', 'number', 'data', 'analytics'],
  'data': ['chart', 'database', 'analytics', 'table', 'graph'],
  'report': ['document', 'chart', 'data', 'analytics', 'file'],
  'insight': ['lightbulb', 'chart', 'eye', 'sparkle', 'brain'],
  'overview': ['eye', 'dashboard', 'chart', 'summary', 'view'],
  'summary': ['document', 'list', 'brief', 'overview', 'bullet'],
  'detail': ['magnify', 'zoom', 'info', 'list', 'expand'],
  'more': ['dots', 'ellipsis', 'menu', 'three', 'expand'],
  'less': ['minus', 'collapse', 'shrink', 'reduce'],
  'other': ['dots', 'more', 'ellipsis', 'misc'],
  'unknown': ['question', 'help', 'circle', 'mystery'],
  'empty': ['circle', 'box', 'zero', 'blank', 'null'],
  'null': ['empty', 'zero', 'circle', 'slash', 'none'],
  'default': ['circle', 'standard', 'normal', 'preset'],
  'custom': ['gear', 'settings', 'pencil', 'adjust', 'personalize'],
  'premium': ['star', 'crown', 'diamond', 'gold', 'special'],
  'free': ['gift', 'tag', 'zero', 'star', 'dollar'],
  'pro': ['star', 'badge', 'crown', 'premium', 'upgrade'],
  'enterprise': ['building', 'crown', 'star', 'shield', 'corporate'],
  'upgrade': ['arrow', 'up', 'star', 'rocket', 'plus'],
  'downgrade': ['arrow', 'down', 'minus', 'decrease'],
};

// Additional icon-specific tags that enhance searchability
const iconEnhancedTags: Record<string, string[]> = {
  // Sparkle-related
  'sparkle': ['ai', 'magic', 'special', 'premium', 'highlight', 'new', 'feature', 'smart', 'auto', 'generate'],
  'sparkles': ['ai', 'magic', 'special', 'premium', 'highlight', 'new', 'feature', 'smart', 'auto', 'generate'],
  'magic': ['ai', 'sparkle', 'wand', 'auto', 'smart', 'generate', 'wizard', 'automation'],
  'wand': ['magic', 'sparkle', 'ai', 'auto', 'generate', 'wizard'],
  'lightbulb': ['idea', 'creative', 'think', 'smart', 'innovation', 'brain', 'tip', 'hint'],
  'brain': ['think', 'smart', 'ai', 'intelligence', 'mind', 'neural', 'cognitive'],
  'rocket': ['launch', 'startup', 'fast', 'boost', 'speed', 'grow', 'success', 'performance'],
  'zap': ['fast', 'quick', 'instant', 'power', 'energy', 'lightning', 'flash', 'electric'],
  'lightning': ['fast', 'quick', 'power', 'energy', 'zap', 'flash', 'electric', 'bolt'],
  'flash': ['fast', 'quick', 'instant', 'lightning', 'zap', 'camera', 'photo'],
  
  // Common UI elements
  'home': ['main', 'start', 'dashboard', 'index', 'landing', 'house'],
  'search': ['find', 'lookup', 'query', 'filter', 'discover', 'explore', 'magnify'],
  'settings': ['config', 'options', 'preferences', 'customize', 'gear', 'cog', 'control'],
  'gear': ['settings', 'config', 'options', 'cog', 'mechanism', 'control'],
  'user': ['person', 'profile', 'account', 'member', 'customer', 'people', 'avatar'],
  'person': ['user', 'profile', 'account', 'member', 'people', 'human', 'avatar'],
  'bell': ['notification', 'alert', 'ring', 'alarm', 'remind', 'notify'],
  'star': ['favorite', 'rate', 'rating', 'bookmark', 'featured', 'important', 'highlight'],
  'heart': ['love', 'like', 'favorite', 'wish', 'health', 'care'],
  'check': ['done', 'complete', 'success', 'approve', 'verify', 'confirm', 'tick', 'yes'],
  'close': ['cancel', 'remove', 'exit', 'dismiss', 'delete', 'x', 'cross'],
  'plus': ['add', 'create', 'new', 'increase', 'more', 'expand'],
  'minus': ['remove', 'delete', 'subtract', 'decrease', 'less', 'reduce'],
  
  // Documents
  'document': ['file', 'paper', 'page', 'doc', 'text', 'report', 'form'],
  'folder': ['directory', 'organize', 'collection', 'group', 'category'],
  'file': ['document', 'data', 'attachment', 'upload', 'download'],
  
  // Communication
  'mail': ['email', 'message', 'inbox', 'send', 'envelope', 'letter'],
  'chat': ['message', 'talk', 'conversation', 'communicate', 'discuss', 'comment'],
  'phone': ['call', 'mobile', 'contact', 'dial', 'telephone', 'cellular'],
  
  // Media
  'play': ['start', 'video', 'music', 'media', 'begin', 'run'],
  'camera': ['photo', 'picture', 'capture', 'image', 'snapshot', 'photography'],
  'image': ['photo', 'picture', 'graphic', 'visual', 'media'],
  
  // Data
  'chart': ['graph', 'analytics', 'statistics', 'data', 'report', 'visualization'],
  'database': ['data', 'storage', 'sql', 'records', 'table', 'information'],
  
  // Security
  'lock': ['secure', 'password', 'protect', 'private', 'encrypt', 'safe'],
  'shield': ['protect', 'secure', 'guard', 'defense', 'safety', 'privacy'],
  'key': ['password', 'access', 'unlock', 'security', 'authentication'],
  
  // Nature
  'sun': ['day', 'bright', 'light', 'sunny', 'weather', 'morning'],
  'moon': ['night', 'dark', 'evening', 'sleep', 'lunar'],
  'cloud': ['weather', 'storage', 'upload', 'server', 'sky', 'computing'],
  'leaf': ['nature', 'eco', 'green', 'plant', 'organic', 'environment', 'sustainable'],
  'tree': ['nature', 'forest', 'plant', 'environment', 'eco', 'green', 'growth'],
  
  // Business
  'money': ['payment', 'finance', 'cash', 'dollar', 'currency', 'price', 'cost'],
  'cart': ['shopping', 'buy', 'purchase', 'ecommerce', 'store', 'basket'],
  'building': ['office', 'company', 'business', 'enterprise', 'corporate', 'work'],
  'trophy': ['award', 'winner', 'achievement', 'success', 'prize', 'champion'],
  'gift': ['present', 'reward', 'bonus', 'surprise', 'package'],
};

// Dynamic icon name extraction from packages
// We import all icons dynamically for the full library

import * as FluentIcons from '@fluentui/react-icons';
import * as HugeIconsPack from '@hugeicons/core-free-icons';

// Extract all Fluent icon base names (removing Filled/Regular suffix)
// Fluent icons are exported as React components (objects with $$typeof)
const fluentFilledNames = Object.keys(FluentIcons)
  .filter(key => key.endsWith('Filled') && (FluentIcons as Record<string, unknown>)[key] != null)
  .map(key => key.replace(/Filled$/, ''));

const fluentRegularNames = Object.keys(FluentIcons)
  .filter(key => key.endsWith('Regular') && (FluentIcons as Record<string, unknown>)[key] != null)
  .map(key => key.replace(/Regular$/, ''));

// Get unique base names that have both variants, plus those with only one variant
const fluentIconNames = [...new Set([...fluentFilledNames, ...fluentRegularNames])];

// Extract all Huge icon names (ending with Icon but not FreeIcons)
const hugeIconNames = Object.keys(HugeIconsPack)
  .filter(key => key.endsWith('Icon') && !key.includes('FreeIcons'))
  .map(key => key.replace(/Icon$/, ''));

// Generate Fluent icon entries for both filled and outline variants
function generateFluentEntries(): IconEntry[] {
  const entries: IconEntry[] = [];
  const fluentIconsObj = FluentIcons as Record<string, unknown>;
  
  for (const name of fluentIconNames) {
    // Check if Filled variant exists
    const filledName = `${name}Filled`;
    if (fluentIconsObj[filledName] != null) {
      entries.push({
        name: filledName,
        displayName: formatDisplayName(name),
        library: 'fluent-filled',
        tags: generateTags(name),
      });
    }
    
    // Check if Regular (outline) variant exists
    const regularName = `${name}Regular`;
    if (fluentIconsObj[regularName] != null) {
      entries.push({
        name: regularName,
        displayName: formatDisplayName(name),
        library: 'fluent-outline',
        tags: generateTags(name),
      });
    }
  }
  
  return entries;
}

// Generate Huge Icons entries
function generateHugeIconsEntries(): IconEntry[] {
  const hugeIconsObj = HugeIconsPack as Record<string, unknown>;
  
  return hugeIconNames
    .filter(name => {
      const iconName = `${name}Icon`;
      return hugeIconsObj[iconName] !== undefined;
    })
    .map(name => ({
      name: `${name}Icon`,
      displayName: formatDisplayName(name),
      library: 'hugeicons' as IconLibrary,
      tags: generateTags(name),
    }));
}

// Format display name from camelCase to readable format
function formatDisplayName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\d+)/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

// Generate search tags from icon name with enhanced semantic tags
function generateTags(name: string): string[] {
  // Split camelCase and numbers
  const words = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\d+)/g, ' $1')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);
  
  const allTags = new Set(words);
  
  // Add enhanced tags for each word in the icon name
  for (const word of words) {
    // Check if this word has enhanced tags
    const enhancedTags = iconEnhancedTags[word];
    if (enhancedTags) {
      enhancedTags.forEach(tag => allTags.add(tag));
    }
    
    // Also check partial matches (e.g., "sparkles" should match "sparkle" tags)
    for (const [key, tags] of Object.entries(iconEnhancedTags)) {
      if (word.includes(key) || key.includes(word)) {
        tags.forEach(tag => allTags.add(tag));
      }
    }
  }
  
  return [...allTags];
}

// Combined icon registry
export const iconRegistry: IconEntry[] = [
  ...generateFluentEntries(),
  ...generateHugeIconsEntries(),
];

// Get icons filtered by library
export function getIconsByLibrary(libraries: IconLibrary[]): IconEntry[] {
  return iconRegistry.filter(icon => libraries.includes(icon.library));
}

// Expand search query with semantic keywords
function expandSearchQuery(query: string): string[] {
  const words = query.toLowerCase().trim().split(/\s+/);
  const expandedTerms = new Set<string>();
  
  // Add original words
  words.forEach(word => expandedTerms.add(word));
  
  // Add semantic expansions for each word and for the full query
  const phrasesToCheck = [...words, query.toLowerCase().trim()];
  
  for (const phrase of phrasesToCheck) {
    // Check direct matches in semantic keywords
    const semanticMatches = semanticKeywords[phrase];
    if (semanticMatches) {
      semanticMatches.forEach(term => expandedTerms.add(term));
    }
    
    // Check partial matches (e.g., "artificial" should partially match "artificial intelligence")
    for (const [key, terms] of Object.entries(semanticKeywords)) {
      if (key.includes(phrase) || phrase.includes(key)) {
        terms.forEach(term => expandedTerms.add(term));
      }
    }
  }
  
  return [...expandedTerms];
}

// Search icons by query with semantic expansion
export function searchIcons(query: string, libraries: IconLibrary[]): IconEntry[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return getIconsByLibrary(libraries);
  }
  
  // Expand the query with semantic keywords
  const expandedTerms = expandSearchQuery(normalizedQuery);
  const originalWords = normalizedQuery.split(/\s+/);
  
  // Score-based search for better relevance
  const scoredResults = iconRegistry
    .filter(icon => libraries.includes(icon.library))
    .map(icon => {
      const searchText = [
        icon.name.toLowerCase(),
        icon.displayName.toLowerCase(),
        ...icon.tags,
      ].join(' ');
      
      let score = 0;
      
      // Exact name match gets highest score
      if (icon.displayName.toLowerCase().includes(normalizedQuery)) {
        score += 100;
      }
      
      // Original query words match
      for (const word of originalWords) {
        if (searchText.includes(word)) {
          score += 50;
        }
        // Partial word match
        if (icon.displayName.toLowerCase().includes(word)) {
          score += 30;
        }
      }
      
      // Expanded/semantic terms match (lower score than direct matches)
      for (const term of expandedTerms) {
        if (searchText.includes(term)) {
          score += 10;
        }
      }
      
      return { icon, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return scoredResults.map(item => item.icon);
}

// Get related icons based on shared tags
export function getRelatedIcons(icon: IconEntry, limit: number = 8): IconEntry[] {
  const iconTags = new Set(icon.tags);
  
  // Score all other icons based on shared tags
  const scoredIcons = iconRegistry
    .filter(other => other.name !== icon.name) // Exclude the current icon
    .map(other => {
      // Count shared tags
      const sharedTags = other.tags.filter(tag => iconTags.has(tag)).length;
      
      // Bonus for same library (users often want consistent style)
      const libraryBonus = other.library === icon.library ? 2 : 0;
      
      // Bonus for similar name patterns
      const nameBonus = other.displayName.toLowerCase().includes(icon.displayName.toLowerCase().split(/\d/)[0]) ? 3 : 0;
      
      return {
        icon: other,
        score: sharedTags + libraryBonus + nameBonus
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return scoredIcons.slice(0, limit).map(item => item.icon);
}

// Get simplified icon names for AI search (without size suffixes)
export function getAllIconDisplayNames(): string[] {
  // Return unique base names without size numbers (e.g., "Home" instead of "Home 20")
  const baseNames = iconRegistry.map(icon => {
    // Remove size numbers like "12", "16", "20", "24", "28", "32", "48"
    // and version suffixes, keeping just the base concept
    return icon.displayName
      .replace(/\s+\d+\s*/g, ' ')  // Remove size numbers
      .replace(/\s+V\d+$/i, '')     // Remove V2, V3 suffixes
      .replace(/\s+/g, ' ')         // Clean up multiple spaces
      .trim();
  });
  return [...new Set(baseNames)];
}

// Find icons by display names (for AI search results)
// Uses flexible matching - finds icons whose base name matches
export function findIconsByDisplayNames(displayNames: string[], libraries: IconLibrary[]): IconEntry[] {
  const searchTerms = displayNames.map(n => n.toLowerCase().trim());
  
  return iconRegistry.filter(icon => {
    if (!libraries.includes(icon.library)) return false;
    
    const displayNameLower = icon.displayName.toLowerCase();
    // Extract base name without size/version suffixes for comparison
    const baseName = displayNameLower
      .replace(/\s+\d+\s*/g, ' ')
      .replace(/\s+v\d+$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Check if any search term matches the base name
    return searchTerms.some(term => 
      baseName === term || 
      baseName.startsWith(term + ' ') ||
      baseName.includes(' ' + term + ' ') ||
      baseName.endsWith(' ' + term)
    );
  });
}

// Export icon name lists for dynamic imports
export { fluentIconNames, hugeIconNames };
