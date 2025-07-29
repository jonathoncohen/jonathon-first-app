// Chrome DevTools Integration for Jonathon's First App
console.log('🔧 DevTools Integration Loaded');

// Performance monitoring
const performanceData = {
  loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
  domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
  resources: performance.getEntriesByType('resource').length
};

// Display performance data
console.table({
  'Page Load Time': `${performanceData.loadTime}ms`,
  'DOM Ready': `${performanceData.domReady}ms`,
  'Total Resources': performanceData.resources
});

// React DevTools helper
if (window.React) {
  console.log('⚛️ React Version:', window.React.version);
}

// Next.js specific
if (window.next) {
  console.log('▲ Next.js Version:', window.next.version);
}

// Monitor network requests
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
      console.log(`📡 API Call: ${entry.name} - ${Math.round(entry.duration)}ms`);
    }
  }
});
observer.observe({ entryTypes: ['resource'] });

// Add debugging info to window
window.__APP_DEBUG__ = {
  performance: performanceData,
  timestamp: new Date().toISOString(),
  environment: 'development',
  features: {
    tailwind: true,
    typescript: true,
    darkMode: document.documentElement.classList.contains('dark')
  }
};

// Helper function for Chrome Console
window.debug = {
  showPerformance: () => console.table(performanceData),
  showFeatures: () => console.table(window.__APP_DEBUG__.features),
  toggleDarkMode: () => {
    document.documentElement.classList.toggle('dark');
    console.log('🌓 Dark mode:', document.documentElement.classList.contains('dark'));
  }
};

console.log('💡 Type debug.showPerformance() to see performance metrics');
console.log('💡 Type debug.toggleDarkMode() to toggle dark mode');