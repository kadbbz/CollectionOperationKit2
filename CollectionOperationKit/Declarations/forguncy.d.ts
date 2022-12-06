/// <reference path="jquery.d.ts" />
/**
 *
 * 在Forguncy命名空间下，有一些Api是只给插件使用的
 *
 *
 */
declare namespace Forguncy {
    /**
     *
     * ForguncyPage 的实例。
     *
     *
     */
    const Page: ForguncyPage;
    const CommandHelper: ForguncyCommandHelper;
    const Helper: ForguncyHelper;

    /**
     *
     * 页面事件。
     *
     *
     */
    class PageEvents {
        /**
         *
         * 在页面加载完成时发生。
         *
         *
         *
         */
        static Loaded: string;
        /**
         *
         * 在页面的所有数据加载完成时发生。
         *
         *
         *
         */
        static PageDefaultDataLoaded: string;
        /**
         *
         * 在当前页面的弹出页关闭时发生。
         *
         *
         *
         */
        static PopupClosed: string;
    }

    /**
     *
     * 页面对象。
     *
     *
     */
    class ForguncyPage {
        /**
         *
         * 通过单元格名称获取单元格实例。
         *
         *
         * @param name
         * 单元格名称。
         *
         *
         * @param includeSubPage
         * 指定是否在子页面中查找单元格。默认为 true。
         *
         *
         *
         */
        getCell(name: string, includeSubPage?: boolean): Cell;
        /**
         *
         * 通过单元格的位置信息获取一个单元格对象。
         *
         *
         * @param cellLocation
         * 单元格的位置。
         *
         *
         *
         */
        getCellByLocation(cellLocation: CellLocationInfo): Cell;
        /**
         *
         * 通过单元格名称获取一组单元格实例。
         *
         *
         * @param name
         * 单元格名称。
         *
         *
         * @param includeSubPage
         * 指定是否在子页面中查找单元格。默认为 true。
         *
         *
         *
         */
        getCellArray(name: string, includeSubPage?: boolean): Cell[];
        /**
         *
         * 获取所有选项卡和页面容器类型的单元格。
         *
         *
         * @param includeSubPage
         * 指定是否在子页面中查找单元格。默认为 true。
         *
         *
         *
         */
        getContainerCells(includeSubPage?: boolean): ContainerCellBase[];
        /**
         *
         * 通过页面 `ID` 获取子页面。
         *
         *
         * @param pageID
         * 页面的唯一标识符。在浏览器中，每个父页面和子页面都有其唯一的`ID`。
         *
         *
         */
        getSubPageInfoByPageID(pageID: string): SubPage;
        /**
         *
         * 通过表格名称获取表格实例。
         *
         *
         * @param name
         * 表格名称。
         *
         *
         * @param includeSubPage
         * 指定是否在子页面中查找单元格。默认为 true。
         *
         *
         *
         */
        getListView(name: string, includeSubPage?: boolean): ListView;
        /**
         *
         * 获取页面内所有的表格。
         *
         *
         * @param includeSubPage
         * 指定是否在子页面中查找单元格。默认为 true。
         *
         *
         *
         */
        getListViews(includeSubPage?: boolean): ListView[];
        /**
         *
         * 强制触发页面所有公式重算。
         *
         *
         *
         */
        recalc(): void;
        /**
         *
         * 挂起页面的公式计算逻辑，通常在大量操作单元格值之前使用，以获得更好的性能。
         *
         *
         *
         */
        suspendCalc(): void;
        /**
         *
         * 恢复页面的公式计算逻辑，通常在大量操作单元格之后使用。要和`suspendCalc`方法成对使用。
         *
         *
         *
         */
        resumeCalc(): void;
        /**
         *
         * 从当前页面中使用的表和视图中重新加载数据。
         *
         *
         * @param tableName
         * 表名，如果忽略此参数，则重新加载所有表的数据。
         *
         *
         *
         */
        reloadBindingData(tableName?: string): void;
        /**
         *
         * 获取当前登录用户的用户名，如果用户没有登录则返回空值。
         *
         *
         *
         */
        getUserName(): string;
        /**
         *
         * 获取当前登录用户的信息。
         *
         *
         *
         */
        getUserInfo(): UserInfo;
        /**
         *
         * 获取当前页面的名称。
         *
         *
         *
         */
        getPageName(): string;
        /**
         *
         * 获取当前页面的母版页名称。
         *
         *
         *
         */
        getMasterPageName(): string;
        /**
         *
         * 设置当前行。
         *
         *
         * @param currentRowParam
         * 当前行信息。
         *
         *
         *
         */
        setCurrentRow(currentRowParam: CurrentRowInfoParam | CurrentRowInfoPluginParam): void;

        /**
         *
         * 绑定当前页面的`loaded`事件。
         *
         *
         * @param fn
         * 事件处理函数。
         *
         *
         *
         */
        ready(fn: Function): void;
        /**
         *
         * 为页面绑定事件。可以给当前页面、指定页面或所有页面绑定事件。
         *
         *
         * @param eventType
         * 表示页面事件类型的字符串。页面支持的事件请参考 `PageEvents` 类 。
         *
         *
         * @param data
         * 可选参数，如果不为忽略表示给事件处理函数传递的自定义参数。
         *
         *
         * @param fn
         * 事件处理函数。
         *
         *
         * @param targetPage
         * 页面的名称。如果绑定所有页面的事件，请使用`*`。如果忽略，则绑定到当前页面。
         *
         *
         *
         */
        bind(eventType: string, data?: any, fn?: any, targetPage?: string): void;
        /**
         *
         * 取消特定事件的绑定。该方法能够移除被选的事件处理程序，或者当事件发生时终止指定函数的运行。
         *
         *
         * @param eventType
         * 表示页面事件类型的字符串。页面支持的事件请参考`PageEvents`类 。
         *
         *
         * @param fn
         * 事件处理函数。如果忽略，则取消绑定页面上该事件类型的所有处理函数。
         *
         *
         * @param targetPage
         * 页面的名称。如果取消绑定所有页面的事件，请使用`*`。如果忽略，则取消绑定当前页面的事件。
         *
         *
         *
         */
        unbind(eventType: any, fn?: Function, targetPage?: string): void;
        /**
         *
         * 取消页面上所有事件的绑定。
         *
         *
         * @param targetPage
         * 页面的名称。如果绑定时`targetPage`使用的是`*`的，则仍然使用`*`。如果忽略，则删除当前页面的所有绑定。
         *
         *
         *
         */
        unbindAll(targetPage?: string): void;
        /**
         *
         * 用户操作超时时间，将自动断开连接并释放并发用户数。
         *
         *
         *
         * 单位是分钟，默认值是`0`，同时意味着永不自动断开。
         *
         *
         *
         * 如果修改为`30`，用户未在页面进行任何操作，页面将在`30`分钟后自动断开。
         *
         *
         *
         */
        AutoDisconnectTimeout: number;
    }

