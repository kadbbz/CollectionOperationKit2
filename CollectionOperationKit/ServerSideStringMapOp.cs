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
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/DictIcon.png")]
    [Category("对象与集合操作")]
    public class ServerSideStringMapOp : BaseServerCommand, ICommandExecutableInServerSide
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
                    return "字典操作";
                }
                else
                {
                    return "创建字典：" + OutParamaterName;
                }

            }
            else
            {
                if (String.IsNullOrEmpty(OutParamaterName))
                {
                    return "字典操作（" + Operation.ToString() + "）";
                }
                else
                {
                    return "字典操作（" + Operation.ToString() + "）：" + OutParamaterName;
                }

            }

        }


        private Dictionary<string, object> getDictionaryParam(IServerCommandExecuteContext dataContext, object formula)
        {

            var input = getParamValue(dataContext, formula);

            if (input.GetType() != typeof(Dictionary<string, object>))
            {
                throw new ArgumentException("[" + formula + "]'s type was " + input.GetType().ToString() + ", should be a Dictionary<string,object>.");
            }

            return (Dictionary<string, object>)input;

        }

        public ExecuteResult Execute(IServerCommandExecuteContext dataContext)
        {
            switch (this.Operation)
            {

                case SupportedOperations.Create:
                    {
                        returnToParam(dataContext, new Dictionary<string, object>());
                        break;
                    }
                case SupportedOperations.Set:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        var key = getParamValue(dataContext, this.OperationParamaterKey).ToString();

                        var value = (null == OperationParamaterValue) ? null : getParamValue(dataContext, this.OperationParamaterValue);

                        if (data.ContainsKey(key))
                        {
                            data[key] = value;
                        }
                        else
                        {
                            data.Add(key, value);
                        }

                        returnToParam(dataContext, data);
                        break;
                    }

                case SupportedOperations.Keys:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        string[] array = new string[data.Count];
                        data.Keys.CopyTo(array, 0);

                        returnToParam(dataContext, array);
                        break;
                    }
                case SupportedOperations.Values:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        string[] array = new string[data.Count];
                        data.Values.CopyTo(array, 0);

                        returnToParam(dataContext, array);
                        break;
                    }
                case SupportedOperations.Has:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        var key = getParamValue(dataContext, this.OperationParamaterKey).ToString();

                        if (data.ContainsKey(key))
                        {
                            returnToParam(dataContext, 1);
                        }
                        else
                        {
                            returnToParam(dataContext, 0);
                        }

                        break;
                    }
                case SupportedOperations.Delete:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        var key = getParamValue(dataContext, this.OperationParamaterKey).ToString();

                        data.Remove(key);
                        returnToParam(dataContext, data);

                        break;
                    }
                case SupportedOperations.Clear:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);

                        data.Clear();

                        returnToParam(dataContext, data);
                        break;
                    }
                case SupportedOperations.Size:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);

                        returnToParam(dataContext, data.Count);
                        break;
                    }
                case SupportedOperations.Get:
                    {
                        var data = getDictionaryParam(dataContext, InParamater);
                        var key = getParamValue(dataContext, this.OperationParamaterKey).ToString();

                        if (data.ContainsKey(key))
                        {
                            returnToParam(dataContext, data[key]);
                        }
                        else
                        {
                            returnToParam(dataContext, getParamValue(dataContext, this.OperationParamaterValue));
                        }


                        break;
                    }
                default:
                    {
                        break;
                    }
            }

            return new ExecuteResult();

        }

        [OrderWeight(1)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(10)]
        [DisplayName("字典（输入参数）")]
        [FormulaProperty]
        public object InParamater { get; set; }

        [OrderWeight(101)]
        [DisplayName("键（文本型）")]
        [FormulaProperty]
        public object OperationParamaterKey { get; set; }

        [OrderWeight(102)]
        [DisplayName("值")]
        [FormulaProperty]
        public object OperationParamaterValue { get; set; }

        private bool setPropertyVisiblity(string propertyName, bool In, bool K, bool V)
        {

            if (propertyName == nameof(InParamater))
            {
                return In;
            }
            else if (propertyName == nameof(OperationParamaterKey))
            {
                return K;
            }
            else if (propertyName == nameof(OperationParamaterValue))
            {
                return V;
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
                case SupportedOperations.Clear:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Create:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false);
                    }
                case SupportedOperations.Delete:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.Get:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.Has:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.Keys:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Set:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.Size:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Values:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                default:
                    {
                        return base.GetDesignerPropertyVisible(propertyName, commandScope);
                    }
            }

        }

        public enum SupportedOperations
        {
            [Description("创建一个空的字典")]
            Create,
            [Description("Get：返回【输入参数】中键为【键（文本型）】的值，如果找不到，则返回【值】的值")]
            Get,
            [Description("Set：将【输入参数】中键为【键（文本型）】的值修改为【值】，如果不存在则创建新的键")]
            Set,
            [Description("Has：如果【输入参数】有【键（文本型）】的键，返回1，否则返回0")]
            Has,
            [Description("Delete：在【输入参数】中删除键为【键（文本型）】的元素")]
            Delete,
            [Description("Clear：清空【输入参数】中所有元素")]
            Clear,
            [Description("Size：返回【输入参数】中的元素数量")]
            Size,
            [Description("Keys：返回【输入参数】中的所有键")]
            Keys,
            [Description("Values：返回【输入参数】中的所有值")]
            Values
        }
    }
}
