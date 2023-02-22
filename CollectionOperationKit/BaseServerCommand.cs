using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
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


        protected object getParamValue(IServerCommandExecuteContext dataContext, object formula, bool shouldCheckNull = true)
        {
            if (formula == null)
            {
                if (shouldCheckNull)
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

            if (task.Result == null)
            {
                if (shouldCheckNull)
                {
                    throw new ArgumentException("[" + formula.ToString() + "] is null.");
                }
                else
                {
                    return null;
                }
            }

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
                throw new ArgumentException("[" + formula.ToString() + "] is null.");
            }
            if (rawData.GetType() == typeof(ArrayList))
            {
                data = (ArrayList)rawData;
            }
            else if (rawData.GetType().IsArray) // 其他数组操作相关插件或返回值为各种数组的类型
            {
                data.AddRange((Array)rawData);
            }
            else if (rawData.GetType() == typeof(JArray)) // 从JSON序列化过来的数组
            {
                data.AddRange(((JArray)rawData).ToArray());
            }
            else if (rawData.GetType() == typeof(List<Dictionary<string, object>>)) // 设置变量命令从数据库中查询出的多行数据
            {
                data.AddRange(((List<Dictionary<string, object>>)rawData).ToArray());
            }
            else
            {
                throw new ArgumentException("[" + formula.ToString() + "]'s type was " + rawData.GetType().ToString() + ", should be an ArrayList， Array or JArray.");
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
