# a11yPlayground

**a11yPlayground** is a React Native mobile application built for use by accessibility engineers, designers, and developers. The app provides a controlled environment for testing accessibility behaviors, exploring assistive technologies, and designing accessible UI patterns in React Native.

> ⚠️ **Note:** We recommend running this app on **physical devices** (not just simulators) when testing with screen readers and other assistive technologies, as behavior can differ from simulated devices significantly.

---

## 🚀 Quick Start

### Clone the Repository

```
git clone https://github.com/YOURORG/a11yPlayground.git
cd a11yPlayground
```

### Set Up Volta, Node, and Yarn

```
curl https://get.volta.sh | bash
volta install node@18
volta install yarn
volta pin node@18
volta pin yarn
yarn install
```

Run `node -v` in the root directory to confirm your version is pinned to `v18`.

## 🛠️ Platform Setup

### iOS Requirements

- macOS with Xcode installed (and updated to latest version of Xcode and MacOS)
- CocoaPods: `brew install cocoapods`
- Xcode CLI tools: `xcode-select --install`

#### iOS Signing

The iOS project uses `local.xcconfig` to generate a unique bundle ID per developer.  
This prevents conflicts when building and running locally.

Bundle IDs are formatted as:
`org.reactjs.native.example.a11yPlayground.[your-username]`

You will need to set the config files for your Debug and Release Configurations to point to the ios/config/local.xcconfig file under Xcode > Info > Configurations.

### Android Requirements

- Android Studio (Custom installation mode)
- OpenJDK 17:

```
brew install openjdk@17
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

- Add to your shell config (.zshrc or .bashrc):

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

- Reload your shell:

```
source ~/.zshrc  # or source ~/.bashrc
```

- Verify with:

```
adb --version
```

## 📱 Running the App

### Android

```
yarn android
```

To build to a physical device:

1. Enable Developer Mode and USB Debugging on your Android device.

2. Connect the device via USB.

3. Run `yarn android`.

### iOS

```
yarn ios
```

To build to a physical device:

1. Disconnect from any VPN.

2. Open `ios/a11yPlayground.xcworkspace` in Xcode.

3. Configure Signing & Capabilities:

   - Select "Automatically manage signing"

   - Choose your personal team - likely your name followed by "(Personal Team)"

4. Connect your iOS device to your device via cable. (You may need to go to Xcode and select your device from the Devices and Simulators menu to get it to install packages.)

5. Approve Developer Mode on your device when prompted. If you are not prompted, go to Settings >

6. Run `yarn ios`.

> If your device shows a trust error, go to Settings > General > VPN & Device Management and trust the developer certificate for the app.

## 🧰 Troubleshooting

- **iOS Build Error 70?**
  Ensure you're not on VPN and that your device is trusted in Xcode.

- **Android exit code 1 during build?**
  Try updating your .zshrc Java setup:

```
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH
```

## 🙌 Contributing

If you'd like to contribute new accessible patterns or help improve the playground, feel free to open a pull request or submit an issue!

## 📄 License

MIT
