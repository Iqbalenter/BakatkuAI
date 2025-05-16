const Image = (props) => {
    const { src, className, width } = props;

    return (
        <img src={src} className={className} width={width}/>
    )
}

export default Image;