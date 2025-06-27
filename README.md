# 🎬 Livepeer Grant Calculator (Next.js)

A modern, responsive calculator built with Next.js, TypeScript, and Tailwind CSS for Livepeer grant applicants to accurately convert USD amounts to LPT tokens using 60-day average pricing. This tool eliminates the guesswork and volatility concerns when preparing grant proposals.

## ✨ Features

🔥 **60-Day Average Pricing** - Uses historical data to smooth out price volatility  
💰 **Real-Time Price Data** - Fetches live LPT prices from CoinGecko API  
🎨 **Modern UI/UX** - Beautiful gradient design with glass morphism effects  
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile  
⚡ **Fast & Reliable** - Built with Next.js 14 and TypeScript for optimal performance  
🔍 **Transparent Calculations** - Shows both current price and 60-day average  
📊 **Multiple Rounding Options** - Exact, rounded, or buffered amounts  
🖨️ **Print/Export Ready** - Professional documentation generation  
📱 **Mobile Export Options** - Share, copy, email, and print on mobile devices  
🎯 **TypeScript** - Fully typed for better development experience  
🎨 **Tailwind CSS** - Modern styling with custom design system

## 🚀 Live Demo

Visit the live application: [Livepeer Grant Calculator](https://paulieb14.github.io/livepeer-grant-calculator-nextjs/)

## 📋 How to Use

1. **Wait for Price Data**: The app automatically loads current LPT price and 60-day average
2. **Enter Your Grant Amount**: Input the USD amount you need for your grant proposal
3. **Choose Rounding Option**: 
   - **Exact**: Precise calculation with decimals
   - **Round to Whole**: Clean whole number for grants (recommended)
   - **Round Up + 5%**: Includes price protection buffer
4. **Export Results**: Print/export professional documentation for your grant application

## 🎯 Why 60-Day Average?

Grant proposals benefit from using 60-day average pricing because:

- **Reduces Volatility Impact**: Crypto prices can be volatile day-to-day
- **Fair for All Parties**: Protects both applicants and the DAO from price swings
- **Industry Standard**: Many DAOs use historical averages for token grants
- **Transparent Process**: Clear methodology that everyone can verify

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **API**: CoinGecko API for price data
- **Deployment**: Static export ready for GitHub Pages
- **Performance**: Optimized with caching and error handling

## 📦 Installation & Development

```bash
# Clone the repository
git clone https://github.com/PaulieB14/livepeer-grant-calculator-nextjs.git

# Navigate to the project
cd livepeer-grant-calculator-nextjs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CalculatorInput.tsx
│   ├── CalculationResults.tsx
│   ├── ExportButton.tsx
│   ├── MobileExportModal.tsx
│   ├── PriceDisplay.tsx
│   ├── RoundingOptions.tsx
│   └── StatusIndicator.tsx
├── hooks/              # Custom React hooks
│   └── index.ts
├── lib/                # Utility functions and services
│   ├── priceService.ts
│   └── utils.ts
├── pages/              # Next.js pages
│   ├── _app.tsx
│   └── index.tsx
├── styles/             # Global styles
│   └── globals.css
└── types/              # TypeScript type definitions
    └── index.ts
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful blue-to-green gradients matching Livepeer's brand
- **Glass Morphism**: Modern frosted glass effects with backdrop blur
- **Smooth Animations**: Subtle loading states and hover effects
- **Accessible Colors**: High contrast ratios for readability
- **Mobile-First**: Responsive design that works on all screen sizes
- **Print Optimization**: Clean, professional print layouts

## 📊 API Integration

### Current Price Endpoint
```
GET https://api.coingecko.com/api/v3/simple/price?ids=livepeer&vs_currencies=usd
```

### Historical Data Endpoint
```
GET https://api.coingecko.com/api/v3/coins/livepeer/market_chart?vs_currency=usd&days=60&interval=daily
```

## 🔧 Configuration

### Environment Variables
No environment variables required - the app uses public APIs.

### Next.js Configuration
- Static export enabled for GitHub Pages deployment
- Image optimization disabled for static hosting
- Trailing slash handling configured

### Tailwind Configuration
- Custom color palette for Livepeer branding
- Extended animations and transitions
- Custom utility classes

## 📱 Mobile Features

- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Export Modal**: Native sharing, copying, and email options
- **iOS Support**: Special handling for iOS screenshot features
- **PWA Ready**: Can be installed as a web app

## 🖨️ Print Features

- **Professional Layout**: Clean, business-ready documentation
- **Calculation Summary**: Complete breakdown of pricing methodology
- **Timestamp**: Generated date and time for record keeping
- **QR Code Ready**: Easy reference linking back to calculator
- **Multiple Formats**: Support for various paper sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Guidelines
1. Follow TypeScript best practices
2. Use functional components with hooks
3. Maintain responsive design principles
4. Add proper type definitions
5. Test on multiple devices and browsers

### Ideas for Enhancement
- [ ] Add price chart visualization
- [ ] Support for multiple cryptocurrencies
- [ ] Historical grant data analysis
- [ ] Integration with other price APIs as backup
- [ ] Offline mode with cached prices
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build and test export
npm run build && npm run export
```

## 🚀 Deployment

### GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set source to GitHub Actions
4. Push changes to trigger deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings (automatic detection)
3. Deploy with zero configuration

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`

## 📄 License

MIT License - feel free to use this tool and code for your own projects!

## 🙏 Acknowledgments

- **Livepeer Team** - For building an amazing decentralized video infrastructure
- **CoinGecko** - For providing reliable cryptocurrency price data
- **Livepeer Community** - For inspiring this tool through their grant activities
- **Next.js Team** - For the incredible React framework
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/PaulieB14/livepeer-grant-calculator-nextjs/issues) page
2. Create a new issue with detailed information
3. For urgent matters, contact the maintainer

---

**Built with ❤️ for the Livepeer community**

*Helping grant applicants make accurate proposals since 2025*

## 🔗 Related Projects

- [Original HTML Version](https://github.com/PaulieB14/livepeer-lpt-grant-calculator) - The original single-file implementation
- [Livepeer Documentation](https://docs.livepeer.org/) - Official Livepeer docs
- [Livepeer Explorer](https://explorer.livepeer.org/) - Network statistics and data
