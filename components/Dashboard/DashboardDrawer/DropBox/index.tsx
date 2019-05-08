import React, { useState, useImperativeHandle } from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core';

export interface DropBoxProps {
    greedy?: boolean
    isOver: boolean
    isOverCurrent: boolean
    connectDropTarget: ConnectDropTarget
    pos: XYCoord | null;
    onOver?: (isOver: boolean, x: number, y: number) => void
    onDropped?: () => void
}

export interface DropBoxState {
    hasDropped: boolean
    hasDroppedOnChild: boolean
}

const DropBox: React.RefForwardingComponent<
    any,
    DropBoxProps
    > = React.forwardRef(
        ({ isOver, isOverCurrent, connectDropTarget, children, onOver, onDropped, pos }, ref) => {
            const [hasDropped, setHasDropped] = useState(false)
            const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

            useImperativeHandle(
                ref,
                () => ({
                    onDrop: (onChild: boolean) => {
                        setHasDroppedOnChild(onChild)
                        setHasDropped(true)
                    },
                }),
                [],
            )

            if (isOverCurrent || (isOver)) {
                if (onOver && pos) {
                    onOver(true, pos.x, pos.y);
                }
            } else {
                if (onOver)
                    onOver(false, 0, 0);
            }

            if (hasDropped) {
                if (onDropped)
                    onDropped();

                setHasDropped(false);
                setHasDroppedOnChild(false);
            }

            return connectDropTarget(
                <div>
                    {children}
                </div>,
            )
        },
    )

export default DropTarget(
    "Block",
    {
        drop(
            props: DropBoxProps,
            monitor: DropTargetMonitor,
            component: React.Component | null,
        ) {
            if (!component) {
                return
            }
            const hasDroppedOnChild = monitor.didDrop()
                /*
                if (hasDroppedOnChild && !props.greedy) {
                    return
                }*/

                ; (component as any).onDrop(hasDroppedOnChild)
        },
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        pos: monitor.getClientOffset(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
    }),
)(DropBox)