    /**
     *
     * 提供命令相关的帮助方法
     *
     *
     */
    class ForguncyCommandHelper {
        /**
         *
         * 执行指定名称单元格的命令
         *
         *
         * @param cellName
         * 单元格名称。
         *
         *
         * @param completedCallback
         * 命令执行后的回调函数。
         *
         *
         *
         */
        executeCellCommand(cellName: string, completedCallback?: Function): void;
        /**
         *
         * 在命令执行过程中，获取命令变量的值
         *
         *
         * @param variableName
         * 变量名。
         *
         *
         * @returns
         * 变量的值。
         *
         *
         *
         */
        getVariableValue(variableName: string): any;
        /**
         *
         * 在命令执行过程中，设置命令变量的值
         *
         *
         * @param variableName
         * 变量名。
         *
         *
         * @param value
         * 值。
         *
         *
         *
         */
        setVariableValue(variableName: string, value: any): void;
        /**
         *
         * 在命令执行过程中，获取所有变量名称和值
         *
         *
         * @returns
         * 所有变量的名称和值的列表。
         *
         *
         *
         */
        getAllVariableValues(): { [variableName: string]: any };
    }

    /**
     *
     * 包含查询条件的当前行信息。用于插件。
     *
     *
     */
    interface CurrentRowInfoPluginParam {
        /**
         *
         * 当前行的查询条件。
         *
         *
         */
        QueryCondition: any;
        /**
         *
         * 公式计算时的数据上下文。用于包含公式的`QueryCondition`。
         *
         *
         */
        FormulaCalcContext: FormulaCalcContext;
    }

    /**
     *
     * 指定表的当前行信息。
     *
     *
     */
    interface CurrentRowInfoParam {
        /**
         *
         * 表名。
         *
         *
         */
        TableName: string;
        /**
         *
         * 当前行的主键。
         *
         *
         */
        PrimaryKey: {
            [primaryColumnName: string]: any;
        };
    }

    /**
     *
     * 单元格支持的事件。
     *
     *
     */
    class CellEvents {
        /**
         *
         * 单元格的值变化时发生。
         *
         *
         *
         */
        static ValueChanged: string;
        /**
         *
         * 单击单元格时触发，支持按钮、图片和超链接单元格类型。
         *
         *
         *
         */
        static Click: string;
        /**
         *
         * 当鼠标进入单元格时触发，支持按钮、图片和超链接单元格类型。
         *
         *
         *
         */
        static MouseEnter: string;
        /**
         *
         * 当鼠标离开单元格时触发，支持按钮、图片和超链接单元格类型。
         *
         *
         *
         */
        static MouseLeave: string;
        /**
         *
         * 当单元格的选定项改变时触发。支持组合框和用户选择框单元格类型。
         *
         *
         *
         */
        static SelectionChanged: string;
        /**
         *
         * 数据透视表的单元格点击时发生。
         *
         *
         *
         */
        static PivottableClick: string;
    }

    /**
     *
     * 表示页面中的单元格对象。
     *
     *
     */
    class Cell {
        /**
         *
         * 获取指定单元格的值。获取单元格的值后，您可以将该值用于其他地方，比如命令中。
         *
         *
         *
         */
        getValue(): any;
        /**
         *
         * 给指定的单元格设置值，值可以是任意值，没有限制。
         *
         *
         * @param value
         * 值。
         *
         *
         *
         */
        setValue(value: any): void;
        /**
         *
         * 隐藏单元格。将页面中指定的单元格进行隐藏，只能隐藏单元格的值、类型等，而不能隐藏单元格的背景。与show方法相对，可根据实际需求结合使用。
         *
         *
         *
         */
        hide(): void;
        /**
         *
         * 显示单元格。将页面中隐藏的单元格进行显示，显示单元格的值、类型等。与hide方法相对，可根据实际需求结合使用。
         *
         *
         *
         */
        show(): void;
        /**
         *
         * 给指定的单元格设置背景色。
         *
         *
         * @param color
         * 设置的颜色，支持以下三种形式：
         * ・颜色名称，如 red；
         * ・十六进制值，如 #ff0000；
         * ・rgb 代码，如 rgb(255,0,0)。
         *
         *
         *
         */
        setBackColor(color: any): void;
        /**
         *
         * 给指定的单元格设置其字体颜色。与setBackColor方法类似。
         *
         *
         * @param color
         * 设置的颜色，支持以下三种形式：
         * ・颜色名称，如 red；
         * ・十六进制值，如 #ff0000；
         * ・rgb 代码，如 rgb(255,0,0)。
         *
         *
         *
         */
        setForeColor(color: any): void;
        /**
         *
         * 禁用单元格。单元格禁用后，不可以被点击，可使用enable方法重新将其启用。
         *
         *
         *
         */
        disable(): void;
        /**
         *
         * 启用单元格。单元格禁用后，不可以被点击，可使用disable方法重新将其禁用。
         *
         *
         *
         */
        enable(): void;
        /**
         *
         * 设置单元格的只读状态。
         *
         *
         * @param isReadOnly
         * 如果值为true，设置为只读状态，否则取消只读状态。
         *
         *
         *
         */
        setReadOnly(isReadOnly: boolean);
        /**
         *
         * 获取指定单元格是否具有焦点。可用于检测页面中的任一单元格是否获取焦点。返回值为true或false，true：单元格获取焦点；false：单元格未获取焦点。
         *
         *
         *
         */
        hasFocus(): boolean;
        /**
         *
         * 设置焦点到指定单元格。一般情况下，当通过鼠标点击选中元素或通过 tab 键定位到单元格时，该单元格就会获得焦点。使用setFocus方法可直接让指定的单元格获得焦点。
         *
         *
         *
         */
        setFocus(): void;
        /**
         *
         * 为被选单元格添加一个或多个事件处理程序，并规定事件发生时运行的函数。
         *
         *
         * @param type
         * 表示事件类型的字符串。单元格支持的事件请参考 `CellEvents` 类 。
         *
         *
         * @param data
         * 可选参数，如果不忽略表示给事件处理函数传递的自定义参数。
         *
         *
         * @param fn
         * 事件处理函数。
         *
         *
         *
         */
        bind(type: string, data?: any, fn?: Function): void;
        /**
         *
         * 移除被选元素的事件处理程序。该方法能够移除被选的事件处理程序，或者当事件发生时终止指定函数的运行。
         *
         *
         * @param type
         * 表示事件类型的字符串。单元格支持的事件请参考`CellEvents`类 。
         *
         *
         * @param fn
         * 事件处理函数。如果忽略，则取消绑定单元格上该事件类型的所有处理函数。
         *
         *
         *
         */
        unbind(type: any, fn?: Function): void;
        /**
         *
         * 移除页面上所有事件的绑定。该方法能够移除页面上所有的事件处理程序，或者当事件发生时终止指定函数的运行。
         *
         *
         *
         */
        unbindAll(): void;
    }

