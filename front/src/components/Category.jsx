function Category({data}) {
    return ( <>{data.map(item => {
        return (
            <div>{item.name}, {item.img}</div>
        )
    })}</> );
}

export default Category;