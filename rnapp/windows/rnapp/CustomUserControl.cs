using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace rnapp
{
    public sealed class CustomUserControl : Control
    {
        public static DependencyProperty LabelProperty { get; private set; }

        public string Label
        {
            get
            {
                return (string)GetValue(LabelProperty);
            }
            set
            {
                SetValue(LabelProperty, value);
            }
        }

        static CustomUserControl()
        {
            LabelProperty = DependencyProperty.Register(
                nameof(Label),
                typeof(string),
                typeof(CustomUserControl),
                new PropertyMetadata(default(string))
                );
        }

        public CustomUserControl()
        {
            DefaultStyleKey = typeof(CustomUserControl);
        }
    }
}
