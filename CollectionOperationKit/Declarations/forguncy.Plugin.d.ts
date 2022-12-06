/// <reference path="./forguncy.d.ts" />

/**
 */
declare namespace Forguncy.Plugin {
    /**
     * 单元格的水平对齐方式。
     */
    enum CellHorizontalAlignment {
        /**
         * 左对齐。
         */
        Left = 0,
        /**
         * 居中对齐。
         */
        Center = 1,
        /**
         * 右对齐。
         */
        Right = 2,
        /**
         * 默认对齐方式。
         */
        General = 3,
    }

    /**
     * 单元格的垂直对齐方式
     */
    enum CellVerticalAlignment {
        /**
         * 顶部对齐
         */
        Top = 0,
        /**
         * 居中对齐
         */
        Center = 1,
        /**
         * 底部对齐
         */
        Bottom = 2,
    }

    /**
     * 单元格在设计器中设置的样式数据。
     */
    interface StyleMetaData {
        /**
         * 单元格的字体。
         */
        FontFamily?: string;
        /**
         * 单元格的字体大小。
         */
        FontSize?: number;
        /**
         * 单元格的字体粗细，值为`Bold`或`Normal`。
         */
        FontWeight?: string;
        /**
         * 单元格的字体风格，值为`Italic`或`Normal`。
         */
        FontStyle?: string;
        /**
         * 单元格是否显示下划线。
         */
        Underline?: boolean;
        /**
         * 单元格是否显示删除线。
         */
        Strikethrough?: boolean;
        /**
         * 单元格的背景颜色。
         */
        Background?: string;
        /**
         * 单元格的字体颜色。
         */
        Foreground?: string;
        /**
         * 单元格的水平对齐方式。
         */
        HorizontalAlignment?: CellHorizontalAlignment;
        /**
         * 单元格的垂直对齐方式。
         */
        VerticalAlignment?: CellVerticalAlignment;

        /**
         * 单元格是否设置折行。
         */
        WordWrap?: boolean;

        /**
         * 单元格格式字符串。
         */
        Formatter?: string;
    }

    /**
     * 表示在设计器中设计的单元格 UI 元素。
     */
    interface CellContentElement {
        /**
         * C# 单元格类型的属性。
         */
        CellType?: object;
        /**
         * 设计器中设置的单元格的样式信息。
         */
        StyleInfo: StyleMetaData;
        /**
         * 单元格的快速样式模板。
         */
        StyleTemplate?: CellTypeStyleTemplate;
        /**
         * 设计时元素的宽度。
         */
        Width?: number;
        /**
         * 设计时元素的高度。
         */
        Height?: number;
    }

    /**
     * 单元格类型的默认值。
     */
    interface ICellTypeDefaultValue {
        /**
         * 默认值。
         */
        Value: any;
    }

    /**
     * 表示单元格的样式模板。
     */
    interface CellTypeStyleTemplate {
        /**
         * 样式的唯一键。
         */
        Key: string;
        /**
         * 样式的目录分类。
         */
        Category: string;
        /**
         * 所有子样式。
         */
        Styles: { [key: string]: TemplatePartStyle };
    }

    /**
     * 单元格样式模板的子样式。
     */
    interface TemplatePartStyle {
        /**
         * 单元格状态改变时的动画周期。
         */
        Transition?: string;
        /**
         * 普通状态时的样式。
         */
        NormalStyle?: PartStyleUnit,
        /**
         * 鼠标在单元格上方时的样式。
         */
        HoverStyle?: PartStyleUnit,
        /**
         * 单元格获得焦点时的样式。
         */
        FocusStyle?: PartStyleUnit,
        /**
         * 单元格激活时的样式。比如按下按钮时。
         */
        ActiveStyle?: PartStyleUnit,
        /**
         * 单元格禁用时的样式。
         */
        DisableStyle?: PartStyleUnit,
        /**
         * 单元格选中时的样式。比如选中菜单类型单元格的某个子菜单。
         */
        SelectedStyle?: PartStyleUnit,
    }