    /**
     *
     * 容器单元格的基类。
     *
     *
     */
    class ContainerCellBase extends Cell {
    }

    /**
     *
     * 页面容器单元格。
     *
     *
     */
    class ContentContainerCell extends ContainerCellBase {
        /**
         *
         * 获取页面容器的子页面对象。只有当单元格类型为页面容器时才有该方法。
         *
         *
         *
         */
        getContentPage(): SubPage;
    }

    /**
     *
     * 选项卡容器单元格。
     *
     *
     */
    class TabControlCell extends ContainerCellBase {
        /**
         *
         * 获取选项卡容器中的子页面对象。只有当单元格类型为选项卡时才有该方法。
         *
         *
         * @param tabIndex
         * 页面索引。从`0`开始。
         *
         *
         *
         */
        getTabPage(tabIndex: number): SubPage;
        /**
         *
         * 选项卡的编号。选项卡编号从0开始。
         *
         *
         *
         */
        showTab(tabIndex: number): void;
        /**
         *
         * 获取当前选项卡的编号，编号从0开始。只有当单元格类型为选项卡时才有该方法。
         *
         *
         *
         */
        getActiveTabIndex(): number;
        /**
         *
         * 获取选项卡的数量。只有当单元格类型为选项卡时才有该方法。
         *
         *
         *
         */
        getTabCount(): number;
    }

    /**
     *
     * 子页面对象。当页面包含页面容器和选项卡单元格类型时，则可能存在子页面。
     *
     *
     * ```javascript
     * Forguncy.Page.ready(function () {
     *     alert("Parent page loaded"); // 
     * });
     * ```
     *
     *
     *
     *
     * ```javascript
     * alert("Parent page loaded");
     * ```
     */
    class SubPage {
        /**
         *
         * 通过单元格名称获取单元格实例。
         *
         *
         * @param name
         * 单元格名称。
         *
         *
         *
         */
        getCell(name: string): Cell;
        /**
         *
         * 通过单元格名称获取一组单元格实例。
         *
         *
         * @param name
         * 单元格名称。
         *
         *
         *
         */
        getCellArray(name: string): Cell[];
        /**
         *
         * 获取子页面的所有页面容器单元格。
         *
         *
         *
         */
        getContainerCells(): ContainerCellBase[];
        /**
         *
         * 通过表格名称获取表格实例。
         *
         *
         * @param name
         * 表格名称。
         *
         *
         *
         */
        getListView(name: string): ListView;
        /**
         *
         * 获取子页面内所有的表格。
         *
         *
         *
         */
        getListViews(): ListView[];
        /**
         *
         * 获取子页面的名称。
         *
         *
         *
         */
        getPageName(): string;
        /**
         *
         * 获取子页面的母版页名称。
         *
         *
         *
         */
        getMasterPageName(): string;
    }

    /**
     *
     * 表格的事件。
     *
     *
     */
    class ListViewEvents {
        /**
         *
         * 当表格重新加载数据时触发该事件。
         *
         *
         *
         */
        static Reloaded: string;
        /**
         *
         * 当表格当前行改变时触发。
         *
         *
         *
         */
        static SelectionChanged: string;
        /**
         *
         * 当表格的选择行改变时触发。
         *
         *
         *
         */
        static SelectedRowsChanged: string;
        /**
         *
         * 当表格的值变化时触发。
         *
         *
         * ```javascript
         * Forguncy.Page.getListView("表格1").bind("ValueChanged", function (e, param) {
         *     if (window.myTimeout) {
         *         clearTimeout(window.myTimeout);
         *     }
         *     window.myTimeout = setTimeout(function () {
         *         // 
         *     }, 10);
         * });
         * ```
         *
         */
        static ValueChanged: string;

        /**
         *
         * 当表格的分页信息变化时触发。
         *
         *
         */
        static PageingInfoChanged: string;
    }

    /**
     *
     * 为表格值发生变化事件提供数据。
     *
     *
     *
     */
    interface ListViewValueChangedEventArg {
        /**
         *
         * 值变化的单元格区域。
         *
         *
         */
        CellRanges: CellRange[];
        /**
         *
         * 表格值变化前的行数。
         *
         *
         */
        OldRowCount: number;
        /**
         *
         * 表格值变化后的行数。
         *
         *
         */
        NewRowCount: number;
    }

    interface PageingInfoChangedEventArg {
        /**
         * The max row count of one page.
         */
        MaxRowCountOfOnePage: number;
        /**
         * The page count.
         */
        TotalRowCount: number;
        /**
         * Current page's index, start with 0.
         */
        CurrentPageIndex: number;
    }

    /**
     *
     * 表格。
     *
     *
     */
    class ListView {
        /**
         *
         * 获取表格的名称。
         *
         *
         *
         */
        getName(): string;

