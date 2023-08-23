const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockStatus: false,
      search: "",
    };
    this.handleStockStatus = this.handleStockStatus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleStockStatus(stockStatus) {
    this.setState({ stockStatus });
  }

  handleSearch(search) {
    this.setState({ search });
  }

  render() {
    console.log("FilterProductTable", this.state);
    return (
      <div>
        <div>
          <SearchBar
            onStockStatus={this.handleStockStatus}
            onSearch={this.handleSearch}
          />
        </div>
        <div>
          <ProductTable
            stockStatus={this.state.stockStatus}
            search={this.state.search}
          />
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockStatus: false,
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.type === "checkbox") {
      this.setState({
        stockStatus: e.target.checked,
      });
      this.props.onStockStatus(e.target.checked);
    } else {
      this.setState({ search: e.target.value });
      this.props.onSearch(e.target.value);
    }
  }

  render() {
    console.log("SearchBar OK", this.state);
    return (
      <div className="container mt-4 mb-4">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-check">
          <input
            name="checkbox"
            type="checkbox"
            checked={this.state.stockStatus}
            onChange={this.handleChange}
          />
          <label className="form-text" htmlFor="checkbox">
            Only show products in stock
          </label>
        </div>
      </div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    console.log("productTable", this.props);
    const categories = [];
    for (const product of PRODUCTS) {
      const newcategory = product.category;
      if (!categories.includes(newcategory)) {
        categories.push(newcategory);
      }
    }
    const categoriesComponent = categories.map((category) => (
      <ProductCategoryRow
        stockStatus={this.props.stockStatus}
        search={this.props.search}
        key={category}
        category={category}
      />
    ));

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{categoriesComponent}</tbody>
      </table>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    const { stockStatus, category, search } = this.props;
    console.log("productCategory", stockStatus);
    const products = [];
    for (const product of PRODUCTS) {
      const productName = product.name.toLowerCase();
      const searchName = search.toLowerCase();
      if (category === product.category && productName.indexOf(searchName) > -1) {
        if (!product.stocked && stockStatus) {

        } else {
          products.push(product);
        }

      }
    }

    const productsComponent = products.map((product) => (
      <ProductRow
        stockStatus={stockStatus}
        key={PRODUCTS.indexOf(product)}
        product={product.name}
        price={product.price}
        category={product.category}
        stocked={product.stocked}
      />
    ));

    return (
      <React.Fragment>
        <tr>
          <th colSpan="2">{category}</th>
        </tr>
        {productsComponent}
      </React.Fragment>
    );
  }
  ;
}

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product, price, stockStatus, stocked } = this.props;
    const classN = !stocked ? "text-danger" : null;
    return (
      <tr>
        <td className={classN}>{product}</td>
        <td className={classN}>{price}</td>
      </tr>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<FilterableProductTable />);
