import React, { Component } from 'react';
import isEqual from 'lodash.isequal';

import { cloneLayout, synchronizeLayoutWithChildren, noop } from '../utils';
import {
  getBreakpointFromWidth,
  getColsFromBreakpoint,
  findOrGenerateResponsiveLayout,
} from '../responsiveUtils';

import GridLayout from '../index';
import { Layout, ResponsiveProps } from 'react-grid-layout';

/*
interface IProps {
  breakpoint?: string,
  breakpoints?: any,
  cols?: any,
  layouts: ILayout[],
  onBreakpointChange?: any,
  onLayoutChange?: any,
  onWidthChange?: any,
  width: number,
}*/

interface IState {
  breakpoint: string,
  cols: any;
  layout: Layout[];
}

export default class ResponsiveGridLayout extends Component<ResponsiveProps, IState> {
  static defaultProps = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    layouts: {},
    onBreakpointChange: noop,
    onLayoutChange: noop,
    onWidthChange: noop,
  }

  constructor(props: any) {
    super(props);

    this.setState(this.generateInitialState());
  }

  generateInitialState(): IState {
    const { width, breakpoints, layout, cols } = this.props;
    const breakpoint = getBreakpointFromWidth(breakpoints, width);
    const colNo = getColsFromBreakpoint(breakpoint, cols);
    // verticalCompact compatibility, now deprecated    
    const compactType = 'vertical';
    //  this.props.verticalCompact === false ? null : this.props.compactType;

    // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
    // for this layout.
    const initialLayout = findOrGenerateResponsiveLayout(
      layout,
      breakpoints,
      breakpoint,
      breakpoint,
      colNo,
      compactType,
    );

    return {
      layout: initialLayout,
      breakpoint,
      cols: colNo,
    };
  }

  componentWillReceiveProps(nextProps: ResponsiveProps) {
    // Allow parent to set width or breakpoint directly.
    if (
      nextProps.width != this.props.width ||
      nextProps.breakpoints !== this.props.breakpoints ||
      !isEqual(nextProps.breakpoints, this.props.breakpoints) ||
      !isEqual(nextProps.cols, this.props.cols)
    ) {
      this.onWidthChange(nextProps);
    } else if (!isEqual(nextProps.layouts, this.props.layouts)) {
      // Allow parent to set layouts directly.
      const { breakpoint, cols } = this.state;

      const compactType = 'vertical';
      // Since we're setting an entirely new layout object, we must generate a new responsive layout
      // if one does not exist.
      const newLayout = findOrGenerateResponsiveLayout(
        nextProps.layouts,
        nextProps.breakpoints,
        breakpoint,
        breakpoint,
        cols,
        compactType,
      );
      this.setState({ layout: newLayout });
    }
  }

  // wrap layouts so we do not need to pass layouts to child
  onLayoutChange(layout: Layout[]) {
    this.props.onLayoutChange(layout, {
      ...this.props.layouts,
      [this.state.breakpoint]: layout,
    });
  };

  /**
   * When the width changes work through breakpoints and reset state with the new width & breakpoint.
   * Width changes are necessary to figure out the widget widths.
   */
  onWidthChange(nextProps: ResponsiveProps) {
    const { breakpoints, cols, layouts } = nextProps;
    const compactType = 'vertical';

    const newBreakpoint =
      nextProps.breakpoints ||
      getBreakpointFromWidth(nextProps.breakpoints, nextProps.width);

    const lastBreakpoint = this.state.breakpoint;

    // Breakpoint change
    if (
      lastBreakpoint !== newBreakpoint ||
      this.props.breakpoints !== breakpoints ||
      this.props.cols !== cols
    ) {
      // Preserve the current layout if the current breakpoint is not present in the next layouts.
      if (layouts) {
        if (!(lastBreakpoint in layouts)) {
          layouts[lastBreakpoint] = cloneLayout(this.state.layout);
        }
      }

      // Find or generate a new layout.
      const newCols = getColsFromBreakpoint(newBreakpoint, cols);
      let layout = findOrGenerateResponsiveLayout(
        layouts,
        breakpoints,
        newBreakpoint,
        lastBreakpoint,
        newCols,
        compactType,
      );

      // This adds missing items.
      layout = synchronizeLayoutWithChildren(
        layout,
        nextProps.children,
        newCols,
        compactType,
      );

      // Store the new layout.
      if (layouts) {
        layouts[newBreakpoint] = layout;
      }

      // callbacks
      this.props.onLayoutChange(layout, layouts);
      this.props.onBreakpointChange(newBreakpoint, newCols);
      this.props.onWidthChange(
        nextProps.width,
        nextProps.margin,
        newCols,
        nextProps.containerPadding,
      );

      this.setState({
        breakpoint: newBreakpoint,
        layout,
        cols: newCols,
      });
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      breakpoint,
      breakpoints,
      cols,
      layouts,
      onBreakpointChange,
      onLayoutChange,
      onWidthChange,
      ...other
    } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <GridLayout
        {...other}
        cols={this.state.cols}
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange} />
    );
  }
}
