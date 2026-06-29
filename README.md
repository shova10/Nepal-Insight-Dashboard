# National Data Analytics Dashboard 🇳🇵📊

A modular, real-time civic data metrics dashboard built with React and Tailwind CSS. The application aggregates, sanitizes, and visualizes regional geographic datasets across Nepal—focusing on seismic tracking networks, urban air quality indexes, and provincial demographic distributions.

---

## ✨ Core Dashboards

### 🌋 Seismic Activity Monitor
* Interactive Mapping: Stream live regional seismic coordinates through specialized GIS layout containers (`EarthquakeMap`).
* Dynamic Threshold Filtering: Integrated magnitude range constraint controller allows users to isolate minor background rumbles from high-priority events.
* Peak Metric Catching: Computes the strongest regional event dynamically, tracking its localized descriptor and historic timestamp properties.

### 🍃 Urban Air Pollution Network
* Seeded Variance Engine: Uses deterministic mathematical variations based on time strings to smooth and calibrate fluctuating particulate mass layers (`PM2.5` and `AQI`).
* Regional Advisory Banner: Broadcasts warnings dynamically matching standard Air Quality Index classifications when an urban data center passes healthy baselines.
* Data-Grid Analytics: Displays detailed monitoring grids using customized status metrics to categorize public ambient environments.

### 👥 Provincial Demographics & Literacy
* National Census Metrics: Formats regional metrics natively matching the standard Indian/Nepalese numerical indexing format (`en-IN`).
* Visual Ratio Mapping: Renders structural progress meters tracking population distributions alongside localized literacy ratios.
* Proportional Scaling: Includes optimized visual mapping components (`ProvinceChart`) comparing key demographics across the seven administrative provinces.

---

## 🛠️ Tech Stack

* Core Framework: React (State Tabs Architecture, Advanced Memoization Hooks)
* Styling & Theme Engine: Tailwind CSS + Custom Dark Mode Hook (`useDarkMode`)
* Visualization Layer: Recharts + Custom Map Modules
* Formatting Conventions: Native Localized Strings (`en-IN`)

---

## 📂 Architecture & Layout Matrix

The layout handles active navigation views client-side using an implicit conditional rendering switch instead of standard path router elements.

[App Workspace Structure]├──  (Receives: activeTab, setActiveTab, isDarkMode, setIsDarkMode)├── [Dynamic Content View Shell]│      ├── 'earthquakes' --> │      ├── 'air-quality' --> │      ├── 'population'  --> └──
### Modular Directory Distribution

```text
src/
├── components/          # Specialized visualization charts (TrendChart, EarthquakeMap)
├── data/                # Air index classification color systems and baseline metrics
├── hooks/               # State lifecycle hooks (useAirQuality, useEarthquakes, useDarkMode)
├── pages/               # Primary decoupled metric collection layout screens
└── shared/              # Reusable layout blocks (Navbar, Footer, StatCard indicators)
⚙️ Key Logic & Algorithmic FormulationsStable Daily Variance FormulaTo avoid rapid UI layout flashing when reading asynchronous data pipelines, the AirQuality system utilizes an incremental string parsing matrix. It generates a stable daily seed based on the system date, creating predictable, jitter-free variance modifiers:$$seed = \sum_{i=0}^{n-1} \text{charCodeAt}(i)$$$$\text{VarianceValue} = \left| \sin(seed + \text{cityIndex}) \times 10000 \right| \pmod 1$$Dynamic Bar MetricsThe census visualization components dynamically stretch demographic percentages by a baseline factor of 4. This provides responsive contrast scaling inside small mobile rows, highlighting minor layout variations without breaking component flex boxes:JavaScriptstyle={{ width: `${item.percentage * 4}%` }}
🚀 Local Installation & Run SetupClone the repository workspace:Bashgit clone [https://github.com/your-username/nepal-analytics-dashboard.git](https://github.com/your-username/nepal-analytics-dashboard.git)
cd nepal-analytics-dashboard
Install dependency packages:Bashnpm install
Verify matching custom hooks:Ensure your local execution environment exports the required custom state providers under the src/hooks/ path:useAirQuality() -> returns { citiesData: [...], isLoading: boolean }useEarthquakes() -> returns { quakes: [...], isLoading: boolean, error: string }usePopulation() -> returns { data: [...], totalNationalPopulation: number, averageLiteracyRate: number, isLoading: boolean }Launch the local development environment:Bashnpm run dev
