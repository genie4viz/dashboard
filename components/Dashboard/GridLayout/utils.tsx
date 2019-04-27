import { isEqual } from 'lodash';
import React from 'react';
import { Layout } from 'react-grid-layout';

export type RefStringObject = { [key: string]: string };

export interface IPos {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IDragPos {
  top: number;
  left: number;
}

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout: Layout[]) {
  let max = 0;

  let bottomY;
  for (let i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }
  return max;
}

export function cloneLayout(layout: Layout[]) {
  const newLayout = Array(layout.length);
  for (let i = 0, len = layout.length; i < len; i++) {
    newLayout[i] = cloneLayoutItem(layout[i]);
  }
  return newLayout;
}

// Fast path to cloning, since this is monomorphic
export function cloneLayoutItem(layoutItem: Layout) {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable,
  };
}

/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */
export function childrenEqual(a: any, b: any) {
  return isEqual(
    React.Children.map(a, c => c.key),
    React.Children.map(b, c => c.key),
  );
}

/**
 * Given two layoutitems, check if they collide.
 */
export function collides(l1: Layout, l2: Layout) {
  if (l1 === l2) return false; // same element
  if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2
  if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2
  if (l1.y + l1.h <= l2.y) return false; // l1 is above l2
  if (l1.y >= l2.y + l2.h) return false; // l1 is below l2
  return true; // boxes overlap
}

/**
 * Given a layout, compact it. This involves going down each y coordinate and removing gaps
 * between items.
 *
 * @param  {Array} layout Layout.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}       Compacted Layout.
 */
export function compact(layout: Layout[], compactType: string, cols: number) {
  // Statics go in the compareWith array right away so items flow around them.
  const compareWith = getStatics(layout);
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, compactType);
  // Holding for new items.
  const out = Array(layout.length);

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = cloneLayoutItem(sorted[i]);

    // Don't move static elements
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted);
      // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.
      compareWith.push(l);
    }

    // Add to output array to make sure they still come out in the right order.
    out[layout.indexOf(sorted[i])] = l;

    // Clear moved flag, if it exists.
    l.moved = false;
  }

  return out;
}

const heightWidth: RefStringObject = { x: 'w', y: 'h' };
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */
function resolveCompactionCollision(layout: Layout[], item: Layout, moveToCoord: number, axis: string) {
  const sizeProp = heightWidth[axis];
  item[axis] += 1;
  const itemIndex = layout.indexOf(item);

  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < layout.length; i++) {
    const otherItem = layout[i];
    // Ignore static items
    if (otherItem.static) continue;

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.y > item.y + item.h) break;

    if (collides(item, otherItem)) {
      resolveCompactionCollision(
        layout,
        otherItem,
        moveToCoord + item[sizeProp],
        axis,
      );
    }
  }

  item[axis] = moveToCoord;
}

/**
 * Compact an item in the layout.
 */
export function compactItem(compareWith: Layout[], l: Layout, compactType: string, cols: number, fullLayout: Layout[]) {
  const compactV = compactType === 'vertical';
  const compactH = compactType === 'horizontal';
  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } else if (compactH) {
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element left as far as it can go without colliding.
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x--;
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  let collides;
  while ((collides = getFirstCollision(compareWith, l))) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, 'x');
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, 'y');
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w;
      l.y++;
    }
  }
  return l;
}

/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */
export function correctBounds(layout: Layout[], bounds: any) {
  const collidesWith = getStatics(layout);
  for (let i = 0, len = layout.length; i < len; i++) {
    const l = layout[i];
    // Overflows right
    if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w;
    // Overflows left
    if (l.x < 0) {
      l.x = 0;
      l.w = bounds.cols;
    }
    if (!l.static) collidesWith.push(l);
    else {
      // If this is static and collides with other statics, we must move it down.
      // We have to do something nicer than just letting them overlap.
      while (getFirstCollision(collidesWith, l)) {
        l.y++;
      }
    }
  }
  return layout;
}

/**
 * Get a layout item by ID. Used so we can override later on if necessary.
 *
 * @param  {Array}  layout Layout array.
 * @param  {String} id     ID
 * @return {LayoutItem}    Item at ID.
 */
export function getLayoutItem(layout: Layout[], id: string) {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id) return layout[i];
  }
}

/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */
export function getFirstCollision(layout: Layout[], layoutItem: Layout) {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}

export function getAllCollisions(layout: Layout[], layoutItem: Layout) {
  return layout.filter(l => collides(l, layoutItem));
}

/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */
export function getStatics(layout: Layout[]) {
  return layout.filter(l => l.static);
}

/**
 * Move an element. Responsible for doing cascading movements of other elements.
 *
 * @param  {Array}      layout            Full layout to modify.
 * @param  {LayoutItem} l                 element to move.
 * @param  {Number}     [x]               X position in grid units.
 * @param  {Number}     [y]               Y position in grid units.
 */
export function moveElement(layout: Layout[], l: Layout, x: number, y: number, isUserAction: boolean, compactType: string, cols: number) {
  if (l.static) return layout;

  // Short-circuit if nothing to do.
  if (l.y === y && l.x === x) return layout;

  const oldX = l.x;
  const oldY = l.y;
  const INVALID_NUMBER = -1000;
  // This is quite a bit faster than extending the object
  // if (typeof x === 'number') l.x = x;
  // if (typeof y === 'number') l.y = y;
  if (x != INVALID_NUMBER) l.x = x;
  if (y != INVALID_NUMBER) l.y = y;
  l.moved = true;

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  var sorted = sortLayoutItems(layout, compactType);
  const movingUp =
    compactType === 'vertical' && y != INVALID_NUMBER
      ? oldY >= y
      : compactType === 'horizontal' && x != INVALID_NUMBER
        ? oldX >= x
        : false;
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l);

  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i];

    // Short circuit so we can't infinite loop
    if (collision.moved) continue;

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = moveElementAwayFromCollision(
        layout,
        collision,
        l,
        isUserAction,
        compactType,
        cols,
      );
    } else {
      layout = moveElementAwayFromCollision(
        layout,
        l,
        collision,
        isUserAction,
        compactType,
        cols,
      );
    }
  }

  return layout;
}

/**
 * This is where the magic needs to happen - given a collision, move an element away from the collision.
 * We attempt to move it up if there's room, otherwise it goes below.
 *
 * @param  {Array} layout            Full layout to modify.
 * @param  {LayoutItem} collidesWith Layout item we're colliding with.
 * @param  {LayoutItem} itemToMove   Layout item we're moving.
 */
export function moveElementAwayFromCollision(
  layout: Layout[],
  collidesWith: Layout,
  itemToMove: Layout,
  isUserAction: boolean,
  compactType: string,
  cols: number,
) {
  // const compactH = compactType === 'horizontal';
  // const compactV = compactType === 'vertical';
  const compactH = false;
  // @Derek location where minor edit was made. Now when the top goes to bottom, there is a switching action.
  const compactV = true;
  const preventCollision = false; // we're already colliding

  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.
  if (isUserAction) {
    // Reset isUserAction flag because we're not in the main collision anymore.
    isUserAction = false;
    // Make a mock item so we don't modify the item here, only modify in moveElement.
    const fakeItem: Layout = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: Math.max(collidesWith.y - itemToMove.h, 0),
      w: itemToMove.w,
      h: itemToMove.h,
      i: '-1',
      minW: 0,
      maxW: 0,
      minH: 0,
      maxH: 0,
      moved: false,
      static: false,
      isDraggable: false,
      isResizable: false,
    };

    // No collision? If so, we can go up there; otherwise, we'll end up moving down as normal
    if (!getFirstCollision(layout, fakeItem)) {
      return moveElement(
        layout,
        itemToMove,
        compactH ? fakeItem.x : -1000,
        compactV ? fakeItem.y : -1000,
        isUserAction,
        compactType,
        cols,
      );
    }
  }

  return moveElement(
    layout,
    itemToMove,
    compactH ? itemToMove.x + 1 : -1000,
    compactV ? itemToMove.y + 1 : -1000,
    isUserAction,
    compactType,
    cols,
  );
}

/**
 * Helper to convert a number to a percentage string.
 *
 * @param  {Number} num Any number
 * @return {String}     That number as a percentage.
 */
export function perc(num: number) {
  return num * 100 + '%';
}

export function setTransform(data: IPos) {
  // Replace unitless items with px
  const translate = `translate(${data.left}px,${data.top}px)`;
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: `${data.width}px`,
    height: `${data.height}px`,
    position: 'absolute',
  };
}

export function setTopLeft(data: IPos) {
  return {
    top: `${data.top}px`,
    left: `${data.left}px`,
    width: `${data.width}px`,
    height: `${data.height}px`,
    position: 'absolute',
  };
}

/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */
export function sortLayoutItems(layout: Layout[], compactType: string) {
  if (compactType === 'horizontal') return sortLayoutItemsByColRow(layout);
  return sortLayoutItemsByRowCol(layout);
}

export function sortLayoutItemsByRowCol(layout: Layout[]) {
  var tempArray = [] as Layout[];
  return tempArray.concat(layout).sort((a, b) => {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }
    return -1;
  });
}

export function sortLayoutItemsByColRow(layout: Layout[]) {
  var tempArray = [] as Layout[];
  return tempArray.concat(layout).sort((a, b) => {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1;
    }
    return -1;
  });
}

/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */
export function synchronizeLayoutWithChildren(
  initialLayout: Layout[],
  children: React.ReactElement,
  cols: number,
  compactType: string,
) {
  initialLayout = initialLayout || [];

  // Generate one layout item per child.
  let layout = [] as Layout[];
  React.Children.forEach(children, (child, i) => {
    // Don't overwrite if it already exists.
    const exists = getLayoutItem(initialLayout, String(child.key));
    if (exists) {
      layout[i] = cloneLayoutItem(exists);
    } else {
      const g = child.props['data-grid'] || child.props._grid;

      // Hey, this item has a data-grid property, use it.
      if (g) {
        layout[i] = cloneLayoutItem({ ...g, i: child.key });
      } else {
        const fakeItem: Layout = {
          x: 0,
          y: bottom(layout),
          w: 1,
          h: 1,
          i: String(child.key),
          minW: 0,
          maxW: 0,
          minH: 0,
          maxH: 0,
          moved: false,
          static: false,
          isDraggable: false,
          isResizable: false,
        };
        // Nothing provided: ensure this is added to the bottom
        layout[i] = cloneLayoutItem(fakeItem);
      }
    }
  });

  // Correct the layout.
  layout = correctBounds(layout, { cols });
  layout = compact(layout, compactType, cols);

  return layout;
}

export const noop = () => { };
