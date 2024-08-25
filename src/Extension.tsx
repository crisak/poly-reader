import { useState, useEffect } from 'react'
import { Button, Input } from "./components/ui"
import { Languages, Settings } from "lucide-react"

export default function Extension() {
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    handleChange()
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de traducción
    setTranslatedText(textToTranslate.split('').reverse().join(''))
  }

  return (
    <div className="w-[400px] bg-white dark:bg-[#121F3D] text-[#121F3D] dark:text-white p-4 shadow-lg rounded-lg">
      <form onSubmit={handleTranslate} className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Ingrese texto"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-[#98CA3F] focus:outline-none focus:ring-2 focus:ring-[#98CA3F] bg-white dark:bg-[#1C3058] placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Languages className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#98CA3F]" size={20} />
          </div>
          <Button 
            type="submit"
            className="bg-[#98CA3F] hover:bg-[#7DAF2C] text-white text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Traducir
          </Button>
          <Button 
            type="button"
            variant="ghost"
            className="text-[#98CA3F] hover:bg-[#E5F5D6] dark:hover:bg-[#2A3B47] p-2 rounded-full transition duration-300 ease-in-out"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} />
            <span className="sr-only">Configuraciones</span>
          </Button>
        </div>
        {translatedText && (
          <div className="bg-[#E5F5D6] dark:bg-[#2A3B47] p-3 rounded-md text-sm">
            <p>{translatedText}</p>
          </div>
        )}
      </form>
      {showSettings && (
        <div className="mt-3 p-3 bg-[#E5F5D6] dark:bg-[#2A3B47] rounded-md">
          <h3 className="text-sm font-semibold mb-2">Configuraciones rápidas</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-[#98CA3F] focus:ring-[#98CA3F]" />
              <span className="text-sm">Traducción automática</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-[#98CA3F] focus:ring-[#98CA3F]" />
              <span className="text-sm">Detectar idioma</span>
            </label>
          </div>
        </div>
      )}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>© 2024 Crisak - <a href="#" className="text-[#98CA3F] hover:underline">Opciones de extensión</a> - <a href="#" className="text-[#98CA3F] hover:underline">Crisak Translate</a></p>
      </div>
    </div>
  )
}