import React, { Component } from 'react';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import { IGridItemDragEvent } from './GridItem';
import GridItem from './GridItem';
import { DraggableEvent } from 'react-draggable';
import { Layouts, Layout, ReactGridLayoutProps } from 'react-grid-layout';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './styles.css';


import {
    bottom,
    childrenEqual,
    cloneLayoutItem,
    compact,
    getLayoutItem,
    moveElement,
    synchronizeLayoutWithChildren,
    getAllCollisions,
    noop
} from './utils';

interface IState {
    isActiveDrag: boolean,
    activeDrag: Layout,
    layout: Layout[],
    mounted: boolean,
    oldDragItem: Layout,
    oldLayout: Layout[],
    oldResizeItem: Layout,
}

export default class GridLayout extends React.Component<ReactGridLayoutProps, IState> {
    static defaultProps = {
        autoSize: true,
        cols: 12,
        className: '',
        style: {},
        draggableHandle: '',
        draggableCancel: '',
        containerPadding: null,
        rowHeight: 150,
        maxRows: Infinity, // infinite vertical growth
        layout: [],
        margin: [10, 10],
        isDraggable: true,
        isResizable: true,
        useCSSTransforms: true,
        verticalCompact: true,
        compactType: 'vertical',
        preventCollision: false,
        onLayoutChange: noop,
        onDragStart: noop,
        onDrag: noop,
        onDragStop: noop,
        onResizeStart: noop,
        onResize: noop,
        onResizeStop: noop,
    }

