using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.ComponentModel;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/Icon.png")]
    [Designer("CollectionOperationKit.Designer.CollectionOperationKitCommandDesigner, CollectionOperationKit")]
    public class CollectionOperationKitCommand : Command
    {
        [DisplayName("命令属性")]
        [FormulaProperty]
        public object MyProperty { get; set; }

        public override string ToString()
        {
            return "对象与集合操作工具命令";
        }
    }
}
