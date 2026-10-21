export const portfolioData = {
  personal: {
    name: "Vignesh Manikandan",
    title: "SDET / QA Automation Engineer",
    subtitle: "Software Engineer (4+ Years Cross-Platform Engineering & Validation)",
    tagline: "Bridging 4+ years of cross-platform systems engineering into bulletproof SDET automation.",
    location: "Bengaluru, Karnataka, India",
    phone: "+91 9940719337",
    email: "vigneshmk.2258@gmail.com",
    github: "https://github.com/Vignesh-Mk",
    linkedin: "https://linkedin.com/in/vignesh-manikandan-1b930b161",
    bio: "Software engineer with 4+ years building and validating cross-platform applications (Android, iOS, PC), now transitioning into SDET / QA Automation. Hands-on experience with REST API integration, SQL/NoSQL data validation, and cross-platform performance testing from production application development. Building automation expertise in Playwright (TypeScript) and Selenium (WebDriver, TestNG, Cucumber BDD, Jenkins), currently deepening this through a dedicated Playwright Test Automation certification (TestLeaf). Comfortable owning quality end-to-end: from writing test scenarios to integrating automated checks into CI pipelines.",
    stats: [
      { label: "Cross-Platform & QA Experience", value: "4+ Years" },
      { label: "Production Shipped Roles", value: "6" },
      { label: "Automated Testing Stack", value: "Playwright & Selenium" },
      { label: "Backend & Data Integrity", value: "REST API & SQL/NoSQL" }
    ],
    languages: ["English", "Tamil", "Hindi"],
    interests: ["IoT - Simple home automation", "PC Rigging and diagnosing"]
  },

  qaAutomation: {
    overview: "Engineering end-to-end quality pipelines: from automated web testing with Playwright & Selenium to REST API validation in Postman, SQL data integrity checks, and Jenkins CI orchestration.",
    frameworks: [
      {
        name: "Playwright Test Automation (TypeScript)",
        type: "Web E2E & API Automation",
        tech: ["TypeScript", "Playwright", "Jenkins (CI)", "TestLeaf"],
        description: "Modern end-to-end test suite utilizing Playwright auto-waiting, multi-context browser orchestration, and API response assertions. Currently deepening through dedicated TestLeaf certification.",
        metrics: "In Progress via TestLeaf Certification"
      },
      {
        name: "Selenium WebDriver & BDD Framework",
        type: "Web Automation & BDD",
        tech: ["Java", "Selenium WebDriver", "TestNG", "Cucumber (BDD)"],
        description: "Robust Page Object Model (POM) architecture combining Gherkin business scenarios (Cucumber) with TestNG test execution, assertions, and reporting.",
        metrics: "Structured BDD Scenarios with Parallel TestNG Runners"
      },
      {
        name: "REST API & Cloud Data Verification",
        type: "API & Data Integrity",
        tech: ["Postman", "REST APIs", "AWS Cloud", "SQL (PostgreSQL, MS SQL)"],
        description: "Validating backend-driven applications using REST APIs and SQL, verifying functional correctness, schema conformity, and data integrity across mobile and AWS cloud environments.",
        metrics: "Integration-level Quality Ownership (Vmoksha)"
      },
      {
        name: "Cross-Platform Performance & Compatibility",
        type: "Performance & Defect Analysis",
        tech: ["Android", "iOS", "PC", "Firebase Real-time Sync"],
        description: "Rigorous performance profiling and cross-platform functional testing across hardware tiers to catch latency, memory leaks, and sync defects prior to release.",
        metrics: "Multi-device Consistency across Android, iOS & PC (DJ Interactive)"
      }
    ],
    liveSimulationSuites: [
      { id: "playwright_e2e", name: "Playwright (TypeScript) Web E2E Suite", tests: 46, duration: "1.2s", status: "PASSED" },
      { id: "selenium_bdd", name: "Cucumber BDD + TestNG Regression Suite", tests: 34, duration: "1.8s", status: "PASSED" },
      { id: "rest_api_auth", name: "REST API Postman Collections (Auth & Endpoints)", tests: 28, duration: "0.7s", status: "PASSED" },
      { id: "sql_data_verify", name: "SQL & Cloud DB State Verification (PostgreSQL / AWS)", tests: 22, duration: "1.1s", status: "PASSED" },
      { id: "jenkins_ci_gate", name: "Jenkins CI Build & Deployment Quality Gate", tests: 18, duration: "0.9s", status: "PASSED" }
    ]
  },

  workExperience: [
    {
      company: "Vmoksha Technologies",
      role: "Associate Unity Developer",
      period: "August 2025 – Present",
      location: "Bengaluru, India",
      summary: "Develop and validate backend-driven applications using REST APIs and SQL, verifying data integrity and functional correctness across mobile and cloud (AWS) environments — effectively owning integration-level quality checks.",
      tags: ["REST APIs", "SQL", "AWS Cloud", "Integration Testing", "Data Integrity"]
    },
    {
      company: "DJ Interactive Solutions Pvt. Ltd.",
      role: "Unity Developer",
      period: "August 2024 – August 2025",
      location: "Bengaluru, India",
      summary: "Engineered cross-platform applications for Android, iOS, and PC; implemented Firebase integration for real-time data synchronization. Conducted rigorous performance testing across platforms to identify and resolve defects prior to release, ensuring consistent behavior across devices.",
      tags: ["Android", "iOS", "PC", "Firebase", "Performance Testing", "Defect Resolution"]
    },
    {
      company: "DigAmenD Technology Solutions",
      role: "Associate Unity Developer",
      period: "April 2024 – August 2024",
      location: "Chennai, India",
      summary: "Built and validated a multiplayer VR simulation application using Meta XR & Photon Multiplayer for a live product release, testing multi-user session stability and sync behavior.",
      tags: ["Meta XR", "Photon Multiplayer", "Multi-user Sync", "Live Release Validation"]
    },
    {
      company: "VRARRI",
      role: "Freelance XR Developer",
      period: "February 2024 – April 2024",
      location: "Chennai, India",
      summary: "Developed and tested AR/VR training and simulation applications (Meta XR, OpenXR) across diverse hardware configurations.",
      tags: ["AR/VR Simulation", "Meta XR", "OpenXR", "Hardware Compatibility Testing"]
    },
    {
      company: "Neur XR Studios",
      role: "XR Developer",
      period: "March 2022 – November 2023",
      location: "Chennai, India",
      summary: "Managed and integrated complex databases (MongoDB Realm, Firebase), optimizing data retrieval logic and validating system stability for industrial-grade simulations.",
      tags: ["MongoDB Realm", "Firebase", "Database Optimization", "System Stability Validation"]
    },
    {
      company: "Greendzine Technologies Pvt. Ltd.",
      role: "Development Intern",
      period: "December 2021 – February 2022",
      location: "Electronics City Phase 2, India",
      summary: "Independently developed and tested a mobile VR application for warehouse pick-up and mobility workflows, published to Google Play Store (SNAIL VR).",
      tags: ["Mobile VR", "Google Play Store", "Warehouse Mobility", "SNAIL VR"]
    }
  ],

  gameDev: {
    overview: "4+ years of cross-platform engineering across Android, iOS, PC, Meta XR, and Cloud databases, delivering live simulation products, multiplayer architectures, and performance-tuned applications.",
    projects: [
      {
        title: "SNAIL VR (Warehouse Pick-up & Mobility Workflows)",
        genre: "Mobile VR & Warehouse Automation",
        engine: "Unity / Android (Published App)",
        description: "Independently engineered and tested a mobile VR application for warehouse pick-up and mobility workflows, published live on Google Play Store by Greendzine Technologies.",
        tags: ["Unity", "Android", "Google Play Store", "Mobile VR", "Warehouse Workflows"],
        appStoreUrl: "https://play.google.com/store",
        githubUrl: "https://github.com/Vignesh-Mk",
        playable: true
      },
      {
        title: "Multiplayer XR Simulation & Sync Validator",
        genre: "Multiplayer VR & Network State Sync",
        engine: "Meta XR & Photon Multiplayer",
        description: "Production simulation built for DigAmenD Technology Solutions, validating multi-user session stability, remote state synchronization, and low-latency physics across headsets.",
        tags: ["Meta XR", "Photon Multiplayer", "C#", "Network Synchronization"],
        githubUrl: "https://github.com/Vignesh-Mk",
        playable: true
      },
      {
        title: "Cross-Platform Real-time Firebase Sync Application",
        genre: "Cross-Platform Performance & Cloud Sync",
        engine: "Android, iOS, PC (DJ Interactive)",
        description: "Production application engineered across three distinct platforms with Firebase real-time data synchronization and comprehensive performance profiling to eliminate device-specific regressions.",
        tags: ["Android", "iOS", "PC", "Firebase Real-Time DB", "Performance Profiling"],
        githubUrl: "https://github.com/Vignesh-Mk",
        playable: false
      }
    ]
  },

  skills: {
    categories: [
      {
        id: "automation",
        title: "Test Automation",
        subtitle: "QA & E2E Testing Powerhouses",
        icon: "🧪",
        items: [
          { name: "Playwright", level: "In Progress", desc: "TypeScript E2E, auto-waits, API testing (TestLeaf cert)" },
          { name: "Selenium WebDriver", level: "Advanced", desc: "Cross-browser UI automation, Page Object Model" },
          { name: "TestNG", level: "Advanced", desc: "Test orchestration, assertions, parallel execution" },
          { name: "Cucumber (BDD)", level: "Advanced", desc: "Gherkin feature files & behavior-driven scenarios" },
          { name: "Jenkins (CI)", level: "Proficient", desc: "Automated regression pipelines & CI integration" }
        ]
      },
      {
        id: "api_data",
        title: "API & Data Validation",
        subtitle: "REST APIs & Databases",
        icon: "🗄️",
        items: [
          { name: "REST API Testing (Postman)", level: "Advanced", desc: "Endpoint validation, collections, environment mocks" },
          { name: "SQL (PostgreSQL, MS SQL)", level: "Advanced", desc: "Data integrity verification, queries & schema validation" },
          { name: "Firebase", level: "Advanced", desc: "Real-time sync, auth flows, NoSQL data storage" },
          { name: "MongoDB / Realm", level: "Advanced", desc: "Document database integration & retrieval optimization" },
          { name: "Supabase", level: "Proficient", desc: "PostgreSQL backend & cloud auth validation" }
        ]
      },
      {
        id: "programming",
        title: "Programming Languages",
        subtitle: "Core Coding Foundations",
        icon: "💻",
        items: [
          { name: "Java", level: "Advanced", desc: "Selenium test suites, OOP patterns, DSA" },
          { name: "TypeScript / JavaScript", level: "Advanced", desc: "Playwright automation, modern async flows" },
          { name: "Python", level: "Advanced", desc: "Scripting, MCA computing curriculum, data structures" },
          { name: "C#", level: "Expert", desc: "4+ years production application architecture" },
          { name: "C++", level: "Proficient", desc: "Performance algorithms & computing fundamentals" },
          { name: "Flutter", level: "Proficient", desc: "Cross-platform mobile UI development" }
        ]
      },
      {
        id: "tools_platforms",
        title: "Tools & Cloud Platforms",
        subtitle: "DevOps & Infrastructure",
        icon: "⚙️",
        items: [
          { name: "Git / GitHub", level: "Expert", desc: "Version control, branching, PR reviews, CI hooks" },
          { name: "Jenkins", level: "Proficient", desc: "Automated build triggers & test pipelines" },
          { name: "AWS Cloud", level: "Proficient", desc: "Cloud environments & backend data validation" },
          { name: "Bitbucket & SourceTree", level: "Advanced", desc: "Enterprise version control & Git GUI workflows" },
          { name: "Unity 3D Engine", level: "Expert", desc: "4+ years cross-platform production development" }
        ]
      }
    ]
  },

  academics: {
    education: [
      {
        degree: "MCA (Online - Masters in Computer Applications)",
        institution: "Manipal University Jaipur",
        period: "September 2025 – Present",
        location: "Jaipur, India",
        focus: "SQL, C, Python, Java, Data Structures & Algorithms, AI/ML",
        grade: "Currently Pursuing (Postgraduate)"
      },
      {
        degree: "B.Sc Game Design and Development",
        institution: "ICAT Design and Media College",
        period: "2019 – 2022",
        location: "Bengaluru, India",
        focus: "Java, JavaScript, C#, and C++, Real-time Systems & Interactive Architecture",
        grade: "Graduated with Honors"
      }
    ],
    certifications: [
      {
        title: "Playwright Automation (TypeScript)",
        issuer: "TestLeaf",
        id: "TESTLEAF-PLAYWRIGHT-CERT",
        date: "In Progress",
        badge: "🎭 Modern Test Automation"
      },
      {
        title: "Programming Design Patterns for Unity",
        issuer: "Unity Technologies / Accredited",
        id: "UNITY-PATTERNS-VERIFIED",
        date: "Certified",
        badge: "📐 Software Architecture"
      },
      {
        title: "Mathematics for Computer Games Development using Unity",
        issuer: "Accredited Gaming Academy",
        id: "UNITY-MATH-VERIFIED",
        date: "Certified",
        badge: "🔢 Computational Mathematics"
      }
    ]
  }
};
