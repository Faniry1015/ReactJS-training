const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

class FilterableProductTable extends React.Component {
    render() {
        return <div>
            <div><SearchBar /></div>
            <div></div>
        </div>
    }
}

class SearchBar extends React.Component {
    render() {
        return <div>
            <input type="text" placeholder="Search..."/>
            <input name="checkbox" type="checkbox" /> <label htmlFor="checkbox">Only show products in stock</label>
        </div>
    }
}