        /**
         *
         * 获取表格所在的运行时页面标识字符串。
         *
         *
         */
        getRunTimePageName(): string;
        /**
         *
         * 获取表格所绑定的数据表或视图的名称。
         *
         *
         *
         */
        getDataTableName(): string;
        /**
         *
         * 获取表格的行数。
         *
         *
         *
         */
        getRowCount(): number;
        /**
         *
         * 获取当前行的行索引。行索引从0开始。
         *
         *
         *
         */
        getSelectedRowIndex(): number;
        /**
         *
         * 获取选择行的行索引。如果选择多个行，则返回一个数组，包含所有选择行的行索引。行索引从0开始。
         *
         *
         *
         */
        getSelectedRowIndexs(): number[];
        /**
         *
         * 获取表格选择行的数据。包括选择行的行索引、查询条件和数据。
         *
         *
         *
         */
        getSelectedRowsData(): RowData[];
        /**
         *
         * 根据查询条件清除表格的选择行。
         *
         *
         * @param query
         * 所选行的查询条件，以主键名作为主键，以对应数据作为值。
         *
         *
         *
         */
        clearSelectedRowByQuery(query: {
            [name: string]: any;
        }): void;
        /**
         *
         * 获取指定行的查询信息（主键）。
         *
         *
         * @param rowIndex
         * 指定行的行索引。
         *
         *
         *
         */
        getQuery(rowIndex: number): {
            [key: string]: any;
        };
        /**
         *
         * 获取表格中所有列的信息。包括行头列，选择列，隐藏列等等。
         *
         *
         *
         */
        getMergedColumnInfos(): IMergedColumnInfo[];
        /**
         *
         * 获取表格在设计器中位置信息，包括起始行索引、起始列索引、表格行数和列数。
         *
         *
         *
         */
        getDesignerRangeInfo(): CellRange;
        /**
         *
         * 获取表格的指定单元格文本。
         *
         *
         * @param rowIndex
         * 表格的行索引，从0开始。
         *
         *
         * @param column
         * 表格的列名，或该列索引的数字，列索引从0开始。
         *
         *
         *
         */
        getText(rowIndex: number, column: string | number): any;
        /**
         *
         * 获取表格中指定位置上单元格的值。
         *
         *
         * @param rowIndex
         * 表格的行索引。
         *
         *
         * @param column
         * 表格的列名或列索引。
         *
         *
         *
         */
        getValue(rowIndex: number, column: string | number): any;
        /**
         *
         * 给表格中指定位置的单元格设置值，值可以是任意值，没有限制。
         *
         *
         * @param rowIndex
         * 表格的行索引，从0开始。
         *
         *
         * @param column
         * 表格的列名，或该列索引的数字，列索引从0开始。
         *
         *
         * @param value
         * 设定的值。
         *
         *
         *
         */
        setValue(rowIndex: number, column: string | number, value: any): void;
        /**
         *
         * 设置表格中指定位置上单元格的文本。
         *
         *
         * @param rowIndex
         * 表格的行索引。
         *
         *
         * @param column
         * 表格的列名或列索引
         *
         *
         * @param text
         * 文本。
         *
         *
         *
         */
        setText(rowIndex: number, column: string | number, text: any): void;
        /**
         *
         * 给表格中添加一个新行，包括新行的数据。
         *
         *
         * @param rowValues
         * 新行的数据。
         *
         *
         * @param isText
         * 可选参数。指定`rowValues`里的数据是否要当作文本进行解析。默认值为`false`。
         *
         *
         *
         */
        addNewRow(rowValues: {
            [columnName: string]: any;
        } | any[], isText?: boolean): void;
        /**
         *
         * 删除表格中的一行。
         *
         *
         * @param rowIndex
         * 行索引，从0开始。
         *
         *
         *
         */
        deleteRow(rowIndex: number): void;
        /**
         *
         * 将表格中指定的行设置为当前行。
         *
         *
         * @param rowIndex
         * 行索引，从0开始。
         *
         *
         *
         */
        selectRow(rowIndex: number): void;
        /**
         *
         * 在表格中选中一个指定的行。如果表格可以多选，则选中一个行后，可使用此方法再选中一个指定的行；如果表格仅允许单选，则选中一行后，再使用此方法会选中指定的行，之前的行会取消选中。
         *
         *
         * @param rowIndex
         * 行索引，从0开始。
         *
         *
         *
         */
        addSelectedRow(rowIndex: number): void;
        /**
         *
         * 将表格中指定的选择行的选中状态取消掉。
         *
         *
         * @param rowIndex
         * 行索引。
         *
         *
         *
         */
        clearSelectedRow(rowIndex: number): void;
        /**
         *
         * 选择表格中所有的行。
         *
         *
         *
         */
        selectAllRows(): void;
        /**
         *
         * 将表格中所有选择行的选中状态取消掉。
         *
         *
         *
         */
        clearAllSelectedRows(): void;
        /**
         *
         * 获取指定的行是否被选中。
         *
         *
         * @param rowIndex
         * 行索引。
         *
         *
         *
         */
        isSelectedRow(rowIndex: number): boolean;
        /**
         *
         * 重新从数据库加载数据。
         * 在表格设置中可以设置“定时刷新数据”，如果不勾选此项，可使用reload方法，重新从数据库加载数据。
         *
         *
         *
         */
        reload(): void;
        /**
         *
         * 清除ListView中的所有列筛选项。主要用于ReloadListViewCommand中，作为一个可选参数提供
         *
         *
         *
         */
        clearAllColumnFilters(): void;
        /**
         *
         * 为被选的表格添加一个或多个事件处理程序，并规定事件发生时运行的函数。
         *
         *
         * @param type
         * 表示事件类型的字符串。表格支持的事件请参考`ListViewEvents`类 。
         *
         *
         * @param data
         * 可选参数，如果不忽略表示给事件处理函数传递的自定义参数。
         *
         *
         * @param fn
         * 事件处理函数。
         *
         *
         *
         */
        bind(type: string, data?: any, fn?: any): void;
        /**
         *
         * 移除被选表格的事件处理程序。该方法能够移除被选的事件处理程序，或者当事件发生时终止指定函数的运行。
         *
         *
         * @param type
         * 表示事件类型的字符串。表格支持的事件请参考`ListViewEvents`类 。
         *
         *
         * @param fn
         * 事件处理函数。如果忽略，则取消绑定表格上该事件类型的所有处理函数。
         *
         *
         *
         */
        unbind(type: any, fn?: any): void;
        /**
         *
         * 获取表格页码信息。如果表格没有分页，返回值将为null。
         *
         *
         *
         */
        getPaginationInfo(): ListviewPaginationInfo;

