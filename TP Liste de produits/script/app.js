const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stockStatus: false,
            search: ""
        }
        this.handleStockStatus = this.handleStockStatus.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleStockStatus(checkedStatus) {
        this.setState({stockStatus: checkedStatus})
    }

    handleSearch(searchItem) {
        this.setState({search: searchItem})
    }

    render() {
        console.log("FilterProductTable", this.state)
        return <div>
            <div><SearchBar stockStatus={this.handleStockStatus} search={this.handleSearch} /></div>
            <div><ProductTable stockStatus = {this.state.stockStatus} search={this.state.search}/></div>
        </div>
    }
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stockStatus: false,
            search: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
            if (e.target.type === "checkbox") {
                this.setState({
                    stockStatus: e.target.checked
                })
                this.props.stockStatus(e.target.checked)
            } else {
                this.setState({ search: e.target.value})
                this.props.search(e.target.value)
            }

         }

    render() {
        console.log("SearchBar OK", this.state)
        return <div>
            <input type="text" placeholder="Search..." value={this.state.search} onChange={this.handleChange}/>
            <input name="checkbox" type="checkbox" checked={this.state.stockStatus}  onChange={this.handleChange} /> <label htmlFor="checkbox">Only show products in stock</label>
        </div>
    }
}

class ProductTable extends React.Component {

    render() {
        console.log("productTable", this.props)
        const categories = []
        for (const product of PRODUCTS) {
            const newcategory = product.category
            if (!categories.includes(newcategory)) {
                categories.push(newcategory)
            }
        }
        const categoriesComponent = categories.map((category) => <ProductCategoryRow stockStatus={this.props.stockStatus} search={this.props.search} key={category} category={category} />)

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

    render() {
        console.log("productCategory", this.props.stockStatus)
        const products = []
        for (const product of PRODUCTS) {
            if (this.props.category === product.category) {
                if(product.name.startsWith(this.props.search)) {
                    products.push(product)
                }
            }
        }

        const productsComponent = products.map((product) => <ProductRow stockStatus={this.props.stockStatus} key={PRODUCTS.indexOf(product)} product={product.name} price={product.price} category={product.category} stocked={product.stocked} />)

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
        const classN = this.props.stockStatus && !this.props.stocked ? "noStock" : null
            return <tr className = {classN}>
            <td>{this.props.product}</td>
            <td>{this.props.price}</td>
        </tr>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<FilterableProductTable />)