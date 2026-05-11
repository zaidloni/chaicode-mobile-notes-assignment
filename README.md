# Notes App 📝

A beautiful, warm, and intuitive note-taking app built with React Native and Expo. Capture your thoughts, ideas, and reflections with a clean, distraction-free interface that adapts to your preferred theme.

## ✨ Features

- **Clean & Warm Design**: Inspired by modern productivity tools with a warm color palette
- **Dark/Light Theme**: Automatic system theme detection with manual toggle
- **Search Functionality**: Quickly find notes by title or content
- **Responsive Layout**: Optimized for both mobile and tablet devices
- **Rich Editor**: Full-screen editing experience with image header
- **Persistent Storage**: Notes are stored locally (in-memory for demo)
- **Smooth Animations**: Press feedback and transitions for better UX

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn or pnpm
- Expo CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd note-app-10-may-assingment
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   pnpm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**
   - For iOS: `pnpm ios`
   - For Android: `pnpm android`
   - For Web: `pnpm web`

## 🎮 Demo

This app comes pre-loaded with sample notes to demonstrate its features:

### Sample Notes Included:

- **"Product Strategy"**: Review onboarding experience and simplify dashboard flows
- **"Ideas"**: Explore warm editorial UI concepts inspired by modern productivity tools
- **"Reading Notes"**: Typography and spacing create more perceived quality than visual complexity

### Demo Video

Watch the [demo video](demo.mp4) to see the app in action and explore all its features.

### Try the Demo:

1. Start the app using the steps above
2. Browse the existing sample notes
3. Try searching for "strategy" or "ideas"
4. Toggle between light and dark themes
5. Create a new note and edit an existing one
6. Delete a note to see the empty state

**Note**: This is an in-memory demo - notes are not persisted between app restarts. For production use, you would integrate with a persistent storage solution like AsyncStorage or a database.

## 📱 Usage

### Creating Notes

- Tap the "New Note" button to create a new note
- Enter a title and content
- Tap "Save Note" to store it

### Editing Notes

- Tap on any note card to edit it
- Modify the title and content as needed
- Tap "Update Note" to save changes

### Searching Notes

- Use the search bar at the top to filter notes by title or content
- Search is case-insensitive and works across both fields

### Deleting Notes

- Tap the "Delete" button on any note card
- Confirmation is not required - deletion is immediate

### Theme Toggle

- Use the switch in the header to toggle between light and dark themes
- The app respects your system theme by default

## 🏗️ Architecture

This app is built using:

- **Expo Router**: File-based routing for navigation
- **React Native**: Core mobile framework
- **TypeScript**: Type-safe development
- **React Hooks**: State management and side effects

### Project Structure

```
app/
├── _layout.tsx          # Root layout with navigation stack
└── index.tsx            # Main notes screen (list + editor)

assets/
└── images/              # Static assets

# Config files
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── eslint.config.js     # Linting configuration
```

## 🧩 Components Used

### React Native Core Components

- `View` - Basic container component
- `Text` - Text display component
- `TextInput` - Input fields for title, content, and search
- `FlatList` - Scrollable list for displaying notes
- `Pressable` - Touchable components with press feedback
- `Switch` - Theme toggle switch
- `ImageBackground` - Background image for editor header
- `KeyboardAvoidingView` - Handles keyboard appearance on iOS
- `StatusBar` - Status bar styling
- `StyleSheet` - Style definitions

### Expo & Third-party Components

- `SafeAreaView` (from `react-native-safe-area-context`) - Safe area handling
- `Stack` (from `expo-router`) - Navigation stack

### Custom Components

The app uses a single-screen architecture with conditional rendering for different views:

- **Notes List View**: Displays all notes in a grid/list layout
- **Note Editor View**: Full-screen editing interface

### Key Features Implementation

- **Theme System**: Dynamic color scheme based on user preference
- **Responsive Design**: Adapts to tablet vs mobile layouts
- **State Management**: Local state with React hooks
- **Search Filtering**: Real-time filtering of notes
- **CRUD Operations**: Create, Read, Update, Delete notes

## 🎨 Design System

### Colors (STEEP Design System)

- **Background**: Main app background
- **Surface**: Card and input backgrounds
- **Fog**: Note card background
- **Warm**: Accent warm color
- **Text**: Primary text color
- **Secondary Text**: Subtitle and muted text
- **Border**: Input and card borders
- **Accent**: Accent color for highlights
- **Button**: Primary button color

### Typography

- **Hero Title**: 44px, light weight, negative letter spacing
- **Note Title**: 22px, medium weight
- **Body Text**: 15-16px, standard line height
- **Small Text**: 13-14px for timestamps and buttons

### Spacing & Layout

- Consistent 24px padding for containers
- 20px card padding with rounded corners
- Grid layout for tablets (2 columns)
- Floating action button positioned at bottom-right

## 🔧 Development

### Available Scripts

- `pnpm start` - Start Expo development server
- `pnpm android` - Run on Android emulator
- `pnpm ios` - Run on iOS simulator
- `pnpm web` - Run in web browser
- `pnpm lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier-compatible formatting
- Functional components with hooks

## 📦 Dependencies

### Core Dependencies

- `react`: ^19.1.0
- `react-native`: 0.81.5
- `expo`: ~54.0.33
- `expo-router`: ~6.0.23

### UI & Navigation

- `@react-navigation/native`: ^7.1.8
- `@react-navigation/bottom-tabs`: ^7.4.0
- `@react-navigation/elements`: ^2.6.3
- `react-native-safe-area-context`: ~5.6.0
- `react-native-screens`: ~4.16.0

### Utilities

- `expo-constants`: ~18.0.13
- `expo-linking`: ~8.0.11
- `expo-splash-screen`: ~31.0.13
- `expo-status-bar`: ~3.0.9
- `expo-system-ui`: ~6.0.9

### Animations & Gestures

- `react-native-gesture-handler`: ~2.28.0
- `react-native-reanimated`: ~4.1.1
- `react-native-worklets`: 0.5.1

### Assets & Fonts

- `@expo/vector-icons`: ^15.0.3
- `expo-font`: ~14.0.11
- `expo-haptics`: ~15.0.8
- `expo-image`: ~3.0.11
- `expo-symbols`: ~1.0.8
- `expo-web-browser`: ~15.0.10

### Development Dependencies

- `@types/react`: ~19.1.0
- `typescript`: ~5.9.2
- `eslint`: ^9.25.0
- `eslint-config-expo`: ~10.0.0

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- Built with Expo and React Native
- Icons and assets from Expo Vector Icons
- Background image from Unsplash
