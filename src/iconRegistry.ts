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
  // AI & Technology
  'ai': ['sparkle', 'sparkles', 'magic', 'wand', 'robot', 'brain', 'lightbulb', 'idea', 'star', 'lightning', 'zap', 'flash', 'bolt', 'cpu', 'chip', 'neural', 'smart', 'auto'],
  'artificial intelligence': ['sparkle', 'sparkles', 'magic', 'wand', 'robot', 'brain', 'lightbulb', 'idea', 'star'],
  'machine learning': ['brain', 'neural', 'chart', 'data', 'analytics', 'sparkle', 'magic'],
  'automation': ['robot', 'gear', 'cog', 'settings', 'refresh', 'sync', 'magic', 'sparkle', 'zap'],
  'smart': ['lightbulb', 'brain', 'sparkle', 'magic', 'star', 'idea'],
  
  // Communication
  'email': ['mail', 'envelope', 'inbox', 'send', 'message'],
  'message': ['chat', 'comment', 'bubble', 'mail', 'send', 'inbox'],
  'call': ['phone', 'mobile', 'video', 'mic', 'speaker'],
  'talk': ['chat', 'comment', 'message', 'mic', 'speaker', 'call'],
  'contact': ['person', 'user', 'people', 'phone', 'mail', 'address'],
  
  // Finance & Money
  'payment': ['money', 'dollar', 'credit', 'card', 'wallet', 'bank', 'cash', 'currency', 'coin'],
  'finance': ['money', 'dollar', 'chart', 'analytics', 'bank', 'wallet', 'credit', 'invoice'],
  'currency': ['money', 'dollar', 'coin', 'wallet', 'bank'],
  'shopping': ['cart', 'bag', 'basket', 'store', 'shop', 'purchase', 'buy'],
  'ecommerce': ['cart', 'bag', 'store', 'shop', 'credit', 'card', 'money', 'payment'],
  
  // Social & Reactions
  'like': ['thumb', 'heart', 'star', 'favorite', 'love'],
  'love': ['heart', 'favorite', 'star', 'like', 'thumb'],
  'favorite': ['heart', 'star', 'bookmark', 'like', 'love'],
  'reaction': ['emoji', 'smile', 'face', 'thumb', 'heart', 'star'],
  'happy': ['smile', 'emoji', 'face', 'laugh', 'joy'],
  'sad': ['frown', 'cry', 'face', 'emoji'],
  
  // Security
  'password': ['lock', 'key', 'shield', 'security', 'secure', 'protect'],
  'secure': ['lock', 'shield', 'key', 'protect', 'safe', 'guard'],
  'protect': ['shield', 'lock', 'guard', 'secure', 'safe'],
  'privacy': ['eye', 'lock', 'shield', 'hidden', 'secure'],
  'authentication': ['lock', 'key', 'fingerprint', 'shield', 'user', 'secure'],
  
  // Media & Content
  'photo': ['image', 'picture', 'camera', 'gallery', 'album'],
  'picture': ['image', 'photo', 'camera', 'gallery'],
  'video': ['play', 'camera', 'film', 'movie', 'record', 'media'],
  'music': ['note', 'audio', 'sound', 'headphone', 'speaker', 'play'],
  'audio': ['sound', 'music', 'speaker', 'headphone', 'mic', 'volume'],
  
  // Files & Documents
  'file': ['document', 'folder', 'paper', 'page', 'attachment'],
  'document': ['file', 'paper', 'page', 'text', 'doc', 'pdf'],
  'attachment': ['attach', 'clip', 'link', 'file', 'document'],
  'export': ['download', 'arrow', 'share', 'send', 'save'],
  'import': ['upload', 'arrow', 'add', 'receive'],
  
  // Navigation
  'back': ['arrow', 'left', 'previous', 'return', 'undo'],
  'forward': ['arrow', 'right', 'next', 'proceed'],
  'up': ['arrow', 'top', 'upload', 'rise'],
  'down': ['arrow', 'bottom', 'download', 'drop'],
  'navigate': ['arrow', 'compass', 'map', 'direction', 'location'],
  
  // Time & Calendar
  'time': ['clock', 'watch', 'timer', 'hour', 'schedule', 'alarm'],
  'schedule': ['calendar', 'clock', 'time', 'event', 'date', 'plan'],
  'date': ['calendar', 'day', 'schedule', 'event', 'time'],
  'deadline': ['clock', 'timer', 'alarm', 'calendar', 'alert', 'warning'],
  'reminder': ['bell', 'notification', 'alarm', 'clock', 'alert'],
  
  // Weather & Nature
  'weather': ['sun', 'cloud', 'rain', 'snow', 'wind', 'moon', 'temperature'],
  'sunny': ['sun', 'bright', 'day', 'clear', 'weather'],
  'rainy': ['rain', 'cloud', 'drop', 'water', 'umbrella', 'weather'],
  'nature': ['tree', 'leaf', 'plant', 'flower', 'forest', 'green'],
  'eco': ['leaf', 'tree', 'plant', 'recycle', 'green', 'nature'],
  'environment': ['leaf', 'tree', 'earth', 'globe', 'green', 'recycle'],
  
  // Status & Feedback
  'success': ['check', 'tick', 'done', 'complete', 'verified', 'approve'],
  'error': ['cross', 'close', 'cancel', 'fail', 'wrong', 'alert', 'warning', 'danger'],
  'warning': ['alert', 'caution', 'danger', 'exclamation', 'attention'],
  'info': ['information', 'about', 'help', 'question', 'detail'],
  'loading': ['spinner', 'refresh', 'sync', 'progress', 'wait'],
  'progress': ['loading', 'bar', 'percent', 'status', 'step'],
  
  // Actions
  'create': ['add', 'plus', 'new', 'make', 'compose', 'write'],
  'remove': ['delete', 'trash', 'bin', 'minus', 'close', 'cancel'],
  'update': ['edit', 'pencil', 'modify', 'change', 'write', 'refresh'],
  'view': ['eye', 'see', 'look', 'show', 'visible', 'preview'],
  'hide': ['eye', 'off', 'invisible', 'hidden', 'private'],
  
  // Development
  'code': ['developer', 'programming', 'terminal', 'console', 'script', 'bracket'],
  'developer': ['code', 'terminal', 'git', 'branch', 'bug', 'api'],
  'programming': ['code', 'terminal', 'bracket', 'script', 'function'],
  'debug': ['bug', 'fix', 'error', 'code', 'test'],
  'api': ['code', 'connect', 'link', 'interface', 'integration'],
  
  // Business & Work
  'meeting': ['calendar', 'video', 'call', 'people', 'team', 'conference'],
  'presentation': ['screen', 'chart', 'slide', 'display', 'projector'],
  'report': ['document', 'chart', 'analytics', 'data', 'file', 'paper'],
  'task': ['check', 'list', 'todo', 'checkbox', 'done', 'complete'],
  'project': ['folder', 'file', 'task', 'kanban', 'board', 'plan'],
  'team': ['people', 'group', 'users', 'collaborate', 'together'],
  
  // Travel & Location
  'travel': ['airplane', 'plane', 'car', 'map', 'location', 'globe', 'world'],
  'location': ['map', 'pin', 'marker', 'place', 'gps', 'navigate'],
  'direction': ['arrow', 'compass', 'map', 'navigate', 'route'],
  'global': ['globe', 'world', 'earth', 'international', 'worldwide'],
  
  // Devices
  'mobile': ['phone', 'smartphone', 'device', 'cellular'],
  'computer': ['desktop', 'laptop', 'pc', 'monitor', 'screen'],
  'device': ['phone', 'tablet', 'laptop', 'desktop', 'watch'],
  'hardware': ['cpu', 'chip', 'memory', 'storage', 'disk', 'usb'],
  
  // Cloud & Storage
  'cloud': ['storage', 'server', 'upload', 'download', 'sync', 'backup'],
  'storage': ['cloud', 'disk', 'drive', 'database', 'memory', 'save'],
  'backup': ['cloud', 'save', 'copy', 'sync', 'restore'],
  'sync': ['refresh', 'cloud', 'update', 'synchronize', 'reload'],
  
  // Creativity
  'design': ['paint', 'brush', 'palette', 'color', 'art', 'creative', 'pencil'],
  'creative': ['sparkle', 'lightbulb', 'idea', 'magic', 'wand', 'star', 'design'],
  'art': ['paint', 'brush', 'palette', 'canvas', 'draw', 'creative'],
  'inspiration': ['lightbulb', 'idea', 'sparkle', 'star', 'magic', 'brain'],
  
  // Misc common searches
  'notification': ['bell', 'alert', 'ring', 'notify', 'alarm'],
  'setting': ['gear', 'cog', 'config', 'option', 'preference', 'tool'],
  'help': ['question', 'support', 'info', 'assist', 'faq'],
  'support': ['help', 'question', 'headphone', 'chat', 'message', 'ticket'],
  'profile': ['user', 'person', 'avatar', 'account', 'identity'],
  'account': ['user', 'person', 'profile', 'login', 'sign'],
  'dashboard': ['chart', 'analytics', 'data', 'report', 'graph', 'panel'],
  'analytics': ['chart', 'graph', 'data', 'report', 'statistics', 'dashboard'],
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

