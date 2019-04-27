import React, { Fragment } from 'react';

import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import { perc, setTopLeft, setTransform, IPos, IDragPos } from '../utils';
import classNames from 'classnames';

//import { ModalWrapperStyle, Container, Header, TitleStyle, Content } from './styled';

export interface IGridItemDragEvent {
    e: MouseEvent,
    node: HTMLElement,
    newpos: IDragPos,
}

export type GridItemDraggableEventHandler = (
    i: string,
    x: number,
    y: number,
    event: IGridItemDragEvent,
) => void | false;

export type GridItemResizeEventHandler = (
    i: string,
    x: number,
    y: number,
    event: IGridItemDragEvent,
) => void | false;

interface IProps {
    // Children must be only a single element
    cancel?: string,

    // General grid attributes
    children?: React.ReactElement,
    className?: string,
    cols: number,
    containerPadding: number[],
    containerWidth: number,
    h: number,

    // These are all in grid units
    handle?: string,
    i: string,
    isDraggable: boolean,
    isResizable: boolean,

    // All optional
    margin: number[],

    maxH: number,

    maxRows: number,

    maxW: number,

    minH: number,

    minW: number,

    onDrag?: GridItemDraggableEventHandler,
    onDragStart?: GridItemDraggableEventHandler,
    onDragStop?: GridItemDraggableEventHandler,
    onResize?: GridItemResizeEventHandler,
    onResizeStart?: GridItemResizeEventHandler,
    onResizeStop?: GridItemResizeEventHandler,

    rowHeight: number,
    static?: boolean,

    // Use CSS transforms instead of top/left
    useCSSTransforms: boolean,

    // Others
    w: number,
    // Selector for draggable handle
    x: number,
    // Selector for draggable cancel (see react-draggable)
    y: number,

    style?: any,

    usePercentages?: boolean,
}

interface IState {
    isResizing: boolean,
    isDragging: boolean,
    resizing: any,
    dragging: any,
    className: string
}

class GridItem extends React.Component<IProps, IState> {
    static defaultProps = {
        className: '',
        cancel: '',
        handle: '',
        minH: 1,
        minW: 1,
        maxH: Infinity,
        maxW: Infinity,
        usePercentages: false,
    }

    constructor(props: any) {
        super(props);

        this.state = {
            isDragging: false,
            isResizing: false,
            resizing: null,
            dragging: null,
            className: props.className
        };
    }

    // Helper for generating column width
    calcColWidth() {
        const { margin, containerPadding, containerWidth, cols } = this.props;
        return (
            (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols
        );
    }

    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  x             X coordinate in grid units.
     * @param  {Number}  y             Y coordinate in grid units.
     * @param  {Number}  w             W coordinate in grid units.
     * @param  {Number}  h             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */
    calcPosition(x: number, y: number, w: number, h: number, state?: IState) {
        const { margin, containerPadding, rowHeight } = this.props;
        const colWidth = this.calcColWidth();

        const out = {
            left: Math.round((colWidth + margin[0]) * x + containerPadding[0]),
            top: Math.round((rowHeight + margin[1]) * y + containerPadding[1]),
            // 0 * Infinity === NaN, which causes problems with resize constraints;
            // Fix this if it occurs.
            // Note we do it here rather than later because Math.round(Infinity) causes deopt
            width: Math.round(colWidth * w + Math.max(0, w - 1) * margin[0]),
            height: Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1]),
        };

        if (state && state.isResizing) {
            out.width = Math.round(state.resizing.width);
            out.height = Math.round(state.resizing.height);
        }

        if (state && state.isDragging) {
            out.top = Math.round(state.dragging.top);
            out.left = Math.round(state.dragging.left);
        }

