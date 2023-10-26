const Item = ({ item, id }: any) => {
    // console.log("items");
    console.log({ item, id });
    return (
        <li>
            <span className="id">{id + 1}</span>-
            <span className="name">{item.name}</span>-
            <span className="age">{item.age}</span>
        </li>
    )
}

export default Item;