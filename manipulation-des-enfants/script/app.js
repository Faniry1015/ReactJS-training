function Tabs ({children}) {
   console.log(React.Children.toArray(children)) /* .toArray pour avoir un tableau de taille 4 directement */
    return "Hello"
}

function Tab({title, children}) {
    return "World"
}

function App() {
   /*Crée un tableau de deux éléments à l'intérieur du tableau contenant les deux autres éléments si on utilise directement .children sans toArray*/
   return <Tabs>
      {[...new Array(2)].map((v,k) => (
         <Tab key={k} title={`Onglet n ${k}`}>
            Eum repellendus quidem possimus quisquam ut reiciendis perspiciatis? Consectetur, quidem nisi?
         </Tab>
      ))} 
      <Tab title="Premier onglet">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quis sint dolore explicabo corporis praesentium maxime blanditiis earum provident, eum repellendus quidem possimus quisquam ut reiciendis perspiciatis? Consectetur, quidem nisi?
      </Tab>
      <Tab title="Deuxième onglet">
         Eos quis sint dolore explicabo corporis praesentium maxime blanditiis earum provident, eum repellendus quidem possimus quisquam ut reiciendis perspiciatis
      </Tab>
   </Tabs>
}


const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<App />)