        return out;
    }

    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */
    calcXY(top: number, left: number) {
        const { margin, cols, rowHeight, w, h, maxRows } = this.props;
        const colWidth = this.calcColWidth();

        // left = colWidth * x + margin * (x + 1)
        // l = cx + m(x+1)
        // l = cx + mx + m
        // l - m = cx + mx
        // l - m = x(c + m)
        // (l - m) / (c + m) = x
        // x = (left - margin) / (coldWidth + margin)
        let x = Math.round((left - margin[0]) / (colWidth + margin[0]));
        let y = Math.round((top - margin[1]) / (rowHeight + margin[1]));

        // Capping
        x = Math.max(Math.min(x, cols - w), 0);
        y = Math.max(Math.min(y, maxRows - h), 0);

        return { x, y };
    }

    /**
     * Given a height and width in pixel values, calculate grid units.
     * @param  {Number} height Height in pixels.
     * @param  {Number} width  Width in pixels.
     * @return {Object} w, h as grid units.
     */
    calcWH(width: number, height: number) {
        const { margin, maxRows, cols, rowHeight, x, y } = this.props;
        const colWidth = this.calcColWidth();

        // width = colWidth * w - (margin * (w - 1))
        // ...
        // w = (width + margin) / (colWidth + margin)
        let w = Math.round((width + margin[0]) / (colWidth + margin[0]));
        let h = Math.round((height + margin[1]) / (rowHeight + margin[1]));

        // Capping
        w = Math.max(Math.min(w, cols - x), 0);
        h = Math.max(Math.min(h, maxRows - y), 0);
        return { w, h };
    }

    /**
     * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
     * well when server rendering, and the only way to do that properly is to use percentage width/left because
     * we don't know exactly what the browser viewport is.
     * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
     * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
     *
     * @param  {Object} pos Position object with width, height, left, top.
     * @return {Object}     Style object.
     */
    createStyle(pos: IPos) {
        const { usePercentages, containerWidth, useCSSTransforms } = this.props;

        let style;
        // CSS Transforms support (default)
        if (useCSSTransforms) {
            style = setTransform(pos);
        } else {
            // top,left (slow)
            style = setTopLeft(pos);

            // This is used for server rendering.
            if (usePercentages) {
                style.left = perc(pos.left / containerWidth);
                style.width = perc(pos.width / containerWidth);
            }
        }

        return style;
    }

    /**
     * Mix a Draggable instance into a child.
     * @param  {Element} child    Child element.
     * @return {Element}          Child wrapped in Draggable.
     */
    mixinDraggable(child: React.ReactNode) {
        return (
            <DraggableCore
                cancel={'.react-resizable-handle'}
                handle={''}
                onDrag={this.onDragHandler('onDrag')}
                onStart={this.onDragHandler('onDragStart')}
                onStop={this.onDragHandler('onDragStop')}>
                {child}
            </DraggableCore>
        );
    }

    /**
     * Mix a Resizable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Resizable.
     */
    mixinResizable(child: React.ReactNode, position: IPos) {
        const { cols, x, minW, minH, maxW, maxH } = this.props;

        // This is the max possible width - doesn't go to infinity because of the width of the window
        const maxWidth = this.calcPosition(0, 0, cols - x, 0).width;

        // Calculate min/max constraints using our min & maxes
        const mins = this.calcPosition(0, 0, minW, minH);
        const maxes = this.calcPosition(0, 0, maxW, maxH);

        return (
            <Resizable
                height={position.height}
                maxConstraints={[
                    Math.min(maxes.width, maxWidth),
                    Math.min(maxes.height, Infinity),
                ]}
                minConstraints={[mins.width, mins.height]}
                onResize={this.onResizeHandler('onResize')}
                onResizeStart={this.onResizeHandler('onResizeStart')}
                onResizeStop={this.onResizeHandler('onResizeStop')}
                width={position.width}>
                {child}
            </Resizable>
        );
    }

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */

    onDragHandler(handlerName: string) {
        return ((e: DraggableEvent, data: DraggableData) => {
            const handler = this.props[handlerName];
            const node = data.node;

            if (!handler) return;

            const newPosition = { top: 0, left: 0 };

            switch (handlerName) {
                case 'onDragStart': {
                    const { offsetParent } = data.node;
                    if (!offsetParent) return;
                    const parentRect = offsetParent.getBoundingClientRect();
                    const clientRect = data.node.getBoundingClientRect();
                    newPosition.left =
                        clientRect.left - parentRect.left + offsetParent.scrollLeft;
                    newPosition.top =
                        clientRect.top - parentRect.top + offsetParent.scrollTop;
                    this.setState({ dragging: newPosition, isDragging: true });
                    break;
                }
                case 'onDrag':
                    if (!this.state.isDragging) {
                        throw new Error('onDrag called before onDragStart.');
                    }
                    newPosition.left = this.state.dragging.left + data.deltaX;
                    newPosition.top = this.state.dragging.top + data.deltaY;
                    this.setState({ dragging: newPosition, isDragging: true });
                    break;
                case 'onDragStop':
                    if (!this.state.isDragging) {
                        throw new Error('onDragEnd called before onDragStart.');
                    }
                    newPosition.left = this.state.dragging.left;
                    newPosition.top = this.state.dragging.top;
                    this.setState({ dragging: null, isDragging: false });
                    break;
                default:
                    throw new Error(
                        'onDragHandler called with unrecognized handlerName: ' +
                        handlerName,
                    );
            }

            const { x, y } = this.calcXY(newPosition.top, newPosition.left);

            return handler.call(this, this.props.i, x, y, { e, node, newPosition });
        });
    }

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */
    onResizeHandler(handlerName: string) {
        return (e: React.SyntheticEvent, data: ResizeCallbackData) => {
            const handler = this.props[handlerName];
            const node = data.node;
            const size = data.size;

            if (!handler) return;
            const { cols, x, i, maxW, minW, maxH, minH } = this.props;

            // Get new XY
            let { w, h } = this.calcWH(size.width, size.height);

            // Cap w at numCols
            w = Math.min(w, cols - x);
            // Ensure w is at least 1
            w = Math.max(w, 1);

            // Min/max capping
            w = Math.max(Math.min(w, maxW), minW);
            h = Math.max(Math.min(h, maxH), minH);

            this.setState({
                resizing: handlerName === 'onResizeStop' ? null : size,
                isResizing: handlerName === 'onResizeStop' ? false : true
            });
            handler.call(this, i, w, h, { e, node, size });
        };
    }

    render() {
        const { x, y, w, h, useCSSTransforms } = this.props;

        const pos = this.calcPosition(x, y, w, h, this.state);
        const child = React.Children.only(this.props.children) as React.ReactElement<any>;

        // Create the child element. We clone the existing element but modify its className and style.
        let newChild = React.cloneElement(child, {
            className: classNames(
                'react-grid-item',
                'react-draggable',
                child.props.className,
                this.props.className,
                {
                    static: false,
                    resizing: this.state.isResizing,
                    'react-draggable-dragging': this.state.isDragging,
                    cssTransforms: useCSSTransforms,
                },
            ),
            // We can set the width and height on the child, but unfortunately we can't set the position.
            style: {
                ...this.props.style,
                ...child.props.style,
                ...this.createStyle(pos),
            },
        });

        newChild = this.mixinResizable(newChild, pos);
        newChild = this.mixinDraggable(newChild);

        return newChild;
    }
}

export default GridItem;