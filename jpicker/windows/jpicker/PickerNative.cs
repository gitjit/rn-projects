using Discovery;
using Microsoft.ReactNative.Managed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace jpicker
{
    [ReactModule]
    class PickerNative
    {
        List<string> Images = new List<string> { "a.png", "b.png", "c.png", "d.png", "e.png", "g.png" };
        DeviceDiscovery discovery = new DeviceDiscovery();

        [ReactConstant]
        public double E = Math.E;

        [ReactConstant("Pi")]
        public double PI = Math.PI;

        [ReactMethod("add")]
        public double Add(double a, double b)
        {
            double result = a + b;
            AddEvent(result);
            return result;
        }

        [ReactMethod("getDevice")]
        public Device GetDevice()
        {
            var deviceName = "HP ENVY 7640 series 500";
            var imgPath = Windows.Storage.ApplicationData.Current.LocalFolder.Path + "\\" + "HP_ENVY_7640_series_500.png";
            return new Device { Name = deviceName, ImagePath = imgPath };
        }

        [ReactMethod("getImagePath")]
        public string GetImagePath()
        {

            return Windows.Storage.ApplicationData.Current.LocalFolder.Path + "\\" + "HP_ENVY_7640_series_500.png";
        }

        [ReactMethod("getLocalFolder")]
        public string GetLocalFolder()
        {

            return Windows.Storage.ApplicationData.Current.LocalFolder.Path;
        }

        [ReactMethod("getRandomImage")]
        public string GetRandomImage()
        {
            Random rnd = new Random();
            int randIndex = rnd.Next(Images.Count);
            string img = Images[randIndex];
            return Windows.Storage.ApplicationData.Current.LocalFolder.Path + "\\" + img;
        }

        [ReactMethod("startDiscovery")]
        public bool StartDiscovery()
        {
            discovery.InitContainer(App.TheContainer);
            //discovery.StartSearch((device) => { AddDeviceEvent?.Invoke(device); }, (isCompleted) => { DiscoveryCompletedEvent?.Invoke(isCompleted); });
            discovery.StartSearch(AddNewDevice, (isCompleted) => { DiscoveryCompletedEvent?.Invoke(isCompleted); });
            return false;
        }

        private void AddNewDevice(Device device)
        {
            JSValue devJson = new JSValueObject()
            {
                { "Name",device.Name },
                {"ImagePath",device.ImagePath }
            };

            AddDeviceEvent?.Invoke(devJson);
        }

       

        [ReactMethod("stopDiscovery")]
        public bool StopDiscovery()
        {
            return false;
        }

        [ReactEvent]
        public Action<bool> DiscoveryCompletedEvent { get; set; }

        [ReactEvent]
        public Action<JSValue> AddDeviceEvent { get; set; }

        [ReactEvent]
        public Action<double> AddEvent { get; set; }
    }
}