        /**
         *
         * 使用此方法分页显示表格的数据，您可以设置每页显示的行数，并进入指定的页码。
         *
         *
         * @param pageRowCount
         * 一页的最多行数。
         *
         *
         * @param pageIndex
         * 显示的页面的索引。如果忽略则进入第一页。
         *
         *
         *
         */
        usePaginationDisplay(pageRowCount: number, pageIndex?: number): void;
        /**
         *
         * 如果表格使用分页导航按钮将表格数据分页显示，使用此方法可使表格跳转到第一页，显示第一页的数据。
         *
         *
         *
         */
        goToFirstPage(): void;
        /**
         *
         * 如果表格使用分页导航按钮将表格数据分页显示，使用此方法可使表格跳转到当前页的前一页，显示前一页的数据。
         *
         *
         *
         */
        goToPreviousPage(): void;
        /**
         *
         * 如果表格使用分页导航按钮将表格数据分页显示，使用此方法可使表格跳转到当前页的下一页，显示下一页的数据。
         *
         *
         *
         */
        goToNextPage(): void;
        /**
         *
         * 如果表格使用分页导航按钮将表格数据分页显示，使用此方法可使表格跳转到最后一页，显示最后一页的数据
         *
         *
         *
         */
        goToLastPage(): void;
        /**
         *
         * 如果表格使用分页导航按钮将表格数据分页显示，使用此方法可使表格跳转到指定的页，显示指定页的数据。
         *
         *
         * @param pageIndex
         * 指定的页面索引。
         *
         *
         *
         */
        goToSpecifiedPage(pageIndex: number): void;
        /**
         *
         * 显示表格的加载图标，并禁用表格，直到调用hiddenLoadingIndicator，表格才能重新启用。通常用于进行大量操作表格之前，以避免意外操作。
         *
         *
         *
         */
        showLoadingIndicator(): void;
        /**
         *
         * 隐藏表格的加载图标，并恢复表格的正常的使用。通常与`showLoadingIndicator`方法配套使用。
         *
         *
         *
         */
        hiddenLoadingIndicator(): void;

        /**
         *
         * 隐藏表格的列。
         *
         *
         * @param columns
         * 列表视图中的列名数组或列索引数组。
         *
         *
         *
         */
        hideColumns(columns: (string | number)[]): void;

        /**
         *
         * 显现表格中通过API和列选项命令隐藏的列。
         *
         *
         * @param columns
         * 列表视图中的列名数组或列索引数组。
         *
         *
         *
         */
        showColumns(columns: (string | number)[]): void;
    }

    /**
     *
     * 表示表格中行数据的信息。用于getSelectedRowsData方法。
     *
     *
     */
    interface RowData {
        /**
         *
         * 表格中所选行的行索引。如果该行有`Query`信息，则`RowIndex`为`-1`。只有当该行没有`Query`信息时（比如新加行），`RowIndex`才是有效值。
         *
         *
         */
        RowIndex: number;
        /**
         *
         * 所选行的查询条件。所选行的查询条件，以主键名作为键，以对应数据作为值。比如：`{ID:1}`
         *
         *
         */
        Query: {
            [name: string]: any;
        };
        /**
         *
         * 所选行的数据。
         *
         *
         */
        Values: any[];
    }

    /**
     *
     * 表示表格的分页信息。用于getPaginationInfo方法。
     *
     *
     */
    interface ListviewPaginationInfo {
        /**
         *
         * 单页显示的最大行数。
         *
         *
         */
        MaxRowCountOfOnePage: number;
        /**
         *
         * 页面数量。
         *
         *
         */
        PageCount: number;
        /**
         *
         * 当前页的索引。
         *
         *
         */
        PageIndex: number;
        /**
         *
         * 总行数。
         *
         *
         */
        TotalRowCount: number;
    }

    /**
     *
     * 表格列的属性。用于 getMergedColumnInfos方法 。
     *
     *
     */
    interface IMergedColumnInfo {
        /**
         *
         * 该列在设计器中的第一个列索引。
         *
         *
         */
        DesignerColumnIndex: number;
        /**
         *
         * 该列在设计器中的合并列数量。
         *
         *
         */
        DesignerColumnCount: number;
        /**
         *
         * 表格中列的名称。
         *
         *
         */
        ColumnName: string;
        /**
         *
         * 表格中列的信息。
         *
         *
         */
        ColumnType: ListviewColumnType;
    }

    /**
     *
     * 表示表格的列类型。
     *
     *
     */
    enum ListviewColumnType {
        /**
         *
         * 行头列。
         *
         *
         */
        RowHeader,
        /**
         *
         * 选择列。
         *
         *
         * */
        SelectedColumn,
        /**
         *
         * 数据列。
         *
         *
         * */
        DataColumn,
    }

    /**
     *
     * 提供一系列特殊的`URL`路径。
     *
     *
     */
    class SpecialPath {
        /**
         *
         * 获取应用程序网站的根URL。如果应用没有发布，则获取的根URL为“/”。
         *
         *
         *
         */
        getBaseUrl(): string;
        /**
         *
         * 获取使用图片单元格类型选择图片时，内建图片所在文件夹的路径。
         *
         *
         *
         */
        getBuiltInImageFolderPath(): string;
        /**
         *
         * 获取使用图片单元格类型选择图片时，上传的图片所在文件夹的路径。
         *
         *
         *
         */
        getImageEditorUploadImageFolderPath(): string;
        /**
         *
         * 获取在设计器中上传的文件的文件夹路径。
         *
         *
         *
         */
        getUploadFileFolderPathInDesigner(): string;
        /**
         *
         * 获取使用图片上传单元格类型上传的图片所在文件夹的路径。
         *
         *
         *
         */
        getUploadImageFolderPathInServer(): string;
        /**
         *
         * 获取用户文件的存储路径。
         *
         *
         *
         */
        getUserFileFolderPath(): string;
        /**
         *
         * 获取指定插件的网络根路径。
         *
         *
         * @param pluginGuid
         * 插件的唯一标识符，通常由 PluginConfig.json 中的 guid 属性指定。
         *
         *
         */
        getPluginRootPath(pluginGuid: string): string;
    }

    /**
     *
     * 帮助类，提供一些帮助方法和属性。
     *
     *
     */
    class ForguncyHelper {
        /**
         *
         * 提交数据到服务器。
         *
         *
         * @param url
         * 包含请求发送的URL的字符串。
         *
         *
         * @param param
         * 发送请求的数据。
         *
         *
         * @param callback
         * 成功回调函数。
         *
         *
         * @param async
         * 指定请求是否是异步的。默认值为 true。
         *
         *
         *
         */
        post(url: string, param: any, callback: {
            (...p: any[]): any;
        }, async?: boolean): void;


