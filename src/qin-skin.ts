import { QinArms } from "./qin-arms";

export const QinStyles = {
    ColorForeground: "#180027ff",
    ColorBackground: "#fffcf9ff",
    ColorInactive: "#fff7ffff",
    ColorActive: "#fff0f0ff",
    ColorAccent: "#ae0000ff",
    ColorInactiveAct: "#f0f7ffff",
    ColorActiveAct: "#ddddffff",
    ColorAccentAct: "#0000aeff",
    ColorBlocked: "#f0f0f0ff",
    ColorEntered: "#e7f0e7ff",
    ColorAttend: "#496b49ff",
    ColorSelected: "#5d72de8f",
    FontName: "SourceSansPro",
    FontSize: "16px",
};

export const QinStylesPicker = {
    ColorPickerForeground: "#180027ff",
    ColorPickerAccentAct: "#0000aeff",
    ColorUnPickedInactiveAct: "#f0f7ffff",
    ColorUnPickedActiveAct: "#ddddffff",
    ColorPickedInactiveAct: "#85c0ffff",
    ColorPickedActiveAct: "#8f8fffff",
};

function styleAsBody(el: HTMLElement) {
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.right = "0";
    el.style.bottom = "0";
    el.style.left = "0";
    el.style.minWidth = "stretch";
    el.style.minHeight = "stretch";
    el.style.padding = "7px";
    el.style.overflow = "auto";
}

function styleAsWhole(el: HTMLElement) {
    el.style.position = "relative";
    el.style.top = "0";
    el.style.right = "0";
    el.style.bottom = "0";
    el.style.left = "0";
    el.style.flex = "1 1 auto";
}

function styleAsBase(el: HTMLElement) {
    el.style.minHeight = "fit-content";
    el.style.minWidth = "fit-content";
}

function styleAsSpaced(el: HTMLElement) {
    el.style.margin = "2px";
    el.style.padding = "4px";
}

function styleAsEditable(el: HTMLElement) {
    styleAsSpaced(el);
    el.tabIndex = 0;
    el.style.color = QinStyles.ColorForeground;
    el.style.backgroundColor = QinStyles.ColorInactive;
    el.style.border = "1px solid " + QinStyles.ColorForeground;
    el.style.borderRadius = "3px";
    el.style.outline = "none";
    el.addEventListener("focus", _styledAsEditableFocusEvent);
    el.addEventListener("focusout", _styledAsEditableFocusoutEvent);
    el.removeEventListener("focus", _styledAsReadOnlyFocusEvent);
    el.removeEventListener("focusout", _styledAsReadOnlyFocusoutEvent);
    el.removeEventListener("focus", _styledAsActionableFocusEvent);
    el.removeEventListener("focusout", _styledAsActionableFocusoutEvent);
}

function styleAsReadOnly(el: HTMLElement) {
    styleAsSpaced(el);
    el.tabIndex = 0;
    el.style.backgroundColor = QinStyles.ColorBlocked;
    el.style.border = "1px solid " + QinSkin.styles.ColorForeground;
    el.style.borderRadius = "3px";
    el.style.outline = "none";
    el.removeEventListener("focus", _styledAsEditableFocusEvent);
    el.removeEventListener("focusout", _styledAsEditableFocusoutEvent);
    el.addEventListener("focus", _styledAsReadOnlyFocusEvent);
    el.addEventListener("focusout", _styledAsReadOnlyFocusoutEvent);
    el.removeEventListener("focus", _styledAsActionableFocusEvent);
    el.removeEventListener("focusout", _styledAsActionableFocusoutEvent);
}

function styleAsActionable(el: HTMLElement, styles: QinActionableStyles = QinStyles) {
    styleAsSpaced(el);
    el.tabIndex = 0;
    el['actionableStyles'] = styles;
    el.style.backgroundColor = styles.ColorInactiveAct;
    el.style.border = "1px solid " + styles.ColorForeground;
    el.style.borderRadius = "3px";
    el.style.outline = "none";
    el.removeEventListener("focus", _styledAsEditableFocusEvent);
    el.removeEventListener("focusout", _styledAsEditableFocusoutEvent);
    el.removeEventListener("focus", _styledAsReadOnlyFocusEvent);
    el.removeEventListener("focusout", _styledAsReadOnlyFocusoutEvent);
    el.addEventListener("focus", _styledAsActionableFocusEvent);
    el.addEventListener("focusout", _styledAsActionableFocusoutEvent);
}

