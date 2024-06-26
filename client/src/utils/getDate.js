import React from "react";

export const getValue = (value, children) => {
    const childArray = React.Children.toArray(children);
    const childElement = childArray.find(child => child.props.value === value);
    return childElement.props.children;
}