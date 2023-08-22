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
        const categories = []
        for (const product of PRODUCTS) {
            const newcategory = product.category
            if (!categories.includes(newcategory)) {
                categories.push(newcategory)
            }
        }
        const categoriesComponent = categories.map((category) => <ProductCategoryRow key={category} category={category} />)

        return <table >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {categoriesComponent}
            </tbody>
        </table>
    }
}

class ProductCategoryRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const products = []
        for (const product of PRODUCTS) {
            if (this.props.category === product.category) {
                products.push(product)
            }
        }

        const productsComponent = products.map((product) => <ProductRow key={PRODUCTS.indexOf(product)} product={product.name} price={product.price} category={product.category} stocked={product.stocked} />)

        return <React.Fragment>
            <tr>
                <td>{this.props.category}</td>
            </tr>
            {productsComponent}
        </React.Fragment>

    }
}

class ProductRow extends React.Component {

    constructor(props) {
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