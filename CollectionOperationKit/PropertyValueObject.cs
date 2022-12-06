using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollectionOperationKit
{
    public class PropertyValueObject : ObjectPropertyBase
    {
        [FormulaProperty]
        [DisplayName("属性名")]
        public object Name { get; set; }

        [DisplayName("值")]
        [FormulaProperty]
        public object Value { get; set; }
    }
}