// Fluent Icons - Common icons with Filled and Regular (outline) variants
// Names follow the pattern: IconNameFilled / IconNameRegular
const fluentIconNames = [
  // Navigation & Actions
  'Home', 'Search', 'Settings', 'Add', 'Delete', 'Edit', 'Save', 'Share', 'Copy', 'Cut', 'Paste',
  'Undo', 'Redo', 'Refresh', 'Sync', 'Filter', 'Sort', 'More', 'Menu', 'Close', 'Checkmark',
  'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
  'ArrowDownload', 'ArrowUpload', 'ArrowExportLtr', 'ArrowImport', 'ArrowReset', 'ArrowUndo', 'ArrowRedo',
  
  // Communication
  'Mail', 'MailRead', 'MailUnread', 'Send', 'Chat', 'ChatMultiple', 'Comment', 'CommentMultiple',
  'Call', 'CallEnd', 'Video', 'VideoOff', 'Mic', 'MicOff', 'Speaker', 'SpeakerOff',
  'Notification', 'NotificationOff', 'Alert', 'AlertOn', 'AlertOff',
  
  // People & Accounts
  'Person', 'PersonAdd', 'PersonDelete', 'People', 'PeopleTeam', 'PeopleAdd', 'Guest', 'Contact',
  'PersonAccounts', 'PersonCircle', 'PersonFeedback',
  
  // Documents & Files
  'Document', 'DocumentAdd', 'DocumentCopy', 'DocumentEdit', 'DocumentPdf', 'DocumentText',
  'Folder', 'FolderAdd', 'FolderOpen', 'FolderZip', 'Archive', 'Attach', 'Link', 'LinkSquare',
  'Image', 'ImageAdd', 'ImageEdit', 'ImageMultiple', 'ImageSearch',
  
  // Media
  'Play', 'Pause', 'Stop', 'Record', 'PlayCircle', 'PauseCircle', 'Previous', 'Next',
  'FastForward', 'Rewind', 'Repeat', 'Shuffle', 'VolumeOff', 'VolumeLow', 'VolumeMedium', 'VolumeHigh',
  
  // UI Elements
  'Grid', 'List', 'Table', 'Calendar', 'CalendarAdd', 'CalendarToday', 'Clock', 'Timer', 'History',
  'Star', 'StarAdd', 'StarOff', 'Heart', 'HeartBroken', 'Bookmark', 'BookmarkAdd', 'BookmarkOff',
  'Flag', 'FlagOff', 'Pin', 'PinOff', 'Tag', 'TagMultiple',
  
  // Status & Feedback
  'CheckmarkCircle', 'DismissCircle', 'ErrorCircle', 'Info', 'Question', 'QuestionCircle', 'Warning',
  'ShieldCheckmark', 'ShieldDismiss', 'ShieldError', 'LockClosed', 'LockOpen', 'Key',
  
  // Data & Analytics
  'DataArea', 'DataBarVertical', 'DataLine', 'DataPie', 'DataScatter', 'DataTreemap',
  'ChartMultiple', 'Poll', 'Gauge', 'Pulse',
  
  // Devices & Hardware
  'Desktop', 'Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones', 'Camera', 'CameraAdd',
  'Print', 'Keyboard', 'Mouse', 'Usb', 'Bluetooth', 'Wifi', 'WifiOff', 'Cellular',
  
  // Cloud & Server
  'Cloud', 'CloudAdd', 'CloudArrowDown', 'CloudArrowUp', 'CloudOff', 'CloudSync', 'CloudCheckmark',
  'Server', 'ServerMultiple', 'Database', 'Storage',
  
  // Development
  'Code', 'CodeBlock', 'Terminal', 'Bug', 'Beaker', 'Wrench', 'WrenchScrewdriver', 'Toolbox',
  'Puzzle', 'Extension', 'Api', 'Branch', 'BranchFork', 'Merge', 'GitRepository',
  
  // Business
  'Building', 'BuildingMultiple', 'Money', 'Wallet', 'CreditCard', 'Receipt', 'Cart', 'CartAdd',
  'ShoppingBag', 'Gift', 'Certificate', 'Trophy', 'Ribbon', 'Award',
  
  // Nature & Weather
  'Weather', 'WeatherSunny', 'WeatherCloudy', 'WeatherRain', 'WeatherSnow', 'WeatherMoon',
  'Leaf', 'Plant', 'Tree', 'Fire', 'Drop', 'Snowflake',
  
  // Shapes & Objects
  'Circle', 'Square', 'Triangle', 'Pentagon', 'Hexagon', 'Star', 'Diamond',
  'Cube', 'Sphere', 'Cone', 'Cylinder',
  
  // Accessibility
  'Accessibility', 'Eye', 'EyeOff', 'EyeTracking', 'Glasses', 'Ear', 'Hand', 'Cursor',
  
  // Social
  'ThumbLike', 'ThumbDislike', 'Emoji', 'EmojiAdd', 'EmojiHand', 'EmojiLaugh', 'EmojiSad', 'EmojiAngry',
  'Sparkle', 'Lightbulb', 'LightbulbFilament', 'Rocket', 'Airplane', 'Vehicle', 'Map', 'Location',
  
  // Text & Formatting
  'TextFont', 'TextBold', 'TextItalic', 'TextUnderline', 'TextStrikethrough', 'TextColor',
  'TextAlignLeft', 'TextAlignCenter', 'TextAlignRight', 'TextAlignJustify',
  'TextBulletList', 'TextNumberList', 'TextIndentIncrease', 'TextIndentDecrease',
  
  // Misc
  'Globe', 'Earth', 'Translate', 'Battery', 'Power', 'FlashOn', 'FlashOff',
  'QrCode', 'Barcode', 'Scan', 'Fingerprint', 'Shield', 'Safety',
];