        /**
         *
         * 请参考{@link Forguncy.SpecialPath}。
         *
         *
         */
        SpecialPath: SpecialPath;
        /**
         *
         * 把一个公式翻译成单元格位置信息。
         *
         *
         * @param formula
         * 公式，如："=A1"
         *
         *
         * @param formulaCalcContext
         * 用于计算公式的上下文
         *
         *
         * @returns
         * 单元格的位置信息，如果公式没有引用单元格，如"=SUM(1,2)"，该方法讲返回null。
         *
         *
         */
        getCellLocation(formula: string, formulaCalcContext: FormulaCalcContext): CellLocationInfo;
    }

    /**
     *
     * 发送邮件。
     *
     *
     * @param from
     * 发件人邮箱。
     *
     *
     * @param to
     * 指定收件人电子邮箱地址。如果是多名收件人，请使用逗号分隔。
     *
     *
     * @param title
     * 电子邮件标题。
     *
     *
     * @param content
     * 指定电子邮件的正文内容。除了使用纯文本的电子邮件正文，还可以使用HTML标记的字符串。
     *
     *
     * @param successCallBack
     * 指定一个回调函数，此回调函数会在电子邮件成功发送后被调用。该参数为可选参数。
     *
     *
     * @param failCallBack
     * 指定一个回调函数，此回调函数会在电子邮件发送失败后被调用，并且通过errorMessage参数通知错误信息。该参数为可选参数。
     *
     *
     *
     */
    function SendMail(from: string, to: string, title: string, content: string, successCallBack: Function, failCallBack: Function): any;

    /**
     *
     * 给指定电子邮箱发送指定标题和内容的电子邮件，发件人是当前登录网站的用户。使用该API发送电子邮件需要正确配置SMTP服务。
     *
     *
     * @param to
     * 指定收件人电子邮箱地址。如果是多名收件人，请使用逗号分隔。
     *
     *
     * @param title
     * 电子邮件标题。
     *
     *
     * @param content
     * 指定电子邮件的正文内容。除了使用纯文本的电子邮件正文，还可以使用HTML标记的字符串。
     *
     *
     * @param successCallBack
     * 指定一个回调函数，此回调函数会在电子邮件成功发送后被调用。该参数为可选参数。
     *
     *
     * @param failCallBack
     * 指定一个回调函数，此回调函数会在电子邮件发送失败后被调用，并且通过errorMessage参数通知错误信息。该参数为可选参数。
     *
     *
     *
     */
    function SendMail(to: string, title: string, content: string, successCallBack: Function, failCallBack: Function): any;

    /**
     *
     * 发送电子邮件。使用该API发送电子邮件需要正确配置SMTP服务。
     *
     *
     * @param message
     * 电子邮件内容。
     *
     *
     * @param successCallBack
     * 指定一个回调函数，此回调函数会在电子邮件成功发送后被调用。该参数为可选参数。
     *
     *
     * @param failCallBack
     * 指定一个回调函数，此回调函数会在电子邮件发送失败后被调用，并且通过errorMessage参数通知错误信息。该参数为可选参数。
     *
     *
     *
     */
    function SendMail(message: FgcMailMessage, successCallBack: Function, failCallBack: Function): any;

    /**
     *
     * 使用此方法从OADATE转换成DateTime。
     *
     *
     * @param oadate
     * `OADate`数值。
     *
     *
     *
     */
    function ConvertOADateToDate(oadate: number): Date;

    /**
     *
     * 使用此方法将DateTime转换成OADate。
     *
     *
     * @param date
     * 日期值。
     *
     *
     *
     */
    function ConvertDateToOADate(date: Date): number;

    /**
     *
     * 发送邮件信息。用于sendMail方法。
     *
     *
     */
    interface FgcMailMessage {
        /**
         *
         * 发件人邮箱。
         *
         *
         */
        From?: string;
        /**
         *
         * 指定收件人电子邮箱地址。如果是多名收件人，请使用逗号分隔。
         *
         *
         */
        To: string;
        /**
         *
         * 指定抄送收件人电子邮箱地址。如果是多名收件人，请使用逗号分隔。
         *
         *
         */
        CC?: string;
        /**
         *
         * 指定密送收件人电子邮箱地址。如果是多名收件人，请使用逗号分隔。
         *
         *
         */
        BCC?: string;
        /**
         *
         * 指定邮件附件，值必须来自附件或图片上传单元格的值。多值用“|”分隔
         *
         *
         */
        Attachments?: string;
        /**
         *
         * 电子邮件标题。
         *
         *
         */
        Title: string;
        /**
         *
         * 指定电子邮件的正文内容。除了使用纯文本的电子邮件正文，还可以使用HTML标记的字符串。
         *
         *
         */
        Content: string;
        /**
         *
         * 电子邮件重要度。
         *
         *
         */
        Priority?: string;
        /**
         *
         * 是否以纯文本格式发送邮件。
         *
         *
         */
        SendAsPlainText?: boolean;
    }

    /**
     *
     * 单元格的位置信息。用于getCellByLocation方法。
     *
     *
     */
    interface CellLocationInfo {
        /**
         *
         * 设计器中的单元格行索引。从0开始。
         *
         *
         */
        Row: number;
        /**
         *
         * 设计器中的单元格列索引。从0开始。
         *
         *
         */
        Column: number;
        /**
         *
         * 设计器中单元格所在的页面名称。
         *
         *
         */
        PageName: string;
        /**
         *
         * 页面唯一标识符。
         *
         *
         * */
        PageID: string;
    }

    /**
     *
     * 用户的相关信息。用于getUserInfo方法。
     *
     *
     */
    interface UserInfo {
        /**
         *
         * 用户名。
         *
         *
         */
        UserName?: string;
        /**
         *
         * 用户全名。
         *
         *
         */
        FullName?: string;
        /**
         *
         * 是否有头像。
         *
         *
         */
        HasPicture?: boolean;
        /**
         *
         * 用户邮箱。
         *
         *
         */
        Email?: string;
        /**
         *
         * 用户角色名。如果用户有多个角色，则角色之间使用`,`分隔，如`Administrator,经理`。
         *
         *
         */
        Role?: string;
        /**
         *
         * 用户的组织上级。如果用户有多个组织上级，则组织上级之间使用`|`分隔，如`Administrator|经理`。
         *
         *
         */
        OrganizationSuperior?: string;
        /**
         *
         * 用户的自定义属性。
         *
         *
         */
        Properties?: UserExtendProperties[];
        /**
         *
         * 用户的组织级别信息。
         *
         *
         */
        OrganizationLevelValues?: OrganizationLevelValueInfo[];
    }

