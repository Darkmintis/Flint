"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Copy, Check, Zap, Search, Rocket, Sparkles, Shield, Clock, ArrowUp, Star, Command, Code2, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

// NOSONAR: This component has high cognitive complexity due to 30+ tool implementations.
// Refactoring into separate modules is planned for a future version.
export default function OneTapTools() {
  const [openTools, setOpenTools] = useState<Record<string, boolean>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
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
    cssInput: "",
    cssOutput: "",

    // Hash & Security
    hashInput: "",
    hashOutput: "",

    // Color Tools
    colorInput: "#ff0000",
    colorOutput: "",

    // Date Tools
    dateInput: new Date().toISOString().split("T")[0],
    dateOutput: "",

    // Unit Conversion
    lengthValue: "",
    lengthFrom: "meters",
    lengthTo: "feet",
    lengthResult: "",

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

    // Finance Tools
    principal: "",
    rate: "",
    time: "",
    financeResult: "",
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

    removeDuplicateLines: () => {
      const lines = toolStates.textInput.split("\n")
      const unique = [...new Set(lines)]
      updateToolState("textOutput", unique.join("\n"))
    },

    sortLines: () => {
      const lines = toolStates.textInput.split("\n")
      updateToolState("textOutput", lines.sort().join("\n"))
    },

    extractEmails: () => {
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
      const emails = toolStates.textInput.match(emailRegex) || []
      updateToolState("textOutput", emails.join("\n"))
    },

    extractUrls: () => {
      const urlRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g
      const urls = toolStates.textInput.match(urlRegex) || []
      updateToolState("textOutput", urls.join("\n"))
    },

    extractNumbers: () => {
      const numbers = toolStates.textInput.match(/\d+/g) || []
      updateToolState("textOutput", numbers.join("\n"))
    },

    removeEmptyLines: () => {
      const lines = toolStates.textInput.split("\n").filter((line: string) => line.trim() !== "")
      updateToolState("textOutput", lines.join("\n"))
    },

    addLineNumbers: () => {
      const lines = toolStates.textInput.split("\n")
      const numbered = lines.map((line: string, index: number) => `${index + 1}. ${line}`)
      updateToolState("textOutput", numbered.join("\n"))
    },

    findReplace: (find: string, replace: string) => {
      const result = toolStates.textInput.replaceAll(new RegExp(find, "g"), replace)
      updateToolState("textOutput", result)
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

    generateSlug: () => {
      const slug = toolStates.textInput
        .toLowerCase()
        .replaceAll(/[^a-z0-9 -]/g, "")
        .replaceAll(/\s+/g, "-")
        .replaceAll(/-+/g, "-")
        .trim()
        .replaceAll(/^-+/g, "")
        .replaceAll(/-+$/g, "")
      updateToolState("textOutput", slug)
    },

    generateRandomNumber: () => {
      const min = Number.parseInt(toolStates.minNumber) || 1
      const max = Number.parseInt(toolStates.maxNumber) || 100
      const random = Math.floor(Math.random() * (max - min + 1)) + min
      updateToolState("randomResult", random.toString())
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

    minifyCSS: () => {
      const minified = toolStates.cssInput
        .replaceAll(/\/\*[\s\S]*?\*\//g, "")
        .replaceAll(/\s+/g, " ")
        .replaceAll(/;\s*}/g, "}")
        .replaceAll(/\s*{\s*/g, "{")
        .replaceAll(/;\s*/g, ";")
        .replaceAll(/,\s*/g, ",")
        .trim()
      updateToolState("cssOutput", minified)
    },

    formatCSS: () => {
      const formatted = toolStates.cssInput
        .replaceAll(/\s*{\s*/g, " {\n  ")
        .replaceAll(/;\s*/g, ";\n  ")
        .replaceAll(/\s*}\s*/g, "\n}\n\n")
        .replaceAll(/,\s*/g, ",\n")
      updateToolState("cssOutput", formatted)
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

  // Unit Conversion Functions
  const unitTools = {
    convertFileSize: () => {
      const bytes = Number.parseFloat(toolStates.fileSize)
      if (Number.isNaN(bytes)) return

      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      const result = (bytes / Math.pow(1024, i)).toFixed(2)
      updateToolState("fileSizeResult", `${result} ${sizes[i]}`)
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
              <Button onClick={textTools.wordCount} className="bg-blue-600 hover:bg-blue-700">
                Count Words
              </Button>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea value={toolStates.textOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "text")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.text ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                <Button onClick={textTools.upperCase} className="bg-red-600 hover:bg-red-700">
                  UPPER
                </Button>
                <Button onClick={textTools.lowerCase} className="bg-green-600 hover:bg-green-700">
                  lower
                </Button>
                <Button onClick={textTools.titleCase} className="bg-blue-600 hover:bg-blue-700">
                  Title
                </Button>
                <Button onClick={textTools.camelCase} className="bg-purple-600 hover:bg-purple-700">
                  camelCase
                </Button>
                <Button onClick={textTools.snakeCase} className="bg-orange-600 hover:bg-orange-700">
                  snake_case
                </Button>
                <Button onClick={textTools.kebabCase} className="bg-pink-600 hover:bg-pink-700">
                  kebab-case
                </Button>
                <Button onClick={textTools.reverseText} className="bg-cyan-600 hover:bg-cyan-700">
                  Reverse
                </Button>
                <Button onClick={textTools.removeSpaces} className="bg-yellow-600 hover:bg-yellow-700">
                  No Spaces
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea value={toolStates.textOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.textOutput, "transform")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.transform ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                <Button onClick={conversionTools.encodeBase64} className="bg-blue-600 hover:bg-blue-700">
                  Encode
                </Button>
                <Button onClick={conversionTools.decodeBase64} className="bg-purple-600 hover:bg-purple-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.base64 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                <Button onClick={conversionTools.encodeURL} className="bg-green-600 hover:bg-green-700">
                  Encode
                </Button>
                <Button onClick={conversionTools.decodeURL} className="bg-orange-600 hover:bg-orange-700">
                  Decode
                </Button>
              </div>
              {toolStates.urlOutput && (
                <div className="relative">
                  <Textarea value={toolStates.urlOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.urlOutput, "url")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.url ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                <Button onClick={conversionTools.textToBinary} className="bg-red-600 hover:bg-red-700">
                  Text → Binary
                </Button>
                <Button onClick={conversionTools.binaryToText} className="bg-green-600 hover:bg-green-700">
                  Binary → Text
                </Button>
                <Button onClick={conversionTools.textToHex} className="bg-blue-600 hover:bg-blue-700">
                  Text → Hex
                </Button>
                <Button onClick={conversionTools.hexToText} className="bg-purple-600 hover:bg-purple-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={conversionTools.textToMorse} className="bg-cyan-600 hover:bg-cyan-700">
                  Text → Morse
                </Button>
                <Button onClick={conversionTools.morseToText} className="bg-pink-600 hover:bg-pink-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={conversionTools.rgbToHex} className="bg-red-600 hover:bg-red-700">
                  RGB → Hex
                </Button>
                <Button onClick={conversionTools.hexToRgb} className="bg-blue-600 hover:bg-blue-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={generatorTools.generateQR} className="bg-pink-600 hover:bg-pink-700">
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
                <Button onClick={generatorTools.generatePassword} className="bg-red-600 hover:bg-red-700">
                  Generate Password
                </Button>
                <Button onClick={generatorTools.generateStrongPassword} className="bg-orange-600 hover:bg-orange-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={generatorTools.generateUUID} className="bg-cyan-600 hover:bg-cyan-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={generatorTools.generateLorem} className="bg-yellow-600 hover:bg-yellow-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={generatorTools.generateBarcode} className="bg-indigo-600 hover:bg-indigo-700">
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
                <Button onClick={developerTools.formatJSON} className="bg-cyan-600 hover:bg-cyan-700">
                  Format
                </Button>
                <Button onClick={developerTools.minifyJSON} className="bg-indigo-600 hover:bg-indigo-700">
                  Minify
                </Button>
                <Button onClick={developerTools.validateJSON} className="bg-green-600 hover:bg-green-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={developerTools.escapeHTML} className="bg-orange-600 hover:bg-orange-700">
                  Escape HTML
                </Button>
                <Button onClick={developerTools.unescapeHTML} className="bg-green-600 hover:bg-green-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={developerTools.generateRegex} className="bg-green-600 hover:bg-green-700">
                  Common Patterns
                </Button>
                <Button onClick={developerTools.testRegex} className="bg-blue-600 hover:bg-blue-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  SHA-1
                </Button>
                <Button
                  onClick={() => securityTools.generateHash("SHA-256")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  SHA-256
                </Button>
                <Button onClick={() => securityTools.generateHash("SHA-512")} className="bg-red-600 hover:bg-red-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={colorTools.hexToRgb} className="bg-red-600 hover:bg-red-700">
                  To RGB
                </Button>
                <Button onClick={colorTools.hexToHsl} className="bg-blue-600 hover:bg-blue-700">
                  To HSL
                </Button>
                <Button onClick={colorTools.generatePalette} className="bg-purple-600 hover:bg-purple-700">
                  Generate Palette
                </Button>
              </div>
              {toolStates.colorOutput && (
                <div className="relative">
                  <Textarea value={toolStates.colorOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.colorOutput, "color")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
                <Button onClick={dateTools.formatDate} className="bg-blue-600 hover:bg-blue-700">
                  Format Date
                </Button>
                <Button onClick={() => dateTools.addDays(7)} className="bg-green-600 hover:bg-green-700">
                  Add 7 Days
                </Button>
                <Button onClick={() => dateTools.addDays(30)} className="bg-purple-600 hover:bg-purple-700">
                  Add 30 Days
                </Button>
                <Button onClick={dateTools.timeZoneConverter} className="bg-orange-600 hover:bg-orange-700">
                  Time Zones
                </Button>
              </div>
              {toolStates.dateOutput && (
                <div className="relative">
                  <Textarea value={toolStates.dateOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.dateOutput, "date")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
      id: "units",
      title: "Unit Converters",
      description: "Convert between different units",
      tools: [
        {
          id: "file-size-converter",
          title: "File Size Converter",
          description: "Convert file sizes between units",
          content: (
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter size in bytes"
                value={toolStates.fileSize}
                onChange={(e) => updateToolState("fileSize", e.target.value)}
                className="bg-white/5 border-white/20 text-white"
              />
              <Button onClick={unitTools.convertFileSize} className="bg-orange-600 hover:bg-orange-700">
                Convert File Size
              </Button>
              {toolStates.fileSizeResult && (
                <div className="relative">
                  <Input
                    value={toolStates.fileSizeResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono text-center text-lg"
                  />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.fileSizeResult, "filesize")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.filesize ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
              <Button onClick={imageTools.calculateAspectRatio} className="bg-purple-600 hover:bg-purple-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={networkTools.validateIP} className="bg-blue-600 hover:bg-blue-700">
                Validate IP
              </Button>
              {toolStates.ipResult && (
                <div className="relative">
                  <Textarea value={toolStates.ipResult} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size={getButtonSize()}
                    onClick={() => copyToClipboard(toolStates.ipResult, "ip")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={networkTools.subnetCalculator} className="bg-green-600 hover:bg-green-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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
              <Button onClick={networkTools.portChecker} className="bg-purple-600 hover:bg-purple-700">
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
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
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

  // Filter tools based on search
  const filteredTools = allTools.filter((tool) =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#030014] relative overflow-hidden flex flex-col">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0a1f] to-[#0f0720]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/30 to-cyan-500/20 rounded-full blur-[120px] -top-64 -left-64 animate-float"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-600/25 to-pink-500/15 rounded-full blur-[100px] -bottom-48 -right-48 animate-float-delayed"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-violet-600/20 to-fuchsia-500/10 rounded-full blur-[80px] top-1/3 left-1/4 animate-float-slow"></div>
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/15 to-blue-400/10 rounded-full blur-[60px] bottom-1/4 right-1/3 animate-breathe"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]"></div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.08)_0%,transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-10 min-h-screen flex flex-col">
        {/* Premium Header */}
        <header className="text-center mb-10 sm:mb-16">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <div className="relative group cursor-pointer">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 group-hover:blur-2xl transition-all duration-500"></div>
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75"></div>
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-3 sm:p-4 rounded-2xl mr-3 sm:mr-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl">
                <Zap className="h-7 w-7 sm:h-9 sm:w-9 text-white drop-shadow-lg" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black gradient-text-animated tracking-tight">
                1Tap Tools
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Developer Toolkit</span>
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
          
          {/* Tagline with icons */}
          <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 px-4 leading-relaxed">
              <span className="flex items-center justify-center gap-3 flex-wrap">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                <span>Your ultimate toolkit with</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-shimmer px-1">30+ essential tools</span>
              </span>
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group">
                <Sparkles className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-300" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">Simple</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                <Clock className="h-3.5 w-3.5 text-purple-400 group-hover:text-purple-300" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 group">
                <Palette className="h-3.5 w-3.5 text-pink-400 group-hover:text-pink-300" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">Beautiful</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group">
                <Shield className="h-3.5 w-3.5 text-green-400 group-hover:text-green-300" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">Free Forever</span>
              </div>
            </div>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-2xl mx-auto relative px-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="relative group">
              {/* Search glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300" />
                  <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    <Command className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">K</span>
                  </div>
                </div>
                <Input
                  placeholder="Search tools... (try 'json', 'base64', 'password')" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 sm:h-16 bg-white/[0.03] backdrop-blur-xl border-white/10 text-white placeholder:text-gray-500 pl-14 sm:pl-24 pr-6 text-base sm:text-lg rounded-2xl focus:bg-white/[0.06] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-2xl shadow-black/20"
                />
              </div>
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-400 mt-3 text-center animate-fade-in">
                <span className="text-blue-400 font-semibold">{filteredTools.length}</span> tools found
              </p>
            )}
          </div>
        </header>

        {/* Tools Section */}
        <main className="max-w-7xl mx-auto flex-1 w-full px-2 sm:px-4 pb-8">
          {/* Section Header */}
          <div className="text-center mb-10 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Code2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Developer Essentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">All Tools</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {searchTerm 
                ? `Showing ${filteredTools.length} matching tools` 
                : `${allTools.length} powerful tools at your fingertips — click to expand`}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start">
            {filteredTools.map((tool, index) => (
              <Card 
                key={tool.uniqueId} 
                className="group glass-premium rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 card-glow animate-card"
                style={{animationDelay: `${index * 30}ms`}}
              >
                <Collapsible open={openTools[tool.uniqueId]} onOpenChange={() => toggleTool(tool.uniqueId)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Header Content */}
                      <div className="flex items-start justify-between relative z-10 gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Tool Title */}
                          <CardTitle className="text-white text-base sm:text-lg font-semibold mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                            {tool.title}
                          </CardTitle>
                          
                          {/* Tool Description */}
                          <CardDescription className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {tool.description}
                          </CardDescription>
                          
                          {/* Category Badge */}
                          <div className="mt-3 inline-flex items-center gap-1.5">
                            <span className="text-xs font-medium text-blue-400/80 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/5 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-500/20 border border-white/5 group-hover:border-blue-500/30 transition-all duration-300">
                          {openTools[tool.uniqueId] ? (
                            <ChevronUp className="h-4 w-4 text-blue-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 p-5 sm:p-6 border-t border-white/5">
                      {tool.content}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </div>
          )}
        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 sm:bottom-8 right-6 sm:right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group animate-fade-in"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        )}

        {/* Premium Footer */}
        <footer className="w-full py-4 sm:py-5 border-t border-white/5 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link 
                  href="/privacy" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  Privacy
                </Link>
                <span className="text-gray-600">•</span>
                <Link 
                  href="/terms" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  Terms
                </Link>
                <span className="text-gray-600">•</span>
                <a 
                  href="mailto:contact.darkmintis@gmail.com" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact
                </a>
              </div>
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>© 2025</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">Darkmintis</span>
                <span>•</span>
                <span>1Tap Tools</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
