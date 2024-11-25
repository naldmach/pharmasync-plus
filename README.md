# PharmaSync Plus

## Overview
PharmaSync Plus is a comprehensive pharmaceutical management system designed for Unilab. It provides real-time inventory tracking, product verification, and reporting capabilities to streamline pharmaceutical operations.

## Features

### 🔐 Authentication
- Secure login and registration system
- Role-based access control
- Protected routes and sessions

### 📊 Dashboard
- Real-time analytics and metrics
- Quick access to key features
- Status overview and alerts

### 📦 Inventory Management
- Real-time stock tracking
- Low stock alerts
- Product categories
- Batch tracking
- Expiry date monitoring

### 🔍 Product Verification
- QR code scanning
- Product authenticity verification
- Counterfeit reporting system
- Verification history

### 📝 Reports
- Counterfeit incident reporting
- Investigation tracking
- Status updates
- Location-based reporting

### 👥 Staff Management
- Employee profiles
- Role assignment
- Access control
- Activity tracking

### 📄 Document Management
- Digital storage for certificates
- License management
- Document categorization
- Expiry tracking

### 📊 Analytics
- Sales trends
- Inventory analytics
- Verification statistics
- Custom reporting

### ⚙️ Settings
- Company profile management
- System preferences
- Notification settings
- Backup configurations

## Technology Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **Dependencies:**
  - React Router DOM
  - Recharts (for analytics)
  - Other utility libraries

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/pharmasync-plus.git
cd pharmasync-plus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Project Structure
```
pharmasync-plus/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Reports.tsx
│   │   ├── Staff.tsx
│   │   ├── Verification.tsx
│   │   ├── Analytics.tsx
│   │   ├── Documents.tsx
│   │   └── Settings.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=PharmaSync Plus
VITE_API_URL=your_api_url
```

## Usage

### Login
- Use registered credentials to access the system
- Default admin credentials (for development):
  - Email: admin@unilab.com
  - Password: admin123

### Navigation
- Use the sidebar for main navigation
- Quick actions available in the top navbar
- Settings accessible via the profile menu

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Support
For support, email support@pharmasyncplus.com or create an issue in the repository.

## Acknowledgments
- Unilab for the project requirements
- All contributors who participated in this project
- Open source community for the amazing tools and libraries

## Contact
- Project Link: https://github.com/your-username/pharmasync-plus
- Developer: Your Name
- Email: your.email@example.com

---

Built with ❤️ for Unilab