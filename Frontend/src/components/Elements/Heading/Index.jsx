const Heading1 = (props) => {
    const { children, className } = props;
    return (
        <h1 className={className}>{children}</h1>
    )
}

const Heading2 = (props) => {
    const { children, className } = props;
    return (
        <h2 className={className}>{children}</h2>
    )
}
const Heading3 = (props) => {
    const { children, className } = props;
    return (
        <h3 className={className}>{children}</h3>
    )
}
const Heading4 = (props) => {
    const { children, className } = props;
    return (
        <h4 className={className}>{children}</h4>
    )
}

const Heading5 = (props) => {
    const { children, className } = props;
    return (
        <h5 className={className}>{children}</h5>
    )
}
const Heading6 = (props) => {
    const { children, className } = props;
    return (
        <h6 className={className}>{children}</h6>
    )
}

export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };