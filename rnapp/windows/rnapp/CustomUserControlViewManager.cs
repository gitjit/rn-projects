using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Controls;

using Microsoft.ReactNative.Managed;
using System.Collections.Generic;
using Windows.UI.Xaml;

namespace rnapp
{
    internal class CustomUserControlViewManager : AttributedViewManager<CustomUserControl>
    {
        public override FrameworkElement CreateView()
        {
            var view = new CustomUserControl();
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
        public void SetLabel(CustomUserControl view, string value)
        {
            if (null != value)
            {
                view.Label = value;
            }
            else
            {
                view.ClearValue(CustomUserControl.LabelProperty);
            }
        }

        [ViewManagerProperty("color")]
        public void SetColor(CustomUserControl view, Brush value)
        {
            if (null != value)
            {
                view.Foreground = value;
            }
            else
            {
                view.ClearValue(Control.ForegroundProperty);
            }
        }

        [ViewManagerProperty("backgroundColor")]
        public void SetBackgroundColor(CustomUserControl view, Brush value)
        {
            if (null != value)
            {
                view.Background = value;
            }
            else
            {
                view.ClearValue(Control.BackgroundProperty);
            }
        }

        [ViewManagerCommand]
        public void CustomCommand(CustomUserControl view, IReadOnlyList<object> commandArgs)
        {
            // Execute command
        }
    }
}
