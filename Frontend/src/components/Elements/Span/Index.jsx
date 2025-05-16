const Span = (props) => {
    const { children, clasName } = props;

    return (
        <span className={clasName}>{children}</span>
    )
}

export default Span;