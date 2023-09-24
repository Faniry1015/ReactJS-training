function Tabs({ children }) {
   const childrenArray = React.Children.toArray(children);
   console.log(childrenArray);
   const [current, setCurrent] = React.useState(childrenArray[0].key)
   const newChildren = childrenArray.map(child => {
      return React.cloneElement(child, {selected: child.key === current})
   } )
   return (
      <div>
         <nav>
            {childrenArray.map(child => <button key={child.key} onClick={() => setCurrent(child.key)}>{child.props.title}</button>)}
         </nav>;
         <section>{newChildren}</section>
      </div>
   );
}

function Tab({ title, children, selected }) {
   return (
      <div hidden={!selected}>
         <h1>{title}</h1>
         <p>{children}</p>
      </div>
   );
}

function App() {
   return (
      <Tabs>
         {[...new Array(2)].map((v, k) => (
            <Tab key={k} title={`${k} Onglet`}>
               fuga tenetur culpa quo id qui! Voluptate dolorem ut accusamus rem
               recusandae?
            </Tab>
         ))}
         <Tab title="Premier Onglet">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sequi,
         quidem alias facere consectetur voluptate error consequuntur sit, fuga
         tenetur culpa quo id qui! Voluptate dolorem ut accusamus rem
         recusandae?
         </Tab>
         <Tab title="Deuxième Onglet">
         Tempore sequi, quidem alias facere consectetur voluptate error
         consequuntur sit, fuga tenetur culpa quo id qui! Voluptate dolorem ut
         accusamus rem recusandae?
         </Tab>
      </Tabs>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
