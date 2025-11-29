# CamPhish - Advanced Camera Phishing Tool
**Developer: Rahul Kushwaha**

![CamPhish](https://techchip.net/wp-content/uploads/2020/04/camphish.jpg)

## 🎯 About CamPhish
CamPhish is an advanced penetration testing tool designed to capture camera shots from target devices by hosting a fake website with camera permission requests. This tool is specifically created for security research and educational purposes.

### Key Features:
- 📸 **Automated Camera Capture** - Captures images from front camera/webcam
- 📍 **GPS Location Tracking** - Tracks geographical location with high accuracy
- 🌐 **Multiple Hosting Options** - Supports Ngrok and CloudFlare Tunnel
- 🎨 **Professional Templates** - Three engaging webpage templates
- 🔒 **Cross-Platform Support** - Works on Kali Linux, Termux, MacOS, Ubuntu, Parrot OS, Windows (WSL)
- 🏗️ **Architecture Support** - ARM, ARM64, x86, x86_64, Apple Silicon (M1/M2/M3)

## 📋 Available Templates
1. **Festival Wishing** - Engaging festival greeting page
2. **Live YouTube TV** - Simulated live streaming interface
3. **Online Meeting** - Professional meeting interface (Beta)

## 🚀 Installation

### Prerequisites
```bash
apt-get -y install php wget unzip
```

### Installation Steps
```bash
git clone https://github.com/raahulllkushwaha/CamPhish
cd CamPhish
bash camphish.sh
```

## 🧹 Cleanup
Remove all logs and captured files:
```bash
bash cleanup.sh
```
**Note:** This will delete all cam files and saved locations.

## 💻 Tested Platforms
- ✅ Kali Linux
- ✅ Termux (Android)
- ✅ MacOS (Intel & Apple Silicon)
- ✅ Ubuntu
- ✅ Parrot Security OS
- ✅ Windows (WSL)

## 📝 Version History

### Version 2.0 - GPS Location Tracking
- ✨ Added GPS location capturing functionality
- 🗺️ Google Maps integration for captured locations
- 📊 Location accuracy reporting
- 🔄 Improved loading screen with location request

### Version 1.9 - Enhanced Architecture Detection
- 🖥️ Improved architecture detection for all CPU types
- 🍎 Better support for Apple Silicon (M1/M2/M3) Macs
- 🔧 Automatic detection of ARM, ARM64, x86, and x86_64
- 🪟 Windows compatibility improvements
- ☁️ CloudFlare Tunnel download fixes

### Version 1.8 - CloudFlare Integration
- ☁️ Added CloudFlare Tunnel support
- ❌ Removed deprecated Serveo tunnel
- 🐛 Various bug fixes and improvements

### Version 1.7 - Platform Support
- 📱 Fixed Termux home directory issues
- 🍎 Added Apple Silicon (M1/M2/M3) support
- 🔧 Added ARM64 support for Raspberry Pi

### Version 1.6 - Ngrok Fixes
- 🔗 Fixed ngrok direct link generation

### Version 1.5 - New Template
- 📹 Added Online Meeting template

### Version 1.4 - Authentication
- 🔐 Ngrok authtoken update

### Version 1.3 - Link Fixes
- 🔗 Fixed ngrok direct link issues

## ⚠️ Legal Disclaimer
**IMPORTANT:** This tool is created strictly for:
- 🎓 Educational purposes
- 🔐 Authorized penetration testing
- 🔬 Security research in controlled environments

**Unauthorized use of this tool is illegal and unethical.** The developer (Rahul Kushwaha) is NOT responsible for any misuse or illegal activities performed with this tool. Always obtain proper authorization before testing.

## 🛡️ Ethical Guidelines
1. ✅ Only use on systems you own or have explicit permission to test
2. ✅ Obtain written authorization before any penetration testing
3. ✅ Follow responsible disclosure practices
4. ✅ Respect privacy and data protection laws
5. ❌ Never use for malicious purposes

## 🤝 Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📫 Contact
- **GitHub:** [@raahulllkushwaha](https://github.com/raahulllkushwaha)
- **Project Link:** [https://github.com/raahulllkushwaha/CamPhish](https://github.com/raahulllkushwaha/CamPhish)

## 📄 License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
This project was inspired by various security research tools and techniques. Special thanks to the open-source security community for their continuous contributions to cybersecurity education.

## ⭐ Support
If you find this tool useful for your security research, please consider:
- ⭐ Starring the repository
- 🔄 Sharing with fellow security researchers
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features

---

**Made with ❤️ by Rahul Kushwaha for Cybersecurity Education**

**Remember: With great power comes great responsibility. Use wisely!** 🔐