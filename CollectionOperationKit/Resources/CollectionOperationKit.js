var ClientSideArrayOp = (function (_super) {
    __extends(ClientSideArrayOp, _super);
    function ClientSideArrayOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ClientSideArrayOp.prototype.returnToParam = function (OutParamaterName, data) {
        if (OutParamaterName && OutParamaterName != "") {
            Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
        } else {
            this.log("OutParamaterName was not set, the value is: " + JSON.stringify(data));
        }
    };

    ClientSideArrayOp.prototype.execute = function () {

        var params = this.CommandParam;
        var Operation = params.Operation;
        var inP = this.evaluateFormula(params.InParamaterName);
        var paramA = this.evaluateFormula(params.OperationParamaterAName);
        var paramB = this.evaluateFormula(params.OperationParamaterBName);
        var OutParamaterName = params.OutParamaterName;
        var OutParamaterName2 = params.OutParamaterName2;

        switch (Operation) {
            case SupportedOperations.Create: {
                this.returnToParam(OutParamaterName, []);

                break;
            }
            case SupportedOperations.Set: {

                if (!Array.isArray(inP)) {

                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (isNaN(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be a number.");
                    return;
                }
                paramA = parseInt(paramA);

                inP[paramA] = paramB;
                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Get: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (isNaN(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be a number.");
                    return;
                }

                paramA = parseInt(paramA);

                this.returnToParam(OutParamaterName, inP[paramA]);
                break;
            }
            case SupportedOperations.Length: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                this.returnToParam(OutParamaterName, inP.length);
                break;
            }
            case SupportedOperations.Push: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                inP.push(paramA);

                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Pop: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                var result = inP.pop();

                this.returnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.Unshift: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                inP.unshift(paramA);

                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Shift: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                var result = inP.shift();

                this.returnToParam(OutParamaterName, result);
                this.returnToParam(OutParamaterName2, inP);
                break;
            }
            case SupportedOperations.Concat: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (!Array.isArray(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be an Array.");
                    return;
                }

                this.log("提示：Concat操作不会对两个数组产生影响，而是生成一个新数组。如需将一个数组加入另一个数组中，请使用InsertRange操作。");
                var result = inP.concat(paramA);

                this.returnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.Slice: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (isNaN(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be a number.");
                    return;
                }

                if (isNaN(paramB)) {
                    this.log("Paramater [" + params.OperationParamaterBName + "] should be a number.");
                    return;
                }

                paramA = parseInt(paramA);
                paramB = parseInt(paramB);

                var result = inP.slice(paramA, paramB);

                this.returnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.InsertRange: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (!Array.isArray(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be an Array.");
                    return;
                }

                if (isNaN(paramB)) {
                    this.log("Paramater [" + params.OperationParamaterBName + "] should be a number.");
                    return;
                }
                paramB = parseInt(paramB);

                var sub = paramA.concat();

                for (var i1 = 0; i1 < sub.length; i1++) {
                    inP.splice(paramB + i1, 0, sub[i1]);
                }

                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.RemoveRange: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                if (isNaN(paramA)) {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be a number.");
                    return;
                }


                if (isNaN(paramB)) {
                    this.log("Paramater [" + params.OperationParamaterBName + "] should be a number.");
                    return;
                }

                paramA = parseInt(paramA);
                paramB = parseInt(paramB);

                var removedItem = inP.splice(paramA, paramB);

                this.returnToParam(OutParamaterName, removedItem);
                this.returnToParam(OutParamaterName2, inP);
                break;
            }
            case SupportedOperations.Split: {
                var result = paramB.split(paramA);
                this.returnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.IndexOf: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                var index = inP.indexOf(paramA);

                this.returnToParam(OutParamaterName, index);
                break;
            }
            case SupportedOperations.LastIndexOf: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                var index = inP.lastIndexOf(paramA);

                this.returnToParam(OutParamaterName, index);
                break;
            } case SupportedOperations.FromJSON: {
                var arr = JSON.parse(paramA);
                if (arr && Array.isArray(arr)) {
                    this.returnToParam(OutParamaterName, arr);
                } else {
                    this.log("Paramater [" + params.OperationParamaterAName + "] should be a JSON string of Array.");
                }

                break;
            }
            case SupportedOperations.ToJSON: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                this.returnToParam(OutParamaterName, JSON.stringify(inP));
                break;
            }
            case SupportedOperations.Join: {

                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamaterName + "] should be an Array.");
                    return;
                }

                var values = [];

                for (var i1 = 0; i1 < inP.length; i1++) {
                    if (inP[i1]) {

                        if (paramB) {
                            values.push(inP[i1][paramB]);
                        } else {
                            values.push(inP[i1]);
                        }

                    } else {
                        values.push("null")
                    }

                }

                this.returnToParam(OutParamaterName, values.join(paramA));
                break;
            }
        }

    };

    var SupportedOperations = {
        Create: 0,
        Set: 1,
        Get: 2,
        Length: 3,
        Push: 4,
        Pop: 5,
        Unshift: 6,
        Shift: 7,
        Concat: 8,
        Slice: 9,
        InsertRange: 10,
        RemoveRange: 11,
        IndexOf: 12,
        LastIndexOf: 13,
        FromJSON: 14,
        ToJSON: 15,
        Join: 16,
        Split: 17
    }

    return ClientSideArrayOp;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("CollectionOperationKit.ClientSideArrayOp, CollectionOperationKit", ClientSideArrayOp);


var ClientSideStringMapOp = (function (_super) {
    __extends(ClientSideStringMapOp, _super);
    function ClientSideStringMapOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ClientSideStringMapOp.prototype.returnToParam = function (OutParamaterName, data) {

        let obj = Object.create(null);
        if (data instanceof Map) {
            for (let [k, v] of data) {
                obj[k] = v;
            }
        }

        if (OutParamaterName && OutParamaterName != "") {
            this.log("The value " + JSON.stringify(obj) + " was set to [" + OutParamaterName + "]");
            Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
        } else {
            this.log("The OutParamaterName was not set, the value is: " + JSON.stringify(obj));
        }
    };

    ClientSideStringMapOp.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var inP = this.evaluateFormula(params.InParamater);
        var pKey = this.evaluateFormula(params.OperationParamaterKey);
        var pValue = this.evaluateFormula(params.OperationParamaterValue);
        var OutParamaterName = params.OutParamaterName;

        switch (Operation) {
            case SupportedOperations.Create: {
                this.returnToParam(OutParamaterName, new Map());
                break;
            }
            case SupportedOperations.Clear: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                inP.clear();
                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Set: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                inP.set(pKey, pValue);
                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Has: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                this.returnToParam(OutParamaterName, inP.has(pKey) ? 1 : 0);
                break;
            }
            case SupportedOperations.Get: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                this.returnToParam(OutParamaterName, inP.has(pKey) ? inP.get(pKey) : pValue);
                break;
            }
            case SupportedOperations.Size: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                this.returnToParam(OutParamaterName, inP.size);
                break;
            }
            case SupportedOperations.Delete: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                inP.delete(pKey);

                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Keys: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                this.returnToParam(OutParamaterName, Array.from(inP.keys()));
                break;
            }
            case SupportedOperations.Values: {
                if (!inP instanceof Map) {
                    this.log("Paramater [" + params.InParamater + "] should be an Map.");
                    return;
                }

                this.returnToParam(OutParamaterName, Array.from(inP.values()));
                break;
            }

        }

    };

    var SupportedOperations = {
        Create: 0,
        Get: 1,
        Set: 2,
        Has: 3,
        Delete: 4,
        Clear: 5,
        Size: 6,
        Keys: 7,
        Values: 8
    }

    return ClientSideStringMapOp;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("CollectionOperationKit.ClientSideStringMapOp, CollectionOperationKit", ClientSideStringMapOp);

