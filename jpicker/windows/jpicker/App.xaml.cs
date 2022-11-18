using DryIoc;
using HP.Jarvis.DevSettings;
using HP.Jarvis.Discovery;
using HP.Jarvis.Discovery.Mdns;
using HP.Jarvis.Discovery.Sockets;
using HP.Jarvis.Discovery.Wsd;
using HP.Jarvis.Http;
using HP.Jarvis.Logger;
using HP.Jarvis.SysUtils;
using Microsoft.ReactNative;
using Windows.ApplicationModel.Activation;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace jpicker
{
    sealed partial class App : ReactApplication
    {

       
        public App()
        {
#if BUNDLE
            JavaScriptBundleFile = "index.windows";
            InstanceSettings.UseWebDebugger = false;
            InstanceSettings.UseFastRefresh = false;
#else
            JavaScriptBundleFile = "index";
            InstanceSettings.UseWebDebugger = true;
            InstanceSettings.UseFastRefresh = true;
#endif

#if DEBUG
            InstanceSettings.UseDeveloperSupport = true;
#else
            InstanceSettings.UseDeveloperSupport = false;
#endif

            Microsoft.ReactNative.Managed.AutolinkedNativeModules.RegisterAutolinkedNativeModulePackages(PackageProviders); // Includes any autolinked modules

            PackageProviders.Add(new ReactPackageProvider());

            InitializeComponent();

            InitIOCContainer();
        }

        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used such as when the application is launched to open a specific file.
        /// </summary>
        /// <param name="e">Details about the launch request and process.</param>
        protected override void OnLaunched(LaunchActivatedEventArgs e)
        {
            base.OnLaunched(e);
            var frame = (Frame)Window.Current.Content;
            frame.Navigate(typeof(MainPage), e.Arguments);
        }

        /// <summary>
        /// Invoked when the application is activated by some means other than normal launching.
        /// </summary>
        protected override void OnActivated(Windows.ApplicationModel.Activation.IActivatedEventArgs e)
        {
            var preActivationContent = Window.Current.Content;
            base.OnActivated(e);
            if (preActivationContent == null && Window.Current != null)
            {
                // Display the initial content
                var frame = (Frame)Window.Current.Content;
                frame.Navigate(typeof(MainPage), null);
            }
        }

        public void InitIOCContainer()
        {
            if (TheContainer == null)
                TheContainer = CreateContainer();
        }

        public static Container CreateContainer()
        {
            var container = new Container();
            container.Register<IDeveloperSettings, DeveloperSettings>(Reuse.Singleton);
            container.Register<IHPSystemUtilities, HPSystemUtilities>(Reuse.Singleton);
            container.Register<IHPTimerService, HPTimerService>(Reuse.Singleton);
            container.Register<IDeviceDiscoveryService, DeviceDiscoveryService>(Reuse.Singleton);
            container.Register<ILogHelper, LogHelper>(Reuse.Singleton);
            container.Register<IUdpMulticastClient, UdpMulticastClient>(setup: Setup.With(allowDisposableTransient: true));
            container.Register<IUdpUnicastClient, UdpUnicastClient>(setup: Setup.With(allowDisposableTransient: true));
            container.Register<ITcpStreamClient, TcpStreamClient>(setup: Setup.With(allowDisposableTransient: true));
            container.Register<IHttpProvider, HPHttpProvider>(setup: Setup.With(allowDisposableTransient: true));
            container.Register<IWsdDiscoveryServer, WsdDiscoveryServer>(setup: Setup.With(allowDisposableTransient: true));
            container.Register<IBonjourPrintersManager, BonjourPrintersManager>(setup: Setup.With(allowDisposableTransient: true));

            container.Register<IWindowsDevicesEnumeration, WindowsDevicesEnumerationFacade>();
            container.Register<IUsbDeviceWatcher, WindowsUsbDeviceWatcher>(Reuse.Singleton);
            container.Register<IDeviceProvider, AssociatedDeviceProvider>(reuse: Reuse.Singleton, serviceKey: DeviceProviderId.Associated);
            container.Register<IConnectionHelper, ConnectionHelper>(reuse: Reuse.Singleton);

            container.Register<IDeviceProvider, BonjourDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Bonjour);
            container.Register<IDeviceProvider, WsdDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Wsd);
            container.Register<IDeviceProvider, WifiDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.WiFiAP);
            container.Register<IDeviceProvider, HP.Jarvis.Discovery.Ble.BleProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.BluetoothLe);
            container.Register<IDeviceProvider, ManualDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Manual);
            return container;
        }

        public static Container TheContainer { get; set; }
    }
}
