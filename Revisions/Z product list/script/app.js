const PRODUCTS = [
   { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
   { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
   { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
   { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
   { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
   { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

class SearchBar extends React.Component {

    constructor(props) {
        super(props) 
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        if (e.target.type === "text") {
        this.props.onSearch(e.target.value)
        } else {
            this.props.onStockChange(e.target.checked)
        }
    }

   render() {
        const {search, instockOnly} = this.props

      return (
         <div className="container">
            <input
               type="text"
               name="search"
               id="search"
               className="form-control mb-3"
               placeholder="Rechercher"
               value={search}
               onChange={this.handleChange}
            />
            <div className="form-check">
               <input
                  type="checkbox"
                  name="stockStatus"
                  id="stockStatus"
                  className="form-check-input"
                  checked={instockOnly}
                  onChange={this.handleChange}
               />
               <label htmlFor="stockStatus" className="form-check-label">
                  Produit en stock seulement
               </label>
            </div>
         </div>
      );
   }
}

class ProductTable extends React.Component {
   render() {
      const { items, search, inStockOnly } = this.props;

      let categories = [];
      for (const item of items) {
         if (!categories.includes(item.category)) {
            categories.push(item.category);
         }
      }
      categories = categories.map((category) => (
         <ProductCategory key={category} category={category} items={items} search={search} inStockOnly={inStockOnly}/>
      ));

      return (
         <table className="table">
            <thead>
               <tr>
                  <th>Nom</th>
                  <th>Prix</th>
               </tr>
            </thead>
            <tbody>
            {categories}
            </tbody>
         </table>
      );
   }
}

class ProductCategory extends React.Component {
   render() {
      let products = [];
      for (const item of this.props.items) {
         if (item.category === this.props.category && item.name.toLowerCase().includes(this.props.search) ) {
            if (!this.props.inStockOnly || (item.stocked && this.props.inStockOnly)) {
                products.push(item);
            }

         }
      }
      products = products.map((product) => (
         <Product
            key={products.indexOf(product)}
            name={product.name}
            price={product.price}
            stocked={product.stocked}
         />
      ));

      return (
         <React.Fragment>
            <tr>
               <th colSpan="2">{this.props.category}</th>
            </tr>
            {products}
         </React.Fragment>
      );
   }
}

class Product extends React.Component {
   render() {

      const { name, price, stocked } = this.props;
      const stock = stocked ? null : "no-stock";
      return (
         <tr>
            <td><span className={stock}>{name}</span></td>
            <td>{price}</td>
         </tr>
      );
   }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            inStockOnly: false
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleStockChange = this.handleStockChange.bind(this)
    }

    handleSearch(search) {
        this.setState({search})
    }

    handleStockChange(inStockOnly) {
        this.setState({inStockOnly})
    }

   render() {
      return (
         <div className="container mt-3">
            <SearchBar onSearch={this.handleSearch} onStockChange={this.handleStockChange}/>
            <ProductTable items= {this.props.items} search={this.state.search} inStockOnly={this.state.inStockOnly} onStockChange={this.state.inStockOnly} />
         </div>
      );
   }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<FilterableProductTable items={PRODUCTS}/>);
