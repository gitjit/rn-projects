using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The User Control item template is documented at https://go.microsoft.com/fwlink/?LinkId=234236

namespace rnapp
{
    public sealed partial class CustomCheck : UserControl
    {

        private string taskName;

        public string TaskName
        {
            get { return taskName; }
            set 
            { 
                taskName = value;
                txt_taskName.Text = value;
            }
        }

        public CustomCheck()
        {
            this.InitializeComponent();
        }

        private void chk_taskName_Click(object sender, RoutedEventArgs e)
        {
            if(chk_taskName.IsChecked == true)
            {
                txt_taskName.TextDecorations = Windows.UI.Text.TextDecorations.Strikethrough;
            }
            else
            {
                txt_taskName.TextDecorations = Windows.UI.Text.TextDecorations.None;
            }
        }
    }
}