    constructor(props: any) {
        super(props);

        this.state = {
            isActiveDrag: false,
            activeDrag: {} as Layout,
            mounted: false,
            oldDragItem: {} as Layout,
            oldLayout: [] as Layout[],
            oldResizeItem: {} as Layout,
            layout: synchronizeLayoutWithChildren(
                this.props.layout,
                this.props.children,
                this.props.cols,
                this.compactType(),
            ),
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
        // Possibly call back with layout on mount. This should be done after correcting the layout width
        // to ensure we don't rerender with the wrong width.
        this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
    }

    componentWillReceiveProps(nextProps: ReactGridLayoutProps) {
        let newLayoutBase;

        if (
            !isEqual(nextProps.layout, this.props.layout) ||
            nextProps.compactType !== this.props.compactType
        ) {
            newLayoutBase = nextProps.layout;
        } else if (!childrenEqual(this.props.children, nextProps.children)) {
            newLayoutBase = this.state.layout;
        }

        if (newLayoutBase) {
            const newLayout = synchronizeLayoutWithChildren(
                newLayoutBase,
                nextProps.children,
                nextProps.cols,
                this.compactType(/*nextProps*/),
            );
            const oldLayout = this.state.layout;
            this.setState({ layout: newLayout });
            this.onLayoutMaybeChanged(newLayout, oldLayout);
        }
    }

    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */
    containerHeight() {
        if (!this.props.autoSize) return;
        const nbRow = bottom(this.state.layout);
        const containerPaddingY = this.props.containerPadding
            ? this.props.containerPadding[1]
            : this.props.margin[1];
        return (
            nbRow * this.props.rowHeight +
            (nbRow - 1) * this.props.margin[1] +
            containerPaddingY * 2 +
            'px'
        );
    }

    compactType() {
        if (!this.props.compactType)
            return 'vertical';
        return this.props.compactType;
        //if (!props) props = this.props;
        //return props.verticalCompact === false ? null : props.compactType;
    }

    /**
     * When dragging starts
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDragStart = (i: string, x: number, y: number, evt: IGridItemDragEvent) => {
        const { layout } = this.state;
        const l = getLayoutItem(layout, i);
        if (!l) return;

        this.setState({
            oldDragItem: cloneLayoutItem(l),
            oldLayout: this.state.layout,
        });

        return this.props.onDragStart(layout, l, l, {} as Layout, evt.e, evt.node);
    };

    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDrag = (i: string, x: number, y: number, evt: IGridItemDragEvent) => {
        const { oldDragItem } = this.state;
        let { layout } = this.state;
        const { cols } = this.props;
        const l = getLayoutItem(layout, i);
        if (!l) return;

        // Create placeholder (display only)
        const placeholder: Layout = {
            w: l.w,
            h: l.h,
            x: l.x,
            y: l.y,
            static: true,
            i,
        };
        // Move the element to the dragged location.
        const isUserAction = true;
        layout = moveElement(
            layout,
            l,
            x,
            y,
            isUserAction,
            //this.props.preventCollision,
            this.compactType(),
            cols,
        );

        this.props.onDrag(layout, oldDragItem, l, placeholder, evt.e, evt.node);

        this.setState({
            layout: compact(layout, this.compactType(), cols),
            isActiveDrag: true,
            activeDrag: placeholder,
        });
    };

    /**
     * When dragging stops, figure out which position the element is closest to and update its x and y.
     * @param  {String} i Index of the child.
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDragStop = (i: string, x: number, y: number, evt: IGridItemDragEvent) => {
        const { oldDragItem } = this.state;
        let { layout } = this.state;
        const { cols, preventCollision } = this.props;
        const l = getLayoutItem(layout, i);
        if (!l) return;

        // Move the element here
        const isUserAction = true;
        layout = moveElement(
            layout,
            l,
            x,
            y,
            isUserAction,
            //preventCollision,
            this.compactType(),
            cols,
        );

        this.props.onDragStop(layout, oldDragItem, l, {} as Layout, evt.e, evt.node);

        // Set state
        const newLayout = compact(layout, this.compactType(), cols);
        const { oldLayout } = this.state;
        this.setState({
            isActiveDrag: false,
            activeDrag: {} as Layout,
            layout: newLayout,
            oldDragItem: {} as Layout,
            oldLayout: [] as Layout[],
        });

        this.onLayoutMaybeChanged(newLayout, oldLayout);
    };

    onLayoutMaybeChanged(newLayout: Layout[], oldLayout: Layout[]) {
        if (!oldLayout) oldLayout = this.state.layout;
        if (!isEqual(oldLayout, newLayout)) {
            this.props.onLayoutChange(newLayout);
        }
    }

    onResizeStart = (i: string, x: number, y: number, evt: IGridItemDragEvent) => {
        const { layout } = this.state;
        const l = getLayoutItem(layout, i);

        if (!l) return;

        this.setState({
            oldResizeItem: cloneLayoutItem(l),
            oldLayout: this.state.layout,
        });

        this.props.onResizeStart(layout, l, l, {} as Layout, evt.e, evt.node);
    };

    onResize = (i: string, w: number, h: number, evt: IGridItemDragEvent) => {
        const { layout, oldResizeItem } = this.state;
        const { cols, preventCollision } = this.props;
        const l = getLayoutItem(layout, i);
        if (!l) return;

        // Something like quad tree should be used
        // to find collisions faster

        let hasCollisions;
        if (preventCollision) {
            const collisions = getAllCollisions(layout, { ...l, w, h }).filter(
                layoutItem => layoutItem.i !== l.i,
            );
            hasCollisions = collisions.length > 0;

            // If we're colliding, we need adjust the placeholder.
            if (hasCollisions) {
                // adjust w && h to maximum allowed space
                let leastX = Infinity;

                let leastY = Infinity;
                collisions.forEach(layoutItem => {
                    if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
                    if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
                });

                if (Number.isFinite(leastX)) l.w = leastX - l.x;
                if (Number.isFinite(leastY)) l.h = leastY - l.y;
            }
        }

        if (!hasCollisions) {
            // Set new width and height.
            l.w = w;
            l.h = h;
        }

        // Create placeholder element (display only)
        const placeholder: Layout = {
            w: l.w,
            h: l.h,
            x: l.x,
            y: l.y,
            static: true,
            i,
        };

        this.props.onResize(layout, oldResizeItem, l, placeholder, evt.e, evt.node);

        // Re-compact the layout and set the drag placeholder.
        this.setState({
            layout: compact(layout, this.compactType(), cols),
            activeDrag: placeholder,
            isActiveDrag: true,
        });
    };

    onResizeStop = (i: string, w: number, h: number, evt: IGridItemDragEvent) => {
        const { layout, oldResizeItem } = this.state;
        const { cols } = this.props;
        const l = getLayoutItem(layout, i);

        this.props.onResizeStop(layout, oldResizeItem, l, null, evt.e, evt.node);

        // Set state
        const newLayout = compact(layout, this.compactType(), cols);
        const { oldLayout } = this.state;
        this.setState({
            isActiveDrag: false,
            activeDrag: {} as Layout,
            layout: newLayout,
            oldResizeItem: {} as Layout,
            oldLayout: [] as Layout[],
        });

        this.onLayoutMaybeChanged(newLayout, oldLayout);
    };

    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */
    placeholder() {
        const { activeDrag, isActiveDrag } = this.state;
        if (!isActiveDrag) return null;
        const {
            width,
            cols,
            margin,
            containerPadding,
            rowHeight,
            maxRows,
            useCSSTransforms,
        } = this.props;

        return (
            <GridItem
                className='react-grid-placeholder-custom'
                cols={cols}
                containerPadding={containerPadding || margin}
                containerWidth={width}
                h={activeDrag.h}
                i={activeDrag.i}
                isDraggable={false}
                isResizable={false}
                margin={margin}
                maxRows={maxRows}
                rowHeight={rowHeight}
                useCSSTransforms={useCSSTransforms}
                w={activeDrag.w}
                x={activeDrag.x}
                y={activeDrag.y}>
                <div />
            </GridItem>
        );
    }

    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */
    processGridItem(child: React.ReactNode) {
        if (!child || !child.key) return;
        const l = getLayoutItem(this.state.layout, String(child.key));
        if (!l) return null;
        const {
            width,
            cols,
            margin,
            containerPadding,
            rowHeight,
            maxRows,
            isDraggable,
            isResizable,
            useCSSTransforms,
            draggableCancel,
            draggableHandle,
        } = this.props;
        const { mounted } = this.state;

        // Parse 'static'. Any properties defined directly on the grid item will take precedence.
        const draggable = Boolean(
            !l.static && isDraggable && (l.isDraggable || l.isDraggable == null),
        );
        const resizable = Boolean(
            !l.static && isResizable && (l.isResizable || l.isResizable == null),
        );

        return (
            <GridItem
                cols={cols}
                containerPadding={containerPadding || margin}
                containerWidth={width}
                h={l.h}
                handle={draggableHandle}
                i={l.i}
                isDraggable={draggable}
                isResizable={resizable}
                margin={margin}
                maxH={l.maxH}
                maxRows={maxRows}
                maxW={l.maxW}
                minH={l.minH}
                minW={l.minW}
                onDrag={this.onDrag}
                onDragStart={this.onDragStart}
                onDragStop={this.onDragStop}
                onResize={this.onResize}
                onResizeStart={this.onResizeStart}
                onResizeStop={this.onResizeStop}
                rowHeight={rowHeight}
                static={l.static}
                useCSSTransforms={useCSSTransforms && mounted}
                usePercentages={!mounted}
                w={l.w}
                x={l.x}
                y={l.y}>
                {child}
            </GridItem>
        );
    }

    render() {
        const { className, style, layout } = this.props;

        const mergedClassName = classNames('react-grid-layout', className);
        const mergedStyle = {
            height: this.containerHeight(),
            ...style,
        };

        return (
            <div className={mergedClassName} style={mergedStyle}>
                {React.Children.map(this.props.children, child =>
                    this.processGridItem(child),
                )}
                {this.placeholder()}
            </div>
        );
    }
}