    /**
     *
     * 用户的组织级别信息。用于getUserInfo方法。
     *
     *
     */
    interface OrganizationLevelValueInfo {
        /**
         *
         * 组织级别名称。
         *
         *
         */
        OrganizationLevelName: string;
        /**
         *
         * 组织级别中组织节点的名称。
         *
         *
         */
        Value: string;
    }

    /**
     *
     * 用户的自定义属性。用于getUserInfo方法。
     *
     *
     */
    interface UserExtendProperties {
        /**
         *
         * 自定义属性名。
         *
         *
         */
        PropertyName: string;
        /**
         *
         * 属性的值。
         *
         *
         */
        Value: string;
    }

    /**
     *
     * 单元格范围的位置信息。用于getDesignerRangeInfo方法。
     *
     *
     */
    interface CellRange {
        /**
         *
         * 在这个单元格范围中的起始行索引。
         *
         *
         */
        Row: number;
        /**
         *
         * 在这个单元格范围中的起始列索引。
         *
         *
         */
        Column: number;
        /**
         *
         * 在这个单元格范围中的行数。
         *
         *
         */
        RowCount: number;
        /**
         *
         * 在这个单元格范围中的列数。
         *
         *
         */
        ColumnCount: number;
    }


    /**
     *
     * 登录到指定用户名和密码关联的账户。
     *
     *
     * @param username
     * 用户名
     *
     *
     * @param password
     * 密码
     *
     *
     * @param rememberMe
     * 是否让浏览器记住当前用户。默认值为 false。
     *
     *
     * @param successCallback
     * 成功回调函数。如果值为空，默认会立即刷新浏览器。
     *
     *
     * @param errorCallback
     * 失败回调函数。
     *
     *
     */
    function logIn(username: string, password: string, rememberMe?: boolean, successCallback?: Function, errorCallback?: Function);

    /**
     *
     * 登出当前用户。
     *
     *
     * @param navigateToHomePage
     * 登出后，是否回到首页。值为空或 false 时，会立即刷新浏览器。
     *
     *
     */
    function logOut(navigateToHomePage?: boolean);

    /**
     *
     * 使用此方法添加用户，包括普通认证模式下添加用户和域认证模式下添加用户。
     *
     *
     * @param userName
     * 用户名。
     *
     *
     * @param password
     * 密码。
     *
     *
     * @param displayName
     * 全名。
     *
     *
     * @param email
     * 邮箱。
     *
     *
     * @param successCallback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function addUser(userName: string, password: string | Function, displayName: string | Function, email: string | Function, successCallback: Function, errorCallback: Function): void;

    /**
     *
     * 使用此方法将指定的用户删除。
     *
     *
     * @param userName
     * 用户名。
     *
     *
     * @param successCallback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function deleteUser(userName: string, successCallback: Function, errorCallback: Function): void;

    /**
     *
     * 使用此方法将指定的用户添加到指定的组，即给用户指定角色。
     *
     *
     * @param userName
     * 用户名。
     *
     *
     * @param roleName
     * 角色名。
     *
     *
     * @param successCallback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function addUserToRole(userName: string, roleName: string, successCallback: Function, errorCallback: Function): void;

    /**
     *
     * 使用此方法将指定的用户从指定的组中删除。
     *
     *
     * @param userName
     * 用户名。
     *
     *
     * @param roleName
     * 角色名。
     *
     *
     * @param successCallback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function deleteUserFromRole(userName: string, roleName: string, successCallback: Function, errorCallback: Function): void;

    /**
     *
     * 获取数据表或视图数据时的参数。用于 getTableDataByCondition方法 。
     *
     *
     */
    interface GetTableDataByConditionParams {
        /**
         *
         * 表或者视图的名称。
         *
         *
         */
        TableName: string;
        /**
         *
         * 获取的列的名称集合。
         *
         *
         */
        Columns: string[];
        /**
         *
         * 查询信息。
         *
         *
         */
        QueryCondition: object;
        /**
         *
         * 查询时的策略。
         *
         *
         */
        QueryPolicy: TableDataQueryPolicy;
        /**
         *
         * 排序信息。
         *
         *
         */
        SortCondition: object;
    }

    /**
     *
     * 获取数据表或视图数据时的策略。用于getTableDataByCondition方法。
     *
     *
     */
    interface TableDataQueryPolicy {
        /**
         *
         * 是否有不同的结果。
         *
         *
         */
        Distinct: boolean;
        /**
         *
         * 查询值为`null`时的策略。
         *
         *
         */
        QueryNullPolicy: QueryNullPolicy;
        /**
         *
         * 是否忽略缓存，默认情况下，站点将根据post参数缓存结果。
         *
         *
         */
        IgnoreCache: boolean;
    }

    /**
     *
     * 表示数据表或视图数据时遇到`null`值的策略枚举。
     *
     *
     */
    enum QueryNullPolicy {
        /**
         *
         * 查询`null`时返回所有值。
         *
         *
         */
        QueryAllItemsWhenValueIsNull = 0,
        /**
         *
         * 查询`null`时返回空的值。
         *
         *
         */
        QueryZeroItemsWhenValueIsNull = 1,
    }

    /**
     *
     * 公式计算的上下文信息。用于getTableDataByCondition方法。
     *
     *
     */
    interface FormulaCalcContext {
        /**
         *
         * 是否在母版页中。
         *
         *
         */
        IsInMasterPage: boolean;
        /**
         *
         * 所位于页面的唯一编号。运行时，页面可能因为页面容器单元格类型而包含多个子页面，且子页面可能相同，所以不能用页面名称唯一标识页面。
         *
         *
         */
        PageID: string;
    }
    /**
     *
     * 表示表格中发生变动的行数据。用于modifyTablesData方法。
     *
     *
     */
    interface ModifyData {
        /**
         *
         * 添加的行。
         *
         *
         */
        addRows: {
            [columnName: string]: Object
        }[];
        /**
         *
         * 编辑的行。
         *
         *
         */
        editRows: {
            primaryKey: { [primaryColumnName: string]: Object },
            values: { [columnName: string]: Object }
        }[];
        /**
         *
         * 删除的行。
         *
         *
         */
        deleteRows: {
            primaryKey: { [primaryColumnName: string]: Object }
        }[];
    }

