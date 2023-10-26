import Item from "./Item";

const MapItems = ({ people }: any): JSX.Element => {
    // console.log("Map items");

    return (
        <ul>
            {
                // javascript code
                people.map(({ id, ...item }: any) => {
                    return (
                        <Item item={item} id={id} key={id} />
                    )

                })
            }
        </ul>
    )
}

export default MapItems;