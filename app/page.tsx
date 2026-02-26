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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ 
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl hero-icon">⚡</div>
              <div>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>CSS Minifier</span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Compress CSS</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-6 hero-icon">⚡</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              CSS Minifier
            </h1>
            <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Compress and optimize your CSS code for faster websites.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="card p-6 md:p-8" style={{ backgroundColor: 'var(--color-surface)' }}>
          {/* Action Button */}
          <div className="flex gap-3 mb-6">
            <button onClick={minify} className="btn-primary" disabled={!input}>
              ⚡ Minify CSS
            </button>
          </div>

          {/* Input/Output Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="rounded-xl overflow-hidden" style={{ 
              backgroundColor: 'var(--neutral-50)',
              border: '1px solid var(--color-border)'
            }}>
              <div className="px-4 py-3 border-b flex justify-between" style={{ 
                backgroundColor: 'var(--neutral-100)',
                borderColor: 'var(--color-border)'
              }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Input CSS</span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSS here..."
                className="w-full h-80 px-4 py-3 border-0 resize-y focus:outline-none font-mono text-sm"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>

            {/* Output */}
            <div className="rounded-xl overflow-hidden" style={{ 
              backgroundColor: 'var(--neutral-50)',
              border: '1px solid var(--color-border)'
            }}>
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ 
                backgroundColor: 'var(--neutral-100)',
                borderColor: 'var(--color-border)'
              }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Minified CSS</span>
                <button 
                  onClick={copyToClipboard} 
                  className="text-xs font-medium hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Minified CSS will appear here..."
                className="w-full h-80 px-4 py-3 border-0 resize-y focus:outline-none font-mono text-sm"
                style={{ 
                  backgroundColor: 'var(--neutral-50)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
          </div>

          {/* Stats */}
          {stats.original > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="stat-card p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stats.original}</div>
                <div className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>Original (bytes)</div>
              </div>
              <div className="stat-card-primary p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{stats.minified}</div>
                <div className="text-xs font-medium" style={{ color: 'var(--primary-700)' }}>Minified (bytes)</div>
              </div>
              <div className="stat-card-success p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--success-600)' }}>{stats.saved}%</div>
                <div className="text-xs font-medium" style={{ color: 'var(--success-600)' }}>Saved</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: 'var(--neutral-900)',
        color: 'var(--neutral-400)',
        padding: 'var(--space-12) var(--space-6)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ 
                background: 'var(--gradient-primary)'
              }}>⚡</div>
              <span className="font-semibold" style={{ color: 'var(--neutral-200)' }}>CSS Minifier</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--neutral-500)' }}>
              © 2024 SmartOK Tools. Free online tools.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--neutral-500)' }}>
                Privacy
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--neutral-500)' }}>
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
