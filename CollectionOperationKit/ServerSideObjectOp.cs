using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace CollectionOperationKit
{
    [Icon("pack://application:,,,/CollectionOperationKit;component/Resources/ObjectIcon.png")]
    [Category("对象与集合操作")]
    public class ServerSideObjectOp : BaseServerCommand, ICommandExecutableInServerSide
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
                    return "对象操作";
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

        public ExecuteResult Execute(IServerCommandExecuteContext dataContext)
        {
            switch (this.Operation)
            {

                case SupportedOperations.Create:
                    {
                        var input = new Dictionary<string, object>();

                        if (this.OperationParamaterPairs != null)
                        {
                            foreach (PropertyValueObject pair in this.OperationParamaterPairs)
                            {
                                string key = getParamValue(dataContext, pair.Name).ToString();

                                if (!input.ContainsKey(key))
                                {
                                    input.Add(key, null);
                                }

                                if (pair.Value != null)
                                {
                                    input[key]= getParamValue(dataContext, pair.Value, false);
                                }
                            }
                        }

                        returnToParam(dataContext, input);

                        break;
                    }
                case SupportedOperations.Properties:
                    {

                        var input = getParamValue(dataContext, this.InParamater);

                        if (input is IDictionary<string, object> dic)
                        {
                            // 使用命令创建的，以及设置过属性的
                            string[] props = new string[dic.Count];
                            dic.Keys.CopyTo(props, 0);
                            returnToParam(dataContext, props);
                        }
                        else if (input is JObject jObj)
                        {
                            // 刚从JSON反序列化过来的
                            List<string> propl = new List<string>();
                            foreach (JProperty pop in jObj.Properties())
                            {
                                propl.Add(pop.Name);
                            }
                            returnToParam(dataContext, propl.ToArray());
                        }
                        else
                        {
                            // 系统内置的，仅获取公有的实例属性，避免后面设置属性时出错
                            var props = input.GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

                            List<string> propl = new List<string>();

                            foreach (PropertyInfo pop in props)
                            {
                                propl.Add(pop.Name);
                            }

                            returnToParam(dataContext, propl.ToArray());
                        }

                        break;
                    }
                case SupportedOperations.GetPropertyValue:
                    {

                        var input = getParamValue(dataContext, this.InParamater);
                        var name = getParamValue(dataContext, this.OperationParamaterName, false).ToString();

                        object value = null;
                        if (this.OperationParamaterValue != null)
                        {
                            value = getParamValue(dataContext, this.OperationParamaterValue);
                        }

                        if (input is IDictionary<string, object> dic)
                        {
                            if (dic.ContainsKey(name))
                            {
                                returnToParam(dataContext, dic[name]);
                            }
                            else
                            {
                                returnToParam(dataContext, value);
                            }

                        }
                        else if (input is JObject jObj)
                        {
                            JProperty prop = jObj.Property(name);

                            if (null == prop)
                            {
                                returnToParam(dataContext, value);
                            }
                            else
                            {
                                returnToParam(dataContext, prop.Value.ToObject<object>());
                            }
                        }
                        else
                        {
                            var prop = input.GetType().GetProperty(name);
                            if (prop == null)
                            {
                                returnToParam(dataContext, value);
                            }
                            else
                            {
                                returnToParam(dataContext, prop.GetValue(input));
                            }
                        }

                        break;
                    }
                case SupportedOperations.SetPropertyValue:
                    {

                        var input = getParamValue(dataContext, this.InParamater, true);
                        var name = getParamValue(dataContext, this.OperationParamaterName).ToString();
                        object value = null;
                        if (this.OperationParamaterValue != null) // 不设置该属性时，等同于直接置空
                        {
                            value = getParamValue(dataContext, this.OperationParamaterValue, false);
                        }

                        returnToParam(dataContext, setObjectProperty(input, name, value));

                        break;
                    }
                case SupportedOperations.SetProperties:
                    {

                        var input = getParamValue(dataContext, this.InParamater, true);

                        if (this.OperationParamaterPairs == null)
                        {
                            throw new ArgumentNullException(nameof(OperationParamaterPairs));
                        }
                        else
                        {
                            foreach (PropertyValueObject pair in this.OperationParamaterPairs)
                            {
                                if (pair.Value == null) // 不设置该属性时，等同于直接置空
                                {
                                    input = setObjectProperty(input, getParamValue(dataContext, pair.Name).ToString(), null);
                                }
                                else
                                {
                                    input = setObjectProperty(input, getParamValue(dataContext, pair.Name).ToString(), getParamValue(dataContext, pair.Value, false));
                                }
                            }

                            returnToParam(dataContext, input);

                        }

                        break;
                    }
                case SupportedOperations.Null:
                    {

                        returnToParam(dataContext, null);

                        break;
                    }
                default:
                    {
                        break;
                    }
            }

            return new ExecuteResult();

        }

        private object setObjectProperty(object input, string name, object value)
        {
            if (input is IDictionary<string, object> dic)
            {
                // 使用命令创建的，直接写入
                if (dic.ContainsKey(name))
                {
                    dic[name] = value;
                }
                else
                {
                    dic.Add(name, value);
                }

                return input;
            }
            else if (input is JObject jObj)
            {
                // 从JSON反序列化回来的，先转成和使用命令创建的一样的类型
                var inputObj = jObj.ToDictionary();

                if (inputObj.ContainsKey(name))
                {
                    inputObj[name] = value;
                }
                else
                {
                    inputObj.Add(name, value);
                }

                return inputObj;
            }
            else
            {
                // 内置类型不支持增加属性，但可以尝试写入
                var prop = input.GetType().GetProperty(name);
                if (prop == null)
                {
                    throw new NotSupportedException("AppendProperty is NOT supported for the [" + InParamater + "], it's neither a Dictionary<string,object> created by Huozige command or a JObject deserialized from JSON.");
                }
                else
                {
                    prop.SetValue(input, value);
                }

                return input;
            }

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

        [OrderWeight(1)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(10)]
        [DisplayName("对象（输入参数）")]
        [FormulaProperty]
        [Description("操作可能不会影响【输入参数】中用到的变量，如需对变量进行修改，可将其填写到【将结果返回到变量】。")]
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
