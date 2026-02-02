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

// Dynamic icon name extraction from packages
// We import all icons dynamically for the full library

import * as FluentIcons from '@fluentui/react-icons';
import * as HugeIconsPack from '@hugeicons/core-free-icons';

// Extract all Fluent icon base names (removing Filled/Regular suffix)
const fluentFilledNames = Object.keys(FluentIcons)
  .filter(key => key.endsWith('Filled') && typeof (FluentIcons as Record<string, unknown>)[key] === 'function')
  .map(key => key.replace(/Filled$/, ''));

const fluentRegularNames = Object.keys(FluentIcons)
  .filter(key => key.endsWith('Regular') && typeof (FluentIcons as Record<string, unknown>)[key] === 'function')
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
    if (fluentIconsObj[filledName] && typeof fluentIconsObj[filledName] === 'function') {
      entries.push({
        name: filledName,
        displayName: formatDisplayName(name),
        library: 'fluent-filled',
        tags: generateTags(name),
      });
    }
    
    // Check if Regular (outline) variant exists
    const regularName = `${name}Regular`;
    if (fluentIconsObj[regularName] && typeof fluentIconsObj[regularName] === 'function') {
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