export type QinActionableStyles = {
    ColorForeground: string;
    ColorInactiveAct: string;
    ColorActiveAct: string;
    ColorAccentAct: string;
};

function _styledAsEditableFocusEvent() {
    this.style.backgroundColor = QinStyles.ColorActive;
    this.style.border = "1px solid " + QinStyles.ColorAccent;
}

function _styledAsEditableFocusoutEvent() {
    this.style.backgroundColor = QinStyles.ColorInactive;
    this.style.border = "1px solid " + QinStyles.ColorForeground;
}

function _styledAsReadOnlyFocusEvent() {
    this.style.backgroundColor = QinSkin.styles.ColorEntered;
    this.style.border = "1px solid " + QinSkin.styles.ColorAttend;
}

function _styledAsReadOnlyFocusoutEvent() {
    this.style.backgroundColor = QinSkin.styles.ColorBlocked;
    this.style.border = "1px solid " + QinSkin.styles.ColorForeground;
}

function _styledAsActionableFocusEvent() {
    const styles = this['actionableStyles'] as QinActionableStyles;
    this.style.backgroundColor = styles.ColorActiveAct;
    this.style.border = "1px solid " + styles.ColorAccentAct;
}

function _styledAsActionableFocusoutEvent() {
    const styles = this['actionableStyles'] as QinActionableStyles;
    this.style.backgroundColor = styles.ColorInactiveAct;
    this.style.border = "1px solid " + styles.ColorForeground;
}

function styleMaxSizeForNotOverFlow(el: HTMLElement, parent?: HTMLElement) {
    if (!parent) {
        parent = el.parentElement;
    }
    if (parent) {
        let maxWidth = 0;
        let maxHeight = 0;
        let imediate = el;
        do {
            maxWidth = maxWidth + imediate.clientLeft;
            maxHeight = maxHeight + imediate.clientTop;
            imediate = imediate.parentElement;
        } while (imediate != null && imediate != parent);
        maxWidth = parent.clientWidth - maxWidth;
        maxHeight = parent.clientHeight - maxHeight;
        el.style.maxWidth = maxWidth + "px";
        el.style.maxHeight = maxHeight + "px";
    }
}

function styleAsScroll(el: HTMLElement) {
    el.style.overflow = "auto";
}

function styleAsMargin(el: HTMLElement, margin: number) {
    el.style.margin = getPixelsOrInitial(margin);
}

function styleAsMarginTop(el: HTMLElement, margin: number) {
    el.style.marginTop = getPixelsOrInitial(margin);
}

function styleAsMarginBottom(el: HTMLElement, margin: number) {
    el.style.marginBottom = getPixelsOrInitial(margin);
}

function styleAsMarginLeft(el: HTMLElement, margin: number) {
    el.style.marginLeft = getPixelsOrInitial(margin);
}

function styleAsMarginRight(el: HTMLElement, margin: number) {
    el.style.marginRight = getPixelsOrInitial(margin);
}

function styleAsPadding(el: HTMLElement, padding: number) {
    el.style.padding = getPixelsOrInitial(padding);
}

function styleAsPaddingTop(el: HTMLElement, padding: number) {
    el.style.paddingTop = getPixelsOrInitial(padding);
}

function styleAsPaddingBottom(el: HTMLElement, padding: number) {
    el.style.paddingBottom = getPixelsOrInitial(padding);
}

function styleAsPaddingLeft(el: HTMLElement, padding: number) {
    el.style.paddingLeft = getPixelsOrInitial(padding);
}

function styleAsPaddingRight(el: HTMLElement, padding: number) {
    el.style.paddingRight = getPixelsOrInitial(padding);
}

function styleAsBorder(el: HTMLElement, thick?: number, color: string = QinStyles.ColorForeground, style: BorderStyle = BorderStyle.SOLID) {
    if (thick) {
        el.style.border = thick + "px " + style + " " + color;
    } else {
        el.style.border = "none";
    }
}

