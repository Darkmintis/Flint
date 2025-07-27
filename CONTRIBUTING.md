# Contributing to OneTap Tools

Thank you for considering contributing to OneTap Tools! We welcome contributions from everyone.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/OneTap-Tools.git
   cd OneTap-Tools
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run build
   npm run start
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add new text transformation tool"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Add **proper error handling**
- Write **descriptive commit messages**

## 🛠️ Adding New Tools

To add a new tool to OneTap Tools:

1. **Add the tool state** in the `toolStates` object
2. **Create the tool function** in the appropriate category (textTools, conversionTools, etc.)
3. **Add the UI component** in the appropriate section
4. **Update the tools array** to include your new tool
5. **Test thoroughly**

### Example Tool Structure

```typescript
// 1. Add to toolStates
const [toolStates, setToolStates] = useState({
  // ... existing states
  newToolInput: "",
  newToolOutput: "",
})

// 2. Add the function
const newToolCategory = {
  newTool: () => {
    // Your tool logic here
    const result = processInput(toolStates.newToolInput)
    updateToolState("newToolOutput", result)
  },
}

// 3. Add to UI (in the tools array)
{
  id: "new-tool",
  title: "New Tool",
  description: "Description of what it does",
  category: "category-name",
  tools: [
    {
      label: "Process",
      action: () => newToolCategory.newTool(),
      variant: "default" as const,
    },
  ],
  inputs: [
    {
      key: "newToolInput",
      placeholder: "Enter input...",
      type: "textarea" as const,
    },
  ],
  outputs: [
    {
      key: "newToolOutput",
      label: "Result",
    },
  ],
}
```

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description** of the issue
- **Steps to reproduce** the bug
- **Expected behavior**
- **Actual behavior**
- **Browser and version**
- **Screenshots** if applicable

## 💡 Feature Requests

For feature requests, please:

- **Check existing issues** to avoid duplicates
- **Describe the feature** and its use case
- **Explain why** it would be useful
- **Provide examples** if possible

## 🔍 Code Review Process

1. All submissions require **review**
2. We may suggest changes, improvements, or alternatives
3. Once approved, we'll **merge your PR**
4. Your contribution will be **credited** in the project

## 📋 Pull Request Checklist

- [ ] Code follows the existing style
- [ ] Changes are tested and work as expected
- [ ] No console errors in development
- [ ] Build succeeds (`npm run build`)
- [ ] Commit messages are descriptive
- [ ] Documentation is updated if needed

## 🎯 Priority Areas

We're particularly interested in contributions for:

- **New developer tools** and utilities
- **Performance improvements**
- **Accessibility enhancements**
- **Mobile responsiveness** improvements
- **Error handling** improvements
- **Test coverage** additions

## 📞 Questions?

If you have questions about contributing, feel free to:

- **Open an issue** for discussion
- **Join our community** discussions
- **Contact the maintainers**

## 🙏 Recognition

Contributors will be:

- **Listed** in our README
- **Credited** in release notes
- **Invited** to join our contributor community

Thank you for making OneTap Tools better! ⚡
