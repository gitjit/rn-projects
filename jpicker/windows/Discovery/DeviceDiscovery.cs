using DryIoc;
using HP.Jarvis.DevSettings;
using HP.Jarvis.Discovery;
using HP.Jarvis.Discovery.Mdns;
using HP.Jarvis.Discovery.Sockets;
using HP.Jarvis.Discovery.Wsd;
using HP.Jarvis.Http;
using HP.Jarvis.Logger;
using HP.Jarvis.SysUtils;
using System;

namespace Discovery
{
    public class DeviceDiscovery
    {
        public DeviceDiscovery()
        {
            
        }

        public void InitContainer(Container container)
        {
            TheContainer = container;
        }

        //public static Container CreateContainer()
        //{
        //    var container = new Container();
        //    container.Register<IDeveloperSettings, DeveloperSettings>(Reuse.Singleton);
        //    container.Register<IHPSystemUtilities, HPSystemUtilities>(Reuse.Singleton);
        //    container.Register<IHPTimerService, HPTimerService>(Reuse.Singleton);
        //    container.Register<IDeviceDiscoveryService, DeviceDiscoveryService>(Reuse.Singleton);
        //    container.Register<ILogHelper, LogHelper>(Reuse.Singleton);
        //    container.Register<IUdpMulticastClient, UdpMulticastClient>(setup: Setup.With(allowDisposableTransient: true));
        //    container.Register<IUdpUnicastClient, UdpUnicastClient>(setup: Setup.With(allowDisposableTransient: true));
        //    container.Register<ITcpStreamClient, TcpStreamClient>(setup: Setup.With(allowDisposableTransient: true));
        //    container.Register<IHttpProvider, HPHttpProvider>(setup: Setup.With(allowDisposableTransient: true));
        //    container.Register<IWsdDiscoveryServer, WsdDiscoveryServer>(setup: Setup.With(allowDisposableTransient: true));
        //    container.Register<IBonjourPrintersManager, BonjourPrintersManager>(setup: Setup.With(allowDisposableTransient: true));

        //    //container.Register<IWindowsDevicesEnumeration, WindowsDevicesEnumerationFacade>();
        //    //container.Register<IUsbDeviceWatcher, WindowsUsbDeviceWatcher>(Reuse.Singleton);
        //    container.Register<IDeviceProvider, AssociatedDeviceProvider>(reuse: Reuse.Singleton, serviceKey: DeviceProviderId.Associated);
        //    container.Register<IConnectionHelper, ConnectionHelper>(reuse: Reuse.Singleton);

        //    container.Register<IDeviceProvider, BonjourDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Bonjour);
        //    container.Register<IDeviceProvider, WsdDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Wsd);
        //    container.Register<IDeviceProvider, WifiDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.WiFiAP);
        //    container.Register<IDeviceProvider, HP.Jarvis.Discovery.Ble.BleProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.BluetoothLe);
        //    container.Register<IDeviceProvider, ManualDeviceProvider>(Reuse.Singleton, serviceKey: DeviceProviderId.Manual);
        //    return container;
        //}

        public Container TheContainer { get; set; }

        Action<Device> NotifyAddNewDeviceEvent;
        Action<bool> DiscoveryCompletedEvent;

        public bool StartSearch(Action<Device> addNewDeviceEvent, Action<bool> discoveryCompletedEvent)
        {
            NotifyAddNewDeviceEvent = addNewDeviceEvent;
            DiscoveryCompletedEvent = discoveryCompletedEvent;

            var discoveryService = TheContainer.Resolve<IDeviceDiscoveryService>();
            discoveryService.DiscoveryEvent -= OnDeviceFound;
            discoveryService.DiscoveryEvent += OnDeviceFound;
            discoveryService.StartSearch();
            return true;
        }

        private void OnDeviceFound(object sender, DeviceDiscoveryServicesEventArgs args)
        {
            if (args.Kind == DeviceDiscoveryServicesEventKind.DiscoveryServiceCompleted)
            {
                DiscoveryCompletedEvent?.Invoke(true);
                //CheckStopDiscovery();
                return;
            }
            if (args.Kind != DeviceDiscoveryServicesEventKind.UniqueDeviceFound &&
                args.Kind != DeviceDiscoveryServicesEventKind.UniqueDeviceChanged)
                return;
            if (args.Device == null) return;

            var newDevice = args.Device;

            var foundDevice = new Device { Name = newDevice.DisplayName, ImagePath = newDevice.ModelSeriesName };
            NotifyAddNewDeviceEvent?.Invoke(foundDevice);

            //_context?.Post(_ =>
            //{
            //    lock (_devicesLock)
            //    {
            //        var dm = DeviceList.FirstOrDefault(d => d.Equals(args.Device));
            //        if (dm != null)
            //            dm.InitializeFrom(args.Device);
            //        else
            //        {
            //            dm = args.Device;

            //            //if (_usbProvider != null)
            //            //    _usbProvider.RefreshDeviceAsync(dm);

            //            //if (_macIppUsbDiscoveryProvider != null)
            //            //    _macIppUsbDiscoveryProvider.RefreshDeviceAsync(dm);

            //            _logger.LogInfo(LogLevel.SummaryInfo, "OnDeviceFound Adding" + dm.Address + " " + args.Device.ModelName);
            //            DeviceList.Add(dm);
            //        }
            //    }
            //}, null);
        }
    }
}