function styleAsBorderTop(el: HTMLElement, thick?: number, color: string = QinStyles.ColorForeground, style: BorderStyle = BorderStyle.SOLID) {
    if (thick) {
        el.style.borderTop = thick + "px " + style + " " + color;
    } else {
        el.style.borderTop = "none";
    }
}

function styleAsBorderBottom(el: HTMLElement, thick?: number, color: string = QinStyles.ColorForeground, style: BorderStyle = BorderStyle.SOLID) {
    if (thick) {
        el.style.borderBottom = thick + "px " + style + " " + color;
    } else {
        el.style.borderBottom = "none";
    }
}

function styleAsBorderLeft(el: HTMLElement, thick?: number, color: string = QinStyles.ColorForeground, style: BorderStyle = BorderStyle.SOLID) {
    if (thick) {
        el.style.borderLeft = thick + "px " + style + " " + color;
    } else {
        el.style.borderLeft = "none";
    }
}

function styleAsBorderRight(el: HTMLElement, thick?: number, color: string = QinStyles.ColorForeground, style: BorderStyle = BorderStyle.SOLID) {
    if (thick) {
        el.style.borderRight = thick + "px " + style + " " + color;
    } else {
        el.style.borderRight = "none";
    }
}

function styleAsBorderRadius(el: HTMLElement, radius: number) {
    el.style.borderRadius = getPixelsOrInitial(radius);
}

function styleAsBorderTopLeftRadius(el: HTMLElement, radius: number) {
    el.style.borderTopLeftRadius = getPixelsOrInitial(radius);
}

function styleAsBorderTopRightRadius(el: HTMLElement, radius: number) {
    el.style.borderTopRightRadius = getPixelsOrInitial(radius);
}

function styleAsBorderBottomRightRadius(el: HTMLElement, radius: number) {
    el.style.borderBottomRightRadius = getPixelsOrInitial(radius);
}

function styleAsBorderBottomLeftRadius(el: HTMLElement, radius: number) {
    el.style.borderBottomLeftRadius = getPixelsOrInitial(radius);
}

function styleAsDisplayBlock(el: HTMLElement) {
    el.style.display = "block";
}

function styleAsDisplayInline(el: HTMLElement) {
    el.style.display = "inline";
}

function styleAsDisplayInlineBlock(el: HTMLElement) {
    el.style.display = "inline-block";
}

function styleAsDisplayFlex(el: HTMLElement) {
    el.style.display = "flex";
}

function styleAsDisplayInlineFlex(el: HTMLElement) {
    el.style.display = "inline-flex";
}

function styleAsDisplayGrid(el: HTMLElement) {
    el.style.display = "grid";
}

function styleAsDisplayInlineGrid(el: HTMLElement) {
    el.style.display = "inline-grid";
}

function styleAsDisplayFlowRoot(el: HTMLElement) {
    el.style.display = "flow-root";
}

function styleAsDisplayNone(el: HTMLElement) {
    el.style.display = "none";
}

function styleAsDisplayContents(el: HTMLElement) {
    el.style.display = "contents";
}

function styleAsDisplayTable(el: HTMLElement) {
    el.style.display = "table";
}

function styleAsDisplayTableRow(el: HTMLElement) {
    el.style.display = "table-row";
}

function styleAsDisplayListItem(el: HTMLElement) {
    el.style.display = "list-item";
}

function styleAsDisplayInherit(el: HTMLElement) {
    el.style.display = "inherit";
}

function styleAsDisplayInitial(el: HTMLElement) {
    el.style.display = "initial";
}

function styleAsDisplayRevert(el: HTMLElement) {
    el.style.display = "revert";
}

function styleAsDisplayRevertLayer(el: HTMLElement) {
    el.style.display = "revert-layer";
}

function styleAsDisplayUnset(el: HTMLElement) {
    el.style.display = "unset";
}

function styleAsPositionStatic(el: HTMLElement) {
    el.style.position = "static";
}

