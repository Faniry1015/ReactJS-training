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
            <div><ProductTable /></div>
        </div>
    }
}

class SearchBar extends React.Component {
    render() {
        return <div>
            <input type="text" placeholder="Search..." />
            <input name="checkbox" type="checkbox" /> <label htmlFor="checkbox">Only show products in stock</label>
        </div>
    }
}

class ProductTable extends React.Component {
    render() {
        return <table >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <ProductCategoryRow category = "Category 1" />
                <ProductRow product="Product1" price="price1"/>

                <ProductCategoryRow category = "Category 2" />
                <ProductRow product="Product1" price="price1"/>
            </tbody>
        </table>
    }
}

class ProductCategoryRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <tr>
            <td>{this.props.category}</td>
        </tr>
    }
}

class ProductRow extends React.Component {

    constructor (props) {
        super(props)
    }

    render() {
        return <tr>
        <td>{this.props.product}</td>
        <td>{this.props.price}</td>
    </tr>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<FilterableProductTable />)