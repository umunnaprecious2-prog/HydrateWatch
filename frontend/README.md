# HydrateWatch Frontend

Real-time hydrate formation monitoring dashboard for oil & gas operations.

## Project Structure

```
frontend/
├── app/
│   ├── layout.js           # Root layout with navigation & header
│   ├── page.js             # Home page
│   ├── dashboard/
│   │   └── page.js         # Main dashboard
│   ├── login/
│   │   └── page.js         # Login page
│   └── register/
│       └── page.js         # Registration page
├── src/
│   ├── components/
│   │   ├── KpiCards.js     # KPI metrics display
│   │   ├── SensorChart.js  # Temperature & pressure trends
│   │   ├── RiskGauge.js    # Hydrate risk visualization
│   │   ├── ModeSelector.js # Mode selection & toggles
│   │   └── FileUpload.js   # CSV/JSON file upload
│   ├── contexts/
│   │   └── ModeContext.js  # Global state management
│   ├── hooks/
│   │   └── useSensorData.js # Real-time sensor data hook
│   ├── lib/
│   │   └── api.js          # Axios API client
│   └── styles/
│       └── globals.css     # Global TailwindCSS styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── jsconfig.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set the backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Features

### Dashboard
- **Real-time KPI Cards**: Temperature, Pressure, Hydrate Risk, Flow Rate
- **Sensor Trend Charts**: Historical temperature and pressure visualization
- **Hydrate Risk Gauge**: Visual risk level indicator
- **Mode Selection**: Switch between Offshore and Onshore modes
- **Simulation Mode**: Toggle simulation mode
- **Demo Mode**: Toggle demo mode
- **File Upload**: Upload CSV/JSON sensor data files
- **Recent Alerts**: Color-coded alert notifications

### Authentication
- Email/password login and registration
- Google sign-in (UI only)
- Form validation
- Responsive design

### Layout
- Dark dashboard background
- White content cards
- Sidebar navigation
- UTC clock in header
- Profile avatar
- Fully responsive design

## API Integration

The frontend connects to the FastAPI backend using these endpoints:

- `GET /sensors/latest/{mode}` - Get latest sensor readings
- `GET /sensors/history/{mode}` - Get historical sensor data
- `GET /predictions/{id}` - Get hydrate risk predictions
- `POST /upload` - Upload sensor data files

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: Context API

## Import Paths

The project uses absolute imports configured in `jsconfig.json`:

```javascript
import Component from "@/src/components/Component";
import { useMode } from "@/src/contexts/ModeContext";
import api from "@/src/lib/api";
```

## Error Handling

- Loading states with spinners
- Error message displays
- Graceful API failure handling
- Defensive rendering throughout

## Operating Modes

- **Offshore**: Marine/offshore platform operations
- **Onshore**: Land-based operations

Each mode fetches data from mode-specific API endpoints.