// Huge Icons - Common icons (stroke-rounded style in free version)
const hugeIconNames = [
  // Navigation
  'Home01', 'Home02', 'Home03', 'Home04', 'Home05', 'Search01', 'Search02', 'SearchMinus', 'SearchPlus',
  'Menu01', 'Menu02', 'Menu03', 'Menu04', 'Menu05', 'MoreHorizontal', 'MoreVertical',
  'ArrowLeft01', 'ArrowLeft02', 'ArrowRight01', 'ArrowRight02', 'ArrowUp01', 'ArrowUp02', 'ArrowDown01', 'ArrowDown02',
  'ArrowUpLeft01', 'ArrowUpRight01', 'ArrowDownLeft01', 'ArrowDownRight01',
  'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ChevronDoubleLeft', 'ChevronDoubleRight',
  
  // Actions
  'Add01', 'Add02', 'AddCircle', 'AddSquare', 'Remove01', 'Remove02', 'RemoveCircle', 'RemoveSquare',
  'Delete01', 'Delete02', 'Delete03', 'Edit01', 'Edit02', 'Edit03', 'Edit04',
  'Save01', 'Save02', 'Save03', 'Download01', 'Download02', 'Download03', 'Download04', 'Download05',
  'Upload01', 'Upload02', 'Upload03', 'Upload04', 'Upload05', 'Share01', 'Share02', 'Share03',
  'Copy01', 'Copy02', 'Paste01', 'Paste02', 'Cut01', 'Undo01', 'Undo02', 'Redo01', 'Redo02',
  'Refresh', 'Reload', 'Sync01', 'Sync02',
  
  // Communication
  'Mail01', 'Mail02', 'MailOpen01', 'MailOpen02', 'MailSend01', 'MailSend02', 'Inbox', 'Inbox01', 'Inbox02',
  'Message01', 'Message02', 'MessageDots01', 'MessageDots02', 'MessageSquare01', 'MessageSquare02',
  'Chat01', 'Chat02', 'Comment01', 'Comment02', 'Notification01', 'Notification02', 'Notification03',
  'Bell01', 'Bell02', 'Bell03', 'BellOff', 'Call', 'CallIncoming01', 'CallOutgoing01', 'CallEnd01',
  'Video01', 'Video02', 'VideoOff', 'Mic01', 'Mic02', 'MicOff01', 'MicOff02',
  
  // People
  'User', 'User01', 'User02', 'User03', 'UserAdd01', 'UserAdd02', 'UserRemove01', 'UserRemove02',
  'UserCircle', 'UserSquare', 'UserGroup', 'Users01', 'Users02', 'Team',
  
  // Documents
  'File01', 'File02', 'FileAdd', 'FileAttachment', 'FileDoc', 'FilePdf', 'FileZip', 'FileAudio', 'FileVideo',
  'Folder01', 'Folder02', 'FolderAdd', 'FolderOpen', 'FolderZip', 'FolderCloud',
  'Document01', 'DocumentAttachment', 'DocumentCode', 'DocumentText',
  'Attachment01', 'Attachment02', 'Link01', 'Link02', 'Link03', 'LinkCircle', 'LinkSquare01', 'LinkSquare02',
  
  // Images & Media
  'Image01', 'Image02', 'Image03', 'ImageAdd01', 'ImageAdd02', 'Gallery', 'Album01', 'Album02',
  'Camera01', 'Camera02', 'CameraOff', 'CameraVideo', 'Photo', 'Picture',
  'Play', 'PlayCircle', 'PlaySquare', 'Pause', 'Stop', 'Record', 'Forward01', 'Backward01',
  'Next', 'Previous', 'Playlist01', 'Playlist02', 'Music01', 'Music02', 'MusicNote01', 'MusicNote02',
  'Volume01', 'Volume02', 'VolumeHigh', 'VolumeLow', 'VolumeMute', 'VolumeOff',
  
  // UI Elements
  'Grid', 'GridOff', 'LayoutGrid', 'Layout01', 'Layout02', 'Layout03',
  'List', 'ListUl', 'ListOl', 'Table01', 'Table02', 'Columns', 'Rows',
  'Calendar01', 'Calendar02', 'Calendar03', 'CalendarAdd01', 'CalendarCheck01', 'CalendarRemove01',
  'Clock01', 'Clock02', 'Clock03', 'Timer01', 'Timer02', 'Stopwatch', 'Alarm', 'Hourglass',
  'Star', 'StarOff', 'StarHalf', 'Heart', 'HeartBroken', 'HeartOff',
  'Bookmark01', 'Bookmark02', 'BookmarkAdd01', 'BookmarkAdd02', 'BookmarkOff01',
  'Flag01', 'Flag02', 'Flag03', 'FlagOff', 'Pin01', 'Pin02', 'PinOff',
  'Tag01', 'Tag02', 'Tags', 'Label',
  
  // Status
  'CheckCircle', 'CheckSquare', 'Check', 'Tick01', 'Tick02', 'Close', 'Cancel01', 'Cancel02',
  'Info01', 'Information', 'Question', 'Help', 'Alert01', 'Alert02', 'Warning',
  'Error', 'Danger', 'Success', 'Verified',
  
  // Security
  'Lock01', 'Lock02', 'LockOpen01', 'LockOpen02', 'Unlock', 'Key01', 'Key02',
  'Shield01', 'Shield02', 'ShieldCheck', 'ShieldCross', 'ShieldPlus',
  'Eye', 'EyeOff', 'View', 'ViewOff', 'Visible', 'Hidden',
  
  // Data & Charts
  'Chart01', 'Chart02', 'ChartBar', 'ChartLine', 'ChartPie', 'ChartArea',
  'Analytics01', 'Analytics02', 'Dashboard01', 'Dashboard02', 'Report',
  'Database01', 'Database02', 'Server01', 'Server02', 'Cloud01', 'Cloud02', 'CloudUpload', 'CloudDownload',
  
  // Devices
  'Computer', 'Desktop01', 'Desktop02', 'Laptop01', 'Laptop02', 'Phone01', 'Phone02', 'Mobile',
  'Tablet01', 'Tablet02', 'Watch01', 'Watch02', 'Headphones01', 'Headphones02',
  'Printer01', 'Printer02', 'Keyboard01', 'Mouse01', 'Monitor01', 'Monitor02', 'Tv01', 'Tv02',
  
  // Development
  'Code', 'CodeCircle', 'CodeSquare', 'CodeFolder', 'Terminal', 'Command',
  'Bug01', 'Bug02', 'Git', 'GitBranch', 'GitCommit', 'GitMerge', 'GitPull',
  'Api', 'Puzzle', 'Plugin01', 'Plugin02', 'Module',
  
  // Business
  'Building01', 'Building02', 'Building03', 'Building04', 'Building05', 'Office', 'Store01', 'Store02',
  'Money01', 'Money02', 'Money03', 'Wallet01', 'Wallet02', 'CreditCard', 'Invoice01', 'Invoice02',
  'Cart01', 'Cart02', 'ShoppingBag01', 'ShoppingBag02', 'ShoppingBasket',
  'Gift', 'GiftCard', 'Coupon01', 'Coupon02', 'Ticket01', 'Ticket02',
  'Award01', 'Award02', 'Trophy', 'Medal01', 'Medal02', 'Certificate01', 'Certificate02',
  
  // Travel & Location
  'Map01', 'Map02', 'Location01', 'Location02', 'Location03', 'LocationOff', 'Pin', 'Marker',
  'Globe01', 'Globe02', 'Earth', 'World', 'Compass01', 'Compass02',
  'Airplane01', 'Airplane02', 'Car01', 'Car02', 'Truck01', 'Truck02', 'Bicycle',
  
  // Weather
  'Sun01', 'Sun02', 'Sun03', 'Moon01', 'Moon02', 'MoonStar', 'Cloud', 'CloudSun', 'CloudRain',
  'Rain01', 'Rain02', 'Snow', 'Wind01', 'Wind02', 'Fog', 'Rainbow', 'Umbrella',
  
  // Nature
  'Leaf01', 'Leaf02', 'Leaf03', 'Tree01', 'Tree02', 'Flower', 'Plant01', 'Plant02',
  'Fire01', 'Fire02', 'Water', 'Drop01', 'Drop02', 'Snowflake',
  
  // Shapes
  'Circle', 'Square', 'Triangle', 'Pentagon', 'Hexagon', 'Octagon', 'Diamond',
  'Cube01', 'Cube02', 'Sphere', 'Cylinder01', 'Cylinder02',
  
  // Emojis & Reactions
  'Smile', 'SmilePlus', 'SadFace', 'AngryFace', 'NeutralFace', 'CoolFace', 'WinkFace',
  'ThumbsUp', 'ThumbsDown', 'HandWave', 'HandPeace', 'HandPointing',
  
  // Misc
  'Sparkles', 'Sparkle', 'Magic01', 'Magic02', 'Wand', 'Rocket01', 'Rocket02',
  'Lightbulb01', 'Lightbulb02', 'Lightbulb03', 'Idea',
  'Settings01', 'Settings02', 'Settings03', 'Gear', 'Cog', 'Tool01', 'Tool02', 'Wrench', 'Hammer',
  'Zap', 'Flash', 'Lightning01', 'Lightning02', 'Battery01', 'Battery02', 'BatteryCharging',
  'Power01', 'Power02', 'PowerOff',
  'QrCode', 'Barcode', 'Scan01', 'Scan02', 'Fingerprint01', 'Fingerprint02',
  'Translate', 'Language', 'TextAa', 'TextFont', 'Bold', 'Italic', 'Underline',
];

