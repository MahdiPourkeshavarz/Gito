# Gito - Intelligent GitHub User Search

![Gito Logo](https://i.imgur.com/YOUR_LOGO_URL.png) <!-- Replace with the URL of your chosen logo -->

**Gito** is a sleek, modern web application designed to help you find GitHub users with ease and gain intelligent insights into their work. Powered by the GitHub API and Google's Gemini, Gito goes beyond a simple search by providing AI-generated summaries of a developer's repository activity.

---

## ✨ Key Features

- **⚡ Real-time Search**: A debounced search bar provides instant suggestions as you type.
- **♾️ Infinite Scroll**: Seamlessly load more users in the suggestion bar as you scroll.
- **👤 Detailed User Profiles**: Click on a user to view a beautifully designed profile card with their key stats and information.
- **🤖 AI-Powered Summaries**: With one click, get a concise, AI-generated summary of a user's technical skills and project focus, powered by Google's Gemini and LangChain.
- **🎨 Smooth Animations**: Built with Framer Motion for a fluid and engaging user experience.
- **📱 Mobile-First Design**: A fully responsive interface that looks great on all devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **API Communication**: [Axios](https://axios-http.com/)
- **AI Integration**: [LangChain](https://js.langchain.com/) with [Google Gemini API](https://ai.google.dev/)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- Node.js (v18.0 or later)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/MahdiPourkeshavarz/Gito.git](https://github.com/MahdiPourkeshavarz/Gito.git)
    cd gito
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    You will need to create two files in the root of your project: `.env` for server-side keys and `.env.local` for client-side keys.

    - **Create `.env`** for your Gemini API key:

      ```
      GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
      ```

    - **Create `.env.local`** for your GitHub token:
      ```
      NEXT_PUBLIC_GITHUB_TOKEN="YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE"
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables:

- `GOOGLE_API_KEY`: Your API key for the Google Gemini model. This is used on the server-side via the API route and should be kept in the `.env` file.
- `NEXT_PUBLIC_GITHUB_TOKEN`: Your GitHub Personal Access Token. This is used for making authenticated requests to the GitHub API from the client and must be prefixed with `NEXT_PUBLIC_` and placed in `.env.local`.

---

## Vercel Deployment

This project is optimized for deployment on [Vercel](https://gito-pk.vercel.app/).

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  In the Vercel project settings, navigate to the **Environment Variables** section and add both `GOOGLE_API_KEY` and `NEXT_PUBLIC_GITHUB_TOKEN` with their respective values.
4.  Deploy! Vercel will automatically build and deploy your application.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
