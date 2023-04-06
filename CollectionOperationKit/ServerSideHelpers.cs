using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollectionOperationKit
{
    public class ServerSideHelpers
    {
        public static object SetObjectProperty(object input, string name, object value)
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
                    throw new NotSupportedException("AppendProperty is NOT supported, it's neither a Dictionary<string,object> created by Huozige command or a JObject deserialized from JSON.");
                }
                else
                {
                    prop.SetValue(input, value);
                }

                return input;
            }

        }


        public static object GetObjectProperty(object input, string name)
        {
            if (input is IDictionary<string, object> dic)
            {
                if (dic.ContainsKey(name))
                {
                    return dic[name];
                }
                else
                {
                    throw new ArgumentException(name + " was not found in the IDictionary<string, object> object.");
                }

            }
            else if (input is JObject jObj)
            {
                var inputObj = jObj.ToDictionary();

                if (inputObj.ContainsKey(name))
                {
                    return inputObj[name];
                }
                else
                {
                    throw new ArgumentException(name + " was not found in the JObject object.");
                }

            }
            else
            {
                var prop = input.GetType().GetProperty(name);
                if (prop == null)
                {
                    throw new ArgumentException(name + " was not found in the CLR object.");
                }
                else
                {
                    return prop.GetValue(input);
                }
            }

        }

        public static bool IsEqual(object xp, object yp) {
            if (xp is string || xp is int || xp is double || xp is float || xp is long || xp is short || xp is DateTime)
            {
                // 优先用字符串判等
                return xp.ToString() == yp.ToString();
            }
            else
            {
                // 其他类型，用对象判等
                return xp == yp;
            }
        }
    }
}
