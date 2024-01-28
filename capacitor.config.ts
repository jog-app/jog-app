import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jog.app',
  appName: 'jog-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
