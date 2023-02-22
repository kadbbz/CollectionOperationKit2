using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollectionOperationKit
{
    public class QueryConditionObject : ObjectPropertyBase
    {
        [FormulaProperty]
        [DisplayName("属性名")]
        public object Name { get; set; }

        [DisplayName("比较")]
        [ComboProperty]
        public Operation Op { get; set; } = Operation.等于;

        [DisplayName("值")]
        [FormulaProperty]
        public object Value { get; set; }
    }

    public enum Operation { 
        等于,
        不等于,
        大于,
        不大于,
        小于,
        不小于,
        包含字符串,
        不包含字符串,
        开头是,
        开头不是
    }
}
