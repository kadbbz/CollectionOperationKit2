using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/QueryIcon.png")]
    [Category("对象与集合操作")]
    public class ClientSideQueryOp : Command
    {
        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {

            if (String.IsNullOrEmpty(OutParamaterName))
            {
                return "在数组中查询"; // 命令列表中默认显示的名称
            }
            else
            {
                return "在数组中查询（" + Operation.ToString() + "）：" + OutParamaterName;
            }
        }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }

        [OrderWeight(1)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(100)]
        [DisplayName("输入参数（数组）")]
        [FormulaProperty]
        public object InParamater { get; set; }

        [OrderWeight(103)]
        [DisplayName("点击设置查询条件")]
        [ListProperty]
        public List<QueryConditionObject> OperationParamaterPairs { get; set; }

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("Where：返回【输入参数】中包含所有符合查询条件元素的数组")]
            Where = 0,
            [Description("First：返回【输入参数】中第一个符合查询条件的元素，如果没有则返回%Null%")]
            First = 1,
            [Description("Last：返回【输入参数】中最后一个符合查询条件的元素，如果没有则返回%Null%")]
            Last = 2
        }
    }
}
