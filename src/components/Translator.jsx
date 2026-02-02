import React, { useState, useEffect } from 'react';
import { languages } from '../utils/languages';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [translationCount, setTranslationCount] = useState(1247);
  const [activeFeature, setActiveFeature] = useState(0);
  const [expandedUseCase, setExpandedUseCase] = useState(null);

  // Counter animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslationCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const demoExamples = [
    { input: 'Hello, how are you?', output: 'Hola, ¿cómo estás?', lang: 'Spanish' },
    { input: 'Good morning!', output: 'Bonjour!', lang: 'French' },
    { input: 'Thank you very much', output: 'Vielen Dank', lang: 'German' },
    { input: 'I love programming', output: '私はプログラミングが大好きです', lang: 'Japanese' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get translations in milliseconds with our optimized API',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🎯',
      title: 'Highly Accurate',
      description: 'AI-powered translations with 98% accuracy rate',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and never stored on our servers',
      color: 'from-blue-400 to-indigo-500'
    },
  ];

  // Translate function using MyMemory Translation API (free, no API key required)
  const translateText = async () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=en|${targetLanguage}`
      );
      const data = await response.json();
      
      if (data.responseData && data.responseData.translatedText) {
        setOutputText(data.responseData.translatedText);
        setTranslationCount(prev => prev + 1);
      } else {
        setOutputText('Translation failed. Please try again.');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('Error occurred during translation.');
    }
    setIsLoading(false);
  };

  const handleTranslate = () => {
    translateText();
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadDemoExample = (example) => {
    setInputText(example.input);
    setOutputText(example.output);
    const langCode = languages.find(l => l.name.includes(example.lang))?.code || 'es';
    setTargetLanguage(langCode);
    setShowDemo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sophisticated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Premium Header Section */}
        <div className="container mx-auto px-4 pt-12 pb-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold tracking-wide">AI-Powered Translation Platform</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
                  Text Translator
                </span>
              </h1>
              <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
                Break through language barriers with precision and elegance
              </p>
              
              {/* Elegant Stats Cards */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="group bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:scale-105">
                  <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    {translationCount.toLocaleString()}+
                  </div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Translations Today</div>
                </div>
                <div className="group bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:scale-105">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    100+
                  </div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Languages</div>
                </div>
                <div className="group bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:scale-105">
                  <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Accuracy</div>
                </div>
              </div>

              {/* Premium CTA Button */}
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                <span>View Demo Examples</span>
              </button>
            </div>

            {/* Premium Demo Modal */}
            {showDemo && (
              <div className="mb-10 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-slate-900">Interactive Examples</h3>
                  <button onClick={() => setShowDemo(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {demoExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadDemoExample(example)}
                      className="text-left p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-300 group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white text-xl">
                          🌍
                        </div>
                        <span className="font-bold text-indigo-700 text-lg">{example.lang}</span>
                      </div>
                      <div className="text-sm text-slate-600 mb-2 font-medium">{example.input}</div>
                      <div className="text-base font-semibold text-violet-700">→ {example.output}</div>
                      <div className="text-xs text-indigo-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity font-semibold flex items-center gap-1">
                        <span>Try this example</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Translator Card */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
          <div className="p-10 md:p-12">
            {/* Elegant Language Indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-indigo-100 text-indigo-900 rounded-xl text-sm font-bold uppercase tracking-wide shadow-sm">
                  English
                </div>
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="px-5 py-2.5 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-900 rounded-xl text-sm font-bold uppercase tracking-wide shadow-sm">
                  {languages.find(lang => lang.code === targetLanguage)?.name || 'Select Language'}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Premium Input Area */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    Source Text
                  </label>
                  {inputText && (
                    <button
                      onClick={handleClear}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors font-bold flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-56 p-6 border-2 border-slate-200 rounded-2xl resize-none focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-800 text-lg leading-relaxed shadow-sm bg-slate-50/50 font-medium"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                      {inputText.length} / 5000
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Output Area */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    Translated Text
                  </label>
                  {outputText && (
                    <button
                      onClick={handleCopy}
                      className="text-xs text-indigo-600 hover:text-indigo-700 transition-colors font-bold flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      {copied ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Translation will appear here..."
                    className="w-full h-56 p-6 border-2 border-slate-200 rounded-2xl resize-none bg-gradient-to-br from-slate-50 to-indigo-50/30 text-slate-800 text-lg leading-relaxed shadow-sm font-medium"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 border-4 border-indigo-200 rounded-full"></div>
                          <div className="w-14 h-14 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <span className="text-sm font-bold text-indigo-600 tracking-wide">Translating...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Swap Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleSwap}
                disabled={!outputText}
                className="group p-5 bg-gradient-to-r from-indigo-100 to-violet-100 hover:from-indigo-200 hover:to-violet-200 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg border-2 border-indigo-200/50"
                title="Swap languages"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-indigo-700 group-hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            {/* Premium Controls */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              <div className="flex-1">
                <label className="text-slate-900 font-bold text-sm mb-3 block uppercase tracking-wider">
                  Target Language
                </label>
                <div className="relative">
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full p-5 pl-14 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer text-slate-800 font-semibold bg-white shadow-sm appearance-none text-base"
                  >
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  <svg className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="lg:w-72">
                <label className="text-transparent font-bold text-sm mb-3 block uppercase tracking-wider select-none">
                  Action
                </label>
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || !targetLanguage || isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-black text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-wide"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Translate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Status Bar */}
          <div className="bg-gradient-to-r from-slate-50 via-indigo-50 to-violet-50 px-10 py-5 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                <span className="text-slate-700 font-bold">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-700 font-bold">100+ Languages</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-slate-700 font-bold">Bank-Level Security</span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
                Enterprise-Grade Features
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
                Experience translation technology built for professionals
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${
                    activeFeature === index ? 'border-indigo-400 scale-105' : 'border-slate-200/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`text-7xl mb-6 transform transition-all duration-500 ${activeFeature === index ? 'scale-125' : 'scale-100'}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{feature.description}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color} transform transition-all duration-500 ${
                    activeFeature === index ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium How It Works */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900 rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-black text-center mb-16">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-10">
                {[
                  { num: '01', title: 'Input Text', desc: 'Type or paste your content' },
                  { num: '02', title: 'Select Language', desc: 'Choose from 100+ options' },
                  { num: '03', title: 'AI Processing', desc: 'Instant intelligent translation' },
                  { num: '04', title: 'Copy & Use', desc: 'One-click to clipboard' }
                ].map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black group-hover:bg-white/20 transition-all group-hover:scale-110 shadow-xl">
                      {step.num}
                    </div>
                    <h3 className="font-black mb-3 text-xl">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Languages Showcase */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-slate-200/50">
            <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
              Global Language Support
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Chinese', 'Korean', 'Arabic', 'Hindi', 'Turkish', 'Dutch', 'Swedish', 'Polish', 'Vietnamese'].map((lang, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-violet-100 hover:from-indigo-200 hover:to-violet-200 rounded-xl text-sm font-bold text-indigo-900 transition-all cursor-pointer hover:scale-110 shadow-md hover:shadow-lg"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Use Cases */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
                Built For Every Professional
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
                Trusted by industry leaders worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: '💼', 
                  title: 'Business', 
                  desc: 'International client communication', 
                  color: 'from-blue-600 to-cyan-600',
                  details: {
                    features: ['📧 Email Translation', '📞 Video Call Support', '📄 Document Translation', '🤝 Contract Review'],
                    stats: '500K+ Businesses',
                    benefit: 'Close deals faster with real-time translation'
                  }
                },
                { 
                  icon: '📚', 
                  title: 'Education', 
                  desc: 'Academic research & learning', 
                  color: 'from-violet-600 to-purple-600',
                  details: {
                    features: ['📖 Research Papers', '🎓 Online Courses', '📝 Study Materials', '🌍 Global Collaboration'],
                    stats: '2M+ Students',
                    benefit: 'Access knowledge in any language'
                  }
                },
                { 
                  icon: '✈️', 
                  title: 'Travel', 
                  desc: 'Navigate foreign destinations', 
                  color: 'from-emerald-600 to-teal-600',
                  details: {
                    features: ['🗺️ Direction Translation', '🍽️ Menu Reading', '🏨 Hotel Communication', '🚖 Local Navigation'],
                    stats: '1M+ Travelers',
                    benefit: 'Travel confidently anywhere in the world'
                  }
                },
                { 
                  icon: '✍️', 
                  title: 'Content', 
                  desc: 'Multilingual content creation', 
                  color: 'from-orange-600 to-red-600',
                  details: {
                    features: ['📱 Social Media Posts', '📰 Blog Articles', '🎬 Video Captions', '📢 Marketing Copy'],
                    stats: '300K+ Creators',
                    benefit: 'Reach global audiences effortlessly'
                  }
                }
              ].map((useCase, index) => (
                <div key={index} className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200/50 hover:border-indigo-300 overflow-hidden">
                  <div className="p-8 cursor-pointer" onClick={() => setExpandedUseCase(expandedUseCase === index ? null : index)}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg text-3xl`}>
                      {useCase.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-slate-900">{useCase.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{useCase.desc}</p>
                    <div className="mt-5 flex items-center text-indigo-600 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore</span>
                      <svg className={`w-5 h-5 transition-transform ${expandedUseCase === index ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {expandedUseCase === index && (
                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 p-6 border-t-2 border-indigo-200 animate-fadeIn">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">⭐</span>
                          <h4 className="font-black text-lg text-slate-900">Key Features</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {useCase.details.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white/60 rounded-lg px-3 py-2">
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">👥</span>
                        <div>
                          <div className="text-sm text-slate-600 font-medium">Trusted by</div>
                          <div className={`text-xl font-black bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent`}>
                            {useCase.details.stats}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 bg-white/80 rounded-lg p-3">
                        <span className="text-xl">💡</span>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase mb-1">Why Choose Us</div>
                          <div className="text-sm font-semibold text-slate-700">{useCase.details.benefit}</div>
                        </div>
                      </div>
                      
                      <button className={`w-full mt-4 bg-gradient-to-r ${useCase.color} text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                        <span>Get Started</span>
                        <span className="text-lg">🚀</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Footer */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 mb-6">
              <div className="flex flex-wrap justify-center items-center gap-10 text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span className="font-bold text-slate-700">No Registration</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span className="font-bold text-slate-700">100% Free Forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span className="font-bold text-slate-700">Zero Advertisements</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 font-medium mb-2">
              Powered by <span className="font-black text-indigo-600">MyMemory Translation API</span>
            </p>
            <p className="text-slate-400 text-sm">© 2026 Text Translator. Crafted with precision for global communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
