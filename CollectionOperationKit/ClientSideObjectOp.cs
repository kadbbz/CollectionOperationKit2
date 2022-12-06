using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/ObjectIcon.png")]
    [Category("对象与集合操作")]
    public class ClientSideObjectOp : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.Create)
            {
                if (String.IsNullOrEmpty(OutParamaterName))
                {
                    return "对象操作"; // 命令列表中默认显示的名称
                }
                else
                {
                    return "创建对象：" + OutParamaterName;
                }

            }
            else
            {
                if (String.IsNullOrEmpty(OutParamaterName))
                {
                    return "对象操作（" + Operation.ToString() + "）";
                }
                else
                {
                    return "对象操作（" + Operation.ToString() + "）：" + OutParamaterName;
                }

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


        private bool setPropertyVisiblity(string propertyName, bool In, bool N, bool V, bool M = false)
        {

            if (propertyName == nameof(InParamater))
            {
                return In;
            }
            else if (propertyName == nameof(OperationParamaterName))
            {
                return N;
            }
            else if (propertyName == nameof(OperationParamaterValue))
            {
                return V;
            }
            else if (propertyName == nameof(OperationParamaterPairs))
            {
                return M;
            }
            else
            {
                return true; // 输出参数为常驻显示
            }
        }

        public override bool GetDesignerPropertyVisible(string propertyName, CommandScope commandScope)
        {
            switch (this.Operation)
            {
                case SupportedOperations.Create:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false, true);
                    }
                case SupportedOperations.GetPropertyValue:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.Null:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false);
                    }
                case SupportedOperations.Properties:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.SetPropertyValue:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.SetProperties:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false, true);
                    }
                default:
                    {
                        return base.GetDesignerPropertyVisible(propertyName, commandScope);
                    }
            }

        }

        [OrderWeight(10)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(100)]
        [DisplayName("对象（输入参数）")]
        [FormulaProperty]
        public object InParamater { get; set; }

        [OrderWeight(101)]
        [DisplayName("属性名")]
        [FormulaProperty]
        public object OperationParamaterName { get; set; }

        [OrderWeight(102)]
        [DisplayName("属性值")]
        [FormulaProperty]
        public object OperationParamaterValue { get; set; }

        [OrderWeight(103)]
        [DisplayName("点击设置对象的属性")]
        [ListProperty]
        public List<PropertyValueObject> OperationParamaterPairs { get; set; }

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("创建一个新对象")]
            Create,
            [Description("Properties：返回【输入参数】中的所有属性名")]
            Properties,
            [Description("GetPropertyValue：返回【输入参数】中名为【属性名】的属性值，如果没有该属性，则返回【属性值】的值")]
            GetPropertyValue,
            [Description("SetPropertyValue：将【输入参数】中名为【属性名】的属性值设置为【属性值】并返回")]
            SetPropertyValue,
            [Description("SetProperties：批量设置【输入参数】的多个属性，并返回")]
            SetProperties,
            [Description("Null：返回%Null%")]
            Null
        }
    }
}
