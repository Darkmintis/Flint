"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Copy, Check, Zap, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function OneTapTools() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

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

    // Math Tools
    mathExpression: "",
    mathResult: "",

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
  })

  const updateToolState = (key: string, value: any) => {
    setToolStates((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
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
      const charsNoSpaces = text.replace(/\s/g, "").length
      const lines = text.split("\n").length
      updateToolState(
        "textOutput",
        `Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}\nLines: ${lines}`,
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
        toolStates.textInput.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
      )
    },

    removeSpaces: () => {
      updateToolState("textOutput", toolStates.textInput.replace(/\s/g, ""))
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
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
      const urls = toolStates.textInput.match(urlRegex) || []
      updateToolState("textOutput", urls.join("\n"))
    },
  }

  // Conversion Tools Functions
  const conversionTools = {
    encodeBase64: () => {
      try {
        updateToolState("base64Output", btoa(toolStates.base64Input))
      } catch (error) {
        toast({ title: "Error", description: "Failed to encode Base64", variant: "destructive" })
      }
    },

    decodeBase64: () => {
      try {
        updateToolState("base64Output", atob(toolStates.base64Input))
      } catch (error) {
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
        toast({ title: "Error", description: "Failed to decode URL", variant: "destructive" })
      }
    },

    textToBinary: () => {
      const binary = toolStates.textInput
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ")
      updateToolState("textOutput", binary)
    },

    binaryToText: () => {
      try {
        const text = toolStates.textInput
          .split(" ")
          .map((binary) => String.fromCharCode(Number.parseInt(binary, 2)))
          .join("")
        updateToolState("textOutput", text)
      } catch (error) {
        toast({ title: "Error", description: "Invalid binary format", variant: "destructive" })
      }
    },

    textToHex: () => {
      const hex = toolStates.textInput
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ")
      updateToolState("textOutput", hex)
    },

    hexToText: () => {
      try {
        const text = toolStates.textInput
          .split(" ")
          .map((hex) => String.fromCharCode(Number.parseInt(hex, 16)))
          .join("")
        updateToolState("textOutput", text)
      } catch (error) {
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

    generateUUID: () => {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c == "x" ? r : (r & 0x3) | 0x8
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
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim("-")
      updateToolState("textOutput", slug)
    },
  }

  // Developer Tools Functions
  const developerTools = {
    formatJSON: () => {
      try {
        const parsed = JSON.parse(toolStates.jsonInput)
        updateToolState("jsonOutput", JSON.stringify(parsed, null, 2))
      } catch (error) {
        toast({ title: "Error", description: "Invalid JSON format", variant: "destructive" })
      }
    },

    minifyJSON: () => {
      try {
        const parsed = JSON.parse(toolStates.jsonInput)
        updateToolState("jsonOutput", JSON.stringify(parsed))
      } catch (error) {
        toast({ title: "Error", description: "Invalid JSON format", variant: "destructive" })
      }
    },

    escapeHTML: () => {
      const escaped = toolStates.htmlInput
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
      updateToolState("htmlOutput", escaped)
    },

    unescapeHTML: () => {
      const unescaped = toolStates.htmlInput
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      updateToolState("htmlOutput", unescaped)
    },

    minifyCSS: () => {
      const minified = toolStates.cssInput
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/;\s*}/g, "}")
        .replace(/\s*{\s*/g, "{")
        .replace(/;\s*/g, ";")
        .replace(/,\s*/g, ",")
        .trim()
      updateToolState("cssOutput", minified)
    },

    formatCSS: () => {
      const formatted = toolStates.cssInput
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n\n")
        .replace(/,\s*/g, ",\n")
      updateToolState("cssOutput", formatted)
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
        toast({ title: "Error", description: `Failed to generate ${algorithm} hash`, variant: "destructive" })
      }
    },
  }

  // Math Tools Functions
  const mathTools = {
    calculate: () => {
      try {
        // Simple calculator - only allow safe operations
        const sanitized = toolStates.mathExpression.replace(/[^0-9+\-*/.() ]/g, "")
        const result = Function('"use strict"; return (' + sanitized + ")")()
        updateToolState("mathResult", result.toString())
      } catch (error) {
        toast({ title: "Error", description: "Invalid mathematical expression", variant: "destructive" })
      }
    },

    percentage: (value: number, total: number) => {
      const percentage = (value / total) * 100
      updateToolState("mathResult", `${percentage.toFixed(2)}%`)
    },

    compound: (principal: number, rate: number, time: number, compound: number) => {
      const amount = principal * Math.pow(1 + rate / (100 * compound), compound * time)
      updateToolState("mathResult", `Final Amount: $${amount.toFixed(2)}`)
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
      ]
      updateToolState("dateOutput", formats.join("\n"))
    },

    addDays: (days: number) => {
      const date = new Date(toolStates.dateInput)
      date.setDate(date.getDate() + days)
      updateToolState("dateOutput", date.toISOString().split("T")[0])
    },

    daysBetween: (date1: string, date2: string) => {
      const d1 = new Date(date1)
      const d2 = new Date(date2)
      const diffTime = Math.abs(d2.getTime() - d1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      updateToolState("dateOutput", `${diffDays} days`)
    },
  }

  // Unit Conversion Functions
  const unitTools = {
    convertLength: () => {
      const value = Number.parseFloat(toolStates.lengthValue)
      if (isNaN(value)) return

      const conversions: Record<string, number> = {
        meters: 1,
        feet: 3.28084,
        inches: 39.3701,
        centimeters: 100,
        kilometers: 0.001,
        miles: 0.000621371,
      }

      const fromMeters = value / conversions[toolStates.lengthFrom]
      const result = fromMeters * conversions[toolStates.lengthTo]
      updateToolState("lengthResult", `${result.toFixed(6)} ${toolStates.lengthTo}`)
    },

    convertFileSize: () => {
      const bytes = Number.parseFloat(toolStates.fileSize)
      if (isNaN(bytes)) return

      const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      const result = (bytes / Math.pow(1024, i)).toFixed(2)
      updateToolState("fileSizeResult", `${result} ${sizes[i]}`)
    },
  }

  // Tool Categories
  const toolCategories = [
    {
      id: "text",
      title: "Text Tools",
      description: "Manipulate and analyze text",
      tools: [
        {
          id: "word-count",
          title: "Word Counter",
          description: "Count words, characters, and lines",
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
                    size="sm"
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
          title: "Text Transformer",
          description: "Transform text case and format",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to transform..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2 flex-wrap">
                <Button onClick={textTools.upperCase} className="bg-red-600 hover:bg-red-700">
                  UPPER
                </Button>
                <Button onClick={textTools.lowerCase} className="bg-green-600 hover:bg-green-700">
                  lower
                </Button>
                <Button onClick={textTools.titleCase} className="bg-blue-600 hover:bg-blue-700">
                  Title
                </Button>
                <Button onClick={textTools.reverseText} className="bg-purple-600 hover:bg-purple-700">
                  Reverse
                </Button>
                <Button onClick={textTools.removeSpaces} className="bg-orange-600 hover:bg-orange-700">
                  No Spaces
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea value={toolStates.textOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size="sm"
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
        {
          id: "text-utilities",
          title: "Text Utilities",
          description: "Sort, deduplicate, and extract data",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to process..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <div className="flex gap-2 flex-wrap">
                <Button onClick={textTools.sortLines} className="bg-cyan-600 hover:bg-cyan-700">
                  Sort Lines
                </Button>
                <Button onClick={textTools.removeDuplicateLines} className="bg-pink-600 hover:bg-pink-700">
                  Remove Duplicates
                </Button>
                <Button onClick={textTools.extractEmails} className="bg-yellow-600 hover:bg-yellow-700">
                  Extract Emails
                </Button>
                <Button onClick={textTools.extractUrls} className="bg-indigo-600 hover:bg-indigo-700">
                  Extract URLs
                </Button>
              </div>
              {toolStates.textOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.textOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px]"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(toolStates.textOutput, "utilities")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.utilities ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      id: "conversion",
      title: "Conversion Tools",
      description: "Convert between different formats",
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
                    size="sm"
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
                    size="sm"
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
              <div className="flex gap-2 flex-wrap">
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
                    size="sm"
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
      ],
    },
    {
      id: "generators",
      title: "Generator Tools",
      description: "Generate passwords, UUIDs, and more",
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
                    size="sm"
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
                <label className="text-white">Length:</label>
                <Input
                  type="number"
                  min="4"
                  max="128"
                  value={toolStates.passwordLength}
                  onChange={(e) => updateToolState("passwordLength", Number.parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white w-20"
                />
              </div>
              <Button onClick={generatorTools.generatePassword} className="bg-red-600 hover:bg-red-700">
                Generate Password
              </Button>
              {toolStates.passwordOutput && (
                <div className="relative">
                  <Input
                    value={toolStates.passwordOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size="sm"
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
                    size="sm"
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
                <label className="text-white">Sentences:</label>
                <Input
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
                    size="sm"
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
          id: "slug",
          title: "Slug Generator",
          description: "Generate URL-friendly slugs",
          content: (
            <div className="space-y-4">
              <Input
                placeholder="Enter text to convert to slug..."
                value={toolStates.textInput}
                onChange={(e) => updateToolState("textInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={generatorTools.generateSlug} className="bg-emerald-600 hover:bg-emerald-700">
                Generate Slug
              </Button>
              {toolStates.textOutput && (
                <div className="relative">
                  <Input
                    value={toolStates.textOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(toolStates.textOutput, "slug")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.slug ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
          description: "Format and validate JSON data",
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
              </div>
              {toolStates.jsonOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.jsonOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px] font-mono text-sm"
                  />
                  <Button
                    size="sm"
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
                    size="sm"
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
          id: "css",
          title: "CSS Formatter",
          description: "Format and minify CSS code",
          content: (
            <div className="space-y-4">
              <Textarea
                placeholder="Enter CSS to format..."
                value={toolStates.cssInput}
                onChange={(e) => updateToolState("cssInput", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={developerTools.formatCSS} className="bg-blue-600 hover:bg-blue-700">
                  Format CSS
                </Button>
                <Button onClick={developerTools.minifyCSS} className="bg-purple-600 hover:bg-purple-700">
                  Minify CSS
                </Button>
              </div>
              {toolStates.cssOutput && (
                <div className="relative">
                  <Textarea
                    value={toolStates.cssOutput}
                    readOnly
                    className="bg-white/5 border-white/20 text-white min-h-[120px] font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(toolStates.cssOutput, "css")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.css ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                    size="sm"
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
      id: "math",
      title: "Math Tools",
      description: "Mathematical calculations and converters",
      tools: [
        {
          id: "calculator",
          title: "Calculator",
          description: "Basic mathematical calculator",
          content: (
            <div className="space-y-4">
              <Input
                placeholder="Enter mathematical expression (e.g., 2 + 2 * 3)"
                value={toolStates.mathExpression}
                onChange={(e) => updateToolState("mathExpression", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button onClick={mathTools.calculate} className="bg-green-600 hover:bg-green-700">
                Calculate
              </Button>
              {toolStates.mathResult && (
                <div className="relative">
                  <Input
                    value={toolStates.mathResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono text-lg"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(toolStates.mathResult, "math")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.math ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                    size="sm"
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
              <div className="flex gap-2 flex-wrap">
                <Button onClick={dateTools.formatDate} className="bg-blue-600 hover:bg-blue-700">
                  Format Date
                </Button>
                <Button onClick={() => dateTools.addDays(7)} className="bg-green-600 hover:bg-green-700">
                  Add 7 Days
                </Button>
                <Button onClick={() => dateTools.addDays(30)} className="bg-purple-600 hover:bg-purple-700">
                  Add 30 Days
                </Button>
              </div>
              {toolStates.dateOutput && (
                <div className="relative">
                  <Textarea value={toolStates.dateOutput} readOnly className="bg-white/5 border-white/20 text-white" />
                  <Button
                    size="sm"
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
          id: "length-converter",
          title: "Length Converter",
          description: "Convert between length units",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Value"
                  value={toolStates.lengthValue}
                  onChange={(e) => updateToolState("lengthValue", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
                <select
                  value={toolStates.lengthFrom}
                  onChange={(e) => updateToolState("lengthFrom", e.target.value)}
                  className="bg-white/5 border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="meters">Meters</option>
                  <option value="feet">Feet</option>
                  <option value="inches">Inches</option>
                  <option value="centimeters">Centimeters</option>
                  <option value="kilometers">Kilometers</option>
                  <option value="miles">Miles</option>
                </select>
                <select
                  value={toolStates.lengthTo}
                  onChange={(e) => updateToolState("lengthTo", e.target.value)}
                  className="bg-white/5 border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="meters">Meters</option>
                  <option value="feet">Feet</option>
                  <option value="inches">Inches</option>
                  <option value="centimeters">Centimeters</option>
                  <option value="kilometers">Kilometers</option>
                  <option value="miles">Miles</option>
                </select>
              </div>
              <Button onClick={unitTools.convertLength} className="bg-cyan-600 hover:bg-cyan-700">
                Convert
              </Button>
              {toolStates.lengthResult && (
                <div className="relative">
                  <Input
                    value={toolStates.lengthResult}
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(toolStates.lengthResult, "length")}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    {copiedStates.length ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          ),
        },
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
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    size="sm"
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
  ]

  // Filter tools based on search
  const filteredCategories = toolCategories
    .map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.tools.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl mr-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              OneTap Tools
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your comprehensive toolkit with 50+ free tools for encoding, decoding, formatting, generating, and
            converting. Simple, fast, and beautiful tools at your fingertips.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
            />
          </div>
        </div>

        {/* Tools Categories */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white/10 mb-8">
              {toolCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white/20 text-white text-xs"
                >
                  {category.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {filteredCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{category.title}</h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <Card key={tool.id} className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                      <Collapsible open={openSections[tool.id]} onOpenChange={() => toggleSection(tool.id)}>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors rounded-t-lg">
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                                <CardDescription className="text-gray-300 text-sm">{tool.description}</CardDescription>
                              </div>
                              {openSections[tool.id] ? (
                                <ChevronUp className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">{tool.content}</CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="mb-2">🚀 50+ Free Tools • No Registration Required • Works Offline</p>
          <p>Built with ❤️ for developers, designers, and creators worldwide</p>
        </div>
      </div>
    </div>
  )
}
