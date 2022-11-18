using Microsoft.ReactNative.Managed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;

namespace rnapp
{
    public class CustomCheckViewManager :  AttributedViewManager<CustomCheck>
    {
        public override FrameworkElement CreateView()
        {
            var view = new CustomCheck();
            view.RegisterPropertyChangedCallback(CustomUserControl.LabelProperty, (obj, prop) =>
            {
                if (obj is CustomUserControl c)
                {
                    //LabelChanged?.Invoke(c, c.Label);
                }
            });

            return view;
        }

        [ViewManagerProperty("label")]
        public void SetLabel(CustomCheck view, string value)
        {
            if (null != value)
            {
                view.TaskName = value;
            }
            else
            {
                view.TaskName = "";
            }
        }


    }
}