    /**
     *
     * 通过数据库的主键获取一条记录。
     *
     *
     * @param tableName
     * 数据表的名字。
     *
     *
     * @param primaryKey
     * 指定字段名称和值，指定的值必须只能找到一行。
     *
     *
     * @param callback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，回调函数中包含了错误信息。
     *
     *
     *
     */
    function getTableData(tableName: string, primaryKey: { [primaryColumnName: string]: Object; }, callback: Function, errorCallback: Function): void;

    /**
     *
     * 通过`OData`查询字符串获取数据。
     *
     *
     * @param odataParam
     * `OData`查询字符串。
     *
     *
     * @param callback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，回调函数中包含了错误信息。
     *
     *
     * @param async
     * 指定请求是否异步。默认值为 true。
     *
     *
     *
     */
    function getTableDataByOData(odataParam: string, callback: Function, errorCallback: Function, async?: boolean): void;

    /**
     *
     * 通过条件获取数据表或视图的数据。
     *
     *
     * @param condition
     * 关于如何获取数据的参数。
     *
     *
     * @param formulaCalcContext
     * 公式计算的上下文信息，当获取参数的查询条件包含公式时，使用公式计算的结果。
     *
     *
     * @param callBack
     * 成功回调函数。
     *
     *
     * @param async
     * 请求是否异步。默认值为 true。
     *
     *
     *
     */
    function getTableDataByCondition(condition: GetTableDataByConditionParams, formulaCalcContext: FormulaCalcContext, callBack: Function, async?: boolean): void;

    /**
     *
     * 通过`primaryKey`参数指定唯一一行记录进行删除。
     *
     *
     * @param tableName
     * 要删除记录的表的表名。
     *
     *
     * @param primaryKey
     * 指定字段名称和值，指定的值必须只能找到一行。
     *
     *
     * @param callback
     * 成功回调函数。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function deleteTableData(tableName: string, primaryKey: { [primaryColumnName: string]: Object }, callback: Function, errorCallback: Function): void;

    /**
     *
     * 指定要添加记录表的表名，以及要添加的数据。
     *
     *
     * @param tableName
     * 要添加记录的表的表名。
     *
     *
     * @param newValue
     * 添加行的列名和值，不必包含表的所有列。
     *
     *
     * @param callback
     * 成功回调函数，参数中包含已插入行的值。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function addTableData(tableName: string, newValue: { [columnName: string]: Object }, callback: Function, errorCallback: Function): void;

    /**
     *
     * 通过`primaryKey`参数指定唯一一行记录进行更新。
     *
     *
     * @param tableName
     * 要修改记录的表的表名。
     *
     *
     * @param primaryKey
     * 指定要修改记录的字段名称和值，指定的值必须只能找到一行。
     *
     *
     * @param updateValue
     * 表示更新值的对象，对象的属性表示列名，属性值表示要更新的值。并不需要包含数据表中的所有列。
     *
     *
     * @param callback
     * 成功回调函数，参数中包含已修改行的值。
     *
     *
     * @param errorCallback
     * 失败回调函数，参数中包含错误信息。
     *
     *
     *
     */
    function updateTableData(tableName: string, primaryKey: { [primaryColumnName: string]: Object }, updateValue: { [columnName: string]: Object }, callback: Function, errorCallback: Function): void;

    /**
     *
     * 批量添加、修改、删除数据表的数据。
     *
     *
     * @param modifyData
     * 指定一个对象，其中包含对哪些表，添加/修改/删除哪些行的哪些列的数据。
     *
     *
     * @param callback
     * 成功回调函数，此回调函数会在电子邮件成功发送后被调用。该参数为可选参数。
     *
     *
     * @param errorCallback
     * 失败回调函数，此回调函数会在电子邮件发送失败后被调用，并且通过参数通知错误信息。该参数为可选参数。
     *
     *
     *
     */
    function modifyTablesData(modifyData: { [tableName: string]: ModifyData }, callback: Function, errorCallback: Function): void;


    /**
     *
     * 强制同步外连表的数据到副本表中。
     *
     *
     * @param tableName
     * 副本表。
     *
     *
     * @param callback
     * 同步数据后的回调函数。
     *
     *
     *
     */
    function forceSyncTableData(tableName: string, callback: Function): void;

    /**
     *
     * 转换指定的颜色文本为 CSS 颜色文本，也就是颜色的十六进制值。
     *
     *
     * @param color
     * 颜色文本。
     *
     *
     *
     */
    export function ConvertToCssColor(color: string): string;

    /**
     *
     * 数据透视表单元格类型。
     *
     *
     */
    class PivotTableCellType {
        /**
         *
         * 自定义数据透视表单元格类型的值汇总方式。
         *
         *
         * @param cellName
         * 数据透视表单元格的名称。
         *
         *
         * @param customFunction
         * 汇总所选字段数据的处理函数。该函数接受两个参数："records"是一组待汇总数据，"filedName"是汇总数据字段名称。返回值是汇总结果。
         *
         *
         *
         */
        static setCustomFunction(cellName: string, customFunction: (records: any[], filedName: string) => any): void;
    }

    /**
     *
     * 为数据透视表点击事件提供数据。
     *
     *
     */
    class PivotTableEventParameter {
        constructor(dataType: string, row: number, col: number, value: any, colHeaders: Array<PivotTableHeaderInfo>, rowHeaders: Array<PivotTableHeaderInfo>);
        /**
         *
         * 如果单击的位置是常规数据区域，则为"Data"，对于列总计单元格，为"ColTotal"，对于行总计区域，则为"RowTotal"。
         *
         *
         */
        public dataType: string;
        /**
         *
         * 点击位置的行索引。
         *
         *
         */
        public row: number;
        /**
         *
         * 点击位置的列索引。
         *
         *
         */
        public col: number;
        /**
         *
         * 点击位置的值。
         *
         *
         */
        public value: any;
        /**
         *
         * 点击位置所在的列头信息。
         *
         *
         */
        public colHeaders: Array<PivotTableHeaderInfo>;
        /**
         *
         * 点击位置所在的行头信息。
         *
         *
         */
        public rowHeaders: Array<PivotTableHeaderInfo>;
    }

    /**
     *
     * 数据透视表的头部信息。
     *
     *
     */
    class PivotTableHeaderInfo {
        /**
         *
         * 标签名称。
         *
         *
         */
        public label: string;
        /**
         *
         * 头部标题。
         *
         *
         */
        public header: string;
    }
}
