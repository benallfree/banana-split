# Contributing to Banana Split

Thank you for your interest in contributing to Banana Split! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

1. **Fork the Repository**

   - Fork the repository to your GitHub account
   - Clone your fork locally

2. **Create a Branch**

   - Create a branch for your changes
   - Use a descriptive name (e.g., `feature/add-new-feature` or `fix/bug-description`)

3. **Make Your Changes**

   - Write clear, maintainable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit Your Changes**

   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Reference issues and pull requests in commit messages

5. **Push and Create a Pull Request**
   - Push your changes to your fork
   - Create a pull request against the main branch
   - Provide a clear description of the changes
   - Reference any related issues

## Development Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun run dev
   ```

3. Build for production:
   ```bash
   bun run build
   ```

## Project Structure

- `/pages` - Application pages and routing
- `/components` - Reusable React components
- `/utils` - Utility functions and helpers
- `/contexts` - React context providers
- `/hooks` - Custom React hooks

## Style Guide

- Use TypeScript for type safety
- Follow the existing code formatting (Prettier)
- Use semantic class names with DaisyUI
- Keep components focused and reusable
- Write meaningful comments for complex logic

## Testing

- Add tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where appropriate

## Documentation

- Update README.md for user-facing changes
- Document new features and APIs
- Keep documentation clear and concise

## Questions?

Feel free to open an issue for any questions about contributing.
