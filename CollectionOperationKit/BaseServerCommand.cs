using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollectionOperationKit
{
    public abstract class BaseServerCommand : Command
    {
        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }


        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ServerSide;
        }


        protected object getParamValue(IServerCommandExecuteContext dataContext, object formula, bool shouldCheckFormulaNull = true)
        {
            if (formula == null)
            {
                if (shouldCheckFormulaNull)
                {
                    throw new ArgumentException("The parameter/formula was not set.");
                }
                else
                {
                    return null;
                }
            }

            var task = dataContext.EvaluateFormulaAsync(formula);
            task.Wait();

            return task.Result;
        }

        protected ArrayList getArrayListParam(IServerCommandExecuteContext dataContext, object formula)
        {
            if (formula == null)
            {
                throw new ArgumentException("The argument/formula was not set.");
            }

            var rawData = getParamValue(dataContext, formula);

            ArrayList data = new ArrayList();
            if (rawData == null)
            {
                data = new ArrayList(); //简化判断 参数为Null时返回空数组
            }
            if (rawData is ArrayList trycast) // 本插件生成的，直接使用
            {
                data = trycast;
            }
            else if (rawData is Array trycast1) // 其他数组操作相关插件或返回值为各种数组的类型
            {
                data.AddRange(trycast1);
            }
            else if (rawData is JArray trycast2) // 从JSON序列化过来的数组
            {
                data.AddRange(trycast2.ToArray());
            }
            else if (rawData is List<object> trycast3) // 设置变量命令从数据库中查询出的多行数据
            {
                data.AddRange(trycast3.ToArray());
            }
            else if (rawData is IEnumerable trycast99) // 其他列表与集合类型的对象，遍历后添加到返回值
            {
                foreach (object obj in trycast99)
                {
                    data.Add(obj);
                }
            }
            else
            {
                throw new ArgumentException("[" + formula.ToString() + "]'s type was " + rawData.GetType().ToString() + ", should be an ArrayList, Array, List<object>, IEnumerable or JArray.");
            }

            return data;

        }

        protected void returnToParam(IServerCommandExecuteContext dataContext, object data)
        {

            if (!string.IsNullOrEmpty(OutParamaterName))
            {
                dataContext.Parameters[OutParamaterName] = data;
            }
        }
    }
}
