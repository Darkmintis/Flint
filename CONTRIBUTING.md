# Contributing to Flint ⚡

First off, thank you for considering contributing to Flint! It's people like you that make Flint such a great tool.

## 🌟 Ways to Contribute

### 1. Report Bugs 🐛
Found a bug? Let us know!
- Check if the bug has already been reported in [Issues](https://github.com/Darkmintis/Flint/issues)
- If not, create a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable
  - Browser and OS information

### 2. Suggest New Tools ✨
Have an idea for a new developer tool?
- Open a [Discussion](https://github.com/Darkmintis/Flint/discussions) or Issue
- Describe the tool and its use case
- Explain why it would be valuable

### 3. Improve Documentation 📖
Help others use Flint better:
- Fix typos or clarify instructions
- Add examples or tutorials
- Improve code comments
- Translate documentation

### 4. Submit Code 💻
Ready to code? Awesome!

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm installed
- Basic knowledge of React, Next.js, and TypeScript
- Familiarity with Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Flint.git
   cd Flint
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```
   Open http://localhost:3000

5. **Create a branch**
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

## 📝 Code Guidelines

### General Principles
- **Keep it simple** - Flint is about simplicity and speed
- **Client-side only** - All tools must run in the browser
- **No external APIs** - Except for QR code generation (existing pattern)
- **Privacy-first** - Never send data to servers
- **Mobile-responsive** - Test on different screen sizes
- **Accessible** - Follow WCAG guidelines

### Code Style
- Use TypeScript - Add proper types
- Follow existing patterns - Look at similar tools
- Use Tailwind CSS - No custom CSS unless necessary
- Keep functions small - Single responsibility principle
- Add error handling - Use try/catch and show user-friendly messages
- Comment complex logic - Help future maintainers

### Tool Structure
When adding a new tool, follow this pattern:

```typescript
{
  id: "tool-id",
  title: "Tool Name",
  description: "Brief description of what the tool does",
  content: (
    <div className="space-y-4">
      {/* Input area */}
      <Textarea
        placeholder="Enter input..."
        value={toolStates.yourInput}
        onChange={(e) => updateToolState("yourInput", e.target.value)}
        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
      />
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <Button onClick={yourToolFunction} className="btn-gradient btn-gradient-blue text-white rounded-xl">
          Process
        </Button>
      </div>
      
      {/* Output area with copy button */}
      {toolStates.yourOutput && (
        <div className="relative">
          <Textarea
            value={toolStates.yourOutput}
            readOnly
            className="bg-white/5 border-white/20 text-white font-mono text-sm"
          />
          <Button
            size={getButtonSize()}
            onClick={() => copyToClipboard(toolStates.yourOutput, "yourTool")}
            className="copy-btn"
          >
            {copiedStates.yourTool ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  ),
}
```

### Commit Messages
Follow conventional commits:
- `feat: Add UUID generator tool`
- `fix: Resolve Base64 encoding issue`
- `docs: Update installation instructions`
- `style: Format code with prettier`
- `refactor: Simplify JSON formatter logic`
- `test: Add tests for hash generator`
- `chore: Update dependencies`

## 🔄 Pull Request Process

1. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Test your changes**
   ```bash
   pnpm dev        # Test locally
   pnpm build      # Ensure it builds
   pnpm lint       # Check for errors
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create Pull Request**
   - Go to the original Flint repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template:
     - What does this PR do?
     - Why is this change needed?
     - How has it been tested?
     - Screenshots (if UI changes)

6. **Wait for review**
   - Address any feedback
   - Make requested changes
   - Keep the conversation friendly and professional

## 🎨 UI/Design Guidelines

- **Colors**: Use the existing slate/blue theme
- **Spacing**: Consistent with Tailwind spacing scale
- **Typography**: Use existing font sizes and weights
- **Icons**: Use Lucide React icons
- **Animations**: Keep minimal - only for user feedback
- **Buttons**: Use existing button gradient classes

## 🧪 Testing

While we don't have automated tests yet, please manually test:
- ✅ Tool works with valid input
- ✅ Tool handles invalid input gracefully
- ✅ Error messages are user-friendly
- ✅ Copy button works
- ✅ Mobile responsive (test on different sizes)
- ✅ Works in Chrome, Firefox, Safari, Edge

## 📦 Adding Dependencies

Before adding a new dependency:
1. Check if existing dependencies can solve the problem
2. Ensure it's actively maintained
3. Check bundle size impact
4. Discuss in an issue first for large dependencies

## ❓ Questions?

- 💬 Start a [Discussion](https://github.com/Darkmintis/Flint/discussions)
- 📧 Email: contact.darkmintis@gmail.com
- 🐛 Open an [Issue](https://github.com/Darkmintis/Flint/issues)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions
- Keep discussions technical and on-topic

## 🎉 Recognition

Contributors will be:
- Listed in README (add yourself!)
- Mentioned in release notes
- Part of an awesome open-source project

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Flint better! ⚡**

Every contribution, no matter how small, makes a difference. Whether it's fixing a typo, reporting a bug, or adding a new feature - we appreciate your help!

Happy coding! 🚀
