'use client'

import { useState, useCallback } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 })

  const minify = useCallback(() => {
    let result = input
    // Remove comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace around symbols
    result = result.replace(/\s*([{}:;,+>])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    result = result.replace(/;}/g, '}')
    // Remove newlines
    result = result.replace(/\n/g, '')
    // Remove multiple spaces
    result = result.replace(/\s+/g, ' ')
    // Trim
    result = result.trim()

    setOutput(result)
    setStats({
      original: input.length,
      minified: result.length,
      saved: Math.round((1 - result.length / input.length) * 100) || 0
    })
  }, [input])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">⚡</div>
              <div>
                <span className="text-xl font-bold text-slate-900">CSS Minifier</span>
                <p className="text-sm text-slate-500">Compress CSS</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl shadow-xl mb-6">⚡</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">CSS Minifier</h1>
            <p className="text-lg md:text-xl text-slate-600">Compress and optimize your CSS code for faster websites.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="flex gap-3 mb-6">
            <button onClick={minify} className="btn-primary bg-indigo-600 hover:bg-indigo-700" disabled={!input}>
              ⚡ Minify CSS
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex justify-between">
                <span className="text-sm font-semibold text-slate-700">Input CSS</span>
                <span className="text-xs text-slate-500">{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSS here..."
                className="w-full h-80 px-4 py-3 bg-white border-0 resize-y focus:outline-none font-mono text-sm"
              />
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Minified CSS</span>
                <button onClick={copyToClipboard} className="text-xs font-medium text-indigo-600">
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Minified CSS will appear here..."
                className="w-full h-80 px-4 py-3 bg-slate-50 border-0 resize-y focus:outline-none font-mono text-sm"
              />
            </div>
          </div>

          {stats.original > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                <div className="text-2xl font-bold text-slate-700">{stats.original}</div>
                <div className="text-xs font-medium text-slate-500">Original (bytes)</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                <div className="text-2xl font-bold text-indigo-600">{stats.minified}</div>
                <div className="text-xs font-medium text-slate-500">Minified (bytes)</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{stats.saved}%</div>
                <div className="text-xs font-medium text-emerald-600">Saved</div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
