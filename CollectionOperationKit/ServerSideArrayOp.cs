using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/ArrayIcon.png")]
    [Category("对象与集合操作")]
    public class ServerSideArrayOp : BaseServerCommand, ICommandExecutableInServerSide
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
                    return "数组操作"; // 命令列表中默认显示的名称
                }
                else
                {
                    return "创建数组：" + OutParamaterName;
                }

            }
            else
            {
                if (String.IsNullOrEmpty(OutParamaterName))
                {
                    return "数组操作（" + Operation.ToString() + "）";
                }
                else
                {
                    return "数组操作（" + Operation.ToString() + "）：" + OutParamaterName;
                }

            }

        }

        private ArrayList getArrayListParam(IServerCommandExecuteContext dataContext, object formula)
        {
            if (formula == null)
            {
                throw new ArgumentException("The argument/formula was not set.");
            }

            var rawData = getParamValue(dataContext, formula);

            ArrayList data = new ArrayList();
            if (rawData == null)
            {
                throw new ArgumentException("[" + formula.ToString() + "] is null.");
            }
            if (rawData.GetType() == typeof(ArrayList))
            {
                data = (ArrayList)rawData;
            }
            else if (rawData.GetType() == typeof(Array))
            {
                data.AddRange((Array)rawData);
            }
            else if (rawData.GetType() == typeof(JArray))
            {
                data.AddRange(((JArray)rawData).ToArray());
            }
            else
            {
                throw new ArgumentException("[" + formula.ToString() + "]'s type was " + rawData.GetType().ToString() + ", should be an ArrayList， Array or JArray.");
            }

            return data;

        }

        public ExecuteResult Execute(IServerCommandExecuteContext dataContext)
        {
            switch (this.Operation)
            {
                case SupportedOperations.FromArray:
                    {
                        var al = new ArrayList();
                        var rawData = getParamValue(dataContext, this.OperationParamaterAName);
                        if (rawData != null)
                        {
                            if (rawData.GetType() == typeof(Array))
                            {
                                al.AddRange((Array)rawData);
                            }
                            else if (rawData.GetType() == typeof(JArray))
                            {
                                al.AddRange(((JArray)rawData).ToArray());
                            }
                            else
                            {
                                throw new ArgumentException("[" + this.OperationParamaterAName + "]'s type was " + rawData.GetType().ToString() + ", should be an Array or JArray.");

                            }
                        }

                        dataContext.Parameters[OutParamaterName] = al;

                        break;
                    }
                case SupportedOperations.ToArray:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);

                        returnToParam(dataContext, data.ToArray());
                        break;
                    }
                case SupportedOperations.Create:
                    {
                        returnToParam(dataContext, new ArrayList());
                        break;
                    }
                case SupportedOperations.Set:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int index = int.Parse(getParamValue(dataContext, this.OperationParamaterAName).ToString());
                        data[index] = getParamValue(dataContext, this.OperationParamaterBName);
                        returnToParam(dataContext, data);
                        break;
                    }
                case SupportedOperations.Get:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int index = int.Parse(getParamValue(dataContext, this.OperationParamaterAName).ToString());

                        returnToParam(dataContext, data[index]);
                        break;
                    }
                case SupportedOperations.Length:
                    {

                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        returnToParam(dataContext, data.Count);
                        break;
                    }
                case SupportedOperations.Push:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        data.Add(getParamValue(dataContext, this.OperationParamaterAName));
                        returnToParam(dataContext, data);
                        break;
                    }
                case SupportedOperations.Pop:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        var last = data[data.Count - 1];
                        data.RemoveAt(data.Count - 1);
                        returnToParam(dataContext, last);
                        break;
                    }
                case SupportedOperations.Unshift:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        data.Insert(0, getParamValue(dataContext, this.OperationParamaterAName));
                        returnToParam(dataContext, data);
                        break;
                    }
                case SupportedOperations.Shift:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        var first = data[0];
                        data.RemoveAt(0);
                        returnToParam(dataContext, first);
                        break;
                    }
                case SupportedOperations.Concat:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        ArrayList subData = getArrayListParam(dataContext, this.OperationParamaterAName);
                        var result = (ArrayList)data.Clone(); // 行为与JS Array的conact行为一致，不能影响原有数组
                        result.AddRange(subData);
                        returnToParam(dataContext, result);
                        break;
                    }
                case SupportedOperations.Slice:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int start = int.Parse(getParamValue(dataContext, this.OperationParamaterAName).ToString());
                        int end = int.Parse(getParamValue(dataContext, this.OperationParamaterBName).ToString());
                        returnToParam(dataContext, data.GetRange(start, end - start));
                        break;
                    }
                case SupportedOperations.InsertRange:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        ArrayList subData = getArrayListParam(dataContext, this.OperationParamaterAName);
                        int index = int.Parse(getParamValue(dataContext, this.OperationParamaterBName).ToString());
                        data.InsertRange(index, subData);
                        returnToParam(dataContext, data);
                        break;
                    }
                case SupportedOperations.RemoveRange:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int index = int.Parse(getParamValue(dataContext, this.OperationParamaterBName).ToString());
                        int count = int.Parse(getParamValue(dataContext, this.OperationParamaterAName).ToString());

                        Array sub = data.GetRange(index, count).ToArray();
                        data.RemoveRange(index, count);

                        returnToParam(dataContext, sub);
                        break;
                    }
                case SupportedOperations.IndexOf:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int index = data.IndexOf(getParamValue(dataContext, this.OperationParamaterAName));
                        returnToParam(dataContext, index);
                        break;
                    }
                case SupportedOperations.LastIndexOf:
                    {
                        ArrayList data = getArrayListParam(dataContext, this.InParamater);
                        int index = data.LastIndexOf(getParamValue(dataContext, this.OperationParamaterAName));
                        returnToParam(dataContext, index);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }

            return new ExecuteResult();

        }

        [OrderWeight(10)]
        [DisplayName("数组（输入参数）")]
        [FormulaProperty]
        [Description("操作可能不会影响【输入参数】中用到的变量，如需对变量进行修改，可将其填写到【将结果返回到变量】。")]
        public object InParamater { get; set; }

        [OrderWeight(1)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        private bool setPropertyVisiblity(string propertyName, bool In, bool A, bool B)
        {

            if (propertyName == nameof(InParamater))
            {
                return In;
            }
            else if (propertyName == nameof(OperationParamaterAName))
            {
                return A;
            }
            else if (propertyName == nameof(OperationParamaterBName))
            {
                return B;
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

                case SupportedOperations.Concat:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.Create:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false);
                    }
                case SupportedOperations.FromArray:
                    {
                        return setPropertyVisiblity(propertyName, false, true, false);
                    }
                case SupportedOperations.Get:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.IndexOf:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.InsertRange:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.LastIndexOf:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.Length:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Pop:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Push:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                case SupportedOperations.RemoveRange:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.Set:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.Shift:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Slice:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
                    }
                case SupportedOperations.ToArray:
                    {
                        return setPropertyVisiblity(propertyName, true, false, false);
                    }
                case SupportedOperations.Unshift:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false);
                    }
                default:
                    {
                        return base.GetDesignerPropertyVisible(propertyName, commandScope);
                    }
            }

        }

        [OrderWeight(101)]
        [DisplayName("操作参数A")]
        [FormulaProperty]
        public object OperationParamaterAName { get; set; }

        [OrderWeight(102)]
        [DisplayName("操作参数B")]
        [FormulaProperty]
        public object OperationParamaterBName { get; set; }


        public enum SupportedOperations
        {
            [Description("创建一个空的高级数组")]
            Create,
            [Description("Set：将【输入参数】中索引为【操作参数A】的元素设置为【操作参数B】")]
            Set,
            [Description("Get：返回【输入参数】中索引为【操作参数A】的元素")]
            Get,
            [Description("Length：返回【输入参数】的长度")]
            Length,
            [Description("Push：将【操作参数A】添加到【输入参数】的结尾处")]
            Push,
            [Description("Pop：返回【输入参数】的最后一个元素，并将其移除")]
            Pop,
            [Description("Unshift：将【操作参数A】添加到【输入参数】的开头")]
            Unshift,
            [Description("Shift：返回【输入参数】的第一个元素，并将其移除")]
            Shift,
            [Description("Concat：返回一个新数组，顺次包含【输入参数】和【操作参数A】的所有元素")]
            Concat,
            [Description("Slice：返回【输入参数】中从【操作参数A】开始到【操作参数B】之前的元素")]
            Slice,
            [Description("InsertRange：类似splice，将【操作参数A】的所有元素添加到【输入参数】的【操作参数B】位置")]
            InsertRange,
            [Description("RemoveRange：类似splice，返回【输入参数】中从【操作参数A】位置开始的【操作参数B】个元素，并将其移除")]
            RemoveRange,
            [Description("IndexOf：返回【操作参数A】在【输入参数】中第一次出现的位置")]
            IndexOf,
            [Description("LastIndexOf：返回【操作参数A】在【输入参数】中最后一次出现的位置")]
            LastIndexOf,
            [Description("FromArray：使用【操作参数A】创建高级数组并返回")]
            FromArray,
            [Description("ToArray：将【输入参数】转换为数组并返回")]
            ToArray
        }
    }
}
