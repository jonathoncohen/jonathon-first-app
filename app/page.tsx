"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface DebugInfo {
  performance?: {
    loadTime?: number;
    domReady?: number;
    resources?: number;
  };
  timestamp?: string;
  environment?: string;
  features?: {
    tailwind?: boolean;
    typescript?: boolean;
    darkMode?: boolean;
  };
}

interface ApiResponse {
  success?: boolean;
  analysis?: any;
  message?: string;
  status?: string;
  endpoint?: string;
  methods?: string[];
  description?: string;
  example?: any;
}

export default function Home() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    // Get debug info from window
    const info = (window as Window & { __APP_DEBUG__?: DebugInfo }).__APP_DEBUG__;
    setDebugInfo(info || null);

    // Test API endpoint
    fetch('/api/analyze')
      .then(res => res.json())
      .then(data => setApiResponse(data))
      .catch(err => console.error('API Error:', err));
  }, []);

  const sendAnalysis = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          performance: debugInfo?.performance,
          timestamp: new Date().toISOString(),
          userAction: 'manual_analysis'
        })
      });
      const data = await response.json();
      setApiResponse(data);
      console.log('📤 Analysis sent:', data);
    } catch (error) {
      console.error('Failed to send analysis:', error);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <span className="text-2xl font-bold text-blue-600">+ Chrome DevTools</span>
        </div>
        
        {/* Debug Panel */}
        <div className="w-full max-w-2xl p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-bold mb-3">🔍 Debug Information</h2>
          
          {debugInfo ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Page Load Time:</span>
                <span className="font-mono">{debugInfo.performance?.loadTime || 'N/A'}ms</span>
              </div>
              <div className="flex justify-between">
                <span>DOM Ready:</span>
                <span className="font-mono">{debugInfo.performance?.domReady || 'N/A'}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Resources Loaded:</span>
                <span className="font-mono">{debugInfo.performance?.resources || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Dark Mode:</span>
                <span className="font-mono">{debugInfo.features?.darkMode ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading debug information...</p>
          )}
          
          <button
            onClick={sendAnalysis}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Send Analysis to API
          </button>
          
          {apiResponse && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded text-sm">
              <p className="font-semibold">✅ API Response:</p>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
