# Lumos Application

**Welcome to the Lumos application!**

**Description:**
This is a platform for creating and publishing short photo stories with a focus on visual aesthetics and instant feedback. Users can upload their photos, apply dynamic filters, share moments in real time, as well as express their thoughts and emotions, and take part in discussions. Additionally, users can subscribe to accounts they find interesting and like unconventional posts. The app also features a built-in messenger for communication.

**The app's goal** is to bring together creative and artistic people who need a light, inspiring environment without being overwhelmed by ads, so they can quickly find an audience and receive high-quality feedback from like-minded individuals.

Developed by team [ ...**team name**... ]:

**PM** - _Yana Korotenko_

**Team-lead** - _Vladislav Kravchenko_

**Front-end:**
[Lumos app Client repository](https://github.com/candysthieves/client)

- [Vikastgn](https://github.com/Vikastgn) - Viktoriya Stognieva (**Main**)
- [Intrstng](https://github.com/intrstng) - Andrei Babich
- [hoakiin](https://github.com/hoakiin) - Ekaterina Olesik
- [VladSkij](https://github.com/VladSkij) - Vladislav Skalskij
- [tymanskaya](https://github.com/tymanskaya) - Ekaterina Tymanskaya

**Back-end:**
[Lumos app API repository](https://github.com/candysthieves/api)

*	[VladSapozhnik](https://github.com/VladSapozhnik)  - Vladislav Sapozhnik (**Main**)
*   [ChiteS33](https://github.com/ChiteS33)  - Anatolij Novik

### Key Pages:
- Auth 🖥️:
  * 🔐 Sign In
  * ✍️ Sign Up
  * 📜 Terms of Service
  * 🔒 Privacy Policy
  * ❓ Forgot Password
  * 📧 Password recovery
  * 🔑 Create New Password

-   Main Page 🏠
-	* 🌐 main page (unauthorized user)
-	* 🏠 main page (authorized user)
     * 📝main page (Post)

- Profile Settings ⚙️
  *  ✏️ General information
  *  📱 Devices
  *	🔒 Account Management
  *	💳 My payments

- 🧑 My profile
- ☺️ User Profile
- 🤝 Friend profile

- 📊 Statistics
- ❤️Favorites

- 📰Feed
- 💬Messenger
- 🔎Search
  ...

### Key Pages Super Admin:
	...

## Technology Stack 💻📚

*   TypeScript
*   Next.js 16 (App Router)
*   TanStack Query
*   React Hook Form
*   Zod validation
*   ESLint
*   Prettier
*   Stylelint
*   Radix UI
*   SCSS
* ...

## Deploy 🌐

[Lumos app deploy link](https://lumosapp.net/)

## 🔗 Related Projects

[UI-kit Lumos npm-package](https://www.npmjs.com/package/@candy.thieves/ui-kit-lumos) — a UI component library (UI-kit) for the **Lumos** application

[UI-kit Lumos repository](https://github.com/candysthieves/lumos-ui-kit) — UI-kit library repository for the **Lumos** application

[Figma Design](https://www.figma.com/design/UehOuThHVruUR8jcC22FXS/Inctagram?m=auto&t=DixPh2DJFl4iZtwB-6) — mockups and design system

## Getting Started (Client)🚀

### Requirements

- Node.js installed locally.
- pnpm installed locally.

Follow these steps to run the application locally:

1.  **Clone the repository:**

    ```bash
    https://github.com/candysthieves/client.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd client
    ```

3.  **Switch to the `develop` branch:**

    ```bash
    git checkout develop
    ```

4.  **Install dependencies:**

    ```bash
    pnpm install
    ```

    If you have problems with running the script, use the following command in the CLI:

    ```bash
    pnpm install --legacy-peer-deps
    ```

5.  **Configure environment variables:** [ *TODO: check if it will be necessary in the future*]

  *   Create a `.env` file in the root directory based on the `.env.example` file.
  *   Fill in the required credentials in the `.env` file.

6.  **Start the development server:**

    ```bash
    pnpm run dev
    ```

7.  **Access the application:**

  *   Open your browser and navigate to the link provided in the CLI.

## Available Scripts ⚙️

*   **`build`:** 📦 Builds the application for production.

    ```bash
    pnpm run build
    ```

*   **`dev`:** 💻 Starts the Next.js development server.

    ```bash
    pnpm run dev
    ```

*   **`stylelint:check`:** 🎨 Checks SCSS files for stylelint errors.

    ```bash
    pnpm run stylelint:check
    ```

*   **`stylelint:fix`:** 🔧 Automatically fixes SCSS stylelint errors.

    ```bash
    pnpm run stylelint:fix
    ```

*   **`format:check`:** ✅ Checks code formatting with Prettier.

    ```bash
    pnpm run format:check
    ```

*   **`format:fix`:** ✨ Automatically formats code with Prettier.

    ```bash
    pnpm run format:fix
    ```

*   **`lint:check`:** 🔍 Runs ESLint to check for code quality issues.

    ```bash
    pnpm run lint:check
    ```

*   **`lint:fix`:** 🐛 Automatically fixes ESLint errors.

    ```bash
    pnpm run lint:fix
    ```

*   **`preview`:** 👀 Starts a local server to preview the production build.

    ```bash
    pnpm run preview
    ```