function styleAsPositionAbsolute(el: HTMLElement) {
    el.style.position = "absolute";
}

function styleAsPositionFixed(el: HTMLElement) {
    el.style.position = "fixed";
}

function styleAsPositionRelative(el: HTMLElement) {
    el.style.position = "relative";
}

function styleAsPositionSticky(el: HTMLElement) {
    el.style.position = "sticky";
}

function styleAsPositionInitial(el: HTMLElement) {
    el.style.position = "initial";
}

function styleAsFlexDirectionRow(el: HTMLElement) {
    el.style.flexDirection = "row";
}

function styleAsFlexDirectionRowReverse(el: HTMLElement) {
    el.style.flexDirection = "row-reverse";
}

function styleAsFlexDirectionColumn(el: HTMLElement) {
    el.style.flexDirection = "column";
}

function styleAsFlexDirectionColumnReverse(el: HTMLElement) {
    el.style.flexDirection = "column-reverse";
}

function styleAsFlexWrap(el: HTMLElement) {
    el.style.flexWrap = "wrap";
}

function styleAsFlexWrapNot(el: HTMLElement) {
    el.style.flexWrap = "nowrap";
}

function styleAsFlexWrapReverse(el: HTMLElement) {
    el.style.flexWrap = "wrap-reverse";
}

function styleAsFlexMin(el: HTMLElement) {
    el.style.flex = "none";
}

function styleAsFlexMax(el: HTMLElement) {
    el.style.flex = "auto";
}

function styleAsFlexProp(el: HTMLElement, prop: number) {
    el.style.flex = prop + "";
}

function styleAsAllCentered(el: HTMLElement) {
    el.style.textAlign = "center";
    el.style.alignItems = "center";
    el.style.alignContent = "center";
    el.style.verticalAlign = "middle";
}

function styleAsJustifyContentFlexStart(el: HTMLElement) {
    el.style.justifyContent = "flex-start";
}

function styleAsJustifyContentFlexEnd(el: HTMLElement) {
    el.style.justifyContent = "flex-end";
}

function styleAsJustifyContentCenter(el: HTMLElement) {
    el.style.justifyContent = "center";
}

function styleAsJustifyContentSpaceBetween(el: HTMLElement) {
    el.style.justifyContent = "space-between";
}

function styleAsJustifyContentSpaceAround(el: HTMLElement) {
    el.style.justifyContent = "space-around";
}

function styleAsJustifyContentSpaceEvenly(el: HTMLElement) {
    el.style.justifyContent = "space-evenly";
}

function styleAsJustifyContentInitial(el: HTMLElement) {
    el.style.justifyContent = "initial";
}

function styleAsJustifyContentInherit(el: HTMLElement) {
    el.style.justifyContent = "inherit";
}

function styleAsAlignItemsStretch(el: HTMLElement) {
    el.style.alignItems = "stretch";
}

function styleAsAlignItemsCenter(el: HTMLElement) {
    el.style.alignItems = "center";
}

function styleAsAlignItemsFlexStart(el: HTMLElement) {
    el.style.alignItems = "flex-start";
}

function styleAsAlignItemsFlexEnd(el: HTMLElement) {
    el.style.alignItems = "flex-end";
}

function styleAsAlignItemsBaseline(el: HTMLElement) {
    el.style.alignItems = "baseline";
}

function styleAsAlignItemsInitial(el: HTMLElement) {
    el.style.alignItems = "initial";
}

function styleAsAlignItemsInherit(el: HTMLElement) {
    el.style.alignItems = "inherit";
}

function styleAsBounds(el: HTMLElement, top: number, right: number, bottom: number, left: number) {
    el.style.top = getPixelsOrInitial(top);
    el.style.right = getPixelsOrInitial(right);
    el.style.bottom = getPixelsOrInitial(bottom);
    el.style.left = getPixelsOrInitial(left);
}

function styleAsWidth(el: HTMLElement, width?: number | QinGrandeur) {
    let dim = width;
    if (typeof width === "string") {
        dim = getDimensionSize(width).width;
    }
    el.style.width = getPixelsOrInitial(dim as number);
    el.style.minWidth = getPixelsOrInitial(dim as number);
    el.style.maxWidth = getPixelsOrInitial(dim as number);
}

