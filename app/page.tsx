"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Copy, Check, Zap, Sparkles, Shield, Clock, ArrowUp, Code2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

// NOSONAR: This component has high cognitive complexity due to 30+ tool implementations.
// Refactoring into separate modules is planned for a future version.
export default function FlintTools() {
  const [openTools, setOpenTools] = useState<Record<string, boolean>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleTool = (id: string) => {
    setOpenTools((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Helper function for responsive button size
  const getButtonSize = () => (isMobile ? "default" : "sm")

  // Tool states - organized by category
  const [toolStates, setToolStates] = useState<Record<string, any>>({
    // Text Tools
    textInput: "",
    textOutput: "",

    // Conversion Tools
    base64Input: "",
    base64Output: "",
    urlInput: "",
    urlOutput: "",

    // Generator Tools
    qrInput: "",
    qrOutput: "",
    passwordLength: 12,
    passwordOutput: "",
    uuidOutput: "",
    loremLength: 5,
    loremOutput: "",

    // Developer Tools
    jsonInput: "",
    jsonOutput: "",
    htmlInput: "",
    htmlOutput: "",

    // Hash & Security
    hashInput: "",
    hashOutput: "",

    // Color Tools
    colorInput: "#ff0000",
    colorOutput: "",

    // Date Tools
    dateInput: new Date().toISOString().split("T")[0],
    dateOutput: "",

    // File Tools
    fileSize: "",
    fileSizeResult: "",

    // Image Tools
    imageWidth: "",
    imageHeight: "",
    imageResult: "",

    // Network Tools
    ipAddress: "",
    ipResult: "",
  })

  const updateToolState = (key: string, value: any) => {
    setToolStates((prev) => ({ ...prev, [key]: value }))
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error('Clipboard error:', err)
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  // Text Tools Functions
  const textTools = {
    wordCount: () => {
      const text = toolStates.textInput
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      const chars = text.length
      const charsNoSpaces = text.replaceAll(/\s/g, "").length
      const lines = text.split("\n").length
      const paragraphs = text.split(/\n\s*\n/).filter((p: string) => p.trim()).length
      updateToolState(
        "textOutput",
        `Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}\nLines: ${lines}\nParagraphs: ${paragraphs}`,
      )
    },

    reverseText: () => {
      updateToolState("textOutput", toolStates.textInput.split("").reverse().join(""))
    },

    upperCase: () => {
      updateToolState("textOutput", toolStates.textInput.toUpperCase())
    },

    lowerCase: () => {
      updateToolState("textOutput", toolStates.textInput.toLowerCase())
    },

    titleCase: () => {
      updateToolState(
        "textOutput",
        toolStates.textInput.replaceAll(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()),
      )
    },

    camelCase: () => {
      const camelCased = toolStates.textInput
        .replaceAll(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replaceAll(/\s+/g, "")
      updateToolState("textOutput", camelCased)
    },

    snakeCase: () => {
      const snakeCased = toolStates.textInput
        .replaceAll(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word: string) => word.toLowerCase())
        .join("_")
      updateToolState("textOutput", snakeCased)
    },

    kebabCase: () => {
      const kebabCased = toolStates.textInput
        .replaceAll(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word: string) => word.toLowerCase())
        .join("-")
      updateToolState("textOutput", kebabCased)
    },

    removeSpaces: () => {
      updateToolState("textOutput", toolStates.textInput.replaceAll(/\s/g, ""))
    },
  }

  // Conversion Tools Functions
  const conversionTools = {
    encodeBase64: () => {
      try {
        updateToolState("base64Output", btoa(toolStates.base64Input))
      } catch (error) {
        console.error('Base64 encode error:', error)
        toast({ title: "Error", description: "Failed to encode Base64", variant: "destructive" })
      }
    },

    decodeBase64: () => {
      try {
        updateToolState("base64Output", atob(toolStates.base64Input))
      } catch (error) {
        console.error('Base64 decode error:', error)
        toast({ title: "Error", description: "Invalid Base64 string", variant: "destructive" })
      }
    },

    encodeURL: () => {
      updateToolState("urlOutput", encodeURIComponent(toolStates.urlInput))
    },

    decodeURL: () => {
      try {
        updateToolState("urlOutput", decodeURIComponent(toolStates.urlInput))
      } catch (error) {
        console.error('URL decode error:', error)
        toast({ title: "Error", description: "Failed to decode URL", variant: "destructive" })
      }
    },

    textToBinary: () => {
      const binary = toolStates.textInput
        .split("")
        .map((char: string) => (char.codePointAt(0) ?? 0).toString(2).padStart(8, "0"))
        .join(" ")
      updateToolState("textOutput", binary)
    },

    binaryToText: () => {
      try {
        const text = toolStates.textInput
          .split(" ")
          .map((binary: string) => String.fromCodePoint(Number.parseInt(binary, 2)))
          .join("")
        updateToolState("textOutput", text)
      } catch (error) {
        console.error('Binary conversion error:', error)
        toast({ title: "Error", description: "Invalid binary format", variant: "destructive" })
      }
    },

    textToHex: () => {
      const hex = toolStates.textInput
        .split("")
        .map((char: string) => (char.codePointAt(0) ?? 0).toString(16).padStart(2, "0"))
        .join(" ")
      updateToolState("textOutput", hex)
    },

    hexToText: () => {
      try {
        const text = toolStates.textInput
          .split(" ")
          .map((hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
          .join("")
        updateToolState("textOutput", text)
      } catch (error) {
        console.error('Hex conversion error:', error)
        toast({ title: "Error", description: "Invalid hex format", variant: "destructive" })
      }
    },

    textToMorse: () => {
      const morseCode: Record<string, string> = {
        A: ".-",
        B: "-...",
        C: "-.-.",
        D: "-..",
        E: ".",
        F: "..-.",
        G: "--.",
        H: "....",
        I: "..",
        J: ".---",
        K: "-.-",
        L: ".-..",
        M: "--",
        N: "-.",
        O: "---",
        P: ".--.",
        Q: "--.-",
        R: ".-.",
        S: "...",
        T: "-",
        U: "..-",
        V: "...-",
        W: ".--",
        X: "-..-",
        Y: "-.--",
        Z: "--..",
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        " ": "/",
      }
      const morse = toolStates.textInput
        .toUpperCase()
        .split("")
        .map((char: string) => morseCode[char] || char)
        .join(" ")
      updateToolState("textOutput", morse)
    },

    morseToText: () => {
      const morseToChar: Record<string, string> = {
        ".-": "A",
        "-...": "B",
        "-.-.": "C",
        "-..": "D",
        ".": "E",
        "..-.": "F",
        "--.": "G",
        "....": "H",
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L",
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P",
        "--.-": "Q",
        ".-.": "R",
        "...": "S",
        "-": "T",
        "..-": "U",
        "...-": "V",
        ".--": "W",
        "-..-": "X",
        "-.--": "Y",
        "--..": "Z",
        "-----": "0",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "/": " ",
      }
      const text = toolStates.textInput
        .split(" ")
        .map((morse: string) => morseToChar[morse] || morse)
        .join("")
      updateToolState("textOutput", text)
    },

    rgbToHex: () => {
      const rgb = toolStates.textInput.match(/\d+/g)
      if (rgb?.length === 3) {
        const hex = rgb.map((x: string) => Number.parseInt(x).toString(16).padStart(2, "0")).join("")
        updateToolState("textOutput", `#${hex}`)
      } else {
        toast({ title: "Error", description: "Invalid RGB format. Use: 255, 0, 0", variant: "destructive" })
      }
    },

    hexToRgb: () => {
      const hex = toolStates.textInput.replace("#", "")
      if (hex.length === 6) {
        const r = Number.parseInt(hex.substr(0, 2), 16)
        const g = Number.parseInt(hex.substr(2, 2), 16)
        const b = Number.parseInt(hex.substr(4, 2), 16)
        updateToolState("textOutput", `rgb(${r}, ${g}, ${b})`)
      } else {
        toast({ title: "Error", description: "Invalid hex format", variant: "destructive" })
      }
    },
  }

  // Generator Tools Functions
  const generatorTools = {
    generateQR: () => {
      if (!toolStates.qrInput.trim()) {
        toast({ title: "Error", description: "Please enter text to generate QR code", variant: "destructive" })
        return
      }
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(toolStates.qrInput)}`
      updateToolState("qrOutput", qrUrl)
    },

    generatePassword: () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
      let password = ""
      for (let i = 0; i < toolStates.passwordLength; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      updateToolState("passwordOutput", password)
    },

    generateStrongPassword: () => {
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const lower = "abcdefghijklmnopqrstuvwxyz"
      const numbers = "0123456789"
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

      let password = ""
      const length = toolStates.passwordLength

      // Ensure at least one character from each category
      password += upper[Math.floor(Math.random() * upper.length)]
      password += lower[Math.floor(Math.random() * lower.length)]
      password += numbers[Math.floor(Math.random() * numbers.length)]
      password += symbols[Math.floor(Math.random() * symbols.length)]

      // Fill the rest randomly
      const allChars = upper + lower + numbers + symbols
      for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)]
      }

      // Shuffle the password
      password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
      updateToolState("passwordOutput", password)
    },

    generateUUID: () => {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll(/[xy]/g, (c) => {
        const r = Math.trunc(Math.random() * 16)
        const v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
      updateToolState("uuidOutput", uuid)
    },

    generateLorem: () => {
      const words = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "sed",
        "do",
        "eiusmod",
        "tempor",
        "incididunt",
        "ut",
        "labore",
        "et",
        "dolore",
        "magna",
        "aliqua",
        "enim",
        "ad",
        "minim",
        "veniam",
        "quis",
        "nostrud",
        "exercitation",
        "ullamco",
        "laboris",
        "nisi",
        "aliquip",
        "ex",
        "ea",
        "commodo",
        "consequat",
        "duis",
        "aute",
        "irure",
        "in",
        "reprehenderit",
        "voluptate",
        "velit",
        "esse",
        "cillum",
        "fugiat",
        "nulla",
        "pariatur",
        "excepteur",
        "sint",
        "occaecat",
        "cupidatat",
        "non",
        "proident",
        "sunt",
        "culpa",
        "qui",
        "officia",
        "deserunt",
        "mollit",
        "anim",
        "id",
        "est",
        "laborum",
      ]
      let lorem = ""
      for (let i = 0; i < toolStates.loremLength; i++) {
        const sentence = []
        const sentenceLength = Math.floor(Math.random() * 10) + 5
        for (let j = 0; j < sentenceLength; j++) {
          sentence.push(words[Math.floor(Math.random() * words.length)])
        }
        lorem += sentence.join(" ").charAt(0).toUpperCase() + sentence.join(" ").slice(1) + ". "
      }
      updateToolState("loremOutput", lorem.trim())
    },

    generateColorPalette: () => {
      const colors = []
      for (let i = 0; i < 5; i++) {
        const hue = Math.floor(Math.random() * 360)
        const saturation = Math.floor(Math.random() * 50) + 50
        const lightness = Math.floor(Math.random() * 40) + 30
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
      }
      updateToolState("colorOutput", colors.join("\n"))
    },

    generateBarcode: () => {
      if (!toolStates.barcodeInput.trim()) {
        toast({ title: "Error", description: "Please enter text for barcode", variant: "destructive" })
        return
      }
      // Using a simple barcode API
      const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(toolStates.barcodeInput)}&code=Code128&translate-esc=on`
      updateToolState("barcodeOutput", barcodeUrl)
    },
  }

  // Developer Tools Functions
  const developerTools = {
    formatJSON: () => {
      try {
        const parsed = JSON.parse(toolStates.jsonInput)
        updateToolState("jsonOutput", JSON.stringify(parsed, null, 2))
      } catch (error) {
        console.error('JSON parse error:', error)
        toast({ title: "Error", description: "Invalid JSON format", variant: "destructive" })
      }
    },

    minifyJSON: () => {
      try {
        const parsed = JSON.parse(toolStates.jsonInput)
        updateToolState("jsonOutput", JSON.stringify(parsed))
      } catch (error) {
        console.error('JSON parse error:', error)
        toast({ title: "Error", description: "Invalid JSON format", variant: "destructive" })
      }
    },

    validateJSON: () => {
      try {
        JSON.parse(toolStates.jsonInput)
        updateToolState("jsonOutput", "✅ Valid JSON")
      } catch (error) {
        updateToolState("jsonOutput", `❌ Invalid JSON: ${error}`)
      }
    },

    escapeHTML: () => {
      const escaped = toolStates.htmlInput
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
      updateToolState("htmlOutput", escaped)
    },

    unescapeHTML: () => {
      const unescaped = toolStates.htmlInput
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&#39;", "'")
      updateToolState("htmlOutput", unescaped)
    },

    formatXML: () => {
      try {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(toolStates.xmlInput, "text/xml")
        const serializer = new XMLSerializer()
        const formatted = serializer.serializeToString(xmlDoc)
        updateToolState("xmlOutput", formatted)
      } catch (error) {
        console.error('XML format error:', error)
        toast({ title: "Error", description: "Invalid XML format", variant: "destructive" })
      }
    },

    generateRegex: () => {
      const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\+?[\d\s()-]+$/,
        url: /^https?:\/\/[^\s]+$/,
        ipv4: /^(\d{1,3}\.){3}\d{1,3}$/,
        creditCard: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
        strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      }

      let result = "Common Regex Patterns:\n\n"
      for (const [name, pattern] of Object.entries(patterns)) {
        result += `${name}: ${pattern.source}\n`
      }

      updateToolState("regexOutput", result)
    },

    testRegex: () => {
      try {
        const regex = new RegExp(toolStates.regexPattern, toolStates.regexFlags || "g")
        const matches = toolStates.regexTestString.match(regex)
        updateToolState("regexOutput", matches ? matches.join("\n") : "No matches found")
      } catch (error) {
        console.error('Regex test error:', error)
        toast({ title: "Error", description: "Invalid regex pattern", variant: "destructive" })
      }
    },
  }

  // Hash & Security Functions
  const securityTools = {
    generateHash: async (algorithm: string) => {
      if (!toolStates.hashInput.trim()) {
        toast({ title: "Error", description: "Please enter text to hash", variant: "destructive" })
        return
      }

      try {
        const encoder = new TextEncoder()
        const data = encoder.encode(toolStates.hashInput)
        const hashBuffer = await crypto.subtle.digest(algorithm, data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
        updateToolState("hashOutput", `${algorithm}: ${hashHex}`)
      } catch (error) {
        console.error('Hash generation error:', error)
        toast({ title: "Error", description: `Failed to generate ${algorithm} hash`, variant: "destructive" })
      }
    },

    generateJWT: () => {
      const header = { alg: "HS256", typ: "JWT" }
      const payload = {
        sub: "1234567890",
        name: "John Doe",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      }

      const encodedHeader = btoa(JSON.stringify(header)).replaceAll("=", "")
      const encodedPayload = btoa(JSON.stringify(payload)).replaceAll("=", "")

      // Simple signature for demo purposes (not cryptographically secure)
      const data = `${encodedHeader}.${encodedPayload}`
      const signature = btoa(`demo_signature_${data.length}_${Date.now()}`).replaceAll("=", "").substring(0, 43)

      const jwt = `${encodedHeader}.${encodedPayload}.${signature}`
      updateToolState("jwtOutput", jwt)
    },

    decodeJWT: () => {
      try {
        const parts = toolStates.jwtInput.split(".")
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format")
        }

        const header = JSON.parse(atob(parts[0]))
        const payload = JSON.parse(atob(parts[1]))

        const result = `Header:\n${JSON.stringify(header, null, 2)}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`
        updateToolState("jwtOutput", result)
      } catch (error) {
        console.error('JWT decode error:', error)
        toast({ title: "Error", description: "Invalid JWT token", variant: "destructive" })
      }
    },
  }

  // Color Tools Functions
  const colorTools = {
    hexToRgb: () => {
      const hex = toolStates.colorInput.replace("#", "")
      const r = Number.parseInt(hex.substr(0, 2), 16)
      const g = Number.parseInt(hex.substr(2, 2), 16)
      const b = Number.parseInt(hex.substr(4, 2), 16)
      updateToolState("colorOutput", `RGB: rgb(${r}, ${g}, ${b})`)
    },

    hexToHsl: () => {
      const hex = toolStates.colorInput.replace("#", "")
      const r = Number.parseInt(hex.substr(0, 2), 16) / 255
      const g = Number.parseInt(hex.substr(2, 2), 16) / 255
      const b = Number.parseInt(hex.substr(4, 2), 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0,
        s = 0,
        l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      updateToolState(
        "colorOutput",
        `HSL: hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      )
    },

    generatePalette: () => {
      const baseColor = toolStates.colorInput
      const colors = []
      for (let i = 0; i < 5; i++) {
        const hue = (Number.parseInt(baseColor.substr(1, 2), 16) + i * 60) % 360
        colors.push(`hsl(${hue}, 70%, 50%)`)
      }
      updateToolState("colorOutput", colors.join("\n"))
    },

    colorContrast: () => {
      // Calculate contrast ratio between two colors
      const color1 = toolStates.color1 || "#000000"
      const color2 = toolStates.color2 || "#ffffff"

      const getLuminance = (hex: string) => {
        const rgb = hex
          .replace("#", "")
          .match(/.{2}/g)
          ?.map((x) => Number.parseInt(x, 16) / 255) || [0, 0, 0]
        return rgb
          .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))
          .reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0)
      }

      const l1 = getLuminance(color1)
      const l2 = getLuminance(color2)
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

      const getContrastLevel = (contrastRatio: number) => {
        if (contrastRatio >= 7) return "✅ AAA"
        if (contrastRatio >= 4.5) return "✅ AA"
        return "❌ Fail"
      }

      updateToolState(
        "colorOutput",
        `Contrast Ratio: ${ratio.toFixed(2)}:1\n${getContrastLevel(ratio)}`,
      )
    },
  }

  // Date Tools Functions
  const dateTools = {
    formatDate: () => {
      const date = new Date(toolStates.dateInput)
      const formats = [
        `ISO: ${date.toISOString()}`,
        `UTC: ${date.toUTCString()}`,
        `Local: ${date.toLocaleString()}`,
        `Unix Timestamp: ${Math.floor(date.getTime() / 1000)}`,
        `Milliseconds: ${date.getTime()}`,
        `Relative: ${getRelativeTime(date)}`,
      ]
      updateToolState("dateOutput", formats.join("\n"))
    },

    addDays: (days: number) => {
      const date = new Date(toolStates.dateInput)
      date.setDate(date.getDate() + days)
      updateToolState("dateOutput", date.toISOString().split("T")[0])
    },

    daysBetween: () => {
      const date1 = new Date(toolStates.date1 || toolStates.dateInput)
      const date2 = new Date(toolStates.date2 || new Date())
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      updateToolState("dateOutput", `${diffDays} days`)
    },

    timeZoneConverter: () => {
      const date = new Date(toolStates.dateInput)
      const timeZones = [
        "UTC",
        "America/New_York",
        "America/Los_Angeles",
        "Europe/London",
        "Europe/Paris",
        "Asia/Tokyo",
        "Asia/Shanghai",
        "Australia/Sydney",
      ]

      const conversions = timeZones.map((tz) => {
        try {
          return `${tz}: ${date.toLocaleString("en-US", { timeZone: tz })}`
        } catch {
          return `${tz}: Invalid timezone`
        }
      })

      updateToolState("dateOutput", conversions.join("\n"))
    },

    ageCalculator: () => {
      const birthDate = new Date(toolStates.birthDate || toolStates.dateInput)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age
      const nextBirthday = new Date(
        today.getFullYear() + (adjustedAge === age ? 1 : 0),
        birthDate.getMonth(),
        birthDate.getDate(),
      )
      const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      updateToolState("dateOutput", `Age: ${adjustedAge} years\nDays until next birthday: ${daysUntilBirthday}`)
    },
  }

  // Utility function for relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays === -1) return "Tomorrow"
    if (diffDays > 0) return `${diffDays} days ago`
    return `In ${Math.abs(diffDays)} days`
  }

  // Image Tools Functions
  const imageTools = {
    calculateAspectRatio: () => {
      const width = Number.parseFloat(toolStates.imageWidth)
      const height = Number.parseFloat(toolStates.imageHeight)

      if (Number.isNaN(width) || Number.isNaN(height)) return

      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const divisor = gcd(width, height)

      updateToolState("imageResult", `Aspect Ratio: ${width / divisor}:${height / divisor}`)
    },
  }

  // Network Tools Functions
  const networkTools = {
    validateIP: () => {
      const ip = toolStates.ipAddress
      const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
      const ipv6Regex = /^(?:[\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/

      let result = ""
      if (ipv4Regex.test(ip)) {
        result = "✅ Valid IPv4 address"
        const parts = ip.split(".").map(Number)
        const isPrivate =
          parts[0] === 10 ||
          (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
          (parts[0] === 192 && parts[1] === 168)
        result += `\nType: ${isPrivate ? "Private" : "Public"}`
      } else if (ipv6Regex.test(ip)) {
        result = "✅ Valid IPv6 address"
      } else {
        result = "❌ Invalid IP address"
      }

      updateToolState("ipResult", result)
    },

    subnetCalculator: () => {
      const [ip, cidr] = toolStates.subnet.split("/")
      const cidrNum = Number.parseInt(cidr)

      if (!ip || Number.isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        updateToolState("subnetResult", "Invalid subnet format. Use: 192.168.1.0/24")
        return
      }

      const ipParts = ip.split(".").map(Number)
      const mask = (0xffffffff << (32 - cidrNum)) >>> 0
      const network = ((ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3]) & mask
      const broadcast = network | (0xffffffff >>> cidrNum)

      const networkAddr = [
        (network >>> 24) & 0xff,
        (network >>> 16) & 0xff,
        (network >>> 8) & 0xff,
        network & 0xff,
      ].join(".")

      const broadcastAddr = [
        (broadcast >>> 24) & 0xff,
        (broadcast >>> 16) & 0xff,
        (broadcast >>> 8) & 0xff,
        broadcast & 0xff,
      ].join(".")

      const hosts = Math.pow(2, 32 - cidrNum) - 2

      updateToolState(
        "subnetResult",
        `Network: ${networkAddr}\nBroadcast: ${broadcastAddr}\nHosts: ${hosts}\nSubnet Mask: ${[
          (mask >>> 24) & 0xff,
          (mask >>> 16) & 0xff,
          (mask >>> 8) & 0xff,
          mask & 0xff,
        ].join(".")}`,
      )
    },

    portChecker: () => {
      const commonPorts: Record<string, string> = {
        "21": "FTP",
        "22": "SSH",
        "23": "Telnet",
        "25": "SMTP",
        "53": "DNS",
        "80": "HTTP",
        "110": "POP3",
        "143": "IMAP",
        "443": "HTTPS",
        "993": "IMAPS",
        "995": "POP3S",
        "3389": "RDP",
        "5432": "PostgreSQL",
        "3306": "MySQL",
        "27017": "MongoDB",
        "6379": "Redis",
      }

      const port = toolStates.portNumber
      const service = commonPorts[port] || "Unknown"
      updateToolState("portResult", `Port ${port}: ${service}`)
    },
  }

  // Tool Categories
  const toolCategories = [
    {
      id: "text",
      title: "Text & Content",
      description: "Transform text, generate content, and encode/decode data",
      tools: [
        {
          id: "word-count",
          title: "Word Counter",
          description: "Count words, characters, lines, and paragraphs",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to analyze..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <Button onClick={textTools.wordCount} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                Count Words
              </Button>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea value={toolStates.textOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "text")}
                    className="copy-btn"
                  >
                    {copiedStates.text ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "text-transform",
          title: "Text Case Converter",
          description: "Transform text case and format",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to transform..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={textTools.upperCase} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  UPPER
                </Button>
                <Button onClick={textTools.lowerCase} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  lower
                </Button>
                <Button onClick={textTools.titleCase} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Title
                </Button>
                <Button onClick={textTools.camelCase} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                  camelCase
                </Button>
                <Button onClick={textTools.snakeCase} className="btn-gradient btn-gradient-orange text-white rounded-xl">
                  snake_case
                </Button>
                <Button onClick={textTools.kebabCase} className="btn-gradient btn-gradient-pink text-white rounded-xl">
                  kebab-case
                </Button>
                <Button onClick={textTools.reverseText} className="btn-gradient btn-gradient-cyan text-white rounded-xl">
                  Reverse
                </Button>
                <Button onClick={textTools.removeSpaces} className="btn-gradient btn-gradient-yellow text-white rounded-xl">
                  No Spaces
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea value={toolStates.textOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "transform")}
                    className="copy-btn"
                  >
                    {copiedStates.transform ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "webdev",
      title: "Web Development",
      description: "Format code, validate data, generate hashes, and work with colors",
      tools: [
        {
          id: "base64",
          title: "Base64 Encoder/Decoder",
          description: "Encode or decode Base64 strings",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to encode/decode..."
                value={toolStates.base64Input}
                onChange={(e) => updateToolState("base64Input", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <Button onClick={conversionTools.encodeBase64} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Encode
                </Button>
                <Button onClick={conversionTools.decodeBase64} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                  Decode
                </Button>
              </div>
              {toolStates.base64Output && (
                <div className="relative">
                  <Textarea
                    value={toolStates.base64Output}
                    readOnly
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.base64Output, "base64")}
                    className="copy-btn"
                  >
                    {copiedStates.base64 ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "url",
          title: "URL Encoder/Decoder",
          description: "Encode or decode URL strings",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter URL to encode/decode..."
                value={toolStates.urlInput}
                onChange={(e) => updateToolState("urlInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <Button onClick={conversionTools.encodeURL} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Encode
                </Button>
                <Button onClick={conversionTools.decodeURL} className="btn-gradient btn-gradient-orange text-white rounded-xl">
                  Decode
                </Button>
              </div>
              {toolStates.urlOutput && (
                <div className="relative">
                  <Textarea value={toolStates.urlOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.urlOutput, "url")}
                    className="copy-btn"
                  >
                    {copiedStates.url ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "binary-hex",
          title: "Binary & Hex Converter",
          description: "Convert text to binary and hex",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text or binary/hex to convert..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={conversionTools.textToBinary} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  Text → Binary
                </Button>
                <Button onClick={conversionTools.binaryToText} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Binary → Text
                </Button>
                <Button onClick={conversionTools.textToHex} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Text → Hex
                </Button>
                <Button onClick={conversionTools.hexToText} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                  Hex → Text
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.textOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono text-sm"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "binary")}
                    className="copy-btn"
                  >
                    {copiedStates.binary ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "morse-code",
          title: "Morse Code Converter",
          description: "Convert text to Morse code and vice versa",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text or Morse code..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <Button onClick={conversionTools.textToMorse} className="btn-gradient btn-gradient-cyan text-white rounded-xl">
                  Text → Morse
                </Button>
                <Button onClick={conversionTools.morseToText} className="btn-gradient btn-gradient-pink text-white rounded-xl">
                  Morse → Text
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.textOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "morse")}
                    className="copy-btn"
                  >
                    {copiedStates.morse ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "color-converter",
          title: "Color Code Converter",
          description: "Convert between RGB and Hex colors",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter RGB (255, 0, 0) or Hex (#ff0000)..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <Button onClick={conversionTools.rgbToHex} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  RGB → Hex
                </Button>
                <Button onClick={conversionTools.hexToRgb} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Hex → RGB
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Input
                    value={toolStates.textOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "colorconv")}
                    className="copy-btn"
                  >
                    {copiedStates.colorconv ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "converters",
      title: "Calculators & Converters",
      description: "Convert units, calculate dates, finances, image dimensions, and network tools",
      tools: [
        {
          id: "qr",
          title: "QR Code Generator",
          description: "Generate QR codes from text",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to generate QR code..."
                value={toolStates.qrInput}
                onChange={(e) => updateToolState("qrInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={generatorTools.generateQR} className="btn-gradient btn-gradient-pink text-white rounded-xl">
                Generate QR Code
              </Button>
              {toolStates.qrOutput && (
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={toolStates.qrOutput || "/placeholder.svg"}
                    alt="Generated QR Code"
                    className="border border-white/20 rounded-lg bg-white p-2"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.qrOutput, "qr")}
                    className="bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.qr ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy QR URL
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "password",
          title: "Password Generator",
          description: "Generate secure passwords",
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="password-length" className="text-white">Length:</label>
                <Input
                  id="password-length"
                  type="number"
                  min="4"
                  max="128"
                  value={toolStates.passwordLength}
                  onChange={(e) => updateToolState("passwordLength", Number.parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white w-20"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={generatorTools.generatePassword} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  Generate Password
                </Button>
                <Button onClick={generatorTools.generateStrongPassword} className="btn-gradient btn-gradient-orange text-white rounded-xl">
                  Strong Password
                </Button>
              </div>
              {toolStates.passwordOutput && (
                <div className="relative">
                  <Input
                    value={toolStates.passwordOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.passwordOutput, "password")}
                    className="copy-btn"
                  >
                    {copiedStates.password ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "uuid",
          title: "UUID Generator",
          description: "Generate unique identifiers",
          content: (
            <div className="space-y-4">
              <Button onClick={generatorTools.generateUUID} className="btn-gradient btn-gradient-cyan text-white rounded-xl">
                Generate UUID
              </Button>
              {toolStates.uuidOutput && (
                <div className="relative">
                  <Input
                    value={toolStates.uuidOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.uuidOutput, "uuid")}
                    className="copy-btn"
                  >
                    {copiedStates.uuid ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "lorem",
          title: "Lorem Ipsum Generator",
          description: "Generate placeholder text",
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="lorem-sentences" className="text-white">Sentences:</label>
                <Input
                  id="lorem-sentences"
                  type="number"
                  min="1"
                  max="20"
                  value={toolStates.loremLength}
                  onChange={(e) => updateToolState("loremLength", Number.parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white w-20"
                />
              </div>
              <Button onClick={generatorTools.generateLorem} className="btn-gradient btn-gradient-yellow text-white rounded-xl">
                Generate Lorem Ipsum
              </Button>
              {toolStates.loremOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.loremOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px]"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.loremOutput, "lorem")}
                    className="copy-btn"
                  >
                    {copiedStates.lorem ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "color-palette",
          title: "Color Palette Generator",
          description: "Generate random color palettes",
          content: (
            <div className="space-y-4">
              <Button
                onClick={generatorTools.generateColorPalette}
                className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600"
              >
                Generate Color Palette
              </Button>
              {toolStates.colorOutput && (
                <div className="space-y-2">
                  {toolStates.colorOutput.split("\n").map((color: string, index: number) => (
                    <div key={`color-palette-${color}-${index}`} className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: color }}></div>
                      <Input
                        value={color}
                        readOnly
                        className="bg-white/5 border-white/20 text-white font-mono flex-1"
                      />
                      <Button
                        size={getButtonSize()}
                        onClick={() => copyToClipboard(color, `color-${index}`)}
                        className="bg-white/10 hover:bg-white/20"
                      >
                        {copiedStates[`color-${index}`] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        },
        {
          id: "barcode",
          title: "Barcode Generator",
          description: "Generate barcodes from text",
          content: (
            <div className="space-y-4">
              <Input
                placeholder="Enter text for barcode..."
                value={toolStates.barcodeInput}
                onChange={(e) => updateToolState("barcodeInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={generatorTools.generateBarcode} className="btn-gradient btn-gradient-indigo text-white rounded-xl">
                Generate Barcode
              </Button>
              {toolStates.barcodeOutput && (
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={toolStates.barcodeOutput || "/placeholder.svg"}
                    alt="Generated Barcode"
                    className="border border-white/20 rounded-lg bg-white p-2"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.barcodeOutput, "barcode")}
                    className="bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.barcode ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy Barcode URL
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "developer",
      title: "Developer Tools",
      description: "Tools for developers and programmers",
      tools: [
        {
          id: "json",
          title: "JSON Formatter",
          description: "Format, minify and validate JSON data",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter JSON to format..."
                value={toolStates.jsonInput}
                onChange={(e) => updateToolState("jsonInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={developerTools.formatJSON} className="btn-gradient btn-gradient-cyan text-white rounded-xl">
                  Format
                </Button>
                <Button onClick={developerTools.minifyJSON} className="btn-gradient btn-gradient-indigo text-white rounded-xl">
                  Minify
                </Button>
                <Button onClick={developerTools.validateJSON} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Validate
                </Button>
              </div>
              {toolStates.jsonOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.jsonOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px] font-mono text-sm"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.jsonOutput, "json")}
                    className="copy-btn"
                  >
                    {copiedStates.json ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "html",
          title: "HTML Escape/Unescape",
          description: "Escape or unescape HTML entities",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter HTML to escape/unescape..."
                value={toolStates.htmlInput}
                onChange={(e) => updateToolState("htmlInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={developerTools.escapeHTML} className="btn-gradient btn-gradient-orange text-white rounded-xl">
                  Escape HTML
                </Button>
                <Button onClick={developerTools.unescapeHTML} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Unescape HTML
                </Button>
              </div>
              {toolStates.htmlOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.htmlOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px] font-mono text-sm"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.htmlOutput, "html")}
                    className="copy-btn"
                  >
                    {copiedStates.html ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "regex",
          title: "Regex Generator & Tester",
          description: "Generate common regex patterns and test them",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Regex pattern..."
                  value={toolStates.regexPattern}
                  onChange={(e) => updateToolState("regexPattern", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 font-mono"
                />
                <Input
                  placeholder="Flags (g, i, m)..."
                  value={toolStates.regexFlags}
                  onChange={(e) => updateToolState("regexFlags", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <Textarea
                placeholder="Test string..."
                value={toolStates.regexTestString}
                onChange={(e) => updateToolState("regexTestString", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <Button onClick={developerTools.generateRegex} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Common Patterns
                </Button>
                <Button onClick={developerTools.testRegex} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Test Regex
                </Button>
              </div>
              {toolStates.regexOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.regexOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px] font-mono text-sm"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.regexOutput, "regex")}
                    className="copy-btn"
                  >
                    {copiedStates.regex ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "security",
      title: "Hash & Security",
      description: "Generate hashes and security tools",
      tools: [
        {
          id: "hash",
          title: "Hash Generator",
          description: "Generate SHA-1, SHA-256, and SHA-512 hashes",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to hash..."
                value={toolStates.hashInput}
                onChange={(e) => updateToolState("hashInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => securityTools.generateHash("SHA-1")}
                  className="btn-gradient btn-gradient-yellow text-white rounded-xl"
                >
                  SHA-1
                </Button>
                <Button
                  onClick={() => securityTools.generateHash("SHA-256")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  SHA-256
                </Button>
                <Button onClick={() => securityTools.generateHash("SHA-512")} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  SHA-512
                </Button>
              </div>
              {toolStates.hashOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.hashOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono text-sm"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.hashOutput, "hash")}
                    className="copy-btn"
                  >
                    {copiedStates.hash ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "color",
      title: "Color Tools",
      description: "Color conversion and palette tools",
      tools: [
        {
          id: "color-converter",
          title: "Color Converter",
          description: "Convert between color formats",
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Input
                  type="color"
                  value={toolStates.colorInput}
                  onChange={(e) => updateToolState("colorInput", e.target.value)}
                  className="bg-white/5 border-white/20 w-16 h-12"
                />
                <Input
                  value={toolStates.colorInput}
                  onChange={(e) => updateToolState("colorInput", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="#ff0000"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={colorTools.hexToRgb} className="btn-gradient btn-gradient-red text-white rounded-xl">
                  To RGB
                </Button>
                <Button onClick={colorTools.hexToHsl} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  To HSL
                </Button>
                <Button onClick={colorTools.generatePalette} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                  Generate Palette
                </Button>
              </div>
              {toolStates.colorOutput && (
                <div className="relative">
                  <Textarea value={toolStates.colorOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.colorOutput, "color")}
                    className="copy-btn"
                  >
                    {copiedStates.color ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "date",
      title: "Date & Time Tools",
      description: "Date formatting and calculations",
      tools: [
        {
          id: "date-formatter",
          title: "Date Formatter",
          description: "Format dates in various formats",
          content: (
            <div className="space-y-4">
              <Input
                type="date"
                value={toolStates.dateInput}
                onChange={(e) => updateToolState("dateInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={dateTools.formatDate} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                  Format Date
                </Button>
                <Button onClick={() => dateTools.addDays(7)} className="btn-gradient btn-gradient-green text-white rounded-xl">
                  Add 7 Days
                </Button>
                <Button onClick={() => dateTools.addDays(30)} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                  Add 30 Days
                </Button>
                <Button onClick={dateTools.timeZoneConverter} className="btn-gradient btn-gradient-orange text-white rounded-xl">
                  Time Zones
                </Button>
              </div>
              {toolStates.dateOutput && (
                <div className="relative">
                  <Textarea value={toolStates.dateOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.dateOutput, "date")}
                    className="copy-btn"
                  >
                    {copiedStates.date ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "image",
      title: "Image Tools",
      description: "Image calculation and processing tools",
      tools: [
        {
          id: "aspect-ratio",
          title: "Aspect Ratio Calculator",
          description: "Calculate aspect ratios from dimensions",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Width"
                  value={toolStates.imageWidth}
                  onChange={(e) => updateToolState("imageWidth", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={toolStates.imageHeight}
                  onChange={(e) => updateToolState("imageHeight", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <Button onClick={imageTools.calculateAspectRatio} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                Calculate Aspect Ratio
              </Button>
              {toolStates.imageResult && (
                <div className="relative">
                  <Input
                    value={toolStates.imageResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white text-center text-lg"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.imageResult, "aspect")}
                    className="copy-btn"
                  >
                    {copiedStates.aspect ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "network",
      title: "Network Tools",
      description: "Network and IP address tools",
      tools: [
        {
          id: "ip-validator",
          title: "IP Address Validator",
          description: "Validate and analyze IP addresses",
          content: (
            <div className="space-y-4">
              <Input
                placeholder="Enter IP address (e.g., 192.168.1.1)"
                value={toolStates.ipAddress}
                onChange={(e) => updateToolState("ipAddress", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={networkTools.validateIP} className="btn-gradient btn-gradient-blue text-white rounded-xl">
                Validate IP
              </Button>
              {toolStates.ipResult && (
                <div className="relative">
                  <Textarea value={toolStates.ipResult} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.ipResult, "ip")}
                    className="copy-btn"
                  >
                    {copiedStates.ip ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "subnet-calculator",
          title: "Subnet Calculator",
          description: "Calculate subnet information",
          content: (
            <div className="space-y-4">
              <Input
                placeholder="Enter subnet (e.g., 192.168.1.0/24)"
                value={toolStates.subnet}
                onChange={(e) => updateToolState("subnet", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={networkTools.subnetCalculator} className="btn-gradient btn-gradient-green text-white rounded-xl">
                Calculate Subnet
              </Button>
              {toolStates.subnetResult && (
                <div className="relative">
                  <Textarea
                    value={toolStates.subnetResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.subnetResult, "subnet")}
                    className="copy-btn"
                  >
                    {copiedStates.subnet ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
        {
          id: "port-checker",
          title: "Port Information",
          description: "Get information about common ports",
          content: (
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter port number (e.g., 80)"
                value={toolStates.portNumber}
                onChange={(e) => updateToolState("portNumber", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={networkTools.portChecker} className="btn-gradient btn-gradient-purple text-white rounded-xl">
                Check Port
              </Button>
              {toolStates.portResult && (
                <div className="relative">
                  <Input
                    value={toolStates.portResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white text-center text-lg"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.portResult, "port")}
                    className="copy-btn"
                  >
                    {copiedStates.port ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
  ]

  // Flatten all tools from all categories into a single array
  const allTools = toolCategories.flatMap((category, catIndex) =>
    category.tools.map((tool, toolIndex) => ({
      ...tool,
      category: category.title,
      uniqueId: `${category.id}-${tool.id}-${catIndex}-${toolIndex}` // Create unique ID
    }))
  )

  // No filtering - show all tools
  const filteredTools = allTools

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex flex-col">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 min-h-screen flex flex-col">
        {/* Simplified Professional Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl mr-3 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Flint
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
            Open-Source Professional Developer Toolkit with 30+ Essential Utilities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-300">Fast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-slate-300">Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-slate-300">Free</span>
            </div>
          </div>
        </header>

        {/* Tools Section */}
        <main className="max-w-7xl mx-auto flex-1 w-full px-2 sm:px-4 pb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 mb-3">
              <Code2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-300">All Tools</span>
            </div>
            <p className="text-slate-400">
              {allTools.length} tools available — click any tool to expand
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start">
            {filteredTools.map((tool) => (
              <Card
                key={tool.uniqueId}
                className="group bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 hover:border-blue-600/50 transition-all duration-200 overflow-hidden"
              >
                <Collapsible open={openTools[tool.uniqueId]} onOpenChange={() => toggleTool(tool.uniqueId)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer p-5 relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-white text-base sm:text-lg font-semibold mb-2">
                            {tool.title}
                          </CardTitle>
                          <CardDescription className="text-slate-400 text-sm">
                            {tool.description}
                          </CardDescription>
                          <div className="mt-3">
                            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 p-2 rounded-lg bg-slate-700/50">
                          {openTools[tool.uniqueId] ? (
                            <ChevronUp className="h-5 w-5 text-blue-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 p-5 border-t border-slate-700">
                      <div className="space-y-4">
                        {tool.content}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>


        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        {/* Footer */}
        <footer className="mt-auto w-full border-t border-slate-700 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Flint</span>
                </div>
                <p className="text-slate-400 mb-4 max-w-sm">
                  Professional open-source developer toolkit with 30+ essential utilities. Fast, secure, and completely free forever.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>100% Client-Side</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span>Open Source</span>
                  </div>
                  <a
                    href="https://github.com/Darkmintis/Flint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Code2 className="h-4 w-4 text-purple-400" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

              {/* Our Projects */}
              <div>
                <h3 className="text-white font-semibold mb-3">Our Projects</h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/Darkmintis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub Profile
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    More Tools Coming Soon
                  </a>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>

              {/* Contact & Community */}
              <div>
                <h3 className="text-white font-semibold mb-3">Community</h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/Darkmintis/Flint/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Report Issues
                  </a>
                  <a
                    href="https://github.com/Darkmintis/Flint/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Discussions
                  </a>
                  <a
                    href="mailto:contact.darkmintis@gmail.com"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Built with ❤️ by developers,<br />for developers
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} Darkmintis. Open Source under MIT License.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>Made with Next.js</span>
                <span>•</span>
                <span>Hosted on GitHub Pages</span>
                <span>•</span>
                <a 
                  href="https://github.com/Darkmintis/Flint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
