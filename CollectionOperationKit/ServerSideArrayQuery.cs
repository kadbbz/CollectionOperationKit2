using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/QueryIcon.png")]
    [Category("对象与集合操作")]
    public class ServerSideArrayQuery : BaseServerCommand, ICommandExecutableInServerSide
    {

        const string NULL_MASK = "%null%";

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
            return CommandScope.ServerSide;
        }

        [OrderWeight(100)]
        [DisplayName("输入参数（数组）")]
        [FormulaProperty]
        [Description("操作可能不会影响【输入参数】中用到的变量，如需对变量进行修改，可将其填写到【将结果返回到变量】。")]
        public object InParamater { get; set; }

        [OrderWeight(1)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(103)]
        [DisplayName("点击设置查询条件")]
        [Description("查询条件为AND关系，即所有条件全部满足才能返回；如需使用null作为查询条件，请用%null%代替。")]
        [ListProperty]
        public List<QueryConditionObject> OperationParamaterPairs { get; set; }

        public enum SupportedOperations
        {
            [Description("Where：返回【输入参数】中包含所有符合查询条件元素的数组")]
            Where,
            [Description("First：返回【输入参数】中第一个符合查询条件的元素，如果没有则返回%Null%")]
            First,
            [Description("Last：返回【输入参数】中最后一个符合查询条件的元素，如果没有则返回%Null%")]
            Last
        }

        public ExecuteResult Execute(IServerCommandExecuteContext dataContext)
        {
            switch (this.Operation)
            {
                case SupportedOperations.First:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        bool found = false;
                        foreach (object target in data)
                        {
                            if (checkWithConditions(dataContext, target))
                            {
                                returnToParam(dataContext, target);
                                found = true;
                                break;
                            }
                        }

                        if (!found)
                        {
                            returnToParam(dataContext, null);
                        }

                        break;
                    }
                case SupportedOperations.Where:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        ArrayList result = new ArrayList(); ;

                        foreach (object target in data)
                        {
                            if (checkWithConditions(dataContext, target))
                            {
                                result.Add(target);
                            }
                        }

                        returnToParam(dataContext, result);

                        break;
                    }
                case SupportedOperations.Last:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);

                        object result = null;

                        foreach (object target in data)
                        {
                            if (checkWithConditions(dataContext, target))
                            {
                                result = target;
                            }
                        }

                        returnToParam(dataContext, result);

                        break;
                    }
            }

            return new ExecuteResult();
        }


        private bool checkWithConditions(IServerCommandExecuteContext dataContext, object candidate)
        {


            foreach (QueryConditionObject qco in this.OperationParamaterPairs)
            {
                var value = ServerSideHelpers.GetObjectProperty(candidate, getParamValue(dataContext, qco.Name).ToString());

                // 先处理null，需要支持活字格的%null%
                if (value == null)
                {
                    object condition = getParamValue(dataContext, qco.Value);

                    switch (qco.Op)
                    {
                        case CollectionOperationKit.Operation.等于:
                            {
                                return condition == null || condition.ToString().ToLower() == NULL_MASK;
                            }
                        case CollectionOperationKit.Operation.不等于:
                            {
                                return !(condition == null || condition.ToString().ToLower() == NULL_MASK);
                            }
                        default:
                            {
                                //null仅支持判等，其他类型统一按照false处理。
                                return false; 
                            }
                    }
                }

                // 再处理值类型
                if (value is string || value is int || value is double || value is float || value is DateTime || value is bool || value is byte || value is long || value is short)
                {
                    string valueString = value.ToString();
                    object condition = getParamValue(dataContext, qco.Value);
                    string conditionString = condition.ToString();

                    switch (qco.Op)
                    {
                        case CollectionOperationKit.Operation.等于:
                            {
                                return ServerSideHelpers.IsEqual(value, condition);
                            }
                        case CollectionOperationKit.Operation.不等于:
                            {
                                return !ServerSideHelpers.IsEqual(value, condition);
                            }
                        case CollectionOperationKit.Operation.包含字符串:
                            {
                                if (value is string) {
                                    return valueString.Contains(conditionString);
                                } else {
                                    // 仅支持字符串
                                    return false;
                                }
                            }
                        case CollectionOperationKit.Operation.不包含字符串:
                            {
                                if (value is string)
                                {
                                    return !valueString.Contains(conditionString);
                                }
                                else
                                {
                                    // 仅支持字符串
                                    return false;
                                }
                            }
                        case CollectionOperationKit.Operation.开头是:
                            {
                                if (value is string)
                                {
                                    return valueString.StartsWith(conditionString);
                                }
                                else
                                {
                                    // 仅支持字符串
                                    return false;
                                }
                                
                            }
                        case CollectionOperationKit.Operation.开头不是:
                            {
                                if (value is string)
                                {
                                    return !valueString.StartsWith(conditionString);
                                }
                                else
                                {
                                    // 仅支持字符串
                                    return false;
                                }
                            }
                        case CollectionOperationKit.Operation.大于:
                            {
                                if (value is int || value is double || value is float || value is long || value is short)
                                {
                                    var v = double.Parse(value.ToString());
                                    var c = double.Parse(conditionString);
                                    
                                    return (v > c);
                                    
                                }
                                else if (value is DateTime)
                                {
                                    var v = DateTime.Parse(value.ToString());
                                    var c = DateTime.Parse(conditionString);

                                    return (v > c);
                                }
                                else
                                {
                                    // 仅支持数值和日期
                                    return false;

                                }

                            }
                        case CollectionOperationKit.Operation.不大于:
                            {

                                if (value is int || value is double || value is float || value is long || value is short)
                                {
                                    var v = double.Parse(value.ToString());
                                    var c = double.Parse(conditionString);

                                    return (v <= c);

                                }
                                else if (value is DateTime)
                                {
                                    var v = DateTime.Parse(value.ToString());
                                    var c = DateTime.Parse(conditionString);

                                    return (v <= c);
                                }
                                else
                                {
                                    // 仅支持数值和日期
                                    return false;

                                }
                            }
                        case CollectionOperationKit.Operation.小于:
                            {

                                if (value is int || value is double || value is float || value is long || value is short)
                                {
                                    var v = double.Parse(value.ToString());
                                    var c = double.Parse(conditionString);

                                    return (v < c);

                                }
                                else if (value is DateTime)
                                {
                                    var v = DateTime.Parse(value.ToString());
                                    var c = DateTime.Parse(conditionString);

                                    return (v < c);
                                }
                                else
                                {
                                    // 仅支持数值和日期
                                    return false;

                                }
                            }
                        case CollectionOperationKit.Operation.不小于:
                            {

                                if (value is int || value is double || value is float || value is long || value is short)
                                {
                                    var v = double.Parse(value.ToString());
                                    var c = double.Parse(conditionString);

                                    return (v >= c);

                                }
                                else if (value is DateTime)
                                {
                                    var v = DateTime.Parse(value.ToString());
                                    var c = DateTime.Parse(conditionString);

                                    return (v >= c);
                                }
                                else
                                {
                                    // 仅支持数值和日期
                                    return false;

                                }
                            }
                    }
                }
                else
                {
                    // 不支持其他类型，统一按照false处理。
                    return false;
                }
            }

            return true;
        }
    }
}
