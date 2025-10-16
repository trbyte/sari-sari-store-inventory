Based on your file structure, here's an updated formal README.md:

# Sari-Sari Store Inventory Management System

## Project Description
A desktop-based inventory management application developed using Electron.js, designed specifically for small retail establishments such as Sari-Sari stores. This system provides comprehensive inventory tracking and management capabilities in a user-friendly desktop environment.

## Technical Specifications
- **Framework**: Electron.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: Main Process + Renderer Process with Preload Script
- **Data Storage**: JSON file-based database
- **Platform**: Windows Desktop Application

## Project Structure
```
sari-sari-app/
├── main/          # Electron main process files
├── renderer/      # Frontend application (HTML, CSS, JS)
├── preload/       # Secure bridge between main and renderer
├── data/          # JSON database storage
├── dist/          # Built application files
├── node_modules/  # Project dependencies
├── package.json   # Project configuration
├── package-lock.json # Dependency lock file
└── README.md      # Project documentation
```

## Core Features
- **Product Management**: Add new products to inventory with detailed information
- **Inventory Tracking**: Real-time view of all products in stock
- **Stock Management**: Monitor product quantities and availability
- **Data Persistence**: Automatic saving of inventory data to local JSON storage
- **Secure Architecture**: Proper separation between main and renderer processes

## Development Team
- **Lavieen Alvarez**
- **Eian Aguilar** 
- **Kyle Cabalan**

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Installation Steps
1. Extract the project files to your desired directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch application in development mode:
   ```bash
   npm start
   ```

## Building the Application
To create a distributable executable file:

```bash
npm run build-windows
```

The built application will be available in the `dist` directory as a portable executable file.

## Usage Instructions
1. Launch the application using the provided executable file from the `dist` folder
2. Use the product form to add new inventory items with name, category, price, and stock quantity
3. View all products in the organized inventory table
4. Monitor stock levels and product information
5. Remove products from inventory as needed

## Technical Architecture
- **Main Process**: Handles application lifecycle and file system operations
- **Renderer Process**: Manages user interface and user interactions
- **Preload Script**: Securely exposes Electron APIs to the renderer process
- **Data Layer**: JSON-based file storage for inventory persistence

## Technical Requirements Fulfilled
- Desktop application built with Electron.js
- User interface implemented with HTML and CSS
- Application logic developed in JavaScript
- File-based JSON storage system
- Complete CRUD operations (Create, Read, Update, Delete)
- Product inventory management system
- Secure process separation architecture

## License
This project is licensed under the ISC License.

## Support
For technical support or to report issues, please contact the development team.