    /**
     * 样式模板子样式的具体属性。
     */
    interface PartStyleUnit {
        /**
         * 字体颜色。
         */
        FontColor?: string;
        /**
         * 背景色。
         */
        Background?: string;
        /**
         * 边框 CSS 样式。它的优先级低于位置更具体的边框 CSS 字符串。
         */
        BorderString?: string;
        /**
         * 边框圆角 CSS 样式。
         */
        BorderRadiusString?: string;
        /**
         * 阴影 CSS 样式。
         */
        BoxShadowString?: string;
        /**
         * 上边框 CSS 样式。
         */
        BorderTopString?: string;
        /**
         * 右边框 CSS 样式。
         */
        BorderRightString?: string;
        /**
         * 下边框 CSS 样式。
         */
        BorderBottomString?: string;
        /**
         * 左边框 CSS 样式。
         */
        BorderLeftString?: string;
        /**
         * 水平对齐的 CSS 样式。
         */
        CellHorizontalAlignment?: string;
        /**
         * 垂直对齐的 CSS 样式。
         */
        CellVerticalAligment?: string;
        /**
         * 左内边距的 CSS 样式。
         */
        PaddingLeft?: number;
        /**
         * 右内边距的 CSS 样式。
         */
        PaddingRight?: number;
        /**
         * 上内边距的 CSS 样式。
         */
        PaddingTop?: number;
        /**
         * 下内边距的 CSS 样式。
         */
        PaddingBottom?: number;
        /**
         * 左外边距的 CSS 样式。
         */
        MarginLeft?: number;
        /**
         * 右外边距的 CSS 样式。
         */
        MarginRight?: number;
        /**
         * 上外边距的 CSS 样式。
         */
        MarginTop?: number;
        /**
         * 下外边距的 CSS 样式。
         */
        MarginBottom?: number;
    }

    /**
     * 单元格类型基类。通过插件实现的单元格类型需要从这个类继承。
     */
    class CellTypeBase {
        /**
         * 单元格的唯一键。
         */
        ID: string;
        /**
         * 在设计器中设置的单元格数据。
         */
        CellElement: CellContentElement;
        /**
         * 指定单元格是否在母版页中。
         */
        IsInMasterPage: boolean;

        constructor(...params: any[]);
        /**
         * 创建该单元格类型的元素。需要在子类实现。
         *
         */
        createContent(): JQuery;
        /**
         * 获取该单元类型的默认值。页面加载后，单元格会显示默认值。如果默认值不是在设计器中设置的单元格值，则实现此方法。
         * jQuery，包含单元格类型元素的容器。
         */
        getDefaultValue(): ICellTypeDefaultValue;
        /**
         * 执行一组命令。当需要在子类中执行命令时调用此方法。
         * 一组命令的信息。
         */
        executeCommand(commands: object[]): void;
        /**
         * 附加一个处理函数在依赖的单元格的值发生变化时进行处理。如果c#类实现了IDependenceCells接口，则在子类中通过该方法附加一个处理函数。
         * 当依赖单元值发生变化时，每次执行的函数。
         */
        onDependenceCellValueChanged(valueChangedCallback: Function): void;
        /**
         * 获取该单元类型是否具有焦点。需要在子类实现。
         */
        hasFocus(): boolean;
        /**
         * 设置焦点到该单元格类型。需要在子类实现。
         */
        setFocus(): void;
        /**
         * 获取单元格类型元素的容器。
         */
        getContainer(): JQuery;
        /**
         * 设置该单元类型的值。如果单元格的值发生更改，该单元格需要做出改动，则实现此方法。
         * 赋予给单元格的值。
         */
        setValueToElement(jelement: JQuery, value: any): void;
        /**
         * 获取该单元类型的值。如果此单元格类型更改单元格的值，则实现此方法。
         * 单元格的值。
         */
        protected getValueFromElement(): any;
        /**
         * 提交该单元格类型的值。当单元格类型的值由UI改变时，调用此方法来提交值。
         */
        commitValue(): void;
        /**
         * 数据校验。
         */
        validate(): void;
        /**
         * 获取该单元类型是否禁用。
         */
        isDisabled(): boolean;
        /**
         * 禁用这个单元格类型。如果此单元类型支持禁用状态，则实现此方法。
         */
        disable(): void;
        /**
         * 启用这个单元格类型。如果此单元类型支持禁用状态，则实现此方法。
         */
        enable(): void;
        /**
         * 获取该单元类型是否只读。
         */
        isReadOnly(): boolean;
        /**
         * 设置单元格类型的只读状态。如果该单元格类型支持只读模式，则实现此方法
         * 是否只读？
         */
        setReadOnly(value: boolean): void;
        /**
         * 为该单元格类型设置字体样式。如果该单元格类型显示单元格的字体设置，则实现此方法。
         * 新的字体样式
         */
        setFontStyle(styleInfo: StyleMetaData): void;
        /**
         * 设置单元格的背景色。
         * 新的背景色
         */
        setBackColor(color: string): void;
        /**
         * 如果这个单元格需要在所有单元格创建完成并添加到页面之后做一些事情，则实现此方法。
         */
        onLoad(): void;
        /**
         * 如果这个单元格需要在所有单元格创建完成并添加到页面之后做一些事情，则实现此方法。
         */
        onPageLoaded(): void;
        /**
         * 销毁这个单元格类型。如果这个单元格在页面跳转时需要做一些事情，则实现此方法。
         */
        destroy(): void;
        /**
         * 重新加载此单元格类型的数据。如果该单元格类型使用表或视图的数据，则实现此方法。当表的数据可能发生更改时，将触发此方法。
         */
        reload(): void;

