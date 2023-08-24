//Just to test debugger profiler
function wait (time) {
  const t = Date.now()
  while(Date.now() - t < time) {

  }
};

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-danger">{product.name}</span>
  );

  return (
    <tr>
      <td>{name} </td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductTable({ products, inStockOnly, filterText }) {
  let rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      (inStockOnly && !product.stocked) ||
      product.name.indexOf(filterText) === -1
    ) {
      return;
    }
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow key={lastCategory} category={product.category} />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    const { filterText, inStockOnly } = this.props;
    return (
      <div className="mb-3">
        <div className="form-group mb-3">
          <input
            type="text"
            value={filterText}
            onChange={this.handleFilterTextChange}
            className="fom-control"
            placeholder="Rechercher"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
            id="stock"
            className="form-check-input"
          />
          <label htmlFor="stock" className="form-check-label">
            Produit en stock seulement
          </label>
        </div>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleInStockChange(inStockOnly) {
    this.setState({ inStockOnly });
  }

  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </React.Fragment>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<FilterableProductTable products={PRODUCTS} />);