var ClientSideObjectOp = (function (_super) {
    __extends(ClientSideObjectOp, _super);
    function ClientSideObjectOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ClientSideObjectOp.prototype.returnToParam = function (OutParamaterName, data) {
        if (OutParamaterName && OutParamaterName != "") {
            Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
        } else {
            this.log("OutParamaterName was not set, the value is: " + JSON.stringify(data));
        }
    };

    ClientSideObjectOp.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var PropPairs = params.OperationParamaterPairs;
        var inP = this.evaluateFormula(params.InParamater);
        var pName = this.evaluateFormula(params.OperationParamaterName);
        var pValue = this.evaluateFormula(params.OperationParamaterValue);
        var OutParamaterName = params.OutParamaterName;

        switch (Operation) {
            case SupportedOperations.Create: {
                var inP = new Object();

                if (PropPairs && PropPairs instanceof Array) {
                    var me = this;

                    PropPairs.forEach(function (v) {
                        var pNameP = me.evaluateFormula(v.Name);
                        var pValueP = me.evaluateFormula(v.Value);

                        inP[pNameP] = pValueP;
                    });
                }

                this.returnToParam(OutParamaterName, inP);

                break;
            }
            case SupportedOperations.Null: {
                if (!inP instanceof Object) {
                    this.log("Paramater [" + params.InParamater + "] should be an Object.");
                    return;
                }

                inP = null;
                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.Properties: {
                if (!inP instanceof Object) {
                    this.log("Paramater [" + params.InParamater + "] should be an Object.");
                    return;
                }

                var pops = [];

                for (pop in inP) {
                    pops.push(pop);
                }

                this.returnToParam(OutParamaterName, pops);
                break;
            }
            case SupportedOperations.GetPropertyValue: {
                if (!inP instanceof Object) {
                    this.log("Paramater [" + params.InParamater + "] should be an Object.");
                    return;
                }

                for (pop in inP) {
                    if (pop === pName) {
                        this.returnToParam(OutParamaterName, inP[pop]);
                        return;
                    }
                }

                this.returnToParam(OutParamaterName, pValue);
                break;
            }
            case SupportedOperations.SetPropertyValue: {
                if (!inP instanceof Object) {
                    this.log("Paramater [" + params.InParamater + "] should be an Object.");
                    return;
                }

                inP[pName] = pValue;

                this.returnToParam(OutParamaterName, inP);
                break;
            }
            case SupportedOperations.SetProperties: {
                if (!inP instanceof Object) {
                    this.log("Paramater [" + params.InParamater + "] should be an Object.");
                    return;
                }

                if (!PropPairs || !PropPairs instanceof Array) {
                    this.log("Paramater [OperationParamaterPairs] was not set.");
                    return;
                }

                var me = this;

                PropPairs.forEach(function (v) {
                    var pNameP = me.evaluateFormula(v.Name);
                    var pValueP = me.evaluateFormula(v.Value);

                    inP[pNameP] = pValueP;
                });

                this.returnToParam(OutParamaterName, inP);
                break;
            }
        }

    };

    var SupportedOperations = {
        Create: 0,
        Properties: 1,
        GetPropertyValue: 2,
        SetPropertyValue: 3,
        SetProperties: 4,
        Null: 5
    }

    return ClientSideObjectOp;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("CollectionOperationKit.ClientSideObjectOp, CollectionOperationKit", ClientSideObjectOp);

var ClientSideQueryOp = (function (_super) {
    __extends(ClientSideQueryOp, _super);
    function ClientSideQueryOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ClientSideQueryOp.prototype.returnToParam = function (OutParamaterName, data) {
        if (OutParamaterName && OutParamaterName != "") {
            Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
        } else {
            this.log("OutParamaterName was not set, the value is: " + JSON.stringify(data));
        }
    };

    ClientSideQueryOp.prototype.checkWithConditions = function (target, conditions) {
        if (conditions && conditions instanceof Array) {
            var me = this;

            for (j = 0; j < conditions.length; j++) {
                var v = conditions[j];

                var pName = me.evaluateFormula(v.Name);
                var pValue = me.evaluateFormula(v.Value);

                var value = target[pName];

                switch (v.Op) {
                    case CalcOp.等于: {
                        if (value != pValue) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.不等于: {
                        if (value == pValue) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.包含字符串: {
                        if (typeof value != 'string' || value.indexOf(pValue) == -1) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.不包含字符串: {
                        if (typeof value == 'string' && value.indexOf(pValue) != -1) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.开头是: {
                        if (typeof value != 'string' || value.indexOf(pValue) != 0) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.开头不是: {
                        if (typeof value == 'string' && value.indexOf(pValue) == 0) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.大于: {
                        if (value <= pValue) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.不大于: {
                        if (value > pValue) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.小于: {
                        if (value >= pValue) {
                            return false;
                        }
                        break;
                    }
                    case CalcOp.不小于: {
                        if (value < pValue) {
                            return false;
                        }
                        break;
                    }
                }

            }

            return true;
        } else {
            this.log("Query condition was not set. The condition's type is " + typeof inP);
            return false;
        }
    };

    ClientSideQueryOp.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var PropPairs = params.OperationParamaterPairs;
        var inP = this.evaluateFormula(params.InParamater);
        var OutParamaterName = params.OutParamaterName;

        switch (Operation) {
            case SupportedOperations.Where: {
                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamater + "] should be an Array: " + typeof inP);
                    return;
                }
                var me = this;
                var result = [];

                inP.forEach(function (v) {
                    if (me.checkWithConditions(v, PropPairs)) {
                        result.push(v);
                    }
                });

                this.returnToParam(OutParamaterName, result);

                break;
            }
            case SupportedOperations.First: {
                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamater + "] should be an Array: " + typeof inP);
                    return;
                }
                var result;

                for (i = 0; i < inP.length; i++) {
                    var v = inP[i];
                    if (this.checkWithConditions(v, PropPairs)) {
                        result = v;
                        break;
                    }
                }

                this.returnToParam(OutParamaterName, result);

                break;
            }

            case SupportedOperations.Last: {
                if (!Array.isArray(inP)) {
                    this.log("Paramater [" + params.InParamater + "] should be an Array: " + typeof inP);
                    return;
                }
                var me = this;
                var result;

                inP.forEach(function (v) {
                    if (me.checkWithConditions(v, PropPairs)) {
                        result = v;
                    }
                });

                this.returnToParam(OutParamaterName, result);

                break;
            }

        }

    };

    var SupportedOperations = {
        Where: 0,
        First: 1,
        Last: 2
    }

    var CalcOp = {
        等于: 0,
        不等于: 1,
        大于: 2,
        不大于: 3,
        小于: 4,
        不小于: 5,
        包含字符串: 6,
        不包含字符串: 7,
        开头是: 8,
        开头不是: 9
    }

    return ClientSideQueryOp;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("CollectionOperationKit.ClientSideQueryOp, CollectionOperationKit", ClientSideQueryOp);