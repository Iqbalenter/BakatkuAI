# Project Name

## Description
BakatkuAI is an AI-driven web application designed to automatically scan, analyze, and interpret a user's CV to extract and rank their strongest skills. The system leverages the Gemini API, a powerful multimodal AI model developed by Google, to perform natural language understanding, contextual analysis, and semantic recognition of resume content. BakatkuAI aims to assist individuals in recognizing their top talents while also helping recruiters and HR professionals to quickly identify relevant competencies in potential candidates.

## Installation

Clone the repository:

```bash
git clone https://github.com/Iqbalenter/BakatkuAI.git
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Usage

### Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build for Production

Create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Features

- Feature 1: The Scan CV feature is the entry point for users to interact with BakatkuAI. It allows users to upload their Curriculum Vitae (CV) in commonly accepted file formats, such as PDF, DOCX, or TXT. Once uploaded, the system reads the file contents and prepares the data for semantic and contextual analysis using the Gemini API. This step is crucial for enabling deep understanding of the document’s structure, language, and embedded information about education, experience, and skills.

- Feature 2: The Result CV feature displays the output of the CV analysis in a user-friendly, insightful, and structured format. This includes the most relevant and strongest skills extracted from the user’s CV, categorized into types (e.g., technical, soft, domain-specific). The results are based on contextual analysis performed by the Gemini API, considering factors like frequency, section emphasis, and relationship to job functions.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_URL=your_api_url
```

Note: In Vite, all environment variables must be prefixed with `VITE_` to be accessible in your code.



| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

## License

Distributed under the MIT License. See `LICENSE` for more information.
