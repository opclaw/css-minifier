'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('minify')

  const minifyCSS = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])>\s*/g, '$1')
      .replace(/;\s*}/g, '}')
      .trim()
  }

  const beautifyCSS = (css: string) => {
    let formatted = ''
    let indent = 0
    const lines = css.replace(/\s+/g, ' ').split(/\{|\}|;/)
    
    lines.forEach((line) => {
      line = line.trim()
      if (!line) return
      
      if (line.includes('}')) indent = Math.max(0, indent - 1)
      formatted += '  '.repeat(indent) + line + ';\n'
      if (line.includes('{')) indent++
    })
    
    return formatted
  }

  const handleConvert = () => {
    if (!input.trim()) return
    setOutput(mode === 'minify' ? minifyCSS(input) : beautifyCSS(input))
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎨 CSS Minifier & Beautifier</h1>
      
      <div className={styles.modes}>
        <button 
          onClick={() => setMode('minify')}
          className={mode === 'minify' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}
        >
          📦 Minify
        </button>
        <button 
          onClick={() => setMode('beautify')}
          className={mode === 'beautify' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}
        >
          ✨ Beautify
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your CSS here..."
        className={styles.input}
      />

      <button onClick={handleConvert} className={styles.convertBtn}>
        {mode === 'minify' ? '📦 Minify CSS' : '✨ Beautify CSS'}
      </button>

      {output && (
        <>
          <div className={styles.stats}>
            Original: {input.length} chars → Result: {output.length} chars 
            ({Math.round((1 - output.length / input.length) * 100)}% reduction)
          </div>
          <textarea value={output} readOnly className={styles.output} />
          <button onClick={copyOutput} className={styles.copyBtn}>📋 Copy Result</button>
        </>
      )}
    </div>
  )
}