        /**
         * 隐藏数据校验的Tooltip。
         */
        hideValidateTooltip(): void;

        /**
         * 计算公式的值。
         * 公式。
         * 计算结果。
         */
        evaluateFormula(formula: string): any;

        /**
         * Internal use
         */
        setContextVariableValue(variableName: string, value: any): void;

        /**
         * Internal use
         */
        clearContextVariableValue(variableName: string): void;

        /**
         * 获取用于公式计算的数据上下文。
         */
        getFormulaCalcContext(): FormulaCalcContext;
        /**
         * 获取单元格的可见或可用权限信息。
         * 单元格权限类型，如可用性权限。
         */
        protected getUIPermission(scope: UIPermissionScope): UIPermission;
        /**
         * 检查当前用户对于单元是否有可见或可用权限。
         * 单元格权限类型，如可用性权限。
         * 如果当前用户有权限返回True，否则返回False。
         */
        protected checkAuthority(scope: UIPermissionScope): boolean;
        /**
         * 检查当前用户是否在有权限的角色列表中。
         * 有权限的角色列表。
         * 如果当前用户有权限返回True，否则返回False。
         */
        protected checkRoleAuthority(allowRoles: string[]): boolean;

        /**
         * 执行自定义命令对象列表。
         * @param command
         * 命令。
         * @param initParam
         * 上下文参数值。
         * @param eventType
         * 事件类型（可选，用于区分不同命令）。
         */
        executeCustomCommandObject(command: ICustomCommandObject, initParam: { [paramName: string]: any }, eventType?: string)

        /**
         * 获取数据库数据。
         * @param bindingDataSourceModel
         * 数据源查询模型，从设计器的BindingDataSourceProperty生成。
         * @param options
         * 查询配置。
         * @param callback
         * 查询结果回调
         */
        getBindingDataSourceValue(bindingDataSourceModel: any, options: queryDataOption, callback: Function): void;

        /**
         * 清除“获取数据库数据”构建的缓存。
         * @param bindingDataSourceModel
         * 数据源查询模型，从设计器的BindingDataSourceProperty生成。
         * @param options
         * 查询配置。
         */
        clearBindingDataSourceValueCache(bindingDataSourceModel: any, options: queryDataOption): void;
    }

    /**
     * 自定义命令对象。
     */
    interface ICustomCommandObject {
        /**
         * 命令列表。
         */
        Commands: any[];
        /**
         * 上下文参数名配置。
         */
        ParamProperties: { [name: string]: string };
    }


    /**
     * 数据查询配置。
     */
    interface queryDataOption {
        /**
         * 最大查询结果行数。
         */
        top: number,
        /**
         * 跳过的记录数。
         * */
        offset?: number,
        /**
         * 查询条件。
         */
        queryConditions: queryCondition[],
        /**
         * 查询条件关系。
         */
        relationType?: relationType,
        /**
         * 是否去掉重复项。
         */
        distinct?: boolean,
        /**
         * 分页模式
         */
        pagerMode?: boolean,
        /**
         * 查询类型
         */
        queryValueType?: TableValueType
        /**
         * 开启排序
         */
        sort?: boolean,
        /**
         * 排序参数
         */
        orderBySqlParams?: IOrderBySqlParam[]
    }
    /**
     * 排序参数
     */
    interface IOrderBySqlParam {
        ColumnName: string,
        Order: SqlOrder
    }
    /**
     * SqlOrder
     */
    const enum SqlOrder {
        ASC,
        DESC
    }
    /**
     * 查询类型
     */
    const enum TableValueType {
        SingleValue = 0,
        SingleRecord = 1,
        Table = 2,
        Count = 3
    }
    /**
     * 条件关系。
     */
    const enum relationType {
        /**
         * 与关系。
         */
        And,
        /**
         * 或关系。
         */
        Or
    }
    /**
     * 查询条件。
     */
    interface queryCondition {
        /**
         * 列名。
         */
        columnName: string;
        /**
         * 比较类型。
         */
        compareType: compareType;
        /**
         * 比较值。
         */
        compareValue: any;
    }
    /**
     * 比较类型。
     */
    const enum compareType {
        /**
         * 等于。
         */
        EqualsTo,
        /**
         * 不等于。
         */
        NotEqualsTo,

        /**
         * 大于。
         */
        GreaterThan,
        /**
         * 大等于。
         */
        GreaterThanOrEqualsTo,

        /**
         * 小于。
         */
        LessThan,
        /**
         * 小于等于。
         */
        LessThanOrEqualsTo,

        /**
         * 以指定字符串开头。
         */
        BeginsWith,
        /**
         * 不以指定字符串开头。
         */
        NotBeginWith,
        /**
         * 以指定字符串结尾。
         */
        EndsWith,
        /**
         * 不以指定字符串结尾。
         */
        NotEndWith,

        /**
         * 包含指定字符串。
         */
        Contains,
        /**
         * 不包含指定字符串。
         */
        NotContains,

        /**
         * 在里边。
         */
        In,
        /**
         * 不在里边。
         */
        NotIn
    }