function styleAsHeight(el: HTMLElement, height?: number | QinGrandeur) {
    let dim = height;
    if (typeof height === "string") {
        dim = getDimensionSize(height).height;
    }
    el.style.height = getPixelsOrInitial(dim as number);
    el.style.minHeight = getPixelsOrInitial(dim as number);
    el.style.maxHeight = getPixelsOrInitial(dim as number);
}

function styleAsSize(el: HTMLElement, size?: QinDimension | QinGrandeur) {
    let dim = size;
    if (typeof size === "string") {
        dim = getDimensionSize(size);
    }
    if (!dim) {
        dim = { width: null, height: null }
    }
    el.style.width = getPixelsOrInitial((dim as QinDimension).width);
    el.style.height = getPixelsOrInitial((dim as QinDimension).height);
    el.style.minWidth = getPixelsOrInitial((dim as QinDimension).width);
    el.style.minHeight = getPixelsOrInitial((dim as QinDimension).height);
    el.style.maxWidth = getPixelsOrInitial((dim as QinDimension).width);
    el.style.maxHeight = getPixelsOrInitial((dim as QinDimension).height);
}

function styleAsMinWidth(el: HTMLElement, width?: number | QinGrandeur) {
    let dim = width;
    if (typeof width === "string") {
        dim = getDimensionSize(width).width;
    }
    el.style.minWidth = getPixelsOrInitial(dim as number);
}

function styleAsMinHeight(el: HTMLElement, height?: number | QinGrandeur) {
    let dim = height;
    if (typeof height === "string") {
        dim = getDimensionSize(height).height;
    }
    el.style.minHeight = getPixelsOrInitial(dim as number);
}

function styleAsMinSize(el: HTMLElement, size?: QinDimension | QinGrandeur) {
    let dim = size;
    if (typeof size === "string") {
        dim = getDimensionSize(size);
    }
    if (!dim) {
        dim = { width: null, height: null }
    }
    el.style.minWidth = getPixelsOrInitial((dim as QinDimension).width);
    el.style.minHeight = getPixelsOrInitial((dim as QinDimension).height);
}

function styleAsMaxWidth(el: HTMLElement, width?: number | QinGrandeur) {
    let dim = width;
    if (typeof width === "string") {
        dim = getDimensionSize(width).width;
    }
    el.style.maxWidth = getPixelsOrInitial(dim as number);
}

function styleAsMaxHeight(el: HTMLElement, height?: number | QinGrandeur) {
    let dim = height;
    if (typeof height === "string") {
        dim = getDimensionSize(height).height;
    }
    el.style.maxHeight = getPixelsOrInitial(dim as number);
}

function styleAsMaxSize(el: HTMLElement, size?: QinDimension | QinGrandeur) {
    let dim = size;
    if (typeof size === "string") {
        dim = getDimensionSize(size);
    }
    if (!dim) {
        dim = { width: null, height: null }
    }
    el.style.maxWidth = getPixelsOrInitial((dim as QinDimension).width);
    el.style.maxHeight = getPixelsOrInitial((dim as QinDimension).height);
}

function styleAsForeground(el: HTMLElement, foreground: string) {
    el.style.color = foreground;
}

function styleAsBackground(el: HTMLElement, background: string) {
    el.style.background = background;
}

function styleAsBackgroundImage(el: HTMLElement, imageURL: string) {
    if (imageURL) {
        el.style.backgroundImage = "url('" + imageURL + "')";
    } else {
        styleAsBackgroundImageInitial(el);
    }
}

function styleAsBackgroundImageInitial(el: HTMLElement) {
    el.style.backgroundImage = "initial";
}

function styleAsZIndex(el: HTMLElement, index: number) {
    if (index == null || index == undefined) {
        el.style.zIndex = "initial";
    } else {
        el.style.zIndex = index.toString();
    }
}

function styleAsWhiteSpaceNormal(el: HTMLElement) {
    el.style.whiteSpace = "normal";
}

function styleAsWhiteSpaceNoWrap(el: HTMLElement) {
    el.style.whiteSpace = "nowrap";
}