// Generate Fluent icon entries for both filled and outline variants
function generateFluentEntries(): IconEntry[] {
  const entries: IconEntry[] = [];
  
  for (const name of fluentIconNames) {
    // Filled variant
    entries.push({
      name: `${name}Filled`,
      displayName: name,
      library: 'fluent-filled',
      tags: generateTags(name),
    });
    
    // Regular (outline) variant
    entries.push({
      name: `${name}Regular`,
      displayName: name,
      library: 'fluent-outline',
      tags: generateTags(name),
    });
  }
  
  return entries;
}

// Generate Huge Icons entries
function generateHugeIconsEntries(): IconEntry[] {
  return hugeIconNames.map(name => ({
    name: `${name}Icon`,
    displayName: name.replace(/(\d+)$/, ' $1').trim(),
    library: 'hugeicons',
    tags: generateTags(name),
  }));
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

// Get all icon display names for AI search
export function getAllIconDisplayNames(): string[] {
  return [...new Set(iconRegistry.map(icon => icon.displayName))];
}

// Find icons by display names (for AI search results)
export function findIconsByDisplayNames(displayNames: string[], libraries: IconLibrary[]): IconEntry[] {
  const nameSet = new Set(displayNames.map(n => n.toLowerCase()));
  return iconRegistry.filter(icon => 
    libraries.includes(icon.library) && 
    nameSet.has(icon.displayName.toLowerCase())
  );
}

// Export icon name lists for dynamic imports
export { fluentIconNames, hugeIconNames };