    /**
     * 单元格的权限信息。
     */
    interface UIPermission {
        /**
         * 单元格的名字或位置。如果单元格有名字，使用名字作为单元格权限的名字，否则使用单元格的位置信息作为名字，如"A1"。
         */
        Name: string;
        /**
         * 单元格的类型。使用单元格类型作为分类依据，如"按钮"，"文本框"等。
         */
        Category?: string;
        /**
         * 单元格的权限类型。
         */
        Scope: UIPermissionScope;
        /**
         * 是否启用单元格权限设置。
         */
        Enabled: boolean;
        /**
         * 有单元格权限的角色列表。
         */
        AllowRoles: string[];
        /**
         * 单元格中所有子项的的单元格权限信息。
         */
        Children?: SubUIPermission[];
    }

    /**
     * 单元格中子项的权限信息，例如菜单各子项的权限信息。
     */
    interface SubUIPermission {
        /**
         * 可以唯一标时单元格子项的名称。
         */
        Name: string;
        /**
         * 有单元格权限的角色列表。
         */
        AllowRoles: string[];
        /**
         * 单元格子项的子项的单元格权限信息。
         */
        Children?: SubUIPermission[];
    }

    /**
     * 单元格的权限类型。
     */
    const enum UIPermissionScope {
        /**
         * 无。
         */
        None = 0,
        /**
         * 可见性权限。
         */
        Visible = 1,
        /**
         * 可用性权限。
         */
        Enable = 2,
        /**
         * 可编辑权限。
         */
        Editable = 4,
        /**
         * 可见性、可用性和可编辑权限。
         */
        All = 7
    }

    /**
     * 提供注册单元格类型函数的帮助类。
     */
    class CellTypeHelper {
        /**
         * 注册一个单元格类型，将`javascript`单元格类型类与`C#`单元格类型类关联起来。
         * 单元格类型的唯一标识符。标识符格式为: `Namespace.ClassName, AssemblyName`，是 C# 单元格类型类的`Namespace`，`ClassName`以及`AssemblyName`。
         * 单元格类型的构造函数。
         *
         */
        static registerCellType(identifier: string, celltype: Function): void;
    }

    /**
     * 命令类型基类。通过插件实现的命令类型需要从这个类继承。
     */
    class CommandBase {
        constructor();
        /**
         * C# 命令类属性的数据。
         */
        CommandParam: object;
        /**
         * 执行这个命令。需要在子类实现。
         */
        execute();
        /**
         * 将一个公式转换成单元格位置信息。
         * Excel 公式，比如`=A1`。
         * 返回单元格的位置，如果公式不是指向单元格，比如`=SUM(1,2)`，返回 null。
         */
        protected getCellLocation(formula: string): CellLocationInfo;
        /**
         * 计算公式。
         * 公式。
         * 计算结果。
         */
        evaluateFormula(formula: string): any;
        /**
         * 获取用于公式计算的数据上下文。
         */
        getFormulaCalcContext(): FormulaCalcContext;

        /**
         * 写日志。
         * 日志内容。
         */
        public log(logText: string): void;


        /**
         * 执行自定义命令对象列表。
         * @param command
         * 命令。
         * @param initParam
         * 上下文参数值。
         * @param eventType
         * 事件类型（可选，用于区分不同命令）。
         */
        executeCustomCommandObject(command: ICustomCommandObject, initParam: { [paramName: string]: any }, eventType?: string)
    }

    /**
     * 提供注册自定义命令类型函数的帮助类。
     */
    class CommandFactory {
        /**
         * 注册一个命令，将`javascript`命令类与`C#`命令类关联起来。
         * 命令的唯一标识符。标识符格式为: `Namespace.ClassName, AssemblyName`，使用 C# 命令类的`Namespace`，`ClassName`以及`AssemblyName`。
         * 命令的构造器。
         *
         */
        static registerCommand(commandType: string, command: any): void;
    }

}

declare namespace Forguncy {
    interface Cell {
        /**
         * 获取单元格上的单元格类型。
         */
        getCellType(): Forguncy.Plugin.CellTypeBase;
    }
}