function styleAsWhiteSpacePre(el: HTMLElement) {
    el.style.whiteSpace = "pre";
}

function styleAsWhiteSpacePreLine(el: HTMLElement) {
    el.style.whiteSpace = "pre-line";
}

function styleAsWhiteSpacePreWrap(el: HTMLElement) {
    el.style.whiteSpace = "pre-wrap";
}

function styleAsWhiteSpaceInitial(el: HTMLElement) {
    el.style.whiteSpace = "initial";
}

function styleAsWhiteSpaceInherit(el: HTMLElement) {
    el.style.whiteSpace = "inherit";
}

function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
    if (element && styles) {
        for (const key in styles) {
            element.style[key] = styles[key];
        }
    }
}

function getPixelsOrInitial(value: number): string {
    if (value == null || value == undefined) {
        return "initial";
    }
    return value + "px";
}

function getWindowSize(): QinDimension {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    };
}

function getWindowSizeStyle(): QinGrandeur {
    const width = getWindowSize().width;
    if (width < 600) {
        return QinGrandeur.SMALL;
    } else if (width < 1000) {
        return QinGrandeur.MEDIUM;
    } else {
        return QinGrandeur.LARGE;
    }
}

function hideAllIFrames() {
    let docIFrames = document.getElementsByTagName("iframe");
    for (const doc_iframe of docIFrames) {
        doc_iframe.style.visibility = "hidden";
    }
}

function showAllIFrames() {
    let docIFrames = document.getElementsByTagName("iframe");
    for (const doc_iframe of docIFrames) {
        doc_iframe.style.visibility = "visible";
    }
}

function disableSelection(element: HTMLElement) {
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    element.onselectstart = QinArms.stopEvent;
}

function clearSelection() {
    setTimeout(() => {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }, 360);
}

function isElementVisibleInScroll(element: HTMLElement) {
    if (element.parentElement) {
        if (element.offsetTop < element.parentElement.scrollTop) {
            return false;
        }
        if (element.offsetLeft < element.parentElement.scrollLeft) {
            return false;
        }
        if (
            element.clientWidth >
            element.parentElement.clientWidth -
                (element.offsetLeft - element.parentElement.scrollLeft)
        ) {
            return false;
        }
        if (
            element.clientHeight >
            element.parentElement.clientHeight -
                (element.offsetTop - element.parentElement.scrollTop)
        ) {
            return false;
        }
    }
    return true;
}

function getWidthByMaxLength(maxLength: number): string {
    let positions = Math.min(Math.max(maxLength - 10, 0), 90);
    let width = Math.floor(90 + (positions * 7) / 3);
    return width + "px";
}

function getDimension(el: HTMLElement): QinDimension {
    return {
        width: parseInt(el.style.width),
        height: parseInt(el.style.height),
    };
}

function getDimensionSize(size: QinGrandeur): QinDimension {
    if (size == QinGrandeur.LARGE) {
        return getDimensionLarge();
    } else if (size == QinGrandeur.MEDIUM) {
        return getDimensionMedium();
    } else {
        return getDimensionSmall();
    }
}

const dimensionSmall: QinDimension = {
    width: 20,
    height: 20,
};
function getDimensionSmall(): QinDimension {
    return dimensionSmall;
}

const dimensionMedium: QinDimension = {
    width: 40,
    height: 40,
};

function getDimensionMedium(): QinDimension {
    return dimensionMedium;
}

const dimensionLarge: QinDimension = {
    width: 60,
    height: 60,
};

function getDimensionLarge(): QinDimension {
    return dimensionLarge;
}

export type QinPoint = {
    posX: number;
    posY: number;
}

export type QinDimension = {
    width: number;
    height: number;
}

export type QinBounds = {
    posX: number;
    posY: number;
    width: number;
    height: number;
}

export enum QinGrandeur {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export enum BorderStyle {
    NONE = "none",
    HIDDEN = "hidden",
    DOTTED = "dotted",
    DASHED = "dashed",
    SOLID = "solid",
    DOUBLE = "double",
    GROOVE = "groove",
    RIDGE = "ridge",
    INSET = "inset",
    OUTSET = "outset",
}

export const QinSkin = {
    styles: QinStyles,
    styleAsBody,
    styleAsWhole,
    styleAsBase,
    styleAsSpaced,
    styleAsEditable,
    styleAsReadOnly,
    styleAsActionable,
    styleMaxSizeForNotOverFlow,
    styleAsScroll,
    styleAsMargin,
    styleAsMarginTop,
    styleAsMarginBottom,
    styleAsMarginLeft,
    styleAsMarginRight,
    styleAsPadding,
    styleAsPaddingTop,
    styleAsPaddingBottom,
    styleAsPaddingLeft,
    styleAsPaddingRight,
    styleAsBorder,
    styleAsBorderTop,
    styleAsBorderBottom,
    styleAsBorderLeft,
    styleAsBorderRight,
    styleAsBorderRadius,
    styleAsBorderTopLeftRadius,
    styleAsBorderTopRightRadius,
    styleAsBorderBottomRightRadius,
    styleAsBorderBottomLeftRadius,
    styleAsDisplayBlock,
    styleAsDisplayInline,
    styleAsDisplayInlineBlock,
    styleAsDisplayFlex,
    styleAsDisplayInlineFlex,
    styleAsDisplayGrid,
    styleAsDisplayInlineGrid,
    styleAsDisplayFlowRoot,
    styleAsDisplayNone,
    styleAsDisplayContents,
    styleAsDisplayTable,
    styleAsDisplayTableRow,
    styleAsDisplayListItem,
    styleAsDisplayInherit,
    styleAsDisplayInitial,
    styleAsDisplayRevert,
    styleAsDisplayRevertLayer,
    styleAsDisplayUnset,
    styleAsPositionStatic,
    styleAsPositionAbsolute,
    styleAsPositionFixed,
    styleAsPositionRelative,
    styleAsPositionSticky,
    styleAsPositionInitial,
    styleAsFlexDirectionRow,
    styleAsFlexDirectionRowReverse,
    styleAsFlexDirectionColumn,
    styleAsFlexDirectionColumnReverse,
    styleAsFlexWrap,
    styleAsFlexWrapNot,
    styleAsFlexWrapReverse,
    styleAsFlexMin,
    styleAsFlexMax,
    styleAsFlexProp,
    styleAsAllCentered,
    styleAsJustifyContentFlexStart,
    styleAsJustifyContentFlexEnd,
    styleAsJustifyContentCenter,
    styleAsJustifyContentSpaceBetween,
    styleAsJustifyContentSpaceAround,
    styleAsJustifyContentSpaceEvenly,
    styleAsJustifyContentInitial,
    styleAsJustifyContentInherit,
    styleAsAlignItemsStretch,
    styleAsAlignItemsCenter,
    styleAsAlignItemsFlexStart,
    styleAsAlignItemsFlexEnd,
    styleAsAlignItemsBaseline,
    styleAsAlignItemsInitial,
    styleAsAlignItemsInherit,
    styleAsBounds,
    styleAsWidth,
    styleAsHeight,
    styleAsSize,
    styleAsMinWidth,
    styleAsMinHeight,
    styleAsMinSize,
    styleAsMaxWidth,
    styleAsMaxHeight,
    styleAsMaxSize,
    styleAsForeground,
    styleAsBackground,
    styleAsBackgroundImage,
    styleAsBackgroundImageInitial,
    styleAsZIndex,
    styleAsWhiteSpaceNormal,
    styleAsWhiteSpaceNoWrap,
    styleAsWhiteSpacePre,
    styleAsWhiteSpacePreLine,
    styleAsWhiteSpacePreWrap,
    styleAsWhiteSpaceInitial,
    styleAsWhiteSpaceInherit,
    applyStyles,
    getPixelsOrInitial,
    getWindowSize,
    getWindowSizeStyle,
    hideAllIFrames,
    showAllIFrames,
    disableSelection,
    clearSelection,
    isElementVisibleInScroll,
    getWidthByMaxLength,
    getDimension,
    getDimensionSize,
    getDimensionSmall,
    getDimensionMedium,
    getDimensionLarge